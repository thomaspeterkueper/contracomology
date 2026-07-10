# REQ-KG-LEGAL-ACCESS-20260710 — Zentrale Rechtstexte aus dem KG beziehen

## Target System
`SYS:KUEPER:contracomology`

## Origin
`SYS:KUEPER:knowledge-graph`

## Status
Open

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

## Requested Change

1. Dokumente über die IDs in der Document-Reference-Registry auflösen.
2. Die referenzierten Quelldateien build- oder serverseitig aus dem KG laden.
3. `{{ impressum.responsible.* }}` und `{{ impressum.updated }}` aus `impressum-master.json` auflösen.
4. Lokale Routen/Seiten für Impressum, Datenschutz und Nutzungsbedingungen rendern und im Footer verlinken.
5. Keine Client-seitige Laufzeitabfrage an GitHub oder KG.
6. Kein lokales Umschreiben oder Forken der Rechtstexte. Site-spezifische Fakten und Korrekturen als Request an den KG zurückmelden.
7. Aktuellen Status beachten: Privacy und Terms sind `draft_productive` und nicht juristisch freigegeben. Erst nach ausdrücklichem `released` öffentlich als freigegebene Rechtstexte kennzeichnen.
8. Bei fehlender Quelle Build abbrechen oder geprüften Build-Cache verwenden; keine erfundenen Fallback-Texte.

## Temporärer Zugriff

Bis der öffentliche KG-Endpunkt live ist, die öffentlichen GitHub-Dateien beim Build anhand der Registry laden. Keine hart codierten Rechtstextkopien.

## Akzeptanzkriterien

- SSOT bleibt der KG.
- Platzhalter werden aus dem Impressums-Master aufgelöst.
- Keine Browser-Verbindung zu GitHub/KG für Legal-Inhalte.
- Footer und Legal-Routen funktionieren.
- Draft-/Release-Status wird sichtbar respektiert.

## Created
2026-07-10

## Curator
T.P.K.
