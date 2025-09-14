import { Article } from "@/lib/types";

export function ArticleCard({ article }: { article: Article }) {
  const publicationTime = new Date(article.created).toLocaleString("sv-SE");
  const snippet = article.description.substring(0, 150) + "...";

  return (
    <div className="border rounded-lg p-4 flex flex-col h-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex-grow">
        <h2 className="text-xl font-bold mb-2">{article.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{snippet}</p>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-auto">
        <span>{publicationTime}</span> - <strong>{article.source}</strong>
      </div>
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline mt-4 self-start"
      >
        Read More
      </a>
    </div>
  );
}
