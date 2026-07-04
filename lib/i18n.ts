export const locales = ['de', 'en', 'ko'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'de';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localeLabel(locale: Locale): string {
  return { de: 'Deutsch', en: 'English', ko: '한국어' }[locale];
}

export const ui = {
  de: {
    eyebrow: 'Analytisches Framework · Musiktheorie · Literatur',
    title: 'Kontrakomologie',
    subtitle: 'Analytische Methode zur Beschreibung von Zeitstrukturen in Musik und Literatur.',
    claim:
      'Die Kontrakomologie beschreibt, wie Werke Zeit erzeugen — nicht in welcher Zeit sie existieren. Sie entwickelt ein präzises Vokabular für Zeitstrukturen in Musik und Literatur.',
    kgLede: 'Begriffe und Domänen aus dem Knowledge Graph — nur Einträge, die vom Kurator freigegeben sind.',
    docsLede: 'Analysen und Texte aus dem Archiv — Volltext liegt in OTA und kueper.com.',
    course: 'Einführungskurs',
    academy: 'Akademie',
    kgExplorer: 'Begriffe',
    concepts: 'Begriffe',
    documents: 'Bibliothek',
    legal: 'Rechtliches',
    source: 'Quelle',
    status: 'Status',
    progress: 'Fortschritt',
    open: 'Öffnen',
    emptyDomain:
      'Diese Inhalte werden vorbereitet und erscheinen, sobald sie redaktionell freigegeben sind.',
    startCourse: 'Kurs öffnen',
    openExplorer: 'Begriffe ansehen',
    openDocuments: 'Bibliothek öffnen',
    legalNote:
      'Rechtliche Angaben zu Anbieter, Kontakt und Datenschutzhinweisen.',
  },
  en: {
    eyebrow: 'Analytical Framework · Music Theory · Literature',
    title: 'Contracomology',
    subtitle: 'Analytical method for describing time structures in music and literature.',
    claim:
      'Contracomology describes how works generate time — not in what time they exist. It develops a precise vocabulary for time structures in music and literature.',
    kgLede: 'Concepts and domains from the Knowledge Graph — only entries released by the curator.',
    docsLede: 'Analyses and texts from the archive — full text resides in OTA and kueper.com.',
    course: 'Introductory course',
    academy: 'Academy',
    kgExplorer: 'Concepts',
    concepts: 'Concepts',
    documents: 'Library',
    legal: 'Legal',
    source: 'Source',
    status: 'Status',
    progress: 'Progress',
    open: 'Open',
    emptyDomain:
      'These contents are being prepared and will appear after editorial release.',
    startCourse: 'Open course',
    openExplorer: 'Open concepts',
    openDocuments: 'Open library',
    legalNote:
      'Legal information about provider, contact, and privacy notes.',
  },
  ko: {
    eyebrow: '분석 프레임워크 · 음악 이론 · 문학',
    title: 'Contracomology',
    subtitle: '음악과 문학의 시간 구조를 기술하는 분석적 방법론.',
    claim:
      'Contracomology는 작품이 어떻게 시간을 생성하는지를 기술합니다. 음악과 문학의 시간 구조를 위한 정밀한 어휘를 발전시킵니다.',
    kgLede: '지식 그래프의 개념 및 도메인 — 큐레이터가 승인한 항목만 표시됩니다.',
    docsLede: '아카이브의 분석 및 텍스트 — 전문은 OTA 및 kueper.com에 있습니다.',
    course: '입문 과정',
    academy: '아카데미',
    kgExplorer: '개념',
    concepts: '개념',
    documents: '라이브러리',
    legal: '법적 정보',
    source: '출처',
    status: '상태',
    progress: '진행률',
    open: '열기',
    emptyDomain:
      '이 콘텐츠는 준비 중이며 편집 승인 후 표시됩니다.',
    startCourse: '과정 열기',
    openExplorer: '개념 열기',
    openDocuments: '라이브러리 열기',
    legalNote:
      '제공자, 연락처 및 개인정보 관련 법적 정보.',
  },
} satisfies Record<Locale, Record<string, string>>;
