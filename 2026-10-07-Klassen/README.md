# 2026-10-07 – Klassen: KM5-01 / KM5-02 / KM5-03

Quellen:

- `unterricht/KM5-01-klasse-instanz-zustand/hausaufgabe.md` + `lesson.html`
  (Jetzt du! + Aufgabe)
- `unterricht/KM5-02-kapselung-invarianten/hausaufgabe.md` + `lesson.html`
  (Jetzt du! + Aufgabe)
- `unterricht/KM5-03-interfaces-vertraege/hausaufgabe.md` + `lesson.html` (Jetzt
  du! + Aufgabe)

Abnahme: `deno test` ist grün (15 Tests). `deno check` sauber, `deno fmt`
sauber.

## Umsetzung in diesem Ordner

- KM5-01 (HÜ + Lesson): `km5_01_konto.ts` + `km5_01_konto_test.ts` (5 Tests)
- KM5-02 Lesson (`ueberweisen` atomar) + HÜ (eigene Klasse `Flasche`):
  `km5_02_konto.ts`, `km5_02_flasche.ts`, `km5_02_test.ts` (6 Tests)
- KM5-03 (HÜ + Lesson `Versendbar` + `Comparable` + `groesstes`):
  `km5_03_vertrag.ts` + `km5_03_vertrag_test.ts` (4 Tests)

## Vorhersagen — Antworten (erst hingeschrieben, dann per Test geprüft)

### KM5-01 — Klasse, Instanz, Zustand

Lektüre: MDN JavaScript Classes (Abschnitte `constructor`, Instanzfelder).

- [x] 1a. Vorhersage: `const c = a;` → **1 Objekt, 2 Variablen**, `c === a` ist
      `true`. Kein `new`, nur Referenzkopie. Test:
      `KM5-01: const c = a teilt ein Objekt`.
- [x] 1b. Vorhersage: Nach `a.einzahlen(100)` liefert `c.saldo` **600**, weil
      beide Variablen dieselbe Instanz referenzieren. Test:
      `KM5-01: einzahlen über a ist über c sichtbar`.
-
  2. [x] Umsetzung: `class Konto` mit `readonly iban`, privatem `kontostand`,
         `einzahlen()` und `equals(other: Konto): boolean`. `equals()`
         vergleicht die **IBAN** (Identität), nicht den Kontostand.
-
  3. [x] Tests (rot → grün):
  - zwei Konten gleiche IBAN, verschiedener Stand → `equals()` ist `true`
  - zwei Konten verschiedene IBAN, gleicher Stand → `equals()` ist `false`
  - `a === b` für zwei `new Konto(...)` ist `false` (Identität ≠ Zustand)

### KM5-02 — Kapselung & Invarianten

Lektüre: TypeScript Handbook Classes (`private`/`protected`/`readonly`,
Accessors), MDN Private properties.

- [x] 1a. Vorhersage: `deno check` auf `k.kontostand = -1` schlägt bei
      **`private`** fehl (Kompilierzeit), bei `public` kompiliert es. Laufzeit:
      TS-`private` ist nur Typprüfung und bleibt zur Laufzeit erreichbar (hart
      wäre erst `#feld`) — deshalb kein öffentliches Feld und kein Setter, der
      die Prüfung umgeht.
- [x] 1b. Vorhersage: Nach `new Konto(-5)` mit Fail-Fast im Konstruktor
      existiert **kein Objekt** — der Konstruktor wirft, bevor die Referenz
      zurückgegeben wird. Kein halbfertiges Objekt.
-
  2. [x] Umsetzung Lesson: `Konto.ueberweisen(auf: Konto, betrag)` — zuerst
         alles prüfen (`betrag > 0`, Deckung), erst dann beide Konten ändern
         (atomar: beide stimmen oder gar keines).
-
  2. [x] Umsetzung HÜ: eigene Klasse `Flasche` mit **zwei** Invarianten
         („Volumen > 0", „0 ≤ Füllung ≤ Volumen"), beide mit `throw` im
         Konstruktor **und** in jeder mutierenden Methode
         (`fuellen`/`entnehmen`). Lesen über Getter, kein Setter.
-
  3. [x] Tests (rot → grün): je Invariante ein Test, der beweist, dass
         Verletzung wirklich wirft — plus grüner Pfad mit gültigem Übergang.

### KM5-03 — Interfaces als Vertrag

Lektüre: TypeScript Handbook Interfaces + Type Compatibility (structural
typing).

- [x] 1a. Vorhersage: Klasse mit `implements Verzinsbar` ohne `jahresZins()`
      **kompiliert nicht** — TypeScript meckert an der Klassendeklaration
      (`implements`-Klausel nicht erfüllt).
- [x] 1b. Vorhersage: Objekt mit `jahresZins` ohne `implements` an
      `Verzinsbar`-Variable zuweisen ist **erlaubt** — structural typing: die
      Form zählt, `implements` ist nur Dokumentation.
-
  2. [x] Umsetzung HÜ + Lesson: Vertrag `Versendbar` mit Methode
         `versende(an: string): void` und `readonly absender`. Zwei Klassen
         (`Brief`, `Paket`) setzen ihn **unterschiedlich** um. Funktion
         `sendeAnAlle` kennt nur den Vertragstyp. `Brief` trägt zusätzlich
         `Comparable<Brief>` und läuft als Parameter von `groesstes()`.
-
  3. [x] Tests (rot → grün):
  - beide Klassen erfüllen den Vertrag (Funktion akzeptiert beide)
  - Objekt mit passender Form ohne `implements` wird ebenfalls akzeptiert
    (structural typing)
  - `groesstes()` nutzt `Comparable`, leere Liste → `undefined`

## Zusatz aus `lesson.html` – Jetzt du! + Aufgabe (alle erledigt)

### KM5-01 lesson – Jetzt du! / Aufgabe

- [x] Vorhersage: `const c = a;` — `c === a` gilt, 1 Objekt, 2 Variablen.
- [x] Vorhersage: `a.einzahlen(100)`, danach `c.saldo` lesen — 600 (gleiche
      Referenz).
- [x] Ausführen: `equals()` vergleicht **gleiche IBAN** — egal wie
      unterschiedlich der Kontostand ist. Zwei `Deno.test`-Fälle (gleich /
      ungleich).
- [x] Aufgabe: drei Schritte im eigenen Deno-Projekt, `equals()` mit Tests (rot
      → grün).

### KM5-02 lesson – Jetzt du! / Aufgabe

- [x] Vorhersage: `public` vs `private` — `deno check` schlägt bei `private`
      fehl; Laufzeit siehe 1a oben.
- [x] Vorhersage: Konstruktor wirft bei negativem Startwert — null Objekte, kein
      halbfertiges (Begründung siehe 1b oben).
- [x] Ausführen: `Konto` um `ueberweisen(auf: Konto, betrag)` erweitert (atomar,
      beide oder gar keines), mit Tests (rot → grün).
- [x] Aufgabe: Klasse `Flasche` eigener Wahl, **zwei** Invarianten, Fail-Fast im
      Konstruktor + jeder mutierenden Methode, je Invariante ein
      Wirft-wirklich-Test (rot → grün).

### KM5-03 lesson – Jetzt du! / Aufgabe

- [x] Vorhersage: `implements Verzinsbar` ohne `jahresZins()` — kompiliert
      nicht, Fehler an der Klassendeklaration.
- [x] Vorhersage: Objekt mit `jahresZins` ohne `implements` zuweisen — erlaubt
      (structural typing).
- [x] Ausführen: `Versendbar` definiert, Klasse mit **beiden** Verträgen
      (`Comparable<T>` + `Versendbar`) als Parameter von `groesstes()` genutzt,
      Tests (rot → grün).
- [x] Aufgabe: eigener Vertrag + `readonly`-Eigenschaft, **zwei** Klassen,
      Funktion mit nur Vertragstyp als Parameter, selber Aufruf an beiden
      Klassen, Tests (rot → grün).
