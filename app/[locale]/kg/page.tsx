import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContracomologyConcepts, getContracomologyDomains } from '@/lib/kg';
import { isLocale, localeLabel, locales, type Locale, ui } from '@/lib/i18n';

export const revalidate = 3600;

export default async function KgPage({ params }: { params: Promise<{ locale: string }> }) {
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
          <Link href={`/${locale}/course`}>{t.course}</Link>
          <Link href={`/${locale}/documents`}>{t.documents}</Link>
          <span className="langs">
            {locales.map((l) => <Link key={l} className={`pill ${l === locale ? 'active' : ''}`} href={`/${l}/kg`}>{localeLabel(l)}</Link>)}
          </span>
        </nav>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">{t.kgExplorer}</p>
          <h1>{t.kgExplorer}</h1>
          <p className="lede">{locale === 'de' ? 'Zentrale Begriffe, Zeitformen und Denkfiguren der Kontrakomologie.' : locale === 'en' ? 'Core concepts, forms of time and patterns of thought in Contracomology.' : 'Contracomology의 핵심 개념, 시간 형식과 사고 구조.'}</p>
        </div>
      </section>

      <section>
        <h2>{locale === 'de' ? 'Themenfelder' : locale === 'en' ? 'Fields' : '주제 영역'}</h2>
        <div className="list">
          {domains.length ? domains.map((d) => (
            <article className="item" key={d.id}>
              <h3>{d.title || d.id}</h3>
              <p>{d.description ?? t.emptyDomain}</p>
              
            </article>
          )) : <p className="empty">{t.emptyDomain}</p>}
        </div>
      </section>

      <section>
        <h2>{t.concepts}</h2>
        <div className="list">
          {concepts.length ? concepts.map((c) => (
            <article className="item" key={c.id}>
              <h3>{c.name || c.id}</h3>
              
            </article>
          )) : <p className="empty">{t.emptyDomain}</p>}
        </div>
      </section>
    <footer className="subpage-footer"><div className="footer-links"><Link href={`/${locale}/legal/imprint`}>{locale === 'de' ? 'Impressum' : 'Imprint'}</Link><Link href={`/${locale}/legal/privacy`}>{locale === 'de' ? 'Datenschutz' : 'Privacy'}</Link><Link href={`/${locale}/legal/terms`}>{locale === 'de' ? 'Nutzungsbedingungen' : 'Terms'}</Link><Link href={`/${locale}/legal/ai-transparency`}>{locale === 'de' ? 'KI-Transparenz' : 'AI transparency'}</Link><a href="https://www.thomas-kueper.de/" rel="external">Thomas Peter Küper</a></div><p>© 2026 Thomas Peter Küper</p></footer></main>
  );
}
