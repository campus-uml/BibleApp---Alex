import { newTestamentIds, oldTestamentIds } from "./Abreviations";

// Datos de referencia aproximados (número de capítulos por libro)
const bookChapters: Record<string, number> = {
  GEN: 50,
  EXO: 40,
  LEV: 27,
  NUM: 36,
  DEU: 34,
  JOS: 24,
  JDG: 21,
  RUT: 4,
  "1SA": 31,
  "2SA": 24,
  "1KI": 22,
  "2KI": 25,
  "1CH": 29,
  "2CH": 36,
  EZR: 10,
  NEH: 13,
  EST: 10,
  JOB: 42,
  PSA: 150,
  PRO: 31,
  ECC: 12,
  SNG: 8,
  ISA: 66,
  JER: 52,
  LAM: 5,
  EZK: 48,
  DAN: 12,
  HOS: 14,
  JOL: 3,
  AMO: 9,
  OBA: 1,
  JON: 4,
  MIC: 7,
  NAM: 3,
  HAB: 3,
  ZEP: 3,
  HAG: 2,
  ZEC: 14,
  MAL: 4,
  MAT: 28,
  MRK: 16,
  LUK: 24,
  JHN: 21,
  ACT: 28,
  ROM: 16,
  "1CO": 16,
  "2CO": 13,
  GAL: 6,
  EPH: 6,
  PHP: 4,
  COL: 4,
  "1TH": 5,
  "2TH": 3,
  "1TI": 6,
  "2TI": 4,
  TIT: 3,
  PHM: 1,
  HEB: 13,
  JAS: 5,
  "1PE": 5,
  "2PE": 3,
  "1JN": 5,
  "2JN": 1,
  "3JN": 1,
  JUD: 1,
  REV: 22,
};
export const getRandomPassageId = (): string => {
  const isNewTestament = Math.random() > 0.5;
  const books = isNewTestament ? newTestamentIds : oldTestamentIds;
  // Seleccionar un libro aleatorio
  const book = books[Math.floor(Math.random() * books.length)];
  // Obtener el número máximo de capítulos del libro
  const maxChapter = bookChapters[book] || 1;
  const chapter = Math.floor(Math.random() * maxChapter) + 1; // Capítulos de 1 a máx.
  // Suponemos que cada capítulo tiene al menos 10 versículos
  const verse = Math.floor(Math.random() * 10) + 1; // Versículos de 1 a 10
  return `${book}.${chapter}.${verse}`;
};
