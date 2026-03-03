// utils/generateNews.js

// ✅ Utility to generate realistic mock news items for fallback/offline mode

// Category-specific Unsplash image pools
const categoryImages = {
  technology: [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  ],
  business: [
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80",
  ],
  sports: [
    "https://images.unsplash.com/photo-1505842465776-3b4953ca4f55?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1508612761958-e931b366b48d?auto=format&fit=crop&w=800&q=80",
  ],
  health: [
    "https://images.unsplash.com/photo-1576765607924-3a56e0d84b68?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1588776814546-5f38c20a6c9f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
  ],
  science: [
    "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80",
  ],
  entertainment: [
    "https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80",
  ],
  world: [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
  ],
};

// Random sentence pool for summaries
const summarySnippets = [
  "Experts say this could redefine the future of the industry.",
  "Analysts predict major changes in the global landscape.",
  "The community has shown mixed reactions to this announcement.",
  "This story continues to develop as new details emerge.",
  "It marks a significant turning point in the current market.",
  "The event has sparked debates across social media platforms.",
  "Insiders hint that this may just be the beginning of a larger shift.",
  "Citizens worldwide are reacting to the unfolding situation.",
  "The government is expected to release an official statement soon.",
  "Analysts are calling this one of the biggest moves in recent history.",
];

// Random sample sources
const sources = [
  "Global Times",
  "Daily Ledger",
  "Morning Wire",
  "TechScope",
  "The Sentinel",
  "Focus Today",
  "Pulse News",
  "NextGen Media",
  "Insight Report",
  "Chronicle Online",
];

// Generate a random item from an array
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generate a readable time string
const randomTime = () => {
  const hoursAgo = Math.floor(Math.random() * 6) + 1; // 1–6 hours ago
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// Generate realistic random title fragments
const titleStarters = [
  "Breaking:",
  "Update:",
  "Exclusive:",
  "Trending Now:",
  "Report:",
  "Developing Story:",
  "Spotlight:",
];
const topics = [
  "AI-powered innovation reshapes the future",
  "World leaders convene for emergency summit",
  "New tech startup achieves billion-dollar valuation",
  "Scientists reveal breakthrough discovery",
  "Sports world reacts to record-breaking performance",
  "Major film franchise announces surprise sequel",
  "Markets surge amid global optimism",
  "Healthcare experts discuss new wellness trend",
];

// ✅ Main Generator Function
export function generateNews() {
  const categories = Object.keys(categoryImages);
  const category = randomItem(categories);
  const image = randomItem(categoryImages[category]);
  const title = `${randomItem(titleStarters)} ${randomItem(topics)}`;
  const content = `${randomItem(summarySnippets)} ${randomItem(summarySnippets)} ${randomItem(summarySnippets)}`;
  const source = randomItem(sources);

  return {
    id: Math.random().toString(36).substring(2, 9),
    title,
    content,
    category: category.charAt(0).toUpperCase() + category.slice(1),
    image,
    time: randomTime(),
    source,
    url: "#",
  };
}
