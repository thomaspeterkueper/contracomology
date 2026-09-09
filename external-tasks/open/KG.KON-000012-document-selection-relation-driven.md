# KG.KON-000012 - KG: Contracomology-Dokumentauswahl relationsgetrieben machen

Ziel: `SYS:KUEPER:knowledge-graph`
Status: offen
Erstellt: 2026-09-09
Prioritaet: mittel

## Befund

`getContracomologyDocuments()` selektiert Dokumente derzeit heuristisch ueber ID/Titel (`:KON`, `contracomolog`, `kontrakomolog`). Das ist fuer eine Publikationsfassade nicht ausreichend robust.

## Anforderung

Einen autoritativen KG-Weg fuer die Zugehoerigkeit eines Dokuments zur Contracomology-Domaene bereitstellen bzw. den bestehenden Relation-/Domain-Vertrag benennen.

Bevorzugt werden bereits vorhandene strukturierte Felder wie `relatedKnowledgeDomains`, `system`, explizite Relations oder ein entsprechender Export. Keine neue Sonderlogik nur fuer Contracomology, falls der bestehende Dokumentvertrag ausreicht.

## Zielzustand

Der Consumer filtert Dokumente ausschliesslich anhand strukturierter KG-Metadaten und nicht mehr anhand von Namen oder ID-Regexen.
