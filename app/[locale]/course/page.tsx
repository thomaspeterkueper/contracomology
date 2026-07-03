import Link from 'next/link';
import { notFound } from 'next/navigation';
import { introductoryCourse, totalCourseProgress } from '@/lib/course';
import { isLocale, localeLabel, locales, type Locale, ui } from '@/lib/i18n';

export default async function CoursePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const t = ui[locale];
  const progress = totalCourseProgress();

  return (
    <main className="shell">
      <header className="topbar">
        <Link className="brand" href={`/${locale}`}>Contracomology</Link>
        <nav className="nav">
          <Link href={`/${locale}`}>{t.title}</Link>
          <Link href={`/${locale}/kg`}>{t.kgExplorer}</Link>
          <Link href={`/${locale}/documents`}>{t.documents}</Link>
          <span className="langs">
            {locales.map((l) => <Link key={l} className={`pill ${l === locale ? 'active' : ''}`} href={`/${l}/course`}>{localeLabel(l)}</Link>)}
          </span>
        </nav>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">{t.course}</p>
          <h1>{t.course}</h1>
          <p className="lede">{t.subtitle}</p>
        </div>
        <aside className="card">
          <p className="meta">{t.progress}</p>
          <h2>{progress}%</h2>
          <p>Die Kursstruktur liegt im Frontend. Begriffsdefinitionen und kanonische Inhalte kommen aus dem KG.</p>
        </aside>
      </section>

      <div className="list">
        {introductoryCourse.map((module) => (
          <article className="item" key={module.id} id={module.id}>
            <p className="meta">{String(module.order).padStart(2, '0')} · {module.status} · {module.progress}%</p>
            <h2>{module.title[locale]}</h2>
            <p>{module.summary[locale]}</p>
            <p className="meta">KG: {module.kgRefs.join(' · ')}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
