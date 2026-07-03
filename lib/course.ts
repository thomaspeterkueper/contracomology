import type { Locale } from './i18n';

export type CourseModule = {
  id: string;
  order: number;
  status: 'planned' | 'draft' | 'kg_pending';
  kgRefs: string[];
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
};

export const introductoryCourse: CourseModule[] = [
  {
    id: 'orientation',
    order: 1,
    status: 'draft',
    kgRefs: ['KD:KON:N1'],
    title: { de: 'Orientierung', en: 'Orientation', ko: '방향 설정' },
    summary: {
      de: 'Warum Menschen dieselbe Welt unterschiedlich ordnen und bewerten.',
      en: 'Why people structure and evaluate the same world differently.',
      ko: '사람들이 같은 세계를 다르게 구조화하고 평가하는 이유.',
    },
  },
  {
    id: 'zeitform',
    order: 2,
    status: 'kg_pending',
    kgRefs: ['CON:L1:zeitform'],
    title: { de: 'Zeitform', en: 'Time form', ko: '시간 형식' },
    summary: {
      de: 'Wie Vergangenheit, Gegenwart und Zukunft in einem Denkrahmen angeordnet werden.',
      en: 'How past, present, and future are arranged within a frame of thought.',
      ko: '사고의 틀 안에서 과거, 현재, 미래가 배열되는 방식.',
    },
  },
  {
    id: 'avi-punkt',
    order: 3,
    status: 'kg_pending',
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
    order: 4,
    status: 'kg_pending',
    kgRefs: ['CON:L1:oem'],
    title: { de: 'OEM', en: 'OEM', ko: 'OEM' },
    summary: {
      de: 'Orientierungs- und Erkenntnismodell als Arbeitsrahmen.',
      en: 'Orientation and epistemic model as a working frame.',
      ko: '작업 프레임으로서의 방향 설정 및 인식 모델.',
    },
  },
  {
    id: 'paradigms',
    order: 5,
    status: 'kg_pending',
    kgRefs: ['CON:L1:paradigma-1', 'CON:L1:paradigma-2', 'CON:L1:paradigma-3'],
    title: { de: 'Drei Paradigmen', en: 'Three paradigms', ko: '세 가지 패러다임' },
    summary: {
      de: 'Objekt-, Beziehungs- und Transformationssicht als Kursachse.',
      en: 'Object, relation, and transformation views as the course axis.',
      ko: '대상, 관계, 변형 관점을 과정의 축으로 이해하기.',
    },
  },
];
