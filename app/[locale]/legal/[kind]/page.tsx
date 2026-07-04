import Link from 'next/link';
import { notFound } from 'next/navigation';
import { legalInfo } from '@/lib/public-content';
import { getLegalInfo } from '@/lib/kg';
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

  // KG-Daten bevorzugen, Fallback auf statische legalInfo
  const kg = await getLegalInfo();
  const responsible = kg?.responsible ?? legalInfo.responsible;
  const address = kg?.address ?? legalInfo.address;
  const email = kg?.email ?? legalInfo.email;

  return (
    <main className="shell">
      <header className="topbar">
        <Link className="brand" href={`/${locale}`}>Contracomology</Link>
        <nav className="nav">
          <Link href={`/${locale}/legal/imprint`}>{locale === 'de' ? 'Impressum' : 'Imprint'}</Link>
          <Link href={`/${locale}/legal/privacy`}>{locale === 'de' ? 'Datenschutz' : 'Privacy'}</Link>
          <Link href={`/${locale}/legal/terms`}>{locale === 'de' ? 'Hinweise' : 'Notes'}</Link>
        </nav>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">{t.legal}</p>
          <h1>{pageTitle(k, locale)}</h1>
          <p className="lede">{t.legalNote}</p>
        </div>
        <aside className="card">
          <h3>{responsible}</h3>
          <p>{address}</p>
          <p><a href={`mailto:${email}`}>{email}</a></p>
        </aside>
      </section>

      <section className="card">
        {k === 'imprint' ? (
          <>
            <h2>{locale === 'de' ? 'Anbieter' : 'Provider'}</h2>
            <p>{responsible}<br />{address}</p>
            <h2>{locale === 'de' ? 'Kontakt' : 'Contact'}</h2>
            <p><a href={`mailto:${email}`}>{email}</a></p>
          </>
        ) : null}
        {k === 'privacy' ? (
          <>
            <h2>{locale === 'de' ? 'Datenschutzhinweise' : 'Privacy notes'}</h2>
            <p>{locale === 'de'
              ? 'Beim Besuch dieser Website werden keine Kontaktformulare bereitgestellt.'
              : 'No contact forms are provided on this website.'}</p>
            <p>{locale === 'de'
              ? 'Technisch notwendige Zugriffsdaten können durch den Hosting-Anbieter verarbeitet werden.'
              : 'Technically necessary access data may be processed by the hosting provider.'}</p>
            <p>{locale === 'de'
              ? 'Bei Kontakt per E-Mail werden die übermittelten Angaben zur Bearbeitung verwendet.'
              : 'If you contact us by email, the submitted data will be used to process your request.'}</p>
          </>
        ) : null}
        {k === 'terms' ? (
          <>
            <h2>{locale === 'de' ? 'Hinweise' : 'Notes'}</h2>
            <p>{locale === 'de' ? legalInfo.disclaimerDe : legalInfo.disclaimerEn}</p>
          </>
        ) : null}
      </section>
    </main>
  );
}
