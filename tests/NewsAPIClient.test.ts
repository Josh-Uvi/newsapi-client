import axios from "axios";
import { NewsAPIClient } from "../src/NewsAPIClient";
import { config } from "dotenv";

config();

jest.mock("axios", () => {
  return {
    create: jest.fn(() => axios),
    get: jest.fn(() => Promise.resolve()),
  };
});

const mockedAxios = axios as jest.Mocked<typeof axios>;

const apiKey = process.env.NEWS_API_KEY;

describe("NewsAPIClient", () => {
  let client: NewsAPIClient;

  beforeAll(() => {
    client = new NewsAPIClient(apiKey);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if API key is missing", () => {
    expect(() => new NewsAPIClient("")).toThrow("API key is required");
  });

  it("should fetch top headlines", async () => {
    const mockResponse = {
      status: "ok",
      totalResults: 2,
      articles: [
        {
          title: "Article 1",
          description: "Description 1",
          url: "http://example.com/1",
        },
        {
          title: "Article 2",
          description: "Description 2",
          url: "http://example.com/2",
        },
      ],
    };

    // Mock the Axios response
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const response = await client.getTopHeadlines({ country: "us" });
    expect(response.status).toBe("ok");
    expect(response.articles.length).toBe(2);
    expect(response.articles[0].title).toBe("Article 1");

    // Ensure Axios get was called with the correct URL
    expect(mockedAxios.get).toHaveBeenCalledWith("/top-headlines", {
      params: { country: "us" },
    });
  });

  it("should fetch everything", async () => {
    const mockResponse = {
      status: "ok",
      totalResults: 1,
      articles: [
        {
          title: "Tech News",
          description: "AI advancements",
          url: "http://example.com/tech",
        },
      ],
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const response = await client.getEverything({ q: "technology" });
    expect(response.status).toBe("ok");
    expect(response.articles.length).toBe(1);
    expect(response.articles[0].title).toBe("Tech News");

    // Verify the correct endpoint was hit
    expect(mockedAxios.get).toHaveBeenCalledWith("/everything", {
      params: { q: "technology" },
    });
  });

  it("should fetch sources", async () => {
    const mockResponse = {
      status: "ok",
      sources: [
        {
          name: "BBC News",
          description: "AI advancements",
          url: "http://example.com/tech",
        },
      ],
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const response = await client.getSources({ country: "gb" });
    expect(response.status).toBe("ok");
    expect(response.sources.length).toBe(1);
    expect(response.sources[0].name).toBe("BBC News");

    // Verify the correct endpoint was hit
    expect(mockedAxios.get).toHaveBeenCalledWith("/top-headlines/sources", {
      params: { country: "gb" },
    });
  });

  it("should handle API errors gracefully", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    await expect(client.getTopHeadlines({ country: "us" })).rejects.toThrow(
      "Network Error"
    );

    // Ensure Axios get was called with the correct URL
    expect(mockedAxios.get).toHaveBeenCalledWith("/top-headlines", {
      params: { country: "us" },
    });
  });
});
