import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContracomologyConcepts, getContracomologyDomains } from '@/lib/kg';
import { isLocale, localeLabel, locales, type Locale, ui } from '@/lib/i18n';

export const revalidate = 3600;

export default async function CoursePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const t = ui[locale];
  const [domains, concepts] = await Promise.all([
    getContracomologyDomains(),
    getContracomologyConcepts(),
  ]);

  return (
    <main className="shell">
      <header className="topbar">
        <Link className="brand" href={`/${locale}`}>Contracomology</Link>
        <nav className="nav">
          <Link href={`/${locale}`}>{t.title}</Link>
          <Link href={`/${locale}/kg`}>{t.concepts}</Link>
          <Link href={`/${locale}/documents`}>{t.documents}</Link>
          <span className="langs">
            {locales.map((l) => <Link key={l} className={`pill ${l === locale ? 'active' : ''}`} href={`/${l}/course`}>{localeLabel(l)}</Link>)}
          </span>
        </nav>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">{locale === 'de' ? 'Methode' : locale === 'en' ? 'Method' : '방법'}</p>
          <h1>{locale === 'de' ? 'Kontrakomologie anwenden' : locale === 'en' ? 'Applying Contracomology' : 'Contracomology 적용하기'}</h1>
          <p className="lede">{t.subtitle}</p>
        </div>
        
      </section>

      <section>
        <h2>{locale === 'de' ? 'Domänen' : locale === 'en' ? 'Domains' : '도메인'}</h2>
        <div className="list">
          {domains.length ? domains.map((domain) => (
            <article className="item" key={domain.id}>
              <h2>{domain.title || domain.id}</h2>
              {domain.description ? <p>{domain.description}</p> : null}
            </article>
          )) : <p className="empty">{t.emptyDomain}</p>}
        </div>
      </section>

      <section>
        <h2>{t.concepts}</h2>
        <div className="list">
          {concepts.length ? concepts.map((concept) => (
            <article className="item" key={concept.id}>
              <h2>{concept.name || concept.id}</h2>
            </article>
          )) : <p className="empty">{t.emptyDomain}</p>}
        </div>
      </section>
    <footer className="subpage-footer"><div className="footer-links"><Link href={`/${locale}/legal/imprint`}>{locale === 'de' ? 'Impressum' : 'Imprint'}</Link><Link href={`/${locale}/legal/privacy`}>{locale === 'de' ? 'Datenschutz' : 'Privacy'}</Link><Link href={`/${locale}/legal/terms`}>{locale === 'de' ? 'Nutzungsbedingungen' : 'Terms'}</Link><Link href={`/${locale}/legal/ai-transparency`}>{locale === 'de' ? 'KI-Transparenz' : 'AI transparency'}</Link><a href="https://www.thomas-kueper.de/" rel="external">Thomas Peter Küper</a></div><p>© 2026 Thomas Peter Küper</p></footer></main>
  );
}
