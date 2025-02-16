import { describe, it, expect, vi, afterEach, beforeEach, Mock } from "vitest";
import axios from "axios";
import {
  getBibles,
  getChapters,
  loadChapterVersesFromAPI,
  searchBible,
  getRamdonPassage,
} from "../../services/getData";

vi.mock("axios");

describe("Bible API Service", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_API_KEY", "38df74b1430e95a95cace0a192e306f4");
    vi.stubEnv(
      "VITE_API_URL",
      "https://api.scripture.api.bible/v1/bibles/592420522e16049f-01"
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch bibles", async () => {
    const mockData = { data: "bibles data" };
    (axios.get as Mock).mockResolvedValueOnce({ data: mockData });

    const result = await getBibles();
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.VITE_API_URL}/books`,
      { headers: { "api-key": process.env.VITE_API_KEY } }
    );
  });

  it("should fetch chapters", async () => {
    const bookId = "test-book-id";
    const mockData = { data: "chapters data" };
    (axios.get as Mock).mockResolvedValueOnce({ data: mockData });

    const result = await getChapters(bookId);
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.VITE_API_URL}/books/${bookId}/chapters`,
      { headers: { "api-key": process.env.VITE_API_KEY } }
    );
  });

  it("should fetch random passage", async () => {
    const passageId = "test-passage-id";
    const mockData = { data: "random passage data" };
    (axios.get as Mock).mockResolvedValueOnce({ data: mockData });

    const result = await getRamdonPassage(passageId);
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.VITE_API_URL}/verses/${passageId}?content-type=text`,
      { headers: { "api-key": process.env.VITE_API_KEY } }
    );
  });

  it("should load chapter verses from API", async () => {
    const chapterId = "test-chapter-id";
    const mockData = { data: { content: "chapter content" } };
    (axios.get as Mock).mockResolvedValueOnce({ data: mockData });

    const result = await loadChapterVersesFromAPI(chapterId);
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.VITE_API_URL}/chapters/${chapterId}`,
      { headers: { "api-key": process.env.VITE_API_KEY } }
    );
  });

  it("should search bible", async () => {
    const query = "test-query";
    const mockData = { data: "search results" };
    (axios.get as Mock).mockResolvedValueOnce({ data: mockData });

    const result = await searchBible(query);
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.VITE_API_URL}/search?`,
      {
        headers: { "api-key": process.env.VITE_API_KEY },
        params: { query, limit: 10 },
      }
    );
  });
});
