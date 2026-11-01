const KG_REPO = 'thomaspeterkueper/kueper-knowledge-graph';
// KG exports are read through the KG export API. The KG service holds the credentials for
// the private KG repository server-side and only serves allowlisted export files, so no
// repository credentials belong in this consumer.
const KG_API_BASE = process.env.KG_API_BASE_URL ?? 'https://kueper-knowledge-graph.vercel.app';
const KG_RAW_ROOT = `https://raw.githubusercontent.com/${KG_REPO}/main`;
const KG_REGISTRY = `${KG_RAW_ROOT}/registry`;

export const CONTRACOMOLOGY_DOMAIN = 'KON';
// Contracted canonical export for SYS:KUEPER:contracomology
// (records.activeConsumerContracts in kxf-0.6.json). Historical KXF files must not be
// used as a substitute for this export (kxf-0.6.json resolution.consumerNote).
export const CONTRACOMOLOGY_EXPORT = 'contracomology-0.1.json';
export const LEGAL_DOCUMENT_REFS = {
  imprint: 'DOC:KUE:LEGAL-IMPRINT-DE',
  privacy: 'DOC:KUE:LEGAL-PRIVACY-DE',
  terms: 'DOC:KUE:LEGAL-TERMS-DE',
} as const;

export type LegalKind = keyof typeof LEGAL_DOCUMENT_REFS;
type Json = Record<string, unknown>;

async function fetchJson<T = Json>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function fetchText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

async function kg<T = Json>(file: string): Promise<T | null> {
  return fetchJson<T>(`${KG_API_BASE}/api/exports/${file}`);
}

function records(obj: Json | null, key: string): Json[] {
  const direct = obj?.records;
  // Some exports carry the record set directly as an array under `records`
  // (knowledge-domains-0.1.json), others scope it by collection key (kxf-0.6.json).
  if (Array.isArray(direct)) return direct as Json[];
  const r = (direct as Json) ?? obj;
  const v = (r as Json)?.[key];
  return Array.isArray(v) ? (v as Json[]) : [];
}

export type KnowledgeDomain = {
  id: string;
  code: string;
  level: string;
  title: string;
  description?: string;
  parent?: string | null;
};

export type Concept = { id: string; name: string; domain?: string; layer?: string; definition?: string; status?: string; epistemicStatus?: string; definitionStatus?: string };
export type ConceptCatalog =
  | { available: true; concepts: Concept[] }
  | { available: false; concepts: [] };
export type DocumentRef = {
  id: string;
  title?: string;
  system?: string;
  repo?: string;
  path?: string;
  status?: string;
};

export async function getContracomologyDomains(): Promise<KnowledgeDomain[]> {
  const data = await kg('knowledge-domains-0.1.json');
  return records(data, 'knowledge_domains')
    .filter((d) => d.code === CONTRACOMOLOGY_DOMAIN || String(d.id ?? '').startsWith('KD:KON:'))
    .map((d) => ({
      id: String(d.id),
      code: String(d.code ?? CONTRACOMOLOGY_DOMAIN),
      level: String(d.level ?? ''),
      title: String(d.title ?? ''),
      description: d.description ? String(d.description) : undefined,
      parent: (d.parent as string | null) ?? null,
    }));
}

// The canonical export is not served by the KG API yet, so the exact definition shape is
// unverified. Accept both documented shapes: a plain string or a locale-keyed object.
// A definition is only used for the requested locale; otherwise the concept stays pending.
export function resolveConceptDefinition(value: unknown, locale: string): string | undefined {
  if (typeof value === 'string') {
    const text = value.trim();
    return text || undefined;
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const entries = Object.entries(value as Record<string, unknown>);
  const wanted = locale.toLowerCase();
  const primary = wanted.split('-')[0];
  const match =
    entries.find(([key]) => key.toLowerCase() === wanted) ??
    entries.find(([key]) => key.toLowerCase() === primary) ??
    entries.find(([key]) => key.toLowerCase().split('-')[0] === primary);
  if (!match || typeof match[1] !== 'string') return undefined;
  const text = match[1].trim();
  return text || undefined;
}

export async function getContracomologyConcepts(locale: string): Promise<ConceptCatalog> {
  // Contracted canonical export only. The KG export API does not allowlist it yet
  // (thomaspeterkueper/kueper-knowledge-graph#196; see
  // external-tasks/open/KG.KON-000016-contracomology-canonical-concept-export.md), so the
  // concept section reports an explicit unavailable state instead of substituting the
  // historical kxf-0.6.json export.
  const data = await kg(CONTRACOMOLOGY_EXPORT);
  if (!data) return { available: false, concepts: [] };
  return {
    available: true,
    concepts: records(data, 'entities')
      .filter((e) => e.type === 'Concept' && (e.domain === CONTRACOMOLOGY_DOMAIN || e.domaene === CONTRACOMOLOGY_DOMAIN))
      .map((e) => ({
        id: String(e.id ?? e.entity_id),
        name: String(e.name ?? ''),
        domain: e.domain || e.domaene ? String(e.domain ?? e.domaene) : undefined,
        layer: e.layer ? String(e.layer) : undefined,
        definition: resolveConceptDefinition(e.definition, locale),
        status: e.status ? String(e.status) : undefined,
        epistemicStatus: e.epistemicStatus ? String(e.epistemicStatus) : undefined,
        definitionStatus: e.definitionStatus ? String(e.definitionStatus) : undefined,
      })),
  };
}

export async function getContracomologyDocuments(): Promise<DocumentRef[]> {
  const data = await kg('kxf-0.6.json');
  const docs = records(data, 'documents').length
    ? records(data, 'documents')
    : records(data, 'entities').filter((e) => e.type === 'Document');
  return docs
    .filter((d) => /:KON\b|contracomolog|kontrakomolog/i.test(String(d.id) + String(d.title ?? '')))
    .map((d) => ({
      id: String(d.id),
      title: d.title ? String(d.title) : undefined,
      system: d.system ? String(d.system) : undefined,
      repo: d.repo ? String(d.repo) : undefined,
      path: d.path ? String(d.path) : undefined,
      status: d.status ? String(d.status) : undefined,
    }));
}

export type LegalInfo = {
  responsible: string;
  address: string;
  email: string;
  updated: string;
};

type LegalMaster = {
  updated?: string;
  responsible?: { name?: string; address?: string; email?: string };
};

type DocumentRegistry = { records?: Json[] };

export async function getLegalInfo(): Promise<LegalInfo> {
  const data = await fetchJson<LegalMaster>(`${KG_REGISTRY}/legal/impressum-master.json`);
  const r = data?.responsible;
  if (!r?.name || !r.address || !r.email) {
    throw new Error('Required KG legal source LEGAL:L3:impressum-master is unavailable or incomplete');
  }
  return {
    responsible: r.name,
    address: r.address,
    email: r.email,
    updated: data?.updated ?? '',
  };
}

function resolveTemplate(text: string, info: LegalInfo): string {
  return text
    .replaceAll('{{ impressum.responsible.name }}', info.responsible)
    .replaceAll('{{ impressum.responsible.address }}', info.address)
    .replaceAll('{{ impressum.responsible.email }}', info.email)
    .replaceAll('{{ impressum.updated }}', info.updated);
}

function normalizeSourceRepository(value: unknown): string {
  const candidate = String(value ?? '');
  return /^[^/]+\/[^/]+$/.test(candidate) ? candidate : KG_REPO;
}

function documentStatus(body: string, fallback: string): string {
  const match = body.match(/\*\*Status:\*\*\s*`([^`]+)`/i);
  return match?.[1] ?? fallback;
}

export async function getLegalDocument(kind: Exclude<LegalKind, 'imprint'>): Promise<{ body: string; status: string }> {
  const [registry, info] = await Promise.all([
    kg<DocumentRegistry>('document-references-0.1.json'),
    getLegalInfo(),
  ]);
  if (!registry) throw new Error('Required KG document-references registry is unavailable');

  const id = LEGAL_DOCUMENT_REFS[kind];
  const record = (registry.records ?? []).find((entry) => entry.id === id);
  if (!record) throw new Error(`Required KG legal DocumentReference ${id} is missing`);

  const sourceRepository = normalizeSourceRepository(record.sourceRepository);
  const sourcePath = String(record.sourcePath ?? '');
  if (!sourcePath) throw new Error(`Required KG legal DocumentReference ${id} has no sourcePath`);

  const rawBody = await fetchText(`https://raw.githubusercontent.com/${sourceRepository}/main/${sourcePath}`);
  if (!rawBody) throw new Error(`Required KG legal source ${sourceRepository}/${sourcePath} is unavailable`);

  const body = resolveTemplate(rawBody, info);
  return {
    body,
    status: documentStatus(rawBody, String(record.status ?? 'unknown')),
  };
}

export function resolveArchive(doc: DocumentRef): { system: string; label: string } | null {
  if (doc.system === 'SYS:KUEPER:ota' || doc.id.startsWith('DOC:OTA:')) {
    return { system: 'SYS:KUEPER:ota', label: 'OverTime Archive' };
  }
  if (doc.system === 'SYS:KUEPER:kueper-com' || doc.id.startsWith('DOC:KUE:')) {
    return { system: 'SYS:KUEPER:kueper-com', label: 'kueper.com' };
  }
  return null;
}
