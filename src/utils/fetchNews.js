import { generateNews } from "./generateNews";
import { sampleNews } from "../data/sampleNews"

const API_URL = "https://newsapi.org/v2/top-headlines?country=us&pageSize=5";

export async function fetchNews() {
  try {
    const res = await fetch(`${API_URL}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`);
    const data = await res.json();

    if (!data.articles || data.status !== "ok") {
      console.warn(" NewsAPI returned invalid data, using fallback");
      return [...sampleNews, ...Array.from({ length: 3 }, () => generateNews())];
    }

    const realNews = data.articles.map((item, index) => ({
      id: `real-${index}`,
      title: item.title || "Untitled",
      content: item.description || "No description available.",
      category: item.source?.name || "World",
      image: item.urlToImage || "https://via.placeholder.com/300x200",
      time: new Date().toLocaleTimeString(),
      source: "Live Source",
    }));

   
    const generated = Array.from({ length: 5 }, () => generateNews());
    const mixed = [...realNews, ...sampleNews.slice(0, 3), ...generated];

  
    return mixed.sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error(" Error fetching real news:", error.message);
   
    return [...sampleNews, ...Array.from({ length: 5 }, () => generateNews())];
  }
}
