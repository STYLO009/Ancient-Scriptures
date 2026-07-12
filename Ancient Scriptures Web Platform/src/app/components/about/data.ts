import { Scripture, TimelineEvent, Stat } from "./types";

export const scriptures: Scripture[] = [
  {
    id: 1,
    name: "Vedas",
    tradition: "Hinduism",
    period: "1500–500 BCE",
    language: "Sanskrit",
    description:
      "The oldest sacred scriptures of Hinduism containing hymns, rituals, philosophy and spiritual knowledge.",
    color: "#D97706",
    icon: "🕉️",
  },
  {
    id: 2,
    name: "Upanishads",
    tradition: "Hinduism",
    period: "800–200 BCE",
    language: "Sanskrit",
    description:
      "Philosophical texts exploring Brahman, Atman and the nature of ultimate reality.",
    color: "#F59E0B",
    icon: "📖",
  },
  {
    id: 3,
    name: "Bible",
    tradition: "Christianity",
    period: "1200 BCE–100 CE",
    language: "Hebrew & Greek",
    description:
      "The sacred scripture of Christianity consisting of the Old and New Testament.",
    color: "#2563EB",
    icon: "✝️",
  },
  {
    id: 4,
    name: "Quran",
    tradition: "Islam",
    period: "610–632 CE",
    language: "Arabic",
    description:
      "The holy book of Islam revealed to Prophet Muhammad, emphasizing faith, morality and guidance.",
    color: "#16A34A",
    icon: "☪️",
  },
  {
    id: 5,
    name: "Tripitaka",
    tradition: "Buddhism",
    period: "3rd Century BCE",
    language: "Pali",
    description:
      "The primary collection of Buddhist teachings consisting of Vinaya, Sutta and Abhidhamma.",
    color: "#9333EA",
    icon: "☸️",
  },
];

export const timeline: TimelineEvent[] = [
  {
    year: "1500 BCE",
    title: "Vedas",
    description: "Composition of the earliest Vedic hymns.",
  },
  {
    year: "800 BCE",
    title: "Upanishads",
    description: "Rise of philosophical inquiry in India.",
  },
  {
    year: "1st Century",
    title: "Bible",
    description: "Formation of the New Testament.",
  },
  {
    year: "610 CE",
    title: "Quran",
    description: "Beginning of the Quranic revelation.",
  },
  {
    year: "Today",
    title: "AI Search",
    description: "Ancient wisdom meets modern artificial intelligence.",
  },
];

export const stats: Stat[] = [
  {
    value: "5000+",
    label: "Years of Wisdom",
  },
  {
    value: "5",
    label: "Major Scriptures",
  },
  {
    value: "4",
    label: "World Religions",
  },
  {
    value: "AI",
    label: "Powered Search",
  },
];