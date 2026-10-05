import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, localeLabel, locales, type Locale, ui } from '@/lib/i18n';

const de = {
  foundations: [
    ['Kontrakomologisches Komponieren','Prinzipien einer Praxis','Die Kontrakomologie ist keine Analysetechnik, die nachträglich auf Musik angewendet wird. Sie ist eine Haltung zum Klingen – aus der heraus Musik entstehen kann.'],
    ['Zeitformen der Kontrakomologie','Ein Systemtext','Mehrere Zeitformen, aus Werken heraus beschrieben: nicht als starre Kategorien, sondern als Ergebnis genauen Hörens.'],
    ['Systemmatrix der Kontrakomologie','Zeitformen × Mittel × Hörkriterien','Eine Orientierung zwischen Zeitformen, ihren musikalischen Trägern und der jeweils passenden Hörweise.'],
    ['Kontrakomologische Diagnosefragen','Ein Analysewerkzeug','Fragen, mit denen sich neue Werke untersuchen lassen. Kein Werk muss alle beantworten; eine hörbar gewordene Frage kann genügen.'],
    ['Kontrakomologisch lesen','Prinzipien einer Praxis','Die Fragen der Kontrakomologie gelten auch dort, wo keine Note erklingt – an Sätzen, Figuren und der Zeitstruktur eines Romans.'],
  ],
  analyses: [
    ['Klassik','Vier Stimmen, keine Hauptrolle','Johann Sebastian Bach – Die Kunst der Fuge BWV 1080','Mehrere Stimmen gleichzeitig, jede nach ihrer eigenen inneren Logik. Keine ist bloße Begleitung: kontrapunktische Koexistenz als Partitur.'],
    ['Klassik','Das umgekehrte Werk','Ludwig van Beethoven – Mondscheinsonate op. 27 Nr. 2','Erst der dritte Satz verändert, was im ersten hörbar war. Das Werk wird rückwirkend neu lesbar.'],
    ['Klassik','Die Schönheit als Ahnung des Verlustes','Frédéric Chopin – 4. Ballade f-Moll op. 52','Der Schluss verändert die lyrische Schönheit des Anfangs. Ein Beispiel bidirektionaler Zeitarchitektur.'],
    ['Jazz','Zeit, die nicht gegeben ist','Miles Davis – Kind of Blue','Zeit als Offenheit: Der nächste musikalische Schritt entsteht im Spielen statt aus einem vollständig vorgeschriebenen Ziel.'],
    ['Jazz','Das Innehalten als Form','Bill Evans – Waltz for Debby / Peace Piece','Pause und Nachklang sind nicht Abwesenheit, sondern tragen selbst Zeit.'],
    ['Jazz','Die vollständige Reise','John Coltrane – A Love Supreme','Vier Teile als gerichtete Bewegung, deren Ende den zurückgelegten Weg rückwirkend als zusammenhängende Form erkennen lässt.'],
    ['Klangkunst','Der Raum spricht zurück','Alvin Lucier – I Am Sitting in a Room','Das Ausgangsmaterial verändert sich iterativ, bis die Resonanz des Raums selbst hervortritt: Transformationszeit.'],
    ['Minimal Music','Bewegung ohne Ziel','Steve Reich – Music for 18 Musicians','Ununterbrochene Veränderung ohne klassisches Ziel: Zeit als Pulsfluss und Zustand.'],
    ['Literatur','Mehrschichtige Gegenwart','Nalgae','Eine Figur kann in mehreren Zeitschichten zugleich leben, ohne dass eine die andere erklärt. Kontrapunktisches Lesen an Prosa.'],
  ]
};

export default async function DocumentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const t = ui[locale];
  const german = locale === 'de';

  return <main className="shell">
    <header className="topbar">
      <Link className="brand" href={`/${locale}`}>Contracomology</Link>
      <nav className="nav"><Link href={`/${locale}/course`}>{t.course}</Link><Link href={`/${locale}/kg`}>{t.kg}</Link><span className="langs">{locales.map(l => <Link className={`pill ${l === locale ? 'active' : ''}`} key={l} href={`/${l}/documents`}>{localeLabel(l)}</Link>)}</span></nav>
    </header>
    <section className="hero"><p className="eyebrow">{german ? 'Texte & Werke' : 'Texts & works'}</p><h1>{german ? 'Publikationen' : 'Publications'}</h1><p className="lede">{german ? 'Grundlagen, Analysen und eigene Arbeiten der Kontrakomologie.' : 'Foundations, analyses and original work in Contracomology.'}</p></section>
    {german ? <>
      <section className="library-section"><p className="section-label">Grundlagen</p><h2>Verfahren und Werkzeuge</h2><div className="publication-grid">{de.foundations.map(([title,sub,desc])=><article className="publication-card" key={title}><span className="publication-kind">Grundlagen</span><h3>{title}</h3><p className="publication-subtitle">{sub}</p><p>{desc}</p></article>)}</div></section>
      <section className="library-section"><p className="section-label">Analysen</p><h2>Werke kontrakomologisch gehört und gelesen</h2><div className="publication-grid">{de.analyses.map(([kind,title,work,desc])=><article className="publication-card" key={title}><span className="publication-kind">{kind}</span><h3>{title}</h3><p className="publication-subtitle">{work}</p><p>{desc}</p></article>)}</div></section>
      <section className="library-section original-work"><p className="section-label">Eigene Werke</p><h2>Kontrakomologie als Praxis</h2><p className="section-lede">Hier entsteht der Bereich für eigene Musik und Literatur, an denen kontrakomologische Verfahren nicht nur analysiert, sondern praktisch erprobt werden. Die Werke werden mit Werktext, Hör- oder Lesehinweisen und ihrer jeweiligen Zeitarchitektur vorgestellt.</p></section>
    </> : <section className="library-section"><p className="section-lede">The expanded publication catalogue is currently available in German. English and Korean editions will follow as editorial translations.</p></section>}
    <footer className="subpage-footer"><div className="footer-links"><Link href={`/${locale}/legal/imprint`}>{german?'Impressum':'Imprint'}</Link><Link href={`/${locale}/legal/privacy`}>{german?'Datenschutz':'Privacy'}</Link><Link href={`/${locale}/legal/terms`}>{german?'Nutzungsbedingungen':'Terms'}</Link><Link href={`/${locale}/legal/ai-transparency`}>{german?'KI-Transparenz':'AI transparency'}</Link><a href="https://www.thomas-kueper.de/" rel="external">Thomas Peter Küper</a></div><p>© 2026 Thomas Peter Küper</p></footer>
  </main>;
}
