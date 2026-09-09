import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLegalDocument, getLegalInfo } from '@/lib/kg';
import { isLocale, type Locale } from '@/lib/i18n';

const legalKinds = ['imprint', 'privacy', 'terms', 'ai-transparency'] as const;
type LegalKind = (typeof legalKinds)[number];

function pageTitle(kind: LegalKind, locale: Locale): string {
  if (kind === 'imprint') return locale === 'de' ? 'Impressum' : 'Imprint';
  if (kind === 'privacy') return locale === 'de' ? 'Datenschutz' : 'Privacy';
  if (kind === 'ai-transparency') return 'KI-Transparenz';
  return locale === 'de' ? 'Nutzungshinweise' : 'Terms';
}

export const revalidate = 3600;

export default async function LegalPage({ params }: { params: Promise<{ locale: string; kind: string }> }) {
  const { locale: rawLocale, kind } = await params;
  if (!isLocale(rawLocale) || !legalKinds.includes(kind as LegalKind)) notFound();
  const locale: Locale = rawLocale;
  const k = kind as LegalKind;

  const legalInfo = k === 'imprint' ? await getLegalInfo() : null;
  const legalDocument = k === 'privacy' || k === 'terms' ? await getLegalDocument(k) : null;

  return (
    <main className="shell">
      <header className="topbar">
        <Link className="brand" href={`/${locale}`}>Contracomology</Link>
        <nav className="nav">
          <Link href={`/${locale}/legal/imprint`}>{locale === 'de' ? 'Impressum' : 'Imprint'}</Link>
          <Link href={`/${locale}/legal/privacy`}>{locale === 'de' ? 'Datenschutz' : 'Privacy'}</Link>
          <Link href={`/${locale}/legal/terms`}>{locale === 'de' ? 'Nutzungshinweise' : 'Terms'}</Link>
          <Link href={`/${locale}/legal/ai-transparency`}>KI-Transparenz</Link>
        </nav>
      </header>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 2rem 6rem' }}>
        <h1 style={{ marginBottom: '2rem' }}>{pageTitle(k, locale)}</h1>

        {k === 'imprint' && (
          legalInfo ? (
            <div>
              <p style={{ whiteSpace: 'pre-line' }}>{legalInfo.responsible}{`\n`}{legalInfo.address}</p>
              <p>E-Mail: <a href={`mailto:${legalInfo.email}`}>{legalInfo.email}</a></p>
              <p className="meta">Kanonische Quelle: LEGAL:L3:impressum-master · Stand {legalInfo.updated}</p>
            </div>
          ) : <p className="empty">Kanonische Impressumsdaten sind derzeit nicht verfügbar.</p>
        )}

        {(k === 'privacy' || k === 'terms') && (
          locale !== 'de' ? (
            <p className="empty">Die autoritative Fassung dieses Rechtstexts liegt derzeit nur auf Deutsch vor.</p>
          ) : legalDocument ? (
            <div>
              <p className="meta">Status: {legalDocument.status} · Quelle: KUEPER Knowledge Graph</p>
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', color: '#555' }}>{legalDocument.body}</div>
            </div>
          ) : (
            <p className="empty">Der kanonische Rechtstext konnte nicht aus dem Knowledge Graph geladen werden.</p>
          )
        )}

        {k === 'ai-transparency' && (
          <div style={{ lineHeight: '1.8', color: '#555' }}>
            <p>Bei der Erstellung und Bearbeitung von Inhalten nutze ich auch KI-gestützte Werkzeuge. Je nach Text kann ihr Einsatz von Rechtschreib- und Stilkorrekturen über redaktionelle Strukturierung bis zur dialogischen, konzeptionellen Mitarbeit reichen.</p>
            <p>Die veröffentlichten Fassungen werden von mir ausgewählt und redaktionell verantwortet. Inhaltliche Entscheidungen, Einordnung, Annahme oder Verwerfung von Vorschlägen sowie die Endredaktion liegen bei Thomas Peter Küper.</p>
            <p>Reine Korrektur-, Lektorats- oder Formatierungsschritte werden nicht bei jedem einzelnen Inhalt gesondert ausgewiesen. Wo generative KI substanziell an der Entwicklung eines Textes, Modells oder Konzepts beteiligt war und ein zusätzlicher werkbezogener Hinweis zur Einordnung sinnvoll ist, kann dieser direkt am jeweiligen Inhalt ergänzt werden.</p>
            <p className="meta">Kontrollierte Spiegelung der KUEPER-Ecosystem-Policy ECO:POLICY:PUBLICATION-TRANSPARENCY, Version 1.0.0. Kanonische Quelle: thomaspeterkueper/kueper-ecosystem.</p>
          </div>
        )}
      </div>
    </main>
  );
}
