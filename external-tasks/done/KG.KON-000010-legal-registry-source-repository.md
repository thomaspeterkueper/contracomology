# KG.KON-000010 - KG: Legal-Registry sourceRepository korrigieren

Ziel: `SYS:KUEPER:knowledge-graph`
Status: done
Erstellt: 2026-09-09
Prioritaet: niedrig

## Befund

Beim Aufloesen von `DOC:KUE:LEGAL-PRIVACY-DE` enthaelt `exports/document-references-0.1.json` im Feld `sourceRepository` einen Dateipfad (`registry/legal/datenschutz.de.md`) statt eines Repository-Bezeichners im Format `owner/repo`. `sourcePath` enthaelt den Dateipfad bereits korrekt.

## Anforderung

Die Legal-DocumentReference-Records fuer Impressum, Datenschutz und Terms auf konsistente Source-Metadaten pruefen und `sourceRepository` auf das kanonische Repository setzen, sofern das Feld gemaess Document-Architecture ein Repository erwartet.

Erwarteter Repository-Wert fuer KG-eigene Legal-Volltexte:

`thomaspeterkueper/kueper-knowledge-graph`

## Consumer-Verhalten

Contracomology toleriert bis zur Korrektur nicht-konforme Altwerte und faellt fuer KG-eigene Legal-Records auf das KG-Repository zurueck. Es wird keine lokale Textkopie erzeugt.

## Erledigt

**Erledigt:** 2026-11-15 (Claude, Ökosystem-Kreislauf)
**Umgesetzt:** `kueper-knowledge-graph` Commit 9b3dbab (Merge 296e85a): `sourceRepository` von `DOC:KUE:LEGAL-IMPRINT-DE`, `DOC:KUE:LEGAL-PRIVACY-DE` und `DOC:KUE:LEGAL-TERMS-DE` in `exports/document-references-0.1.json` auf `thomaspeterkueper/kueper-knowledge-graph` gesetzt; `sourcePath` unverändert. Geprüft mit `check_source_of_truth.py`, `docs:check` und `check-document-api.cjs`.
**contracomology:** Der Fallback für nicht-konforme Altwerte kann bleiben oder später entfernt werden; keine lokale Änderung nötig.
