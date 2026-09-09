# KG.KON-000011 - KG: Archivauflösung systemgetrieben machen

Ziel: `SYS:KUEPER:knowledge-graph`
Status: offen
Erstellt: 2026-09-09
Prioritaet: mittel

## Befund

`contracomology/lib/kg.ts` ordnet Dokumente aktuell noch lokal bekannten Systemen (`SYS:KUEPER:ota`, `SYS:KUEPER:kueper-com`) und deren Anzeigenamen zu. Das ist technische Restschuld im Fassadenmodell.

## Anforderung

Pruefen, welche bestehenden System-/Relation-Records fuer die Aufloesung von Dokument-Owner, Volltext-Ziel und Anzeigename verwendet werden sollen. Falls die benoetigten Felder bereits existieren, Consumer-Vertrag dokumentieren. Falls nicht, minimalen additiven Export definieren.

## Zielzustand

Contracomology kennt keine hart codierte Liste kanonischer Archive. Dokumentquelle und Resolver werden aus KG-Systemmetadaten bzw. Relationen abgeleitet.
