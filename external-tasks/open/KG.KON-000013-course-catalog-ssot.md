# KG.KON-000013 - Kurskatalog: kanonischen Owner festlegen

Ziel: `SYS:KUEPER:knowledge-graph` / `SYS:KUEPER:ssf`
Status: offen
Erstellt: 2026-09-09
Prioritaet: mittel

## Befund

Der fruehere Contracomology-Consumer hielt Kursreihen und Modulbeschreibungen lokal im Frontend. Diese Duplikate wurden entfernt. Die Kursseite zeigt vorerst freigegebene KON-Domaenen und Concepts aus dem KG.

## Entscheidung erforderlich

Festlegen, welches System den eigentlichen Kurskatalog besitzt:

- KG fuer fachliche Lernobjekt-Metadaten,
- SSF fuer Akademie-/Kurskatalog und Lernkontext,
- Contracomology ausschliesslich fuer Darstellung und Interaktion.

## Zielzustand

Contracomology rendert Kursreihen und Module aus einem autoritativen Export/API-Vertrag. Keine lokalen fachlichen Titel, Zusammenfassungen, Fortschrittswerte oder `LEGACY:*`-Referenzen.
