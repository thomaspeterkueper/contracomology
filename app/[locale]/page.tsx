import Link from 'next/link';
import { notFound } from 'next/navigation';
import { publicCourses, legacyPrinciples } from '@/lib/public-content';
import { isLocale, localeLabel, locales, type Locale, ui } from '@/lib/i18n';

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const t = ui[locale];

  return (
    <main className="shell">
      <header className="topbar">
        <Link className="brand" href={`/${locale}`}>Contracomology</Link>
        <nav className="nav">
          <Link href={`/${locale}/course`}>{t.course}</Link>
          <Link href={`/${locale}/kg`}>{t.concepts}</Link>
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
          <h1>{t.title}</h1>
          <p className="lede">{t.legacyClaim}</p>
          <p className="lede">{t.claim}</p>
        </div>
        <aside className="card">
          <p className="eyebrow">Academy</p>
          <p>Eine Akademie fuer kontrapunktisches Denken: Musik, Zeit, Wirklichkeit, Literatur, Spiel und Orientierung.</p>
          <Link className="cta" href={`/${locale}/course`}>{t.startCourse}</Link>{' '}
          <Link className="cta" href={`/${locale}/documents`}>{t.openDocuments}</Link>
        </aside>
      </section>

      <section>
        <h2>Die fuenf Prinzipien</h2>
        <div className="grid">
          {legacyPrinciples.map((principle) => (
            <article className="card" key={principle}>
              <h3>{principle}</h3>
              <p>Ein Grundmotiv der Kontrakomologie, das im Kurs weiter entfaltet wird.</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>{t.academy}</h2>
        <div className="grid">
          {publicCourses.map((course) => (
            <article className="card" key={course.slug}>
              <p className="meta">{course.origin}</p>
              <h3>{course.title[locale]}</h3>
              <p>{course.subtitle[locale]}</p>
              <Link className="cta" href={`/${locale}/course#${course.slug}`}>{t.open}</Link>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Die drei Meister</h2>
        <div className="grid">
          <article className="card"><h3>Johann Sebastian Bach</h3><p>Mathematischer Kontrapunkt und die Kunst der Fuge.</p></article>
          <article className="card"><h3>Richard Wagner</h3><p>Leitmotive, grosse Zeitraeume und musikalische Kosmologie.</p></article>
          <article className="card"><h3>Ludwig van Beethoven</h3><p>Entwicklung, Transformation und spaete Verdichtung.</p></article>
        </div>
      </section>

      <footer>
        <Link href={`/${locale}/legal/imprint`}>Impressum</Link> · <Link href={`/${locale}/legal/privacy`}>Datenschutz</Link>
      </footer>
    </main>
  );
}
