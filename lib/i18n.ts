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
      'Diese Seite ist eine Fassade über dem KUEPER Knowledge Graph. Sie zeigt Kurse, Begriffe und Dokumentverweise, besitzt aber keine eigene fachliche Wahrheit.',
    course: 'Einführungskurs',
    academy: 'Akademie',
    kgExplorer: 'KG-Explorer',
    concepts: 'Begriffe',
    documents: 'Dokumente',
    legal: 'Rechtliches',
    source: 'Quelle',
    status: 'Status',
    progress: 'Fortschritt',
    open: 'Öffnen',
    emptyDomain:
      'KD:KON:N1 ist im Knowledge Graph noch nicht vollständig registriert. Bis dahin zeigt das Portal nur Struktur und KG-Referenzen.',
    startCourse: 'Kurs öffnen',
    openExplorer: 'KG ansehen',
    openDocuments: 'Dokumente ansehen',
    legalNote:
      'Rechtliche Texte werden nicht lokal gepflegt. Diese Seite verweist auf die zuständigen KG-/Dokument-Records und rendert später deren freigegebene Volltexte.',
  },
  en: {
    eyebrow: 'Contracomology',
    title: 'Contracomology',
    subtitle: 'A multilingual learning and orientation portal.',
    legacyClaim: 'Where Bach meets the Big Bang.',
    claim:
      'This site is a facade over the KUEPER Knowledge Graph. It presents courses, concepts, and document references, but does not own domain truth.',
    course: 'Introductory course',
    academy: 'Academy',
    kgExplorer: 'KG explorer',
    concepts: 'Concepts',
    documents: 'Documents',
    legal: 'Legal',
    source: 'Source',
    status: 'Status',
    progress: 'Progress',
    open: 'Open',
    emptyDomain:
      'KD:KON:N1 is not fully registered in the Knowledge Graph yet. Until then, the portal shows structure and KG references only.',
    startCourse: 'Open course',
    openExplorer: 'Open KG',
    openDocuments: 'Open documents',
    legalNote:
      'Legal texts are not maintained locally. This page points to the responsible KG/document records and will later render their approved full text.',
  },
  ko: {
    eyebrow: 'Contracomology',
    title: 'Contracomology',
    subtitle: '다국어 학습 및 방향 설정 포털.',
    legacyClaim: '바흐가 빅뱅과 만나는 곳.',
    claim:
      '이 사이트는 KUEPER Knowledge Graph 위의 프론트엔드입니다. 강좌, 개념, 문서 참조를 보여 주지만 지식의 원본은 보유하지 않습니다.',
    course: '입문 과정',
    academy: '아카데미',
    kgExplorer: 'KG 탐색기',
    concepts: '개념',
    documents: '문서',
    legal: '법적 정보',
    source: '출처',
    status: '상태',
    progress: '진행률',
    open: '열기',
    emptyDomain:
      'KD:KON:N1은 아직 Knowledge Graph에 완전히 등록되지 않았습니다. 그 전까지 포털은 구조와 KG 참조만 표시합니다.',
    startCourse: '과정 열기',
    openExplorer: 'KG 열기',
    openDocuments: '문서 열기',
    legalNote:
      '법적 문구는 이 저장소에서 관리하지 않습니다. 이 페이지는 담당 KG/문서 레코드를 참조하며, 승인된 전문을 나중에 렌더링합니다.',
  },
} satisfies Record<Locale, Record<string, string>>;
