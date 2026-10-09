// KM5-01: Klasse, Instanz, Zustand — Domäne Konto.
// Bauplan (Klasse) existiert einmal, Zustand lebt pro Instanz,
// Identität (IBAN) ist nach dem Konstruktor unveränderlich.
export class Konto {
  private kontostand: number;
  readonly iban: string;

  constructor(iban: string, startBetrag: number) {
    this.iban = iban;
    this.kontostand = startBetrag;
  }

  // Lesen ist unproblematisch: Getter statt öffentlichem Feld.
  get saldo(): number {
    return this.kontostand;
  }

  einzahlen(betrag: number): void {
    if (betrag <= 0) {
      throw new Error(`Betrag muss positiv sein (war ${betrag})`);
    }
    this.kontostand += betrag;
  }

  // Identitätsvergleich über IBAN — nicht über Kontostand,
  // und etwas anderes als === (Referenzidentität).
  equals(other: Konto): boolean {
    return this.iban === other.iban;
  }
}
