import axios, { AxiosInstance } from "axios";
import { NewsResponse, SourcesResponse } from "./types";
// add some comments!

export class NewsAPIClient {
  private apiKey: string;
  private client: AxiosInstance;

  constructor(apiKey: string) {
    this.apiKey = apiKey;

    if (!this.apiKey) {
      throw new Error("API key is required");
    }

    this.client = axios.create({
      baseURL: "https://newsapi.org/v2",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  async getTopHeadlines(
    params: Record<string, string | number> = {}
  ): Promise<NewsResponse> {
    const response = await this.client.get("/top-headlines", { params });
    return response.data;
  }

  async getEverything(
    params: Record<string, string | number> = {}
  ): Promise<NewsResponse> {
    const response = await this.client.get("/everything", { params });
    return response.data;
  }

  async getSources(
    params: Record<string, string | number> = {}
  ): Promise<SourcesResponse> {
    const response = await this.client.get("/top-headlines/sources", {
      params,
    });
    return response.data;
  }
}
