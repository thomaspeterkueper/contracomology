import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';

import { conceptDefinitionText, ui } from './i18n.ts';
import { getContracomologyConcepts, resolveConceptDefinition } from './kg.ts';

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

function mockFetch(body, { status = 200 } = {}) {
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    return {
      ok: status >= 200 && status < 300,
      status,
      async json() {
        return body;
      },
      async text() {
        return typeof body === 'string' ? body : JSON.stringify(body);
      },
    };
  };
  return calls;
}

// Fixtures mirror the contracted canonical export's `records` set. They exercise the
// shapes the canonical export may use before it is allowlisted by the KG export API.
const canonicalExport = {
  records: {
    entities: [
      {
        id: 'CON:L1:zeitform',
        type: 'Concept',
        domain: 'KON',
        name: 'Zeitform',
        status: 'canonical',
        epistemicStatus: 'W',
        definition: '  Zeitform als kanonische Definition.  ',
      },
      {
        id: 'CON:L1:avi-punkt',
        type: 'Concept',
        domain: 'KON',
        name: 'AVI-Punkt',
        definition: { de: 'Der AVI-Punkt auf Deutsch.', en: 'The AVI point in English.' },
      },
      {
        id: 'CON:L1:ma-u',
        type: 'Concept',
        domain: 'KON',
        name: "Ma'U",
        status: 'canonical_anchor',
        definitionStatus: 'pending_definition',
      },
      {
        id: 'CON:PHY:magnetic-field',
        type: 'Concept',
        domain: 'PHY',
        name: 'Magnetic field',
        definition: 'Not a KON concept.',
      },
      { id: 'DOC:KUE:LEGAL-IMPRINT-DE', type: 'Document' },
    ],
  },
};

test('reads the contracted canonical export and resolves definition records', async () => {
  const calls = mockFetch(canonicalExport);

  const catalog = await getContracomologyConcepts('en');

  assert.equal(calls.length, 1);
  assert.match(calls[0], /\/api\/exports\/contracomology-0\.1\.json$/);
  assert.equal(catalog.available, true);
  assert.deepEqual(catalog.concepts.map((c) => c.id), [
    'CON:L1:zeitform',
    'CON:L1:avi-punkt',
    'CON:L1:ma-u',
  ]);

  const zeitform = catalog.concepts.find((c) => c.id === 'CON:L1:zeitform');
  assert.equal(zeitform.definition, 'Zeitform als kanonische Definition.');
  assert.equal(zeitform.epistemicStatus, 'W');

  const avi = catalog.concepts.find((c) => c.id === 'CON:L1:avi-punkt');
  assert.equal(avi.definition, 'The AVI point in English.');
  assert.doesNotMatch(avi.definition, /\[object Object\]/);
});

test('a concept without a definition renders the localized definition-pending copy', async () => {
  mockFetch(canonicalExport);

  const catalog = await getContracomologyConcepts('de');
  const pending = catalog.concepts.find((c) => c.id === 'CON:L1:ma-u');
  const defined = catalog.concepts.find((c) => c.id === 'CON:L1:avi-punkt');

  assert.equal(pending.definition, undefined);
  assert.equal(conceptDefinitionText(pending.definition, 'de'), ui.de.definitionPending);
  assert.notEqual(ui.de.definitionPending, ui.de.emptyDomain);
  assert.equal(conceptDefinitionText(defined.definition, 'de'), 'Der AVI-Punkt auf Deutsch.');
});

test('does not substitute another locale for a missing localized definition', async () => {
  mockFetch(canonicalExport);

  const catalog = await getContracomologyConcepts('ko');
  const avi = catalog.concepts.find((c) => c.id === 'CON:L1:avi-punkt');

  assert.equal(avi.definition, undefined);
  assert.equal(conceptDefinitionText(avi.definition, 'ko'), ui.ko.definitionPending);
});

test('returns an explicit unavailable state when the canonical export is not served', async () => {
  mockFetch({ error: 'unknown_export' }, { status: 404 });

  const catalog = await getContracomologyConcepts('de');

  assert.deepEqual(catalog, { available: false, concepts: [] });
  assert.equal(ui.de.conceptsUnavailable.length > 0, true);
});

test('accepts the canonical record set as a direct records array', async () => {
  mockFetch({
    records: [
      {
        id: 'CON:L1:zeitform',
        type: 'Concept',
        domain: 'KON',
        name: 'Zeitform',
        definition: 'Direct record definition.',
      },
    ],
  });

  const catalog = await getContracomologyConcepts('en');

  assert.equal(catalog.available, true);
  assert.equal(catalog.concepts[0].definition, 'Direct record definition.');
});

test('resolveConceptDefinition rejects empty and non-textual definitions', () => {
  assert.equal(resolveConceptDefinition('   ', 'de'), undefined);
  assert.equal(resolveConceptDefinition(['Definition'], 'de'), undefined);
  assert.equal(resolveConceptDefinition({ de: '' }, 'de'), undefined);
  assert.equal(resolveConceptDefinition({ 'de-DE': 'Regionaldeutsch' }, 'de'), 'Regionaldeutsch');
});
