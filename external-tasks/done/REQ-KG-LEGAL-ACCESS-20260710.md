# REQ-KG-LEGAL-ACCESS-20260710 — Zentrale Rechtstexte aus dem KG beziehen

## Target System
`SYS:KUEPER:contracomology`

## Origin
`SYS:KUEPER:knowledge-graph`

## Status
Done — 2026-09-09

## Priority
High vor öffentlicher Freigabe

## Zweck
Contracomology ist eine Publikationsfassade. Impressum, Datenschutzerklärung und Nutzungsbedingungen werden zentral im Knowledge Graph gepflegt; dieses Repository rendert sie, erzeugt aber keine eigene rechtliche Systemwahrheit.

## Kanonische Quellen

- `exports/document-references-0.1.json`
- `registry/legal/impressum-master.json`
- `registry/legal/datenschutz.de.md`
- `registry/legal/terms.de.md`

Quelle: `thomaspeterkueper/kueper-knowledge-graph`

IDs:

- `DOC:KUE:LEGAL-IMPRINT-DE`
- `DOC:KUE:LEGAL-PRIVACY-DE`
- `DOC:KUE:LEGAL-TERMS-DE`

## Umsetzung 2026-09-09

- DocumentReferences werden ueber ihre IDs aufgeloest.
- Legal-Volltexte werden serverseitig aus dem KG geladen; es existiert keine lokale Rechtstextkopie mehr.
- `{{ impressum.responsible.* }}` und `{{ impressum.updated }}` werden aus `impressum-master.json` ersetzt.
- Impressum, Datenschutz und Terms bleiben lokale Routen, aber ohne lokale Systemwahrheit.
- Nicht vorhandene autoritative Sprachfassungen werden nicht erfunden.
- Fehlende oder unvollstaendige kanonische Quellen fuehren zu einem Fehler statt zu erfundenem Fallback-Inhalt.
- Der im Legal-Volltext deklarierte Dokumentstatus wird sichtbar gemacht. Eine verbleibende Inkonsistenz zum Registry-Status ist separat als `KG.KON-000015` erfasst.
- Inkonsistente alte `sourceRepository`-Werte werden voruebergehend tolerant behandelt; Korrektur ist als `KG.KON-000010` erfasst.

## Akzeptanzkriterien

- [x] SSOT bleibt der KG.
- [x] Platzhalter werden aus dem Impressums-Master aufgeloest.
- [x] Keine Browser-Verbindung zu GitHub/KG fuer Legal-Inhalte.
- [x] Footer und Legal-Routen funktionieren.
- [x] Draft-/Release-Status wird sichtbar respektiert.
- [x] Keine erfundenen Fallback-Rechtstexte.

## Validierung

Vercel Preview fuer den SSOT-Cleanup war vor Abschluss dieses Requests erfolgreich. Finaler Merge erfolgt nur bei erneut gruenem Head.

## Created
2026-07-10

## Curator
T.P.K.
