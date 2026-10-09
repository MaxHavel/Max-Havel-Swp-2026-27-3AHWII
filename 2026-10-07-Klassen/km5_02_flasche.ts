// KM5-02 HÜ Aufgabe 2: eigene kleine Klasse mit ZWEI Invarianten.
// Domäne Flasche: I1 Volumen > 0 (unveränderlich), I2 0 <= Fuellstand <= Volumen.
// Kein Setter der die Prüfung umgeht — Lesen über Getter.
export class Flasche {
  readonly volumen: number;
  private fuellstand: number;

  constructor(volumen: number, startFuellung: number) {
    if (volumen <= 0) {
      throw new Error(`Volumen muss positiv sein (war ${volumen})`);
    }
    if (startFuellung < 0 || startFuellung > volumen) {
      throw new Error(
        `Startfüllung muss zwischen 0 und ${volumen} liegen (war ${startFuellung})`,
      );
    }
    this.volumen = volumen;
    this.fuellstand = startFuellung;
  }

  get fuellung(): number {
    return this.fuellstand;
  }

  fuellen(menge: number): void {
    if (menge <= 0) {
      throw new Error(`Menge muss positiv sein (war ${menge})`);
    }
    if (this.fuellstand + menge > this.volumen) {
      throw new Error(
        `Flasche läuft über (Füllung ${this.fuellstand}, Volumen ${this.volumen}, dazu ${menge})`,
      );
    }
    this.fuellstand += menge;
  }

  entnehmen(menge: number): void {
    if (menge <= 0) {
      throw new Error(`Menge muss positiv sein (war ${menge})`);
    }
    if (menge > this.fuellstand) {
      throw new Error(
        `Nicht genug drin (Füllung ${this.fuellstand}, angefordert ${menge})`,
      );
    }
    this.fuellstand -= menge;
  }
}
