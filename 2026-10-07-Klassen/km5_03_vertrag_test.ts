// KM5-03 Tests: HÜ-Vertrag + lesson.html Ausführen (beide Verträge + groesstes).
import { assertEquals } from "jsr:@std/assert";
import {
  Brief,
  groesstes,
  Paket,
  sendeAnAlle,
  type Versendbar,
} from "./km5_03_vertrag.ts";

// HÜ: beide Klassen erfüllen den Vertrag — Funktion akzeptiert beide gemischt.
Deno.test("KM5-03: sendeAnAlle akzeptiert Brief UND Paket (nur Vertragstyp)", () => {
  const b = new Brief("Max", "Hallo Welt");
  const p = new Paket("Max", 2.5);
  sendeAnAlle([b, p], "HTL");
  assertEquals(b.versandNachweis.length, 1);
  assertEquals(p.verlauf.length, 1);
});

// HÜ: structural typing — Objekt mit passender Form ohne implements geht auch.
Deno.test("KM5-03: Objekt ohne implements erfüllt Versendbar (Form zählt)", () => {
  const empfangen: string[] = [];
  const notizzettel = {
    absender: "Max",
    versende(an: string): void {
      empfangen.push(an);
    },
  };
  const v: Versendbar = notizzettel;
  sendeAnAlle([v], "Klasse");
  assertEquals(empfangen, ["Klasse"]);
});

// Lesson Ausführen: Klasse mit BEIDEN Verträgen als Parameter von groesstes().
Deno.test("KM5-03: groesstes findet längsten Brief (Comparable + Versendbar)", () => {
  const kurz = new Brief("Max", "Hi");
  const lang = new Brief("Max", "Hallo liebe Klasse, das ist deutlich länger");
  // Brief trägt beide Verträge — trotzdem als Comparable nutzbar:
  const sieger = groesstes([kurz, lang]);
  assertEquals(sieger === lang, true);
  // … und gleichzeitig versendbar:
  sendeAnAlle([sieger!], "HTL");
  assertEquals(lang.versandNachweis.length, 1);
});

Deno.test("KM5-03: groesstes findet schwerstes Paket, leere Liste → undefined", () => {
  const leicht = new Paket("Max", 1);
  const schwer = new Paket("Max", 10);
  assertEquals(groesstes([leicht, schwer]) === schwer, true);
  assertEquals(groesstes([]), undefined);
});
