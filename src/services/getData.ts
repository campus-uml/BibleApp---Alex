import { API_KEY, API_URL } from "@/constants/api";
import axios from "axios";

const apiKey = API_KEY;
const url = `${API_URL}/v1/bibles/592420522e16049f-01/books`;

interface ChapterResponse {
  data: {
    content: string;
  };
}

const getBibles = async () => {
  try {
    const response = await axios.get(url, {
      headers: {
        "api-key": apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getChapters = async (bookId: string) => {
  try {
    const response = await axios.get(`${url}/${bookId}/chapters`, {
      headers: {
        "api-key": apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching chapters:", error);
  }
};

const getRamdonPassage = async (passageId: string) => {
  try {
    const response = await axios.get(
      `https://api.scripture.api.bible/v1/bibles/592420522e16049f-01/verses/${passageId}?content-type=text`,
      {
        headers: {
          "api-key": apiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching random verse:", error);
  }
};

const loadChapterVersesFromAPI = async (chapterId: string) => {
  try {
    const response = await axios.get<ChapterResponse>(
      `https://api.scripture.api.bible/v1/bibles/592420522e16049f-01/chapters/${chapterId}`,
      {
        headers: {
          "api-key": apiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching chapter content");
  }
};

const searchBible = async (query: string) => {
  try {
    const response = await axios.get(
      `https://api.scripture.api.bible/v1/bibles/592420522e16049f-01/search?`,
      {
        headers: {
          "api-key": apiKey,
        },
        params: {
          query,
          limit: 10,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};

const getAudioVerse = async (verseId: string) => {
  try {
    const response = await axios.get(
      `https://api.scripture.api.bible/v1/bibles/592420522e16049f-01/verses/${verseId}/audio`,
      {
        headers: {
          "api-key": apiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching audio verse:", error);
  }
};

export {
  getBibles,
  getChapters,
  loadChapterVersesFromAPI,
  searchBible,
  getAudioVerse,
  getRamdonPassage,
};
