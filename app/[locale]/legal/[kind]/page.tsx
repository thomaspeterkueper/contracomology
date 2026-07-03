import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LEGAL_DOCUMENT_REFS, type LegalKind } from '@/lib/kg';
import { isLocale, type Locale, ui } from '@/lib/i18n';

const legalKinds = Object.keys(LEGAL_DOCUMENT_REFS) as LegalKind[];

export default async function LegalPage({ params }: { params: Promise<{ locale: string; kind: string }> }) {
  const { locale: rawLocale, kind } = await params;
  if (!isLocale(rawLocale) || !legalKinds.includes(kind as LegalKind)) notFound();
  const locale: Locale = rawLocale;
  const t = ui[locale];
  const ref = LEGAL_DOCUMENT_REFS[kind as LegalKind];

  return (
    <main className="shell">
      <header className="topbar">
        <Link className="brand" href={`/${locale}`}>Contracomology</Link>
        <nav className="nav">
          <Link href={`/${locale}/legal/imprint`}>Imprint</Link>
          <Link href={`/${locale}/legal/privacy`}>Privacy</Link>
          <Link href={`/${locale}/legal/terms`}>Terms</Link>
        </nav>
      </header>
      <section className="hero">
        <div>
          <p className="eyebrow">{t.legal}</p>
          <h1>{kind}</h1>
          <p className="lede">{t.legalNote}</p>
        </div>
        <aside className="card">
          <p className="meta">{t.source}</p>
          <p className="meta">{ref}</p>
          <p>Volltext wird aus dem zuständigen KG-/Archiv-Record aufgelöst, sobald der Record vorhanden ist.</p>
        </aside>
      </section>
    </main>
  );
}
