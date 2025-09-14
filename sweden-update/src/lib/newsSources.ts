export interface NewsSource {
  id: string;
  name: string;
  rssUrl: string;
}

export const newsSources: NewsSource[] = [
  {
    id: "dn",
    name: "Dagens Nyheter",
    rssUrl: "https://www.dn.se/rss/",
  },
  {
    id: "svd",
    name: "Svenska Dagbladet",
    rssUrl: "https://www.svd.se/?service=rss",
  },
  {
    id: "expressen",
    name: "Expressen",
    rssUrl: "https://feeds.expressen.se/nyheter/",
  },
  {
    id: "svt",
    name: "SVT Nyheter",
    rssUrl: "https://www.svt.se/rss.xml",
  },
  // Note: Could not find RSS feeds for Aftonbladet and Göteborgs-Posten.
];
