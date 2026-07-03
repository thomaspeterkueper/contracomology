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
      de: 'Grundlagen, Prinzipien und erste Orientierung.',
      en: 'Foundations, principles, and first orientation.',
      ko: '기초, 원리, 첫 방향 설정.',
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
      de: 'Erzaehlstimmen, Zeitformen und literarische Polyphonie.',
      en: 'Narrative voices, time forms, and literary polyphony.',
      ko: '서술의 목소리, 시간 형식, 문학적 폴리포니.',
    },
  },
  {
    slug: 'kontrakomologie-oem',
    origin: 'kurs/kontrakomologie-oem.html',
    title: {
      de: 'Das Omnizente Entfaltungsmodul',
      en: 'The Omnizedent Development Module',
      ko: 'Omnizedent 전개 모듈',
    },
    subtitle: {
      de: 'OEM als Arbeitsrahmen fuer Orientierung und Entwicklung.',
      en: 'OEM as a working frame for orientation and development.',
      ko: '방향 설정과 전개를 위한 작업 프레임으로서의 OEM.',
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
      de: 'Anwendung als Akademie- und Spielmodul.',
      en: 'Application as academy and game module.',
      ko: '아카데미 및 게임 모듈로서의 적용.',
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
    'Die Kontrakomologie ist eine theoretische und philosophische Erforschung von musikalischen Strukturen, Wirklichkeitsmustern und komplexen Systemen.',
  disclaimerEn:
    'Contracomology is a theoretical and philosophical exploration of musical structures, reality patterns, and complex systems.',
};
