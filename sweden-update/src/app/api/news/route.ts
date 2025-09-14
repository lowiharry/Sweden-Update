import { NextResponse } from "next/server";
import { newsSources } from "@/lib/newsSources";
import { Article } from "@/lib/types";

// The external API returns a slightly different structure
type ApiArticle = Omit<Article, 'source'>;

interface CacheData {
  data: Article[] | null;
  timestamp: number;
}

// Simple in-memory cache
const cache: CacheData = {
  data: null,
  timestamp: 0,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  const now = Date.now();

  if (cache.data && now - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json(cache.data);
  }

  try {
    const fetchPromises = newsSources.map(async (source) => {
      const response = await fetch(
        `https://morning-earth-19323.herokuapp.com/?feedURL=${source.rssUrl}`
      );
      if (!response.ok) {
        console.error(`Failed to fetch ${source.name}: ${response.statusText}`);
        return [];
      }
      const data: { items: ApiArticle[] } = await response.json();
      // Add source name to each item
      return data.items.map((item) => ({ ...item, source: source.name }));
    });

    const allArticlesNested = await Promise.all(fetchPromises);
    const allArticles: Article[] = allArticlesNested.flat();

    // Sort articles by publication date (newest first)
    allArticles.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

    // Update cache
    cache.data = allArticles;
    cache.timestamp = now;

    return NextResponse.json(allArticles);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
