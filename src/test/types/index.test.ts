import { expectTypeOf, test } from "vitest";
import type {
  BibleBooks,
  BibleVerse,
  BibleChapter,
  Passage,
  SearchResults,
  Verse,
  Chapter,
  VerseSearch,
  verses,
} from "../../types"; 

test("BibleBooks tiene las propiedades correctas", () => {
  expectTypeOf<BibleBooks>().toHaveProperty("id");
  expectTypeOf<BibleBooks>().toHaveProperty("abbreviation");
  expectTypeOf<BibleBooks>().toHaveProperty("name");
  expectTypeOf<BibleBooks>().toHaveProperty("nameLong");
  expectTypeOf<BibleBooks>().toHaveProperty("chapters");
  expectTypeOf<BibleBooks>().toHaveProperty("testament");
});

test("BibleVerse tiene las propiedades correctas", () => {
  expectTypeOf<BibleVerse>().toHaveProperty("id").toEqualTypeOf<string>();
  expectTypeOf<BibleVerse>().toHaveProperty("bibleId").toEqualTypeOf<string>();
  expectTypeOf<BibleVerse>().toHaveProperty("bookId").toEqualTypeOf<string>();
  expectTypeOf<BibleVerse>().toHaveProperty("number").toEqualTypeOf<string>();
  expectTypeOf<BibleVerse>()
    .toHaveProperty("chapterId")
    .toEqualTypeOf<string>();
  expectTypeOf<BibleVerse>()
    .toHaveProperty("reference")
    .toEqualTypeOf<string>();
  expectTypeOf<BibleVerse>().toHaveProperty("content").toEqualTypeOf<string>();
  expectTypeOf<BibleVerse>().toHaveProperty("verse").toEqualTypeOf<string>();
  expectTypeOf<BibleVerse>().toHaveProperty("next").toEqualTypeOf<string>();
  expectTypeOf<BibleVerse>().toHaveProperty("previous").toEqualTypeOf<string>();
  expectTypeOf<BibleVerse>()
    .toHaveProperty("testament")
    .toEqualTypeOf<string>();
});

test("BibleChapter contiene un array de BibleVerse", () => {
  expectTypeOf<BibleChapter>().toHaveProperty("id").toEqualTypeOf<string>();
  expectTypeOf<BibleChapter>().toHaveProperty("number").toEqualTypeOf<string>();
  expectTypeOf<BibleChapter>().toHaveProperty("bookId").toEqualTypeOf<string>();
  expectTypeOf<BibleChapter>()
    .toHaveProperty("verses")
    .toEqualTypeOf<BibleVerse[]>();
  expectTypeOf<BibleChapter>()
    .toHaveProperty("verses")
    .items.toMatchTypeOf<BibleVerse>();
});

test("Passage contiene un array de capítulos", () => {
  expectTypeOf<Passage>().toHaveProperty("id").toEqualTypeOf<string>();
  expectTypeOf<Passage>().toHaveProperty("orgId").toEqualTypeOf<string>();
  expectTypeOf<Passage>().toHaveProperty("bibleId").toEqualTypeOf<string>();
  expectTypeOf<Passage>().toHaveProperty("bookId").toEqualTypeOf<string>();
  expectTypeOf<Passage>()
    .toHaveProperty("chapterIds")
    .toEqualTypeOf<string[]>();
  expectTypeOf<Passage>().toHaveProperty("text").toEqualTypeOf<string>();
  expectTypeOf<Passage>().toHaveProperty("verses").toEqualTypeOf<verses[]>();
  expectTypeOf<Passage>().toHaveProperty("content").toEqualTypeOf<string>();
  expectTypeOf<Passage>().toHaveProperty("reference").toEqualTypeOf<string>();
});

test("SearchResults contiene los resultados correctos", () => {
  expectTypeOf<SearchResults>()
    .toHaveProperty("length")
    .toEqualTypeOf<number>();
  expectTypeOf<SearchResults>().toHaveProperty("query").toEqualTypeOf<string>();
  expectTypeOf<SearchResults>().toHaveProperty("limit").toEqualTypeOf<number>();
  expectTypeOf<SearchResults>()
    .toHaveProperty("offset")
    .toEqualTypeOf<number>();
  expectTypeOf<SearchResults>().toHaveProperty("total").toEqualTypeOf<number>();
  expectTypeOf<SearchResults>()
    .toHaveProperty("verseCount")
    .toEqualTypeOf<number>();
  expectTypeOf<SearchResults>()
    .toHaveProperty("verses")
    .toEqualTypeOf<VerseSearch[]>();
  expectTypeOf<SearchResults>()
    .toHaveProperty("passages")
    .toEqualTypeOf<Passage[]>();
});

test("Verse tiene las propiedades correctas", () => {
  expectTypeOf<Verse>().toHaveProperty("id").toEqualTypeOf<string>();
  expectTypeOf<Verse>().toHaveProperty("reference").toEqualTypeOf<string>();
  expectTypeOf<Verse>().toHaveProperty("text").toEqualTypeOf<string>();
});

test("Chapter tiene las propiedades correctas", () => {
  expectTypeOf<Chapter>().toHaveProperty("id").toEqualTypeOf<string>();
  expectTypeOf<Chapter>().toHaveProperty("number").toEqualTypeOf<string>();
  expectTypeOf<Chapter>().toHaveProperty("verses").toEqualTypeOf<verses[]>();
});

test("VerseSearch tiene las propiedades correctas", () => {
  expectTypeOf<VerseSearch>().toHaveProperty("id").toEqualTypeOf<string>();
  expectTypeOf<VerseSearch>().toHaveProperty("orgId").toEqualTypeOf<string>();
  expectTypeOf<VerseSearch>().toHaveProperty("bookId").toEqualTypeOf<string>();
  expectTypeOf<VerseSearch>().toHaveProperty("bibleId").toEqualTypeOf<string>();
  expectTypeOf<VerseSearch>()
    .toHaveProperty("chapterId")
    .toEqualTypeOf<string>();
  expectTypeOf<VerseSearch>().toHaveProperty("text").toEqualTypeOf<string>();
});

test("Passage contiene un array de capítulos", () => {
  expectTypeOf<Passage>().toHaveProperty("bookId").toEqualTypeOf<string>();
});

test("SearchResults contiene los resultados correctos", () => {
  expectTypeOf<SearchResults>().toHaveProperty("query").toEqualTypeOf<string>();
});
