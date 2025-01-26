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
  bookId: string;
  chapter: number;
  verse: number;
  text: string;
}


//tipos de prueba
export interface Verse {
  number: string
  text: string
}

export interface Chapter {
  number: string
  verses: Verse[]
}

export interface Book {
  name: string
  chapters: Chapter[]
}

