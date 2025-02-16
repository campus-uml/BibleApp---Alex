import { describe, it, expect, vi, afterEach, Mock } from "vitest";
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
    const apiKey = "38df74b1430e95a95cace0a192e306f4";
    const apiUrl = "https://api.scripture.api.bible/v1/bibles/592420522e16049f-01";

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should fetch bibles", async () => {
        const mockData = { data: "bibles data" };
        (axios.get as Mock).mockResolvedValueOnce({ data: mockData });

        const result = await getBibles();
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(`${apiUrl}/books`, {
            headers: { "api-key": apiKey },
        });
    });

    it("should fetch chapters", async () => {
        const bookId = "test-book-id";
        const mockData = { data: "chapters data" };
        (axios.get as Mock).mockResolvedValueOnce({ data: mockData });

        const result = await getChapters(bookId);
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(`${apiUrl}/books/${bookId}/chapters`, {
            headers: { "api-key": apiKey },
        });
    });

    it("should fetch random passage", async () => {
        const passageId = "test-passage-id";
        const mockData = { data: "random passage data" };
        (axios.get as Mock).mockResolvedValueOnce({ data: mockData });

        const result = await getRamdonPassage(passageId);
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(
            `${apiUrl}/verses/${passageId}?content-type=text`,
            { headers: { "api-key": apiKey } }
        );
    });

    it("should load chapter verses from API", async () => {
        const chapterId = "test-chapter-id";
        const mockData = { data: { content: "chapter content" } };
        (axios.get as Mock).mockResolvedValueOnce({ data: mockData });

        const result = await loadChapterVersesFromAPI(chapterId);
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(
            `${apiUrl}/chapters/${chapterId}`,
            { headers: { "api-key": apiKey } }
        );
    });

    it("should search bible", async () => {
        const query = "test-query";
        const mockData = { data: "search results" };
        (axios.get as Mock).mockResolvedValueOnce({ data: mockData });

        const result = await searchBible(query);
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(
            `${apiUrl}/search?`,
            {
                headers: { "api-key": apiKey },
                params: { query, limit: 10 },
            }
        );
    });


});
