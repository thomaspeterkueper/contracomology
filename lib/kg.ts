const KG_RAW =
  'https://raw.githubusercontent.com/thomaspeterkueper/kueper-knowledge-graph/main/exports';

export const CONTRACOMOLOGY_DOMAIN = 'KON';
export const LEGAL_DOCUMENT_REFS = {
  imprint: 'DOC:KUE:LEGAL-IMPRINT-DE',
  privacy: 'DOC:KUE:LEGAL-PRIVACY-DE',
  terms: 'DOC:KUE:LEGAL-TERMS-DE',
} as const;

export type LegalKind = keyof typeof LEGAL_DOCUMENT_REFS;
type Json = Record<string, unknown>;

async function kg<T = Json>(file: string): Promise<T | null> {
  try {
    const res = await fetch(`${KG_RAW}/${file}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function records(obj: Json | null, key: string): Json[] {
  const r = (obj?.records as Json) ?? obj;
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

export type Concept = { id: string; name: string; domain?: string; layer?: string };
export type DocumentRef = { id: string; title?: string; system?: string; repo?: string; path?: string };

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

export async function getContracomologyConcepts(): Promise<Concept[]> {
  const data = await kg('kxf-0.6.json');
  return records(data, 'entities')
    .filter((e) => e.type === 'Concept' && (e.domain === CONTRACOMOLOGY_DOMAIN || e.domaene === CONTRACOMOLOGY_DOMAIN))
    .map((e) => ({
      id: String(e.id ?? e.entity_id),
      name: String(e.name ?? ''),
      domain: e.domain || e.domaene ? String(e.domain ?? e.domaene) : undefined,
      layer: e.layer ? String(e.layer) : undefined,
    }));
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
    }));
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
