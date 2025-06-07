// src/types/reseau.ts
export interface Reseau {
  id?: number;
  nom: string;
  ip: string;
  statut: "OK" | "HS" | "Lent" | "Perte";
  temps?: string;
  test?: string;
}
