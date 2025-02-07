
const bookChapters: Record<string, number> = {
  PSA: 150,
  PRO: 31,
  
};

export const getRandomPassageId = (): string => {
  const books = Object.keys(bookChapters);
  // Seleccionar un libro aleatorio
  const book = books[Math.floor(Math.random() * books.length)];
  // Obtener el número máximo de capítulos del libro
  const maxChapter = bookChapters[book] || 1;
  const chapter = Math.floor(Math.random() * maxChapter) + 1; // Capítulos de 1 a máx.
  // Suponemos que cada capítulo tiene al menos 10 versículos
  const verse = Math.floor(Math.random() * 10) + 1; // Versículos de 1 a 10
  return `${book}.${chapter}.${verse}`;
};
