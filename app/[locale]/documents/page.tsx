import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContracomologyDocuments, resolveArchive } from '@/lib/kg';
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
          <p className="lede">{t.docsLede}</p>
        </div>
      </section>

      <div className="list">
        {documents.length ? documents.map((d) => {
          const archive = resolveArchive(d);
          return (
            <article className="item" key={d.id}>
              <h2>{d.title ?? d.id}</h2>
              <p className="meta">{d.id}</p>
              <p>{archive ? archive.label : t.source}</p>
              {d.repo || d.path ? <p className="meta">{d.repo ?? ''}{d.path ? ` · ${d.path}` : ''}</p> : null}
            </article>
          );
        }) : <p className="empty">{t.emptyDomain}</p>}
      </div>
    </main>
  );
}
