# KG.KON-000009 — Adresse in legalInfo prüfen + Legal-Records im KG

| Feld | Inhalt |
|---|---|
| Signatur | KG.KON-000009 |
| Ziel | `SYS:KUEPER:knowledge-graph` |
| Status | offen |
| Erstellt | 2026-07-04 |

## Kontext

In `lib/public-content.ts` ist folgende Adresse hinterlegt:

```
Mörfelder Landstraße 103, 60598 Frankfurt am Main, Germany
```

Diese Adresse ist im Frontend als statischer Wert gesetzt. Das widerspricht
der Architekturregel: rechtliche Informationen gehören nicht ins Frontend,
sondern in den KG.

## Anforderung

1. Adresse prüfen und bestätigen oder korrigieren.

2. Legal-Dokument-Records im KG anlegen:
   - `DOC:KUE:LEGAL-IMPRINT-DE`
   - `DOC:KUE:LEGAL-PRIVACY-DE`
   - `DOC:KUE:LEGAL-TERMS-DE`

   Diese sind in `lib/kg.ts` als `LEGAL_DOCUMENT_REFS` referenziert, aber
   noch nicht im KG vorhanden.

3. Sobald die KG-Records vorhanden sind, kann `legalInfo` aus
   `public-content.ts` entfernt und durch KG-Abruf ersetzt werden.

## Bis dahin

`legalInfo` bleibt in `public-content.ts` als Übergangsfeld.
Die Adresse darf erst geändert werden, nachdem der Kurator sie bestätigt hat.
