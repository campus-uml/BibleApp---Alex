import { API_KEY, API_URL } from "@/constants/api";
import axios from "axios";

const apiKey = API_KEY;
const url = `${API_URL}/v1/bibles/592420522e16049f-01/books`;

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

const getBiblesVerses = async (bookId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/v1/bibles/592420522e16049f-01/books/${bookId}/chapters`,
      {
        headers: {
          "api-key": apiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getBibles, getBiblesVerses };
