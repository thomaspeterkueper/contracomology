# Architektur - Contracomology

Contracomology ist ein `publication_frontend_consumer` im KUEPER-Oekosystem.

## Invariante

Frontend ist nie Source of Truth. Jedes Fachportal ist Fassade ueber Knowledge Graph, Archive, SSF oder ein anderes zustaendiges Fachsystem.

## Besitz

Contracomology besitzt ausschliesslich:

- `contracomology_ui`
- Routen, Layout, Navigation, Darstellung
- Kurs-Oberflaeche und Uebungsinteraktion
- technische Adapter zum Lesen von KG-/Archiv-Exporten

Contracomology besitzt nicht:

- Begriffsdefinitionen
- kanonische Fachtexte
- rechtliche Informationen
- Relationen und Domaenen
- Lernfortschritt oder Mitgliedschaft

## Datenquellen

- KG-Exporte: `exports/kxf-0.6.json`, `exports/entity-registry-0.1.json`, `exports/relation-registry-0.1.json`, `exports/knowledge-domains-0.1.json`
- Volltext: `SYS:KUEPER:ota`, `SYS:KUEPER:kueper-com`
- Legal: KG-/Dokument-Records, nicht lokale Markdown-Dateien
- Zustand: spaeter SSF, nicht lokale Datenbank

## Mehrsprachigkeit

Routen werden von Beginn an sprachfaehig gehalten:

- `/de`
- `/en`
- `/ko`

Die UI darf uebersetzt werden. Fachliche Definitionen werden erst angezeigt, wenn sie in der jeweiligen autoritativen Quelle vorliegen.

## Offene Systemanforderungen

Anforderungen an KG, SSF, Noxia oder andere Repositories liegen unter `external-tasks/open/` und werden nicht durch lokale Wissensduplikate ersetzt.
