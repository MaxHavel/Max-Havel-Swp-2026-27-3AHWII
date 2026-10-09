// KM5-03: Interfaces als Vertrag — was, nicht wie.
// Eigener Vertrag: Versendbar (eine Methode + eine readonly-Eigenschaft).
// Zweitvertrag: Comparable<T> für groesstes(). Structural typing inklusive.
export interface Comparable<T> {
  compareTo(other: T): number;
}

export interface Versendbar {
  readonly absender: string;
  versende(an: string): void;
}

// Die Funktion kennt nur den Vertrag — keine der Klassen.
export function groesstes<T extends Comparable<T>>(liste: T[]): T | undefined {
  if (liste.length === 0) return undefined;
  let bestes = liste[0];
  for (const kandidat of liste) {
    if (kandidat.compareTo(bestes) > 0) bestes = kandidat;
  }
  return bestes;
}

// Dieselbe Aufrufform für alle Versendbaren — nur der Vertragstyp als Parameter.
export function sendeAnAlle(sendungen: Versendbar[], an: string): void {
  for (const s of sendungen) {
    s.versende(an);
  }
}

// Klasse 1: Brief — vergleichbar nach Textlänge, versendbar per Protokoll.
export class Brief implements Comparable<Brief>, Versendbar {
  readonly absender: string;
  private text: string;
  private protokoll: string[] = [];

  constructor(absender: string, text: string) {
    this.absender = absender;
    this.text = text;
  }

  compareTo(other: Brief): number {
    return this.text.length - other.text.length;
  }

  versende(an: string): void {
    this.protokoll.push(`Brief von ${this.absender} an ${an}`);
  }

  get versandNachweis(): readonly string[] {
    return this.protokoll;
  }
}

// Klasse 2: Paket — vergleichbar nach Gewicht, Versand deutlich anders.
export class Paket implements Comparable<Paket>, Versendbar {
  readonly absender: string;
  private gewichtKg: number;
  private stationen: string[] = [];

  constructor(absender: string, gewichtKg: number) {
    if (gewichtKg <= 0) {
      throw new Error(`Gewicht muss positiv sein (war ${gewichtKg})`);
    }
    this.absender = absender;
    this.gewichtKg = gewichtKg;
  }

  compareTo(other: Paket): number {
    return this.gewichtKg - other.gewichtKg;
  }

  versende(an: string): void {
    this.stationen.push(
      `Paket (${this.gewichtKg}kg) von ${this.absender} an ${an}`,
    );
  }

  get verlauf(): readonly string[] {
    return this.stationen;
  }
}
