# KG.KON-000014 - UI-Text vs. Fachinhalt sauber abgrenzen

Ziel: `SYS:KUEPER:contracomology`
Status: offen
Erstellt: 2026-09-09
Prioritaet: niedrig

## Kontext

Nach Entfernung lokaler Kurs- und Paradigmeninhalte verbleiben in `lib/i18n.ts` sowie einzelnen Seiten UI-Texte, Claims und Navigationsbeschriftungen. Diese duerfen lokal bleiben, solange sie keine kanonischen Fachdefinitionen oder fachliche Systemwahrheit erzeugen.

## Anforderung

Bei der naechsten Inhaltsrunde die Grenze dokumentieren:

- lokal erlaubt: Navigation, Bedienhinweise, UI-Labels, neutrale Portalbeschreibung;
- extern autoritativ: Definitionen, Modelle, Paradigmen, Kursinhalte, Dokumentmetadaten, Legal-Inhalte.

## Zielzustand

Ein kurzer Consumer-Vertrag verhindert, dass fachlicher Kanon spaeter erneut versehentlich in UI-Dateien wandert.
