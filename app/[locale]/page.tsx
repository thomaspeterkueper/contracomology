import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, localeLabel, locales, type Locale, ui } from '@/lib/i18n';

const copy = {
  de: {
    kicker: 'Zeit im Werk · Musik · Literatur',
    lead: 'Musik ist nicht in der Zeit. Musik erzeugt Zeit.',
    intro: 'Kontrakomologie fragt, was ein Werk mit Zeit tut, während wir es hören oder lesen: Was geschieht gleichzeitig? Was bleibt offen? Was verändert das Ende rückwirkend am Anfang?',
    methodTitle: 'Eine Methode des genauen Hörens und Lesens',
    method: 'Nicht das Modell steht am Anfang, sondern das Werk. Die Theorie folgt dem Material. Sie beschreibt Zeitformen, Koexistenz, Richtung, Nachklang und rückwirkende Bedeutungsbildung, ohne ein Werk auf eine einzige Erklärung zu reduzieren.',
    paths: [
      ['Gleichzeitigkeit', 'Mehrere Stimmen, Zeitebenen oder Wahrheiten können gleichzeitig bestehen, ohne dass eine die andere auflöst.'],
      ['Zeitformen', 'Werke erzeugen unterschiedliche Arten von Zeit: strukturelle Gleichzeitigkeit, Offenzeit, Resonanzzeit, gerichtete oder transformierende Zeit.'],
      ['Rückwirkung', 'Ein Ende kann verändern, wie ein Anfang gehört oder gelesen wird. Werkzeit läuft deshalb nicht notwendig nur in eine Richtung.'],
    ],
    practiceTitle: 'Wie man beginnt',
    practice: [
      ['Stimmen wahrnehmen', 'Welche Linien, Perspektiven, Erinnerungen oder Nachklänge sind gleichzeitig anwesend?'],
      ['Nicht vorschnell auflösen', 'Widersprüche dürfen als Struktur bestehen bleiben, statt sofort auf eine eindeutige Lesart reduziert zu werden.'],
      ['Rückwärts neu hören', 'Was weißt du am Ende, das den Anfang verändert? Was war dort bereits angelegt?'],
    ],
    examplesTitle: 'Ausgangspunkte',
    examples: [
      ['Bach', 'Strukturelle Gleichzeitigkeit: mehrere eigenständige Stimmen, gleichzeitig und ohne zentrale Führungsstimme.'],
      ['Coltrane', 'Gerichtete Zeit, deren Ende den zurückgelegten Weg rückwirkend als zusammenhängende Form erkennen lässt.'],
      ['Evans', 'Resonanzzeit: Ton, Pause und Nachklang tragen Zeit, statt sie nur zu füllen.'],
      ['Literatur', 'Sätze, Figuren und Erinnerungen können mehrere Zeiten und Bedeutungsebenen zugleich tragen.'],
    ],
    explore: 'Methode erkunden',
    read: 'Analysen & Texte',
  },
  en: {
    kicker: 'Time in the work · Music · Literature',
    lead: 'Music is not in time. Music creates time.',
    intro: 'Contracomology asks what a work does with time while we listen or read: What happens simultaneously? What remains open? How does an ending change the beginning in retrospect?',
    methodTitle: 'A method of close listening and reading',
    method: 'The work comes first, not the model. Theory follows the material. It describes forms of time, coexistence, direction, resonance and retrospective meaning without reducing a work to one explanation.',
    paths: [['Simultaneity','Several voices, temporal layers or truths can coexist without one dissolving the others.'],['Forms of time','Works create different kinds of time: structural simultaneity, open time, resonance, directed or transformative time.'],['Retrospection','An ending can change how a beginning is heard or read. A work’s time need not run in only one direction.']],
    practiceTitle: 'How to begin',
    practice: [['Hear the voices','Which lines, perspectives, memories or resonances are present at the same time?'],['Do not resolve too quickly','Contradictions may remain structural instead of being reduced immediately to a single reading.'],['Listen backwards','What do you know at the end that changes the beginning? What was already there?']],
    examplesTitle: 'Starting points',
    examples: [['Bach','Structural simultaneity: independent voices at once, without a single leading voice.'],['Coltrane','Directed time whose ending makes the path retrospectively legible as one form.'],['Evans','Resonance time: tone, pause and decay carry time rather than merely filling it.'],['Literature','Sentences, characters and memories can carry several times and layers of meaning at once.']],
    explore: 'Explore the method', read: 'Analyses & texts',
  },
  ko: {
    kicker: '작품 속 시간 · 음악 · 문학',
    lead: '음악은 시간 속에 있는 것이 아니라 시간을 만들어 냅니다.',
    intro: 'Contracomology는 우리가 듣고 읽는 동안 작품이 시간에 무엇을 하는지 묻습니다. 무엇이 동시에 일어나고, 무엇이 열린 채 남으며, 결말은 시작을 어떻게 다시 바꾸는가?',
    methodTitle: '정밀하게 듣고 읽는 방법',
    method: '출발점은 모델이 아니라 작품입니다. 이론은 재료를 따릅니다. 하나의 해석으로 작품을 축소하지 않고 시간 형식, 공존, 방향, 여운과 소급적 의미 형성을 기술합니다.',
    paths: [['동시성','여러 목소리와 시간층, 진실이 서로를 지우지 않은 채 동시에 존재할 수 있습니다.'],['시간 형식','작품은 구조적 동시성, 열린 시간, 공명, 방향성 또는 변형의 시간처럼 서로 다른 시간을 만듭니다.'],['소급성','결말은 시작을 듣고 읽는 방식을 바꿀 수 있습니다. 작품의 시간은 한 방향으로만 흐르지 않습니다.']],
    practiceTitle: '시작하는 법',
    practice: [['목소리 듣기','어떤 선율, 관점, 기억과 여운이 동시에 존재하는가?'],['서둘러 해소하지 않기','모순을 하나의 해석으로 즉시 줄이지 않고 구조로 남겨 둡니다.'],['뒤에서 다시 듣기','끝에서 알게 된 것이 시작을 어떻게 바꾸는가? 처음부터 무엇이 이미 있었는가?']],
    examplesTitle: '출발점',
    examples: [['Bach','구조적 동시성: 하나의 중심 없이 여러 독립적 목소리가 동시에 진행됩니다.'],['Coltrane','결말이 지나온 길을 하나의 형태로 다시 보이게 하는 방향성의 시간.'],['Evans','공명의 시간: 음, 쉼, 잔향 자체가 시간을 운반합니다.'],['문학','문장과 인물, 기억은 여러 시간과 의미층을 동시에 지닐 수 있습니다.']],
    explore: '방법 살펴보기', read: '분석과 글',
  },
} as const;

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const t = ui[locale];
  const c = copy[locale];

  return (
    <main>
      <header className="site-header">
        <div className="container nav-inner">
          <Link className="brand" href={`/${locale}`}>Kontrakomologie</Link>
          <nav className="nav">
            <a href="#about">{locale === 'de' ? 'Überblick' : locale === 'en' ? 'About' : '소개'}</a>
            <a href="#principles">{locale === 'de' ? 'Prinzipien' : locale === 'en' ? 'Principles' : '원리'}</a>
            <a href="#masters">{locale === 'de' ? 'Meister' : locale === 'en' ? 'Masters' : '거장'}</a>
            <Link href={`/${locale}/course`}>{locale === 'de' ? 'Anwendungen' : locale === 'en' ? 'Applications' : '응용'}</Link>
            <Link href={`/${locale}/kg`}>{locale === 'de' ? 'Forschung' : locale === 'en' ? 'Research' : '연구'}</Link>
            <Link href={`/${locale}/documents`}>{locale === 'de' ? 'Publikationen' : locale === 'en' ? 'Publications' : '출판'}</Link>
            <span className="langs">{locales.map((l) => <Link key={l} className={`lang ${l === locale ? 'active' : ''}`} href={`/${l}`}>{localeLabel(l)}</Link>)}</span>
          </nav>
        </div>
      </header>

      <section className="publication-hero" id="about">
        <div className="container narrow">
          <p className="eyebrow">{c.kicker}</p>
          <h1>Kontrakomologie</h1>
          <p className="hero-statement">{c.lead}</p>
          <p className="lede">{c.intro}</p>{locale === 'de' ? <p className="lede secondary-lede">Der Name kommt vom Kontrapunkt: Mehrere Stimmen verlaufen gleichzeitig, jede nach ihrer eigenen Logik. Kontrakomologie überträgt diese Beobachtung auf das Hören und Lesen: Wie viele Wahrheiten sind in einem Moment gleichzeitig wahr – und wie stehen sie zueinander?</p> : null}
          <div className="actions"><Link className="text-link" href={`/${locale}/course`}>{c.explore} →</Link><Link className="text-link" href={`/${locale}/documents`}>{c.read} →</Link></div>
        </div>
      </section>

      <section className="essay-section soft" id="principles">
        <div className="container narrow">
          <p className="section-label">{locale === 'de' ? 'Methode' : locale === 'en' ? 'Method' : '방법'}</p>
          <h2>{c.methodTitle}</h2><p className="section-lede">{c.method}</p>
          <div className="idea-grid">{c.paths.map(([title, body]) => <article className="idea-card" key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
        </div>
      </section>

      <section className="essay-section">
        <div className="container narrow">
          <p className="section-label">{locale === 'de' ? 'Praxis' : locale === 'en' ? 'Practice' : '실천'}</p>
          <h2>{c.practiceTitle}</h2>
          <div className="steps">{c.practice.map(([title, body], i) => <article className="step" key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
          <Link className="text-link" href={`/${locale}/course`}>{c.explore} →</Link>
        </div>
      </section>

      <section className="essay-section" id="timeforms"><div className="container narrow"><p className="section-label">{locale === 'de' ? 'Zeitformen' : locale === 'en' ? 'Forms of time' : '시간 형식'}</p><h2>{locale === 'de' ? 'Nicht verschiedene Tempi – verschiedene Arten, wie Zeit funktioniert.' : locale === 'en' ? 'Not different tempi – different ways time can work.' : '서로 다른 템포가 아니라, 시간이 작동하는 서로 다른 방식.'}</h2>{locale === 'de' ? <><p className="section-lede">Bach erzeugt strukturelle Gleichzeitigkeit. Davis erzeugt Offenzeit. Evans erzeugt Resonanzzeit. Lucier erzeugt Transformationszeit. Diese Formen sind keine Schubladen für Werke, sondern Beschreibungen dessen, was beim genauen Hören geschieht.</p><p className="section-lede">Ein Werk kann zudem beide Zeitrichtungen zugleich tragen: Das Ende verändert rückwirkend den Anfang, obwohl keine Note und kein Wort sich geändert hat.</p></> : null}</div></section>

      <section className="essay-section dark-section" id="masters">
        <div className="container">
          <p className="section-label">{c.examplesTitle}</p>
          <div className="example-grid">{c.examples.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
        </div>
      </section>

      <section className="essay-section"><div className="container narrow"><p className="section-label">{locale === 'de' ? 'Abgrenzung' : locale === 'en' ? 'Scope' : '범위'}</p><h2>{locale === 'de' ? 'Was Kontrakomologie nicht ist' : locale === 'en' ? 'What Contracomology is not' : 'Contracomology가 아닌 것'}</h2>{locale === 'de' ? <p className="section-lede">Sie behauptet nicht, dass Komponisten Physikmodelle vertont haben. Sie ist auch kein Werkzeug, das ein Werk erklärt und damit erledigt. Ausgangspunkt ist immer das Werk selbst: Die Theorie folgt dem Hören und Lesen.</p> : null}</div></section>

      <section className="author-section"><div className="container narrow"><p className="section-label">{locale === 'de' ? 'Autor' : locale === 'en' ? 'Author' : '저자'}</p><h2>Thomas Peter Küper</h2><p className="section-lede">{locale === 'de' ? 'Kontrakomologie ist Teil einer größeren Arbeit an Musik, Literatur, Wissenschaft und Ideen. Weitere Projekte und Texte finden sich auf der persönlichen Website.' : locale === 'en' ? 'Contracomology is part of a broader body of work across music, literature, science and ideas. Further projects and texts are available on the personal website.' : 'Contracomology는 음악, 문학, 과학과 아이디어를 아우르는 더 큰 작업의 일부입니다. 다른 프로젝트와 글은 개인 웹사이트에서 볼 수 있습니다.'}</p><a className="text-link" href="https://www.thomas-kueper.de/" rel="external">{locale === 'de' ? 'Zur Homepage' : locale === 'en' ? 'Personal website' : '개인 홈페이지'} →</a></div></section>

      <footer className="site-footer"><div className="container"><div className="footer-title">Kontrakomologie</div><div className="footer-links"><Link href={`/${locale}/legal/imprint`}>{locale === 'de' ? 'Impressum' : 'Imprint'}</Link><Link href={`/${locale}/legal/privacy`}>{locale === 'de' ? 'Datenschutz' : 'Privacy'}</Link><Link href={`/${locale}/legal/terms`}>{locale === 'de' ? 'Nutzungsbedingungen' : 'Terms'}</Link><Link href={`/${locale}/legal/ai-transparency`}>{locale === 'de' ? 'KI-Transparenz' : 'AI transparency'}</Link></div><p>© 2026 Thomas Peter Küper</p></div></footer>
    </main>
  );
}
