export interface BibleBooks {
  id: string;
  abbreviation: string;
  name: string;
  nameLong: string;
  chapters: number;
  testament: string;
}

export type Ids = {
  id: string;
};

export interface BibleVerse {
  id: string;
  bibleId: string;
  bookId: string;
  number: string;
  chapterId: string;
  reference: string;
  content: string;
  verse: string;
  next: string;
  previous: string;
  testament: string;
}

export interface BibleChapter {
  versesCount: number;
  id: string;
  bibleId: string;
  number: string;
  bookId: string;
  reference: string;
  content: string;
  next: string;
  previous: string;
  testament: string;
  book: BibleBooks;
  verses: BibleVerse[];
}

export interface verses {
  id: string;
  bibleId: string;
  bookId: string;
  chapterId: string;
  reference: string;
  content: string;
  verse: string;
  next: string;
  previous: string;
  testament: string;
  book: BibleBooks;
}

export interface Chapter {
  id: string;
  number: string;
  verses: verses[];
}

export interface Verse {
  id: string;
  reference: string;
  text: string;
}

//---
export interface VerseSearch {
  id: string;
  orgId: string;
  bookId: string;
  bibleId: string;
  chapterId: string;
  text: string; // Texto del versículo
}

export interface Passage {
  id: string;
  orgId: string;
  bibleId: string;
  bookId: string;
  chapterIds: string[]; // Aquí manejamos los capítulos
  text: string; // Texto general del pasaje
  verses: VerseSearch[]; // Versículos detallados de ese pasaje
}

export interface SearchResults {
  length: number;
  query: string;
  limit: number;
  offset: number;
  total: number;
  verseCount: number;
  verses: VerseSearch[]; // Versículos individuales
  passages: Passage[]; // Pasajes completos
}
