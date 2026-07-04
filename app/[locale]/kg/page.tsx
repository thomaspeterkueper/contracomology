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
          <p className="lede">{t.kgLede}</p>
        </div>
      </section>

      <section>
        <h2>Domains</h2>
        <div className="list">
          {domains.length ? domains.map((d) => (
            <article className="item" key={d.id}>
              <h3>{d.title || d.id}</h3>
              <p>{d.description ?? t.emptyDomain}</p>
              <p className="meta">{d.id} · {d.code} · {d.level}</p>
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
              <p className="meta">{c.id}{c.domain ? ` · ${c.domain}` : ''}</p>
            </article>
          )) : <p className="empty">{t.emptyDomain}</p>}
        </div>
      </section>
    </main>
  );
}
