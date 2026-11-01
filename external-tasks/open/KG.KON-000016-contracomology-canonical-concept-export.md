# KG.KON-000016 - KG: Contracomology-Export bereitstellen und Begriffsdefinitionen ausliefern

Ziel: `SYS:KUEPER:knowledge-graph`
Status: offen
Erstellt: 2026-11-01
Prioritaet: hoch

## Befund

`records.activeConsumerContracts` in `exports/kxf-0.6.json` weist `SYS:KUEPER:contracomology` den kanonischen Export `exports/contracomology-0.1.json` mit Recordset `records` zu. Die KG-Export-API liefert diesen Export jedoch nicht aus: `GET /api/exports/contracomology-0.1.json` antwortet mit 404 `unknown_export`; allowlistet sind nur `kxf-0.1.json`, `kxf-0.6.json`, `kxf-learning-modules-0.1.json` und `knowledge-domains-0.1.json`.

Die in `exports/kxf-0.6.json` enthaltenen KON-Concepts tragen nur `id`, `type`, `domain`, `name`, `status`, `epistemicStatus` und ggf. `definitionStatus`, aber kein `definition`-Feld. KXF ist `draft_productive`; laut `resolution.consumerNote` duerfen historische KXF-Dateien nicht als Ersatz fuer die Registry-Aufloesung gescannt werden. Eine Definition ist damit derzeit aus keiner ausgelieferten Quelle verfuegbar.

## Anforderung

1. `exports/contracomology-0.1.json` in der KG-Export-API allowlisten und den Consumer-Vertrag (Recordset `records`) bereitstellen.
2. Die redaktionell freigegebenen Begriffsdefinitionen der KON-Concepts in diesem Export ausliefern.
3. Die Feldform der Definitionen dokumentieren. Der Consumer unterstuetzt eine Zeichenkette oder ein lokalisiertes Objekt mit den Sprachschluesseln `de`, `en` und `ko`; eine Definition wird nur in der jeweils vorhandenen Sprache angezeigt.
4. Concepts ohne Definition tragen `definitionStatus: "pending_definition"` oder kein `definition`-Feld.

## Consumer-Verhalten bis zur Bereitstellung

`getContracomologyConcepts()` liest ausschliesslich `exports/contracomology-0.1.json`. Solange der Export nicht ausgeliefert wird, zeigt die KG-Seite einen expliziten Nicht-verfuegbar-Hinweis und keine Ersatzdaten aus KXF. Concepts ohne Definition werden mit einem lokalisierten Definition-pending-Hinweis dargestellt.

Verwandt: KG.KON-000001 (Begriffsdefinitionen).
