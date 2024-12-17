# NewsAPI Client

NewsAPI Client is a TypeScript-based client for interacting with the NewsAPI service. It simplifies fetching news articles, top headlines, and news sources while handling API errors gracefully.

### Features

- [x] Configurable with an API key for authentication.
- [x] Fetch top headlines using /v2/top-headlines.
- [x] Search for articles across millions of sources with /v2/everything.
- [x] Retrieve available news sources using /v2/top-headlines/sources.
- [x] Fully typed responses for enhanced developer experience.
- [ ] Robust error handling for API and network issues.

## Installation

This package is hosted on the GitHub Package Registry. To install it, ensure you have the following prerequisites:

#### Prerequisites

1. Node.js: v20 or higher
2. NPM: v10 or higher
3. GitHub Authentication:

   - Authenticate to GitHub by running:

   ```bash
       npm login --registry=https://npm.pkg.github.com --scope=@<your-github-username>

   ```

   - Use your GitHub credentials (or a personal access token with the read:packages scope) for login.

#### Install the Package

To install the package, run:

```bash
    npm install @josh-uvi/newsapi-client
```

## Usage

1. Import the Client:

```ts
import { NewsAPIClient } from "@josh-uvi/newsapi-client";
```

2. Provide Your API Key: You can pass your [NewsAPI key](https://newsapi.org/account) via the constructor:

```ts
const client = new NewsAPIClient("<YOUR_NEWSAPI_KEY>");
```

#### Example Usage in Real Applications

```ts
import { NewsAPIClient } from "@<your-github-username>/newsapi-client";

(async () => {
  const client = new NewsAPIClient("<YOUR_NEWSAPI_KEY>");
  try {
    const headlines = await client.getTopHeadlines({ country: "us" });
    console.log("Top Headlines:", headlines.articles);
  } catch (error) {
    console.error("Error fetching headlines:", error.message);
  }
})();
```

### Fetching Top Headlines

To get the latest top headlines:

```ts
const headlines = await client.getTopHeadlines({ country: "us" });
console.log(headlines.articles);
```

#### Parameters

| Parameter |  Type  |            Description             |
| :-------: | :----: | :--------------------------------: |
|  country  | string | Filter by country (e.g., us, uk).  |
| category  | string | Filter by category (e.g., sports). |
|  sources  | string |       Filter by source IDs.        |

### Searching Everything

To search across all articles:

```ts
const everything = await client.getEverything({ q: "technology" });
console.log(everything.articles);
```

#### Parameters

| Parameter |  Type  |                Description                |
| :-------: | :----: | :---------------------------------------: |
|     q     | string |        Search keywords or phrases.        |
|   from    | string | Start date for the search `(YYYY-MM-DD)`. |
|    to     | string |  End date for the search `(YYYY-MM-DD)`.  |
| language  | string |  Language of the articles (e.g., `en`).   |

### Fetching Sources

To fetch available news sources:

```ts
const sources = await client.getSources();
console.log(sources.sources);
```

#### Parameters

| Parameter |  Type  |              Description              |
| :-------: | :----: | :-----------------------------------: |
| category  | string | Filter by category (e.g., `sports`).  |
| language  | string | Language of the sources (e.g., `en`). |
|  country  | string |  Country of the sources (e.g., us).   |

## Testing

The package includes Jest tests for all functions. To run tests:

1. Install dependencies:

```bash
    npm install
```

2. Run the tests:

```bash
    npm run test
```

> [!NOTE]  
> Tests use Jest's mocking feature to simulate API calls without hitting the actual NewsAPI service.

## Update Package

1. Add git changes

```bash
    git add .
```

2. Commit changes:

```bash
    git commit -s -m "Add new changes"
```

3. Bump the package version with this command:

```bash
    npm run bump
```

> [!IMPORTANT]
> The above command will update/increase the version number of the package.json and package-lock.json files and also commit the changes to git.

4. Push to your fork:

```bash
git push --tags #push tag created from the bump command
git push origin main
```
