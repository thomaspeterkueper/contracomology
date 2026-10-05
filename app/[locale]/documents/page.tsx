import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContracomologyDocuments } from '@/lib/kg';
import { isLocale, localeLabel, locales, type Locale, ui } from '@/lib/i18n';

export const revalidate = 3600;

export default async function DocumentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const t = ui[locale];
  const documents = await getContracomologyDocuments();

  return (
    <main className="shell">
      <header className="topbar">
        <Link className="brand" href={`/${locale}`}>Contracomology</Link>
        <nav className="nav">
          <Link href={`/${locale}/course`}>{t.course}</Link>
          <Link href={`/${locale}/kg`}>{t.kgExplorer}</Link>
          <span className="langs">
            {locales.map((l) => <Link key={l} className={`pill ${l === locale ? 'active' : ''}`} href={`/${l}/documents`}>{localeLabel(l)}</Link>)}
          </span>
        </nav>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">{t.documents}</p>
          <h1>{t.documents}</h1>
          <p className="lede">{locale === 'de' ? 'Analysen, Essays und Texte zur Kontrakomologie.' : locale === 'en' ? 'Analyses, essays and texts on Contracomology.' : 'Contracomology에 관한 분석, 에세이와 글.'}</p>
        </div>
      </section>

      <div className="list">
        {documents.length ? documents.map((d) => (
          <article className="item" key={d.id}>
            <h2>{d.title ?? (locale === 'de' ? 'Text' : locale === 'en' ? 'Text' : '글')}</h2>
          </article>
        )) : <p className="empty">{t.emptyDomain}</p>}
      </div>
    <footer className="subpage-footer"><div className="footer-links"><Link href={`/${locale}/legal/imprint`}>{locale === 'de' ? 'Impressum' : 'Imprint'}</Link><Link href={`/${locale}/legal/privacy`}>{locale === 'de' ? 'Datenschutz' : 'Privacy'}</Link><Link href={`/${locale}/legal/terms`}>{locale === 'de' ? 'Nutzungsbedingungen' : 'Terms'}</Link><Link href={`/${locale}/legal/ai-transparency`}>{locale === 'de' ? 'KI-Transparenz' : 'AI transparency'}</Link><a href="https://www.thomas-kueper.de/" rel="external">Thomas Peter Küper</a></div><p>© 2026 Thomas Peter Küper</p></footer></main>
  );
}
