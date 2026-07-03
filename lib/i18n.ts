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
    eyebrow: 'Contracomology',
    title: 'Kontrakomologie',
    subtitle: 'Ein mehrsprachiges Lern- und Orientierungsportal.',
    legacyClaim: 'Wo Bach den Urknall trifft.',
    claim:
      'Die Kontrakomologie erkundet die kontrapunktische Struktur von Wirklichkeit, Denken, Zeit, Musik und Orientierung.',
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
    eyebrow: 'Contracomology',
    title: 'Contracomology',
    subtitle: 'A multilingual learning and orientation portal.',
    legacyClaim: 'Where Bach meets the Big Bang.',
    claim:
      'Contracomology explores the contrapuntal structure of reality, thought, time, music, and orientation.',
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
    eyebrow: 'Contracomology',
    title: 'Contracomology',
    subtitle: '다국어 학습 및 방향 설정 포털.',
    legacyClaim: '바흐가 빅뱅과 만나는 곳.',
    claim:
      'Contracomology는 현실, 사고, 시간, 음악, 방향 설정의 대위법적 구조를 탐구합니다.',
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
