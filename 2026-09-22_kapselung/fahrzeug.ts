// HÜ-Domäne UE 2: Kapselung & Invarianten am Fahrzeug.
// Dein Job: die Invarianten fail-fast sichern, bis fahrzeug_test.ts grün ist.
export class Fahrzeug {
  readonly marke: string;
  private _kmStand: number;
  private _geschwindigkeit: number;
  readonly maxGeschwindigkeit: number;

  constructor(
    marke: string,
    kmStand: number,
    maxGeschwindigkeit: number,
  ) {
    // TODO HÜ: kmStand darf nicht negativ sein — Fail-Fast im Konstruktor.
    if (kmStand < 0) {
      throw new Error("kmStand darf nicht negativ sein");
    }
    this.marke = marke;
    this._kmStand = kmStand;
    this.maxGeschwindigkeit = maxGeschwindigkeit;
    this._geschwindigkeit = 0;
  }

  // TODO HÜ: getter für kmStand und geschwindigkeit (lesen ja, schreiben nie).
  // Muss zuerst ersetzt werden, damit die Tests kompilieren und echte Werte sehen.
  get kmStand(): number {
    return this._kmStand;
  }

  get geschwindigkeit(): number {
    return this._geschwindigkeit;
  }

  // TODO HÜ: wirft, wenn v < 0 oder v > maxGeschwindigkeit.
  setGeschwindigkeit(v: number): void {
    if (v < 0 || v > this.maxGeschwindigkeit) {
      throw new Error("Geschwindigkeit muss zwischen 0 und maxGeschwindigkeit liegen");
    }
    this._geschwindigkeit = v;
  }
  

  // TODO HÜ: erhöht kmStand um geschwindigkeit * stunden.
  fahre(stunden: number): void {
    if (stunden < 0) {
      throw new Error("Stunden darf nicht negativ sein");
    }
    else {

      this._kmStand += this._geschwindigkeit * stunden;
    }
    
  }

  toString(): string {
    return `${this.marke} (${this._kmStand} km, fährt ${this._geschwindigkeit}/${this.maxGeschwindigkeit} km/h)`;
  }
}
