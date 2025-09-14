"use client";

import { useEffect, useState } from "react";
import { ArticleCard } from "@/components/ArticleCard";

interface Article {
  title: string;
  description: string;
  link: string;
  created: number;
  source: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/news");
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      const data = await response.json();
      setArticles(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(); // Fetch immediately on mount
    const interval = setInterval(fetchNews, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (loading) {
    return <main className="container mx-auto p-4">Loading news...</main>;
  }

  if (error) {
    return <main className="container mx-auto p-4">Error: {error}</main>;
  }

  return (
    <main className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.link} article={article} />
        ))}
      </div>
    </main>
  );
}
