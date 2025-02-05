import { newTestamentIds, oldTestamentIds } from "./Abreviations";

const bookChapters: Record<string, number> = {
  PSA: 150,
  PRO: 31,
  MAT: 28,
  MRK: 16,
  LUK: 24,
  JHN: 21,
  ROM: 16,
  "1CO": 16,
  "2CO": 13,
  GAL: 6,
  EPH: 6,
  PHP: 4,
  COL: 4,
  JAS: 5,
  "1PE": 5,
  "2PE": 3,
  "1JN": 5,
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
