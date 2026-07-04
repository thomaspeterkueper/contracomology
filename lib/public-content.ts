import type { Locale } from './i18n';

export type PublicCourse = {
  slug: string;
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  origin: string;
};

export const publicCourses: PublicCourse[] = [
  {
    slug: 'kontrakomologie-kurs',
    origin: 'kurs/kontrakomologie-kurs.html',
    title: {
      de: 'Einführung in die Kontrakomologie',
      en: 'Introduction to Contracomology',
      ko: 'Contracomology 입문',
    },
    subtitle: {
      de: 'Drei Stufen: Denkweise, Begriffe, Terminologie. Zeitformen, Interferenz, kontrapunktische Koexistenz.',
      en: 'Three levels: approach, concepts, terminology. Time forms, interference, contrapuntal coexistence.',
      ko: '세 단계: 사고방식, 개념, 용어. 시간 형식, 간섭, 대위법적 공존.',
    },
  },
  {
    slug: 'kontrakomologie-literatur',
    origin: 'kurs/kontrakomologie-literatur.html',
    title: {
      de: 'Kontrakomologie und Literatur',
      en: 'Contracomology and Literature',
      ko: 'Contracomology와 문학',
    },
    subtitle: {
      de: 'Zeitformen im Text, Figurenstimmen als Kontrapunkt, OEM und Phasenübergang in Erzählstrukturen.',
      en: 'Time forms in text, character voices as counterpoint, OEM and phase transition in narrative structures.',
      ko: '텍스트의 시간 형식, 대위법적 인물 목소리, 서사 구조의 OEM과 위상 전환.',
    },
  },
  {
    slug: 'kontrakomologie-oem',
    origin: 'kurs/kontrakomologie-oem.html',
    title: {
      de: 'Das Omnizedente Entfaltungsmodul',
      en: 'The Omnizedent Unfolding Module',
      ko: 'Omnizedente 전개 모듈',
    },
    subtitle: {
      de: 'OEM, AVI-Zyklus und Phasenübergang — strukturelle Transformation in Musik und Literatur.',
      en: 'OEM, AVI cycle and phase transition — structural transformation in music and literature.',
      ko: 'OEM, AVI 사이클과 위상 전환 — 음악과 문학의 구조적 변환.',
    },
  },
  {
    slug: 'kontrakomologie-nox',
    origin: 'kurs/kontrakomologie-nox.html',
    title: {
      de: 'Kontrakomologie in NOX',
      en: 'Contracomology in NOX',
      ko: 'NOX 속 Contracomology',
    },
    subtitle: {
      de: 'Kontrakomologie als operative Kompetenz: Zeitdichte auf Transferrouten, stehende Innenzeit, Die Große Stille als Phasenübergang.',
      en: 'Contracomology as operative competence: time density on transfer routes, standing inner time, The Great Silence as phase transition.',
      ko: '운용 역량으로서의 Contracomology: 이동 경로의 시간 밀도, 정체된 내부 시간, 위상 전환으로서의 대침묵.',
    },
  },
];

export const legacyPrinciples = [
  'Simultane Polyphonie',
  'Komplexe Einfachheit',
  'Plastische Zeit',
  'Kreative Unvollendung',
  'Kontrapunktisches Bewusstsein',
];

export const legalInfo = {
  responsible: 'Thomas Peter Küper',
  address: 'Mörfelder Landstraße 103, 60598 Frankfurt am Main, Germany',
  email: 'mail@thomas-kueper.de',
  disclaimerDe:
    'Die Kontrakomologie ist ein analytisches Framework zur Beschreibung von Zeitstrukturen in Musik und Literatur. Sie ist ein vom Kurator gesetzter Wissenschaftszweig — Theorie, keine empirische Forschung, keine externe Begutachtung.',
  disclaimerEn:
    'Contracomology is an analytical framework for describing time structures in music and literature. It is a theoretical discipline established by its curator — theory, not empirical research, not externally peer-reviewed.',
};
