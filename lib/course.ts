import type { Locale } from './i18n';

export type CourseModule = {
  id: string;
  order: number;
  status: 'planned' | 'draft' | 'kg_pending';
  progress: number;
  kgRefs: string[];
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
};

export const introductoryCourse: CourseModule[] = [
  {
    id: 'orientation',
    order: 1,
    status: 'draft',
    progress: 35,
    kgRefs: ['KD:KON:N1'],
    title: { de: 'Orientierung', en: 'Orientation', ko: '방향 설정' },
    summary: {
      de: 'Warum Menschen dieselbe Welt unterschiedlich ordnen und bewerten.',
      en: 'Why people structure and evaluate the same world differently.',
      ko: '사람들이 같은 세계를 다르게 구조화하고 평가하는 이유.',
    },
  },
  {
    id: 'polyphony',
    order: 2,
    status: 'draft',
    progress: 25,
    kgRefs: ['LEGACY:simultane-polyphonie'],
    title: { de: 'Simultane Polyphonie', en: 'Simultaneous polyphony', ko: '동시적 폴리포니' },
    summary: {
      de: 'Mehrere Linien koennen gleichzeitig bestehen, ohne auf eine einzige Stimme reduziert zu werden.',
      en: 'Several lines can coexist without being reduced to one voice.',
      ko: '여러 선이 하나의 목소리로 환원되지 않고 동시에 존재할 수 있다.',
    },
  },
  {
    id: 'complex-simplicity',
    order: 3,
    status: 'draft',
    progress: 20,
    kgRefs: ['LEGACY:komplexe-einfachheit'],
    title: { de: 'Komplexe Einfachheit', en: 'Complex simplicity', ko: '복합적 단순성' },
    summary: {
      de: 'Einfache Motive entfalten komplexe Ordnungen, wenn sie in Beziehung gesetzt werden.',
      en: 'Simple motifs unfold complex orders when placed into relation.',
      ko: '단순한 동기는 관계 속에서 복잡한 질서를 펼친다.',
    },
  },
  {
    id: 'plastic-time',
    order: 4,
    status: 'kg_pending',
    progress: 10,
    kgRefs: ['CON:L1:zeitform'],
    title: { de: 'Plastische Zeit', en: 'Plastic time', ko: '가소적 시간' },
    summary: {
      de: 'Zeit wird nicht nur gemessen, sondern in Denkrahmen geformt und unterschiedlich erlebbar.',
      en: 'Time is not only measured; it is shaped within frames of thought and experienced differently.',
      ko: '시간은 측정될 뿐 아니라 사고의 틀 안에서 형성되고 다르게 경험된다.',
    },
  },
  {
    id: 'unfinished',
    order: 5,
    status: 'draft',
    progress: 15,
    kgRefs: ['LEGACY:kreative-unvollendung'],
    title: { de: 'Kreative Unvollendung', en: 'Creative incompletion', ko: '창조적 미완성' },
    summary: {
      de: 'Unvollstaendigkeit wird als Oeffnung fuer Entwicklung und Antwort betrachtet.',
      en: 'Incompletion is treated as an opening for development and response.',
      ko: '미완성은 발전과 응답을 여는 구조로 다루어진다.',
    },
  },
  {
    id: 'counterpoint-awareness',
    order: 6,
    status: 'draft',
    progress: 15,
    kgRefs: ['LEGACY:kontrapunktisches-bewusstsein'],
    title: { de: 'Kontrapunktisches Bewusstsein', en: 'Contrapuntal awareness', ko: '대위법적 인식' },
    summary: {
      de: 'Gegensaetze werden sichtbar gehalten, statt sie vorschnell auf eine Loesung zu reduzieren.',
      en: 'Opposites are kept visible instead of being reduced too quickly to one solution.',
      ko: '대립은 하나의 해답으로 성급히 환원되지 않고 보이는 상태로 유지된다.',
    },
  },
  {
    id: 'avi-punkt',
    order: 7,
    status: 'kg_pending',
    progress: 5,
    kgRefs: ['CON:L1:avi-punkt'],
    title: { de: 'AVI-Punkt', en: 'AVI point', ko: 'AVI 지점' },
    summary: {
      de: 'Beobachtung, Interpretation und Orientierung an einem Bezugspunkt.',
      en: 'Observation, interpretation, and orientation at one reference point.',
      ko: '하나의 기준점에서 이루어지는 관찰, 해석, 방향 설정.',
    },
  },
  {
    id: 'oem',
    order: 8,
    status: 'kg_pending',
    progress: 5,
    kgRefs: ['CON:L1:oem'],
    title: { de: 'Omnizedentes Entfaltungsmodul', en: 'Omnizedent Unfolding Module', ko: 'Omnizedente 전개 모듈' },
    summary: {
      de: 'Strukturelle Einheit, die einen vollständigen Transformationsprozess durchläuft — von der Offenheit durch den Phasenübergang bis zur veränderten Offenheit. Kein Zustand, sondern ein Prozess.',
      en: 'Structural unit that undergoes a complete transformation process — from openness through the phase transition to an altered openness. Not a state, but a process.',
      ko: '완전한 변환 과정을 거치는 구조적 단위 — 개방성에서 위상 전환을 통해 변화된 개방성으로. 상태가 아니라 과정.',
    },
  },
  {
    id: 'paradigms',
    order: 9,
    status: 'kg_pending',
    progress: 5,
    kgRefs: ['CON:L1:paradigma-1', 'CON:L1:paradigma-2', 'CON:L1:paradigma-3'],
    title: { de: 'Drei Paradigmen', en: 'Three paradigms', ko: '세 가지 패러다임' },
    summary: {
      de: 'Objekt-, Beziehungs- und Transformationssicht als Kursachse.',
      en: 'Object, relation, and transformation views as the course axis.',
      ko: '대상, 관계, 변형 관점을 과정의 축으로 이해하기.',
    },
  },
];

export function totalCourseProgress(): number {
  const sum = introductoryCourse.reduce((acc, module) => acc + module.progress, 0);
  return Math.round(sum / introductoryCourse.length);
}
