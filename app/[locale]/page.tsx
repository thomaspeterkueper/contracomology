import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContracomologyConcepts, getContracomologyDomains } from '@/lib/kg';
import { isLocale, localeLabel, locales, type Locale, ui } from '@/lib/i18n';

export const revalidate = 3600;

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
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
        <h2>{locale === 'de' ? 'Knowledge Graph' : locale === 'en' ? 'Knowledge Graph' : 'Knowledge Graph'}</h2>
        <div className="grid">
          <article className="card">
            <p className="meta">{locale === 'de' ? 'Domänen' : locale === 'en' ? 'Domains' : '도메인'}</p>
            <h3>{domains.length}</h3>
            <p>{locale === 'de' ? 'Im KG für Kontrakomologie verfügbare Wissensdomänen.' : locale === 'en' ? 'Knowledge domains currently available for Contracomology in the KG.' : 'KG에서 Contracomology에 사용할 수 있는 지식 도메인입니다.'}</p>
            <Link className="cta" href={`/${locale}/kg`}>{t.open}</Link>
          </article>
          <article className="card">
            <p className="meta">{t.concepts}</p>
            <h3>{concepts.length}</h3>
            <p>{locale === 'de' ? 'Freigegebene Begriffe werden direkt aus dem Knowledge Graph angezeigt.' : locale === 'en' ? 'Released concepts are displayed directly from the Knowledge Graph.' : '공개된 개념은 Knowledge Graph에서 직접 표시됩니다.'}</p>
            <Link className="cta" href={`/${locale}/kg`}>{t.open}</Link>
          </article>
          <article className="card">
            <p className="meta">{t.documents}</p>
            <h3>SSOT</h3>
            <p>{locale === 'de' ? 'Fachtexte bleiben in ihren kanonischen Archiven; dieses Portal ist nur die Fassade.' : locale === 'en' ? 'Subject texts remain in their canonical archives; this portal is only the facade.' : '전문 텍스트는 정식 아카이브에 남고 이 포털은 표시 계층만 담당합니다.'}</p>
            <Link className="cta" href={`/${locale}/documents`}>{t.openDocuments}</Link>
          </article>
        </div>
      </section>

      <footer>
        <Link href={`/${locale}/legal/imprint`}>Impressum</Link> · <Link href={`/${locale}/legal/privacy`}>Datenschutz</Link> · <Link href={`/${locale}/legal/ai-transparency`}>KI-Transparenz</Link>
      </footer>
    </main>
  );
}
