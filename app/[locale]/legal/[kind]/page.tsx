import Link from 'next/link';
import { notFound } from 'next/navigation';
import { legalInfo } from '@/lib/public-content';
import { isLocale, type Locale, ui } from '@/lib/i18n';

const legalKinds = ['imprint', 'privacy', 'terms'] as const;
type LegalKind = (typeof legalKinds)[number];

function pageTitle(kind: LegalKind, locale: Locale): string {
  if (kind === 'imprint') return locale === 'de' ? 'Impressum' : 'Imprint';
  if (kind === 'privacy') return locale === 'de' ? 'Datenschutz' : 'Privacy';
  return locale === 'de' ? 'Hinweise' : 'Notes';
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string; kind: string }> }) {
  const { locale: rawLocale, kind } = await params;
  if (!isLocale(rawLocale) || !legalKinds.includes(kind as LegalKind)) notFound();
  const locale: Locale = rawLocale;
  const t = ui[locale];
  const k = kind as LegalKind;

  return (
    <main className="shell">
      <header className="topbar">
        <Link className="brand" href={`/${locale}`}>Contracomology</Link>
        <nav className="nav">
          <Link href={`/${locale}/legal/imprint`}>Impressum</Link>
          <Link href={`/${locale}/legal/privacy`}>Datenschutz</Link>
          <Link href={`/${locale}/legal/terms`}>Hinweise</Link>
        </nav>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">{t.legal}</p>
          <h1>{pageTitle(k, locale)}</h1>
          <p className="lede">{t.legalNote}</p>
        </div>
        <aside className="card">
          <h3>{legalInfo.responsible}</h3>
          <p>{legalInfo.address}</p>
          <p><a href={`mailto:${legalInfo.email}`}>{legalInfo.email}</a></p>
        </aside>
      </section>

      <section className="card">
        {k === 'imprint' ? (
          <>
            <h2>Anbieter</h2>
            <p>{legalInfo.responsible}<br />{legalInfo.address}</p>
            <h2>Kontakt</h2>
            <p><a href={`mailto:${legalInfo.email}`}>{legalInfo.email}</a></p>
          </>
        ) : null}
        {k === 'privacy' ? (
          <>
            <h2>Datenschutzhinweise</h2>
            <p>Beim Besuch dieser Website werden keine Kontaktformulare bereitgestellt.</p>
            <p>Technisch notwendige Zugriffsdaten koennen durch den Hosting-Anbieter verarbeitet werden.</p>
            <p>Bei Kontakt per E-Mail werden die uebermittelten Angaben zur Bearbeitung verwendet.</p>
          </>
        ) : null}
        {k === 'terms' ? (
          <>
            <h2>Hinweise</h2>
            <p>{locale === 'de' ? legalInfo.disclaimerDe : legalInfo.disclaimerEn}</p>
          </>
        ) : null}
      </section>
    </main>
  );
}
