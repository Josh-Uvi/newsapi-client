import { NewsAPIClient } from "../src/NewsAPIClient";
import { config } from "dotenv";

config();

const apiKey = process.env.NEWS_API_KEY;

describe("NewsAPIClient", () => {
  let client: NewsAPIClient;

  beforeAll(() => {
    client = new NewsAPIClient(apiKey);
  });

  it("should fetch top headlines", async () => {
    const response = await client.getTopHeadlines({ country: "us" });
    expect(response.status).toBe("ok");
    expect(response.articles.length).toBeGreaterThan(0);
  });

  it("should fetch everything", async () => {
    const response = await client.getEverything({ q: "technology" });
    expect(response.status).toBe("ok");
    expect(response.articles.length).toBeGreaterThan(0);
  });

  it("should fetch sources", async () => {
    const response = await client.getSources();
    expect(response.status).toBe("ok");
    expect(response.sources.length).toBeGreaterThan(0);
  });

  it("should throw an error if API key is missing", () => {
    expect(() => new NewsAPIClient("")).toThrow("API key is required");
  });
});
