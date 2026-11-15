# UI-Text und Fachinhalt – Consumer-Vertrag

Stand: 2026-11-15 (KG.KON-000014)

Contracomology ist `publication_frontend_consumer` (siehe `ARCHITECTURE.md`). Dieser Vertrag legt fest, welche Texte lokal in UI-Dateien stehen dürfen und welche nur aus der autoritativen Quelle kommen. Er soll verhindern, dass fachlicher Kanon erneut unbemerkt in `lib/i18n.ts` oder Seitendateien wandert.

## 1. Lokal erlaubt

In `lib/i18n.ts`, `app/**` und Komponenten:

- Navigation und Seitentitel (`course`, `kgExplorer`, `documents`, `legal` …),
- Bedienhinweise, Button- und Statuslabels (`open`, `startCourse`, `progress` …),
- Leer- und Fehlerzustände (`emptyDomain`),
- eine neutrale Portalbeschreibung: Eyebrow, Titel, Untertitel, ein kurzer Claim und Ledes, die sagen, *was* das Portal zeigt, ohne Begriffe zu definieren,
- Übersetzungen dieser Texte in `de`, `en`, `ko`.

## 2. Extern autoritativ

Nur über die Adapter (`lib/kg.ts`, Archiv-Resolver) und nie als lokale Literale:

| Gegenstand | Quelle |
| --- | --- |
| Begriffsdefinitionen (`CON:*`), Domänenbeschreibungen (`KD:KON:*`) | `SYS:KUEPER:knowledge-graph` |
| Modelle, Zeitformen-Typologie, Paradigmen und Werkinterpretationen | KG (Struktur) bzw. Archiv-Volltext |
| Kursinhalte, Module, Lernpfade, Fortschritt | KG-Kurskatalog bzw. SSF (KG.KON-000013) |
| Dokumentmetadaten und Volltexte (`DOC:*`) | KG-Records, `SYS:KUEPER:ota`, `SYS:KUEPER:kueper-com` |
| Impressum, Datenschutz, Nutzungsbedingungen | KG-Legal-Records (KG.KON-000009/-000010/-000015) |

Fehlt eine autoritative Sprachfassung, wird sie nicht lokal erfunden; die UI zeigt den Leerzustand.

## 3. Prüfregel für neue UI-Texte

Ein Text gehört **nicht** in eine UI-Datei, wenn eine der Fragen mit Ja beantwortet wird:

1. Definiert oder erklärt er einen Fachbegriff, eine Zeitform oder ein Modell?
2. Ordnet er ein Werk, eine Person oder ein Beispiel fachlich ein (Paradigma, Interpretation)?
3. Würde ein Widerspruch zum KG als fachlicher Fehler gelten statt als Formulierungsfrage?
4. Ist er Teil eines Kurses, einer Übung oder eines Dokuments?

Dann: Anforderung an die zuständige Quelle (`external-tasks/` dort bzw. Umschlag), lokal nur der Adapteraufruf.

## 4. Bestandsaufnahme 2026-11-15

| Ort | Einordnung |
| --- | --- |
| `lib/i18n.ts` – Navigation, Labels, `emptyDomain`, `legalNote` | lokal erlaubt |
| `lib/i18n.ts` – `eyebrow`, `title`, `subtitle`, `kgLede`, `docsLede` | lokal erlaubt (Portalbeschreibung) |
| `lib/i18n.ts` – `claim` („beschreibt, wie Werke Zeit erzeugen …“) | Grenzfall: Portalclaim, muss inhaltlich mit der KG-Beschreibung von `KD:KON:N1` übereinstimmen; inhaltliche Änderungen nur über den KG |
| `app/[locale]/page.tsx` – `lead`, `intro`, `methodTitle`, `method` | Grenzfall: Portalbeschreibung mit methodischer Aussage |
| `app/[locale]/page.tsx` – `paths` (Gleichzeitigkeit, Zeitformen, Rückwirkung), `practice`, `examples` (Bach, Coltrane, Evans, Literatur) | nach Abschnitt 3 Fachinhalt (Begriffserklärungen, Werkinterpretationen) |

## 5. Offene Entscheidung (Thomas)

Die Startseitentexte aus Abschnitt 4 (letzte Zeile) hat Thomas am 05.10.2026 bewusst ergänzt („Enrich public Contracomology content“), nach dem SSOT-Cleanup vom 09.09.2026. Zu entscheiden ist:

- **A:** als redaktioneller Portaltext freigeben – dann hier als ausdrückliche Ausnahme eintragen;
- **B:** als `CON:*`-Kurzbeschreibungen bzw. Paradigmen-Records im KG anlegen lassen und die Startseite aus dem KG lesen.

Bis zur Entscheidung bleiben die Texte unverändert; neue Fachtexte kommen nicht hinzu.
