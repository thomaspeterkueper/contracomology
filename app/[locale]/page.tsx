import Link from 'next/link';
import { notFound } from 'next/navigation';
import { publicCourses } from '@/lib/public-content';
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
          <p className="lede">{t.claim}</p>
        </div>
        <aside className="card">
          <p className="eyebrow">{t.academy}</p>
          <p>{t.subtitle}</p>
          <Link className="cta" href={`/${locale}/course`}>{t.startCourse}</Link>{' '}
          <Link className="cta" href={`/${locale}/documents`}>{t.openDocuments}</Link>
        </aside>
      </section>

      <section>
        <h2>{t.academy}</h2>
        <div className="grid">
          {publicCourses.map((course) => (
            <article className="card" key={course.slug}>
              <h3>{course.title[locale]}</h3>
              <p>{course.subtitle[locale]}</p>
              <Link className="cta" href={`/${locale}/course#${course.slug}`}>{t.open}</Link>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>{locale === 'de' ? 'Drei Paradigmata' : locale === 'en' ? 'Three Paradigms' : '세 가지 패러다임'}</h2>
        <div className="grid">
          <article className="card">
            <p className="meta">{locale === 'de' ? 'Objektiv-strukturell' : locale === 'en' ? 'Objective-structural' : '객관적-구조적'}</p>
            <h3>Bach</h3>
            <p>{locale === 'de' ? 'Mehrere vollständige Stimmen, gleichzeitig, gleichwertig. Zeitarchitektur ohne subjektives Zentrum.' : locale === 'en' ? 'Multiple complete voices, simultaneous, equal. Time architecture without a subjective centre.' : '동시에 존재하는 여러 완전한 목소리들. 주관적 중심 없는 시간 구조.'}</p>
          </article>
          <article className="card">
            <p className="meta">{locale === 'de' ? 'Psychologisch-persönlich' : locale === 'en' ? 'Psychological-personal' : '심리적-개인적'}</p>
            <h3>Chopin</h3>
            <p>{locale === 'de' ? 'Asymmetrische innere Vielstimmigkeit. Eine Stimme trägt die Hauptlast. Zeitarchitektur einer einzelnen Seele.' : locale === 'en' ? 'Asymmetric inner polyphony. One voice carries the main weight. The time architecture of a single soul.' : '비대칭적 내적 다성성. 하나의 목소리가 주된 무게를 담당한다.'}</p>
          </article>
          <article className="card">
            <p className="meta">{locale === 'de' ? 'Kosmisch-mythologisch' : locale === 'en' ? 'Cosmic-mythological' : '우주적-신화적'}</p>
            <h3>Wagner</h3>
            <p>{locale === 'de' ? 'Zyklen von Aufbau und Kollaps über bis zu 15 Stunden. Leitmotive als vollständige Transformationsprozesse.' : locale === 'en' ? 'Cycles of construction and collapse over up to 15 hours. Leitmotifs as complete transformation processes.' : '최대 15시간에 걸친 구성과 붕괴의 순환. 완전한 변환 과정으로서의 라이트모티프.'}</p>
          </article>
        </div>
      </section>

      <footer>
        <Link href={`/${locale}/legal/imprint`}>Impressum</Link> · <Link href={`/${locale}/legal/privacy`}>Datenschutz</Link>
      </footer>
    </main>
  );
}
