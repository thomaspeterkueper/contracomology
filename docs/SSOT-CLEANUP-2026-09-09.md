# Contracomology SSOT Cleanup — 2026-09-09

## Ziel

Contracomology bleibt reine Publikationsfassade. Fachlicher Kanon, Dokumentmetadaten und zentrale Rechtstexte werden nicht lokal dupliziert.

## In diesem Pass umgesetzt

- Legal-Seiten lesen Impressumsdaten und Rechtstexte serverseitig aus dem KUEPER Knowledge Graph.
- Privacy/Terms werden ueber DocumentReference-ID und `sourcePath` aufgeloest.
- Platzhalter der Legal-Texte werden aus `registry/legal/impressum-master.json` ersetzt.
- Nicht vorhandene autoritative Sprachfassungen werden nicht lokal erfunden.
- `lib/public-content.ts` entfernt.
- `lib/course.ts` entfernt.
- Lokale Kursreihen, Moduldefinitionen, Fortschrittswerte und `LEGACY:*`-Referenzen entfernt.
- Lokale Bach-/Chopin-/Wagner-Paradigmeninterpretationen von der Startseite entfernt.
- Kurs- und Startseite beziehen ihren fachlichen Bestand aus KON-Domaenen und Concepts des KG.

## Verbleibende technische Schulden

- Dokumentauswahl fuer Contracomology ist noch regex-basiert.
- Archiv-/Resolver-Namen sind im Consumer noch teilweise hart codiert.
- Der kanonische Owner und Exportvertrag fuer den spaeteren echten Kurskatalog muss zwischen KG und SSF festgelegt werden.
- Legal-DocumentReferences enthalten mindestens einen inkonsistenten `sourceRepository`-Altwert; der Consumer ist voruebergehend tolerant.

Die dazu gehoerigen Anforderungen liegen unter `external-tasks/open/`.
