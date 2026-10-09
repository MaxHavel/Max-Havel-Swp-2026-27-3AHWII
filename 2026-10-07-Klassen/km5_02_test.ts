// KM5-02 Tests: lesson.html ueberweisen + HÜ zwei Invarianten.
import { assertEquals, assertThrows } from "jsr:@std/assert";
import { Konto } from "./km5_02_konto.ts";
import { Flasche } from "./km5_02_flasche.ts";

// Lesson Jetzt du! 3 (grüner Pfad): Überweisung bewegt Geld von → nach.
Deno.test("KM5-02: ueberweisen bewegt Betrag atomar (500/100 → 400/200)", () => {
  const a = new Konto("AT1", 500);
  const b = new Konto("AT2", 100);
  a.ueberweisen(b, 100);
  assertEquals(a.saldo, 400);
  assertEquals(b.saldo, 200);
});

// Lesson Jetzt du! 3 (Fail-Fast): zu wenig Deckung → throw, BEIDE unverändert.
Deno.test("KM5-02: ueberweisen ohne Deckung wirft und ändert gar keines", () => {
  const a = new Konto("AT1", 500);
  const b = new Konto("AT2", 100);
  assertThrows(() => a.ueberweisen(b, 600), Error, "überzogen");
  assertEquals(a.saldo, 500);
  assertEquals(b.saldo, 100);
});

// Lesson Jetzt du! 3: unmöglicher Betrag → throw, beide unverändert.
Deno.test("KM5-02: ueberweisen mit Betrag <= 0 wirft", () => {
  const a = new Konto("AT1", 500);
  const b = new Konto("AT2", 100);
  assertThrows(() => a.ueberweisen(b, 0), Error, "positiv");
  assertThrows(() => a.ueberweisen(b, -10), Error, "positiv");
  assertEquals(a.saldo, 500);
  assertEquals(b.saldo, 100);
});

// HÜ Invariante 1 (Volumen > 0): Verletzung wirft im Konstruktor.
Deno.test("KM5-02: Flasche mit Volumen <= 0 wird nie geboren", () => {
  assertThrows(() => new Flasche(0, 0), Error, "Volumen");
  assertThrows(() => new Flasche(-500, 0), Error, "Volumen");
});

// HÜ Invariante 2 (0 <= Füllung <= Volumen): Verletzung wirft überall.
Deno.test("KM5-02: Flasche hält 0 <= Füllung <= Volumen", () => {
  // Konstruktor:
  assertThrows(() => new Flasche(1000, -1), Error, "Startfüllung");
  assertThrows(() => new Flasche(1000, 1001), Error, "Startfüllung");
  // Methoden:
  const f = new Flasche(1000, 500);
  assertThrows(() => f.fuellen(501), Error, "über");
  assertThrows(() => f.entnehmen(501), Error, "genug");
  assertEquals(f.fuellung, 500);
});

// HÜ grüner Pfad: gültiger Übergang funktioniert.
Deno.test("KM5-02: Flasche gültiger Übergang (500 → 800 → 300)", () => {
  const f = new Flasche(1000, 500);
  f.fuellen(300);
  assertEquals(f.fuellung, 800);
  f.entnehmen(500);
  assertEquals(f.fuellung, 300);
});
