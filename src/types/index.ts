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
  chapterId: string;
  reference: string;
  content: string;
  verse: string;
  next: string;
  previous: string;
  testament: string;
  book: BibleBooks;
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

