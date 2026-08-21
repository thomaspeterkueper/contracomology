import Link from 'next/link';
import { notFound } from 'next/navigation';
import { legalInfo } from '@/lib/public-content';
import { isLocale, type Locale, ui } from '@/lib/i18n';

const legalKinds = ['imprint', 'privacy', 'terms'] as const;
type LegalKind = (typeof legalKinds)[number];

function pageTitle(kind: LegalKind, locale: Locale): string {
  if (kind === 'imprint') return locale === 'de' ? 'Impressum' : 'Imprint';
  if (kind === 'privacy') return locale === 'de' ? 'Datenschutz' : 'Privacy';
  return locale === 'de' ? 'Nutzungshinweise' : 'Terms';
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string; kind: string }> }) {
  const { locale: rawLocale, kind } = await params;
  if (!isLocale(rawLocale) || !legalKinds.includes(kind as LegalKind)) notFound();
  const locale: Locale = rawLocale;
  const k = kind as LegalKind;

  return (
    <main className="shell">
      <header className="topbar">
        <Link className="brand" href={`/${locale}`}>Contracomology</Link>
        <nav className="nav">
          <Link href={`/${locale}/legal/imprint`}>{locale === 'de' ? 'Impressum' : 'Imprint'}</Link>
          <Link href={`/${locale}/legal/privacy`}>{locale === 'de' ? 'Datenschutz' : 'Privacy'}</Link>
          <Link href={`/${locale}/legal/terms`}>{locale === 'de' ? 'Nutzungshinweise' : 'Terms'}</Link>
        </nav>
      </header>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 2rem 6rem' }}>
        <h1 style={{ marginBottom: '2rem' }}>{pageTitle(k, locale)}</h1>

        {k === 'imprint' && (
          <div>
            <h2>{locale === 'de' ? 'Angaben gemäß § 5 TMG' : 'Legal notice pursuant to § 5 TMG'}</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{legalInfo.responsible}{`\n`}{legalInfo.address}</p>
            <h2>{locale === 'de' ? 'Kontakt' : 'Contact'}</h2>
            <p>E-Mail: <a href={`mailto:${legalInfo.email}`}>{legalInfo.email}</a></p>
            <h2>{locale === 'de' ? 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV' : 'Responsible for content'}</h2>
            <p>{legalInfo.responsible}, {legalInfo.address.split('\n').slice(0, 2).join(', ')}</p>
            <h2>{locale === 'de' ? 'Urheberrecht' : 'Copyright'}</h2>
            <p>{locale === 'de'
              ? 'Alle Inhalte dieser Website sind urheberrechtlich geschützt und Eigentum von Thomas Peter Küper. Vervielfältigung bedarf der schriftlichen Zustimmung.'
              : 'All content on this website is protected by copyright and property of Thomas Peter Küper. Reproduction requires written consent.'
            }</p>
          </div>
        )}

        {k === 'privacy' && (
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', color: '#555' }}>
            {locale === 'de' ? legalInfo.privacy.de : legalInfo.privacy.en}
          </div>
        )}

        {k === 'terms' && (
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', color: '#555' }}>
            {locale === 'de' ? legalInfo.terms.de : legalInfo.terms.en}
          </div>
        )}
      </div>
    </main>
  );
}
