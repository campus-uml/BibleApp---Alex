import { describe, it, expect, vi, afterEach } from "vitest";
import axios from "axios";
import {
  getBibles,
  getChapters,
  loadChapterVersesFromAPI,
  searchBible,
  getRamdonPassage,
} from "@/services/getData";

vi.mock("axios");
const mockedAxios = axios as vi.Mocked<typeof axios>;

describe("getData service", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("deberia obtener libros", async () => {
    const mockData = { data: "bibles data" };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await getBibles();
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String), {
      headers: { "api-key": expect.any(String) },
    });
  });

  it("deberia obtener capitulos", async () => {
    const mockData = { data: "chapters data" };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await getChapters("bookId");
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String), {
      headers: { "api-key": expect.any(String) },
    });
  });

  it("se deberia poder generar un pasage ramdom", async () => {
    const mockData = { data: "random passage data" };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await getRamdonPassage("passageId");
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String), {
      headers: { "api-key": expect.any(String) },
    });
  });

  it("deberia obtener versos de los capitulos", async () => {
    const mockData = { data: { content: "chapter content" } };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await loadChapterVersesFromAPI("chapterId");
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String), {
      headers: { "api-key": expect.any(String) },
    });
  });

  it("deberia buscar por medio de una query", async () => {
    const mockData = { data: "search results" };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await searchBible("query");
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String), {
      headers: { "api-key": expect.any(String) },
      params: { query: "query", limit: 10 },
    });
  });
});
