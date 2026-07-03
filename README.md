# Contracomology

Mehrsprachige Publikations- und Lernfassade fuer Kontrakomologie im KUEPER-Oekosystem.

Dieses Repository ist kein Wissensspeicher. Es besitzt nur die Oberflaeche (`contracomology_ui`). Fachliche Inhalte, rechtliche Informationen, Begriffsdefinitionen, Dokument-Records und Relationen kommen aus dem KUEPER Knowledge Graph und den zustaendigen Archiven.

## Rolle

```text
contracomology.org         Frontend / Kursoberflaeche / Navigation
SYS:KUEPER:knowledge-graph Source of Truth fuer IDs, Domaenen, Entitaeten, Relationen
SYS:KUEPER:ota             Volltext kanonischer Dokumente
SYS:KUEPER:kueper-com      Volltext von Entwuerfen, Essays, Analysen
SSF                        spaeter Lernmodule, Fortschritt, Mitgliedschaft
```

## Funktionen in Version 0.1

- mehrsprachige Routen: `/de`, `/en`, `/ko`
- Einfuehrungskurs als Frontend-Struktur
- KG-Fassadenclient fuer `KD:KON:N1`, `CON:*` und `DOC:*`
- Legal-Seiten als KG-/Dokument-Referenzen
- Architektur-Dokumentation fuer die Frontend-Invariante

## Entwicklung

```bash
npm install
npm run dev
npm run build
```

## Invariante

Frontend-Komponenten duerfen Inhalte darstellen, aber nicht definieren. Wenn Inhalte fehlen oder geaendert werden muessen, wird eine Anforderung an das zustaendige System erstellt.
