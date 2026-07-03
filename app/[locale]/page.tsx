import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContracomologyConcepts, getContracomologyDocuments, getContracomologyDomains, resolveArchive } from '@/lib/kg';
import { introductoryCourse, totalCourseProgress } from '@/lib/course';
import { isLocale, localeLabel, locales, type Locale, ui } from '@/lib/i18n';

export const revalidate = 3600;

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const t = ui[locale];
  const [domains, concepts, documents] = await Promise.all([
    getContracomologyDomains(),
    getContracomologyConcepts(),
    getContracomologyDocuments(),
  ]);
  const domain = domains[0] ?? null;
  const progress = totalCourseProgress();

  return (
    <main className="shell">
      <header className="topbar">
        <Link className="brand" href={`/${locale}`}>Contracomology</Link>
        <nav className="nav">
          <Link href={`/${locale}/course`}>{t.course}</Link>
          <Link href={`/${locale}/kg`}>{t.kgExplorer}</Link>
          <Link href={`/${locale}/documents`}>{t.documents}</Link>
          <Link href={`/${locale}/legal/imprint`}>{t.legal}</Link>
          <span className="langs">
            {locales.map((l) => (
              <Link key={l} className={`pill ${l === locale ? 'active' : ''}`} href={`/${l}`}>
                {localeLabel(l)}
              </Link>
            ))}
          </span>
        </nav>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <p className="lede">{t.legacyClaim}</p>
          <h1>{t.title}</h1>
          <p className="lede">{domain?.description ?? t.claim}</p>
        </div>
        <aside className="card">
          <p className="meta">SYS:KUEPER:contracomology</p>
          <p>{t.claim}</p>
          <p className="meta">{t.progress}: {progress}%</p>
          <Link className="cta" href={`/${locale}/course`}>{t.startCourse}</Link>{' '}
          <Link className="cta" href={`/${locale}/kg`}>{t.openExplorer}</Link>
        </aside>
      </section>

      <section>
        <h2>{t.academy}</h2>
        <div className="grid">
          {introductoryCourse.slice(0, 6).map((module) => (
            <article className="card" key={module.id}>
              <p className="meta">{String(module.order).padStart(2, '0')} · {module.status} · {module.progress}%</p>
              <h3>{module.title[locale]}</h3>
              <p>{module.summary[locale]}</p>
              <p className="meta">{module.kgRefs.join(' · ')}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>{t.kgExplorer}</h2>
        <div className="grid">
          <article className="card">
            <h3>{t.concepts}</h3>
            <p className="meta">{concepts.length} Records</p>
            <Link className="cta" href={`/${locale}/kg`}>{t.open}</Link>
          </article>
          <article className="card">
            <h3>{t.documents}</h3>
            <p className="meta">{documents.length} Records</p>
            <Link className="cta" href={`/${locale}/documents`}>{t.openDocuments}</Link>
          </article>
          <article className="card">
            <h3>{t.source}</h3>
            <p className="meta">KD:KON:N1</p>
            <p>{domain?.title ?? t.emptyDomain}</p>
          </article>
        </div>
      </section>

      <section>
        <h2>{t.documents}</h2>
        <div className="list">
          {documents.length ? documents.slice(0, 5).map((d) => {
            const archive = resolveArchive(d);
            return (
              <article className="item" key={d.id}>
                <h3>{d.title ?? d.id}</h3>
                <p className="meta">{d.id}{archive ? ` · ${archive.label}` : ''}</p>
              </article>
            );
          }) : <p className="empty">{t.emptyDomain}</p>}
        </div>
      </section>

      <footer>
        Source of Truth: <span className="meta">SYS:KUEPER:knowledge-graph</span>. Frontend owns only <span className="meta">contracomology_ui</span>.
      </footer>
    </main>
  );
}
