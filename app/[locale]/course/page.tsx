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
          <p className="eyebrow">{t.course}</p>
          <h1>{t.academy}</h1>
          <p className="lede">{t.subtitle}</p>
        </div>
        <aside className="card">
          <p>{locale === 'de'
            ? 'Die Kursoberfläche folgt ausschließlich den im Knowledge Graph freigegebenen Domänen und Begriffen.'
            : locale === 'en'
              ? 'The course surface follows only domains and concepts released in the Knowledge Graph.'
              : '과정 화면은 Knowledge Graph에 공개된 도메인과 개념만 따릅니다.'}</p>
        </aside>
      </section>

      <section>
        <h2>{locale === 'de' ? 'Domänen' : locale === 'en' ? 'Domains' : '도메인'}</h2>
        <div className="list">
          {domains.length ? domains.map((domain) => (
            <article className="item" key={domain.id}>
              <p className="meta">{domain.id} · {domain.level}</p>
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
              <p className="meta">{concept.id}{concept.layer ? ` · ${concept.layer}` : ''}</p>
              <h2>{concept.name || concept.id}</h2>
            </article>
          )) : <p className="empty">{t.emptyDomain}</p>}
        </div>
      </section>
    </main>
  );
}
