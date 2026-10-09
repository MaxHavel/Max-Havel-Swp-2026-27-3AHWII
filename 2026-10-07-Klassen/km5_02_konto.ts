// KM5-02: Kapselung & Invarianten — Domäne Konto.
// Invarianten: I1 Betrag > 0 bei jeder Bewegung, I2 Kontostand bleibt >= 0.
// Fail-Fast: throw im Konstruktor UND in jeder mutierenden Methode.
export class Konto {
  private kontostand: number;
  readonly iban: string;

  constructor(iban: string, startBetrag: number) {
    if (startBetrag < 0) {
      throw new Error(
        `Startbetrag darf nicht negativ sein (war ${startBetrag})`,
      );
    }
    this.iban = iban;
    this.kontostand = startBetrag;
  }

  get saldo(): number {
    return this.kontostand;
  }

  einzahlen(betrag: number): void {
    if (betrag <= 0) {
      throw new Error(`Betrag muss positiv sein (war ${betrag})`);
    }
    this.kontostand += betrag;
  }

  abheben(betrag: number): void {
    if (betrag <= 0) {
      throw new Error(`Betrag muss positiv sein (war ${betrag})`);
    }
    if (betrag > this.kontostand) {
      throw new Error(
        `Konto ist überzogen (Saldo ${this.kontostand}, angefordert ${betrag})`,
      );
    }
    this.kontostand -= betrag;
  }

  // Lesson Jetzt du! 3: atomar — entweder beide Konten stimmen oder gar keines.
  // Zuerst ALLES prüfen, erst danach ändern. Kein halb-verändertes Objekt.
  ueberweisen(auf: Konto, betrag: number): void {
    if (betrag <= 0) {
      throw new Error(`Betrag muss positiv sein (war ${betrag})`);
    }
    if (betrag > this.kontostand) {
      throw new Error(
        `Konto ist überzogen (Saldo ${this.kontostand}, angefordert ${betrag})`,
      );
    }
    this.kontostand -= betrag;
    auf.kontostand += betrag;
  }
}
