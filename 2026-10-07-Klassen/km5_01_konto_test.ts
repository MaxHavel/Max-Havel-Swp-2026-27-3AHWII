// KM5-01 Tests (HÜ Kap. 3 + lesson.html "Jetzt du!").
// Rot → grün: erst schreiben, dann mit `deno test` prüfen.
import { assertEquals } from "jsr:@std/assert";
import { Konto } from "./km5_01_konto.ts";

// HÜ 3: gleiche IBAN, verschiedener Stand → equals() ist true.
Deno.test("KM5-01: gleiche IBAN trotz verschiedenem Stand ist equals", () => {
  const a = new Konto("AT12-01", 500);
  const b = new Konto("AT12-01", 750);
  assertEquals(a.equals(b), true);
});

// HÜ 3: verschiedene IBAN, gleicher Stand → equals() ist false.
Deno.test("KM5-01: verschiedene IBAN trotz gleichem Stand ist nicht equals", () => {
  const a = new Konto("AT12-01", 500);
  const b = new Konto("AT12-02", 500);
  assertEquals(a.equals(b), false);
});

// HÜ 3: zwei `new` sind nie === (Identität ≠ Zustand).
Deno.test("KM5-01: zwei new erzeugen verschiedene Identität (a === b ist false)", () => {
  const a = new Konto("AT12-01", 500);
  const b = new Konto("AT12-01", 500);
  assertEquals(a === b, false);
});

// Lesson Jetzt du! 1: `const c = a` → 1 Objekt, 2 Variablen, c === a ist true.
Deno.test("KM5-01: const c = a teilt ein Objekt (c === a)", () => {
  const a = new Konto("AT12-01", 500);
  const c = a;
  assertEquals(c === a, true);
});

// Lesson Jetzt du! 2: a.einzahlen(100) → c.saldo ist 600 (gleiche Referenz).
Deno.test("KM5-01: einzahlen über a ist über c sichtbar (500 → 600)", () => {
  const a = new Konto("AT12-01", 500);
  const c = a;
  a.einzahlen(100);
  assertEquals(c.saldo, 600);
});
