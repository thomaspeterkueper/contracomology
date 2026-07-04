import Link from 'next/link';
import { notFound } from 'next/navigation';
import { introductoryCourse } from '@/lib/course';
import { publicCourses } from '@/lib/public-content';
import { isLocale, localeLabel, locales, type Locale, ui } from '@/lib/i18n';

export default async function CoursePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const t = ui[locale];

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
          <p className="eyebrow">{t.course}</p>
          <h1>{t.academy}</h1>
          <p className="lede">{t.subtitle}</p>
        </div>
        <aside className="card">
          <p>Die Kurse fuehren von den Grundlagen bis zu Literatur, OEM und NOX.</p>
        </aside>
      </section>

      <section>
        <h2>Kursreihen</h2>
        <div className="grid">
          {publicCourses.map((course) => (
            <article className="card" key={course.slug} id={course.slug}>
              <h3>{course.title[locale]}</h3>
              <p>{course.subtitle[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>{t.course}</h2>
        <div className="list">
          {introductoryCourse.map((module) => (
            <article className="item" key={module.id} id={module.id}>
              <p className="meta">{String(module.order).padStart(2, '0')} · {module.status}</p>
              <h2>{module.title[locale]}</h2>
              <p>{module.summary[locale]}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
