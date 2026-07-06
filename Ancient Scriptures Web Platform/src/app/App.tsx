import { useState, useEffect, useRef } from "react"
import {
  Search, Moon, Sun, Globe, BookOpen, Bookmark, X,
  Menu, ChevronDown, Sparkles, Quote, Heart, ArrowRight, Filter
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

// ── DATA ─────────────────────────────────────────────────────────────────────

const LANGUAGES = [
  { code: "en", name: "English", native: "English" },
  { code: "sa", name: "Sanskrit", native: "संस्कृत" },
  { code: "ar", name: "Arabic", native: "العربية" },
  { code: "he", name: "Hebrew", native: "עִברִית" },
  { code: "el", name: "Greek", native: "Ελληνικά" },
  { code: "la", name: "Latin", native: "Latina" },
  { code: "zh", name: "Chinese", native: "中文" },
  { code: "pi", name: "Pali", native: "Pāli" },
]

const TRADITION_FILTERS = [
  { id: "all", label: "All Traditions" },
  { id: "hindu", label: "Hindu" },
  { id: "buddhist", label: "Buddhist" },
  { id: "christian", label: "Christian" },
  { id: "islamic", label: "Islamic" },
  { id: "taoist", label: "Taoist" },
]

const COLLECTIONS = [
  {
    id: "vedas",
    tradition: "hindu",
    name: "Vedas",
    subtitle: "Ṛigveda · Sāmaveda · Yajurveda · Atharvaveda",
    desc: "The oldest sacred texts of Hinduism — cosmic hymns preserved through millennia of oral tradition, revealing the rhythms of universal order.",
    era: "c. 1500 BCE",
    language: "Sanskrit",
    verses: "20,379",
    img: "photo-1544947950-fa07a98d237f",
    gradientFrom: "#8B3A2A",
    gradientTo: "#4A1A0A",
    badge: "Hindu",
  },
  {
    id: "upanishads",
    tradition: "hindu",
    name: "Upanishads",
    subtitle: "108 Philosophical Dialogues",
    desc: "Late Vedic texts forming the philosophical bedrock of Hinduism, probing the nature of Brahman, Ātman, and the ground of all existence.",
    era: "c. 800–200 BCE",
    language: "Sanskrit",
    verses: "2,000+",
    img: "photo-1507003211169-0a1dd7228f2d",
    gradientFrom: "#5C4A1E",
    gradientTo: "#2E2508",
    badge: "Hindu",
  },
  {
    id: "gita",
    tradition: "hindu",
    name: "Bhagavad Gītā",
    subtitle: "Song of the Lord · 700 Verses",
    desc: "A luminous dialogue between Arjuna and Krishna on the battlefield of Kurukshetra — addressing duty, devotion, and the path to liberation.",
    era: "c. 400 BCE – 200 CE",
    language: "Sanskrit",
    verses: "700",
    img: "photo-1582719508461-905c673771fd",
    gradientFrom: "#6B3A1F",
    gradientTo: "#38200C",
    badge: "Hindu",
  },
  {
    id: "ramayana",
    tradition: "hindu",
    name: "Rāmāyaṇa",
    subtitle: "The Journey of Rāma",
    desc: "Vālmīki's supreme epic tracing the exile and return of Prince Rāma — an enduring allegory of virtue, devotion, and the triumph of dharma.",
    era: "c. 700–400 BCE",
    language: "Sanskrit",
    verses: "24,000",
    img: "photo-1527576539890-dfa815648363",
    gradientFrom: "#8B5E2A",
    gradientTo: "#4A3010",
    badge: "Hindu",
  },
  {
    id: "mahabharata",
    tradition: "hindu",
    name: "Mahābhārata",
    subtitle: "The Great Epic of Bhārata",
    desc: "One of the longest poems ever written — 200,000 verses encompassing the Gītā, exploring dharma, karma, and the full breadth of human nature.",
    era: "c. 400 BCE – 400 CE",
    language: "Sanskrit",
    verses: "200,000+",
    img: "photo-1519681393784-d120267933ba",
    gradientFrom: "#5C2A1E",
    gradientTo: "#2C100A",
    badge: "Hindu",
  },
  {
    id: "bible",
    tradition: "christian",
    name: "Bible",
    subtitle: "Old & New Testament",
    desc: "The sacred scripture of Christianity — from Genesis to Revelation, spanning history, poetry, prophecy, law, and the gospel of Jesus of Nazareth.",
    era: "c. 1200 BCE – 100 CE",
    language: "Hebrew · Greek",
    verses: "31,102",
    img: "photo-1504052434569-70ad5836ab65",
    gradientFrom: "#1E3A5C",
    gradientTo: "#0A1E38",
    badge: "Christian",
  },
  {
    id: "quran",
    tradition: "islamic",
    name: "Qurʾān",
    subtitle: "114 Sūrahs · The Divine Recitation",
    desc: "The holy scripture of Islam — revealed to the Prophet Muḥammad, comprising 6,236 āyāt covering law, ethics, cosmology, and the divine nature.",
    era: "610–632 CE",
    language: "Arabic",
    verses: "6,236",
    img: "photo-1585813849924-0c35feae1fa5",
    gradientFrom: "#1E4A2A",
    gradientTo: "#0A2814",
    badge: "Islamic",
  },
  {
    id: "tripitaka",
    tradition: "buddhist",
    name: "Tipiṭaka",
    subtitle: "The Three Baskets",
    desc: "The canonical scripture of Theravāda Buddhism — Vinaya, Sutta, and Abhidhamma — recording the discourses and discipline of the Awakened One.",
    era: "c. 500–29 BCE",
    language: "Pali",
    verses: "40,000+",
    img: "photo-1528360983277-13d401cdc186",
    gradientFrom: "#2A3A1E",
    gradientTo: "#141E0A",
    badge: "Buddhist",
  },
  {
    id: "tao",
    tradition: "taoist",
    name: "Tao Te Ching",
    subtitle: "The Way and Its Virtue",
    desc: "Lǎozǐ's 81-chapter classic on the nature of Tao — the ineffable force beneath all existence, counseling simplicity, humility, and non-action.",
    era: "c. 600–400 BCE",
    language: "Classical Chinese",
    verses: "81",
    img: "photo-1547981609-4b6bfe67ca0b",
    gradientFrom: "#2A2A3A",
    gradientTo: "#10101E",
    badge: "Taoist",
  },
]

const SCRIPTURE_CARDS = [
  {
    id: 1,
    collection: "Bhagavad Gītā",
    tradition: "Hindu",
    ref: "Chapter 2, Verse 47",
    original: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
    transliteration: "Karmaṇy-evādhikāras te mā phaleṣu kadācana",
    translation: "You have a right to perform your prescribed duties, but you are never entitled to the fruits of your actions. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
    tags: ["karma", "duty", "non-attachment"],
    accentClass: "border-amber-400/30 dark:border-amber-600/20",
    dotClass: "bg-amber-500",
  },
  {
    id: 2,
    collection: "Qurʾān",
    tradition: "Islamic",
    ref: "Al-Baqarah 2:286",
    original: "لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    transliteration: "Lā yukallifu llāhu nafsan illā wusʿahā",
    translation: "Allah does not burden a soul beyond that it can bear. It will have what it earned, and upon it what it has incurred. Our Lord, do not impose blame upon us if we forget or make an error.",
    tags: ["mercy", "strength", "divine will"],
    accentClass: "border-emerald-400/30 dark:border-emerald-600/20",
    dotClass: "bg-emerald-500",
  },
  {
    id: 3,
    collection: "Dhammapada",
    tradition: "Buddhist",
    ref: "Verse 1",
    original: "मनोपुब्बङ्गमा धम्मा मनोसेट्ठा मनोमया",
    transliteration: "Manopubbaṅgamā dhammā, manoseṭṭhā manomayā",
    translation: "Mind is the forerunner of all actions. All deeds are led by mind, created by mind. If one speaks or acts with a corrupt mind, suffering follows, as the wheel follows the hoof of an ox.",
    tags: ["mind", "suffering", "wisdom"],
    accentClass: "border-green-400/30 dark:border-green-600/20",
    dotClass: "bg-green-500",
  },
  {
    id: 4,
    collection: "Gospel of John",
    tradition: "Christian",
    ref: "John 8:12",
    original: "Ἐγώ εἰμι τὸ φῶς τοῦ κόσμου",
    transliteration: "Egō eimi to phōs tou kosmou",
    translation: "I am the light of the world. Whoever follows me will not walk in darkness, but will have the light of life. The truth shall make you free.",
    tags: ["light", "truth", "gospel"],
    accentClass: "border-blue-400/30 dark:border-blue-600/20",
    dotClass: "bg-blue-500",
  },
  {
    id: 5,
    collection: "Tao Te Ching",
    tradition: "Taoist",
    ref: "Chapter 1",
    original: "道可道，非常道。名可名，非常名。",
    transliteration: "Dào kě dào, fēi cháng dào. Míng kě míng, fēi cháng míng.",
    translation: "The Tao that can be named is not the eternal Tao. The name that can be named is not the eternal name. The nameless is the beginning of heaven and earth. The named is the mother of ten thousand things.",
    tags: ["tao", "mystery", "beginning"],
    accentClass: "border-violet-400/30 dark:border-violet-600/20",
    dotClass: "bg-violet-500",
  },
  {
    id: 6,
    collection: "Chāndogya Upaniṣad",
    tradition: "Hindu",
    ref: "Chāndogya 6.8.7",
    original: "तत्त्वमसि",
    transliteration: "Tat tvam asi",
    translation: "Thou art That. The essential nature of the self (Ātman) is identical with the universal consciousness (Brahman). You are not the limited, mortal form — you are the infinite, eternal awareness underlying all existence.",
    tags: ["ātman", "brahman", "identity"],
    accentClass: "border-orange-400/30 dark:border-orange-600/20",
    dotClass: "bg-orange-500",
  },
]

const FEATURED_VERSES = [
  {
    text: "In the beginning God created the heavens and the earth. The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters.",
    ref: "Genesis 1:1–2",
    tradition: "Bible",
    original: "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ",
    lang: "Biblical Hebrew",
  },
  {
    text: "We are what we think. All that we are arises with our thoughts. With our thoughts, we make the world. Speak or act with an impure mind and trouble will follow you as the wheel follows the ox that draws the cart.",
    ref: "Dhammapada, Verse 1",
    tradition: "Tipiṭaka",
    original: "Manopubbaṅgamā dhammā, manoseṭṭhā manomayā",
    lang: "Pali",
  },
  {
    text: "He is the First and the Last, the Manifest and the Hidden, and He has full knowledge of all things. It is He who created the heavens and the earth in six days, then established Himself above the Throne.",
    ref: "Qurʾān 57:3–4",
    tradition: "Qurʾān",
    original: "هُوَ الْأَوَّلُ وَالْآخِرُ وَالظَّاهِرُ وَالْبَاطِنُ",
    lang: "Classical Arabic",
  },
  {
    text: "The Self is indeed Brahman. But through ignorance, people identify it with intellect, mind, senses, passions, and the elements of earth, water, air, space, and fire. This is why one experiences what is pleasant and what is unpleasant.",
    ref: "Bṛhadāraṇyaka Upaniṣad 4.4.5",
    tradition: "Upanishads",
    original: "अयम् आत्मा ब्रह्म",
    lang: "Vedic Sanskrit",
  },
]

const AI_SUGGESTIONS = [
  "Love and compassion across all traditions",
  "The nature of the eternal soul or self",
  "Teachings on suffering and liberation",
  "Creation stories in world scriptures",
  "Prayer and devotion in sacred texts",
  "The path of righteousness and virtue",
  "Divine names and attributes of God",
  "Wisdom on death and the afterlife",
  "Non-violence and peace in ancient texts",
]

const TRADITION_BADGE: Record<string, string> = {
  Hindu: "bg-amber-100 text-amber-900 dark:bg-amber-900/25 dark:text-amber-400",
  Buddhist: "bg-green-100 text-green-900 dark:bg-green-900/25 dark:text-green-400",
  Christian: "bg-blue-100 text-blue-900 dark:bg-blue-900/25 dark:text-blue-400",
  Islamic: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/25 dark:text-emerald-400",
  Taoist: "bg-violet-100 text-violet-900 dark:bg-violet-900/25 dark:text-violet-400",
}

// ── SACRED GEOMETRY ───────────────────────────────────────────────────────────

function Mandala({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" fill="none">
      {[175, 155, 132, 110, 85, 55].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 5" />
      ))}
      {Array.from({ length: 16 }).map((_, i) => (
        <ellipse
          key={`outer-${i}`} cx="200" cy="48" rx="12" ry="36"
          stroke="currentColor" strokeWidth="0.45" opacity="0.65"
          transform={`rotate(${i * 22.5} 200 200)`}
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={`inner-${i}`} cx="200" cy="118" rx="9" ry="26"
          stroke="currentColor" strokeWidth="0.5" opacity="0.55"
          transform={`rotate(${i * 45} 200 200)`}
        />
      ))}
      <polygon
        points="200,135 218,168 254,168 226,190 236,225 200,205 164,225 174,190 146,168 182,168"
        stroke="currentColor" strokeWidth="0.55" opacity="0.45"
      />
      <line x1="200" y1="25" x2="200" y2="375" stroke="currentColor" strokeWidth="0.25" opacity="0.3" />
      <line x1="25" y1="200" x2="375" y2="200" stroke="currentColor" strokeWidth="0.25" opacity="0.3" />
      <line x1="75" y1="75" x2="325" y2="325" stroke="currentColor" strokeWidth="0.2" opacity="0.2" />
      <line x1="325" y1="75" x2="75" y2="325" stroke="currentColor" strokeWidth="0.2" opacity="0.2" />
      <circle cx="200" cy="200" r="5" fill="currentColor" opacity="0.4" />
      <circle cx="200" cy="200" r="12" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
    </svg>
  )
}

function GeoBorder({ className = "", id = "gb0" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 800 32" className={className} aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <pattern id={id} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <rect x="8" y="8" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="0.6" transform="rotate(45 16 16)" />
          <circle cx="16" cy="16" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="16" x2="6" y2="16" stroke="currentColor" strokeWidth="0.35" />
          <line x1="26" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="0.35" />
        </pattern>
      </defs>
      <rect width="800" height="32" fill={`url(#${id})`} />
    </svg>
  )
}

function CornerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true" fill="none">
      <path d="M0 60 L0 0 L60 0" stroke="currentColor" strokeWidth="1" />
      <path d="M0 60 L0 10 L50 10" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
      <circle cx="6" cy="6" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="14" cy="14" r="1.5" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
    </svg>
  )
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────

export default function App() {
  const [dark, setDark] = useState(false)
  const [search, setSearch] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [tradition, setTradition] = useState("all")
  const [lang, setLang] = useState(LANGUAGES[0])
  const [langOpen, setLangOpen] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [verseIndex, setVerseIndex] = useState(0)
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set())
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => setVerseIndex((i) => (i + 1) % FEATURED_VERSES.length), 7000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const filtered = tradition === "all" ? COLLECTIONS : COLLECTIONS.filter((c) => c.tradition === tradition)
  const currentVerse = FEATURED_VERSES[verseIndex]
  const suggestions = search.length > 0
    ? AI_SUGGESTIONS.filter((s) => s.toLowerCase().includes(search.toLowerCase()))
    : AI_SUGGESTIONS.slice(0, 6)

  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setBookmarked((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }
  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  return (
    <div className={dark ? "dark" : ""}>
      <div
        className="min-h-screen bg-background text-foreground transition-colors duration-500"
        style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
      >
        {/* ─── NAVBAR ─────────────────────────────────────────────────────── */}
        <nav className="fixed top-0 inset-x-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 text-primary">
                <Mandala className="w-full h-full" />
              </div>
              <div className="leading-none">
                <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold tracking-tight text-foreground">
                  Scriptura
                </div>
                <div
                  style={{ fontFamily: "'DM Mono', monospace" }}
                  className="hidden sm:block text-[9px] uppercase tracking-[0.25em] text-muted-foreground"
                >
                  Ancient Wisdom
                </div>
              </div>
            </div>

            {/* Desktop links */}
            <div
              className="hidden md:flex items-center gap-8"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {["Collections", "Traditions", "Scholars", "About"].map((l) => (
                <a key={l} href="#" className="text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors">
                  {l}
                </a>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Language picker */}
              <div className="relative hidden sm:block" ref={langRef}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  style={{ fontFamily: "'DM Mono', monospace" }}
                  className="flex items-center gap-1.5 text-[11px] px-3 py-1.5 border border-border rounded text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{lang.native}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1.5 w-48 bg-card border border-border shadow-xl overflow-hidden z-50"
                    >
                      {LANGUAGES.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => { setLang(l); setLangOpen(false) }}
                          style={{ fontFamily: "'DM Mono', monospace" }}
                          className={`w-full text-left px-3 py-2.5 text-[11px] flex items-center justify-between hover:bg-muted transition-colors ${l.code === lang.code ? "text-primary" : "text-foreground"}`}
                        >
                          <span>{l.name}</span>
                          <span className="text-muted-foreground text-xs">{l.native}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme toggle */}
              <button
                onClick={() => setDark(!dark)}
                className="w-9 h-9 flex items-center justify-center border border-border rounded hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                {dark
                  ? <Sun className="w-4 h-4" />
                  : <Moon className="w-4 h-4" />
                }
              </button>

              {/* Mobile menu button */}
              <button
                className="md:hidden w-9 h-9 flex items-center justify-center border border-border rounded hover:bg-muted transition-colors"
                onClick={() => setMobileMenu(!mobileMenu)}
                aria-label="Toggle menu"
              >
                {mobileMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileMenu && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="overflow-hidden border-t border-border md:hidden"
              >
                <div
                  style={{ fontFamily: "'DM Mono', monospace" }}
                  className="px-4 py-4 flex flex-col gap-1"
                >
                  {["Collections", "Traditions", "Scholars", "About"].map((l) => (
                    <a key={l} href="#" className="py-2 text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors">
                      {l}
                    </a>
                  ))}
                  <div className="pt-3 border-t border-border mt-2">
                    <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Language</div>
                    <div className="grid grid-cols-4 gap-1">
                      {LANGUAGES.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => setLang(l)}
                          className={`text-[10px] py-1 px-1.5 border rounded text-center transition-colors ${l.code === lang.code ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
                        >
                          {l.code.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* ─── HERO ───────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
          {/* Background mandala */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Mandala className="w-[900px] h-[900px] text-primary opacity-[0.035]" />
          </div>
          {/* Radial glow */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(196,154,42,0.07),transparent)]" />
          {/* Subtle vignette */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_40%,rgba(26,15,8,0.06)_100%)]" />

          <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
            {/* Eyebrow line */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-accent/40" />
              <span
                style={{ fontFamily: "'DM Mono', monospace" }}
                className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground"
              >
                Ancient Wisdom · Eternal Truth
              </span>
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-accent/40" />
            </div>

            {/* Main heading */}
            <h1
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.05] text-foreground mb-8"
            >
              The Sacred
              <br />
              <em className="text-primary italic">Scriptures</em>
              <br />
              of the World
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed">
              Nine living traditions. Thousands of verses, hymns, and sūtras — in their original languages, with transliterations and translations across eight tongues.
            </p>

            {/* AI Search */}
            <div className="relative max-w-2xl mx-auto mb-16">
              <div
                className={`relative bg-card border transition-all duration-200 shadow-sm ${showSuggestions ? "border-accent/60 shadow-[0_0_0_3px_rgba(196,154,42,0.08)]" : "border-border"}`}
              >
                <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Search by theme, verse, or tradition…"
                  className="w-full bg-transparent pl-11 pr-14 py-4 text-base text-foreground placeholder:text-muted-foreground outline-none"
                  style={{ fontFamily: "'EB Garamond', serif" }}
                />
                <button
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-primary text-primary-foreground hover:opacity-90 transition-opacity rounded-sm"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>

              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-x-0 top-full bg-card border border-t-0 border-accent/50 shadow-xl z-40 overflow-hidden"
                  >
                    <div
                      style={{ fontFamily: "'DM Mono', monospace" }}
                      className="px-4 py-2.5 border-b border-border flex items-center gap-2"
                    >
                      <Sparkles className="w-3 h-3 text-accent" />
                      <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">AI-Powered Suggestions</span>
                    </div>
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        onMouseDown={() => { setSearch(s); setShowSuggestions(false) }}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-muted text-foreground transition-colors flex items-center gap-3 border-b border-border/50 last:border-0"
                      >
                        <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span>{s}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-10 sm:gap-20">
              {[
                { n: "9", label: "Traditions" },
                { n: "300K+", label: "Verses" },
                { n: "8", label: "Languages" },
                { n: "5,000+", label: "Years of History" },
              ].map(({ n, label }) => (
                <div key={label} className="text-center">
                  <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl sm:text-3xl font-bold text-foreground">
                    {n}
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace" }} className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-px h-10 bg-gradient-to-b from-accent/50 to-transparent"
            />
          </div>
        </section>

        {/* Geo divider */}
        <div className="h-8 overflow-hidden">
          <GeoBorder className="w-full h-full text-border/70" id="gb1" />
        </div>

        {/* ─── FEATURED VERSE ─────────────────────────────────────────────── */}
        <section className="py-24 bg-primary/[0.04] relative overflow-hidden">
          <div className="absolute left-0 top-0 w-20 h-20 text-accent/20">
            <CornerOrnament className="w-full h-full" />
          </div>
          <div className="absolute right-0 bottom-0 w-20 h-20 text-accent/20 rotate-180">
            <CornerOrnament className="w-full h-full" />
          </div>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div
              style={{ fontFamily: "'DM Mono', monospace" }}
              className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-10"
            >
              Verse of the Moment
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={verseIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.7, ease: [0.25, 0, 0.25, 1] }}
              >
                <div className="flex justify-center mb-8">
                  <Quote className="w-10 h-10 text-accent/50" />
                </div>
                <blockquote
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-2xl sm:text-3xl lg:text-4xl italic leading-relaxed text-foreground mb-8"
                >
                  &ldquo;{currentVerse.text}&rdquo;
                </blockquote>
                <cite
                  style={{ fontFamily: "'DM Mono', monospace" }}
                  className="not-italic text-xs text-muted-foreground tracking-wider block mb-4"
                >
                  — {currentVerse.ref} · {currentVerse.tradition}
                </cite>
                <div
                  style={{ fontFamily: "'EB Garamond', serif" }}
                  className="text-lg italic text-accent/70"
                >
                  {currentVerse.original}
                </div>
                <div
                  style={{ fontFamily: "'DM Mono', monospace" }}
                  className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-1"
                >
                  {currentVerse.lang}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Indicators */}
            <div className="flex items-center justify-center gap-3 mt-12">
              {FEATURED_VERSES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setVerseIndex(i)}
                  className={`h-px transition-all duration-300 ${i === verseIndex ? "w-10 bg-accent" : "w-4 bg-border hover:bg-muted-foreground"}`}
                  aria-label={`Verse ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Geo divider */}
        <div className="h-8 overflow-hidden">
          <GeoBorder className="w-full h-full text-border/70" id="gb2" />
        </div>

        {/* ─── COLLECTIONS ────────────────────────────────────────────────── */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <div
                  style={{ fontFamily: "'DM Mono', monospace" }}
                  className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-4"
                >
                  Sacred Collection
                </div>
                <h2
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight"
                >
                  Nine Traditions,<br />
                  <em className="italic text-primary">One Source</em>
                </h2>
              </div>
              <p className="text-muted-foreground max-w-sm leading-relaxed text-sm sm:text-base">
                From the banks of the Ganges to the shores of the Mediterranean — humanity&rsquo;s most profound spiritual texts, gathered in reverence.
              </p>
            </div>

            {/* Tradition filter */}
            <div className="flex flex-wrap items-center gap-2 mb-10">
              <Filter className="w-3.5 h-3.5 text-muted-foreground mr-1" />
              {TRADITION_FILTERS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTradition(t.id)}
                  style={{ fontFamily: "'DM Mono', monospace" }}
                  className={`text-[11px] px-4 py-1.5 border transition-all duration-200 uppercase tracking-wider ${
                    tradition === t.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Grid */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {filtered.map((c) => (
                  <motion.article
                    key={c.id}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-card border border-border overflow-hidden cursor-pointer hover:border-accent/40 hover:shadow-md transition-all duration-400"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden" style={{ backgroundColor: c.gradientFrom }}>
                      <img
                        src={`https://images.unsplash.com/${c.img}?w=600&h=300&fit=crop&auto=format&q=80`}
                        alt={c.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: `linear-gradient(to top, ${c.gradientTo}F0 0%, ${c.gradientFrom}80 50%, transparent 100%)` }}
                      />
                      <div className="absolute inset-0 p-4 flex flex-col justify-end">
                        <span
                          style={{ fontFamily: "'DM Mono', monospace" }}
                          className={`self-start text-[8px] uppercase tracking-[0.2em] px-2 py-0.5 mb-2 ${TRADITION_BADGE[c.badge]}`}
                        >
                          {c.badge}
                        </span>
                        <h3
                          style={{ fontFamily: "'Playfair Display', serif" }}
                          className="text-xl font-bold text-white leading-tight"
                        >
                          {c.name}
                        </h3>
                        <p
                          style={{ fontFamily: "'DM Mono', monospace" }}
                          className="text-white/65 text-[10px] mt-0.5"
                        >
                          {c.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                        {c.desc}
                      </p>
                      <div
                        style={{ fontFamily: "'DM Mono', monospace" }}
                        className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground mb-5"
                      >
                        <span>{c.era}</span>
                        <span className="text-border">·</span>
                        <span>{c.verses} verses</span>
                        <span className="text-border">·</span>
                        <span>{c.language}</span>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <button
                          style={{ fontFamily: "'DM Mono', monospace" }}
                          className="flex items-center gap-1.5 text-[11px] text-primary hover:gap-2.5 transition-all uppercase tracking-wider"
                        >
                          Explore
                          <ArrowRight className="w-3 h-3" />
                        </button>
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Geo divider */}
        <div className="h-8 overflow-hidden">
          <GeoBorder className="w-full h-full text-border/70" id="gb3" />
        </div>

        {/* ─── SCRIPTURE CARDS ─────────────────────────────────────────────── */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div
                style={{ fontFamily: "'DM Mono', monospace" }}
                className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-4"
              >
                Sacred Verses
              </div>
              <h2
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-3xl sm:text-4xl font-bold text-foreground"
              >
                Words That Endure
              </h2>
              <p className="text-muted-foreground mt-4 max-w-md mx-auto">
                Tap any card to reveal the full verse, transliteration, and commentary.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {SCRIPTURE_CARDS.map((card) => {
                const isOpen = expandedCard === card.id
                return (
                  <motion.article
                    key={card.id}
                    layout
                    onClick={() => setExpandedCard(isOpen ? null : card.id)}
                    className={`bg-card border overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-md ${card.accentClass}`}
                  >
                    <div className="p-6">
                      {/* Card header */}
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full shrink-0 mt-1 ${card.dotClass}`} />
                          <div>
                            <span
                              style={{ fontFamily: "'DM Mono', monospace" }}
                              className={`text-[8px] uppercase tracking-[0.2em] px-2 py-0.5 ${TRADITION_BADGE[card.tradition]}`}
                            >
                              {card.tradition}
                            </span>
                            <h3
                              style={{ fontFamily: "'Playfair Display', serif" }}
                              className="text-lg font-semibold text-foreground mt-1.5"
                            >
                              {card.collection}
                            </h3>
                            <div
                              style={{ fontFamily: "'DM Mono', monospace" }}
                              className="text-[10px] text-muted-foreground mt-0.5"
                            >
                              {card.ref}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={(e) => toggleLike(card.id, e)}
                            className="p-1.5 hover:bg-muted rounded transition-colors"
                            aria-label="Like"
                          >
                            <Heart className={`w-3.5 h-3.5 transition-colors ${liked.has(card.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                          </button>
                          <button
                            onClick={(e) => toggleBookmark(card.id, e)}
                            className="p-1.5 hover:bg-muted rounded transition-colors"
                            aria-label="Bookmark"
                          >
                            <Bookmark className={`w-3.5 h-3.5 transition-colors ${bookmarked.has(card.id) ? "fill-accent text-accent" : "text-muted-foreground"}`} />
                          </button>
                        </div>
                      </div>

                      {/* Original script */}
                      <div
                        style={{ fontFamily: "'EB Garamond', serif" }}
                        className="text-xl italic text-muted-foreground mb-4 leading-relaxed"
                        dir={card.tradition === "Islamic" ? "rtl" : "ltr"}
                      >
                        {card.original}
                      </div>

                      {/* Translation preview / full */}
                      <p className="text-foreground leading-relaxed">
                        {isOpen ? card.translation : `${card.translation.slice(0, 110)}…`}
                      </p>

                      {/* Expanded section */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-5 pt-5 border-t border-border">
                              <div
                                style={{ fontFamily: "'DM Mono', monospace" }}
                                className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-2"
                              >
                                Transliteration
                              </div>
                              <p
                                style={{ fontFamily: "'EB Garamond', serif" }}
                                className="text-sm italic text-muted-foreground"
                              >
                                {card.transliteration}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Tags */}
                      <div className="flex items-center flex-wrap gap-1.5 mt-5">
                        {card.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{ fontFamily: "'DM Mono', monospace" }}
                            className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-muted text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                        <span
                          style={{ fontFamily: "'DM Mono', monospace" }}
                          className="ml-auto text-[9px] uppercase tracking-wider text-muted-foreground"
                        >
                          {isOpen ? "collapse ↑" : "read more ↓"}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── CTA BAND ────────────────────────────────────────────────────── */}
        <section className="py-20 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Mandala className="w-[600px] h-[600px] text-primary-foreground opacity-[0.04]" />
          </div>
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div
              style={{ fontFamily: "'DM Mono', monospace" }}
              className="text-[9px] uppercase tracking-[0.35em] text-primary-foreground/50 mb-6"
            >
              Begin Your Study
            </div>
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight"
            >
              Wisdom has no<br /><em className="italic">border or creed.</em>
            </h2>
            <p className="text-primary-foreground/70 mb-10 max-w-lg mx-auto leading-relaxed">
              Create a free account to bookmark verses, compare passages across traditions, and follow guided reading paths curated by scholars.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                style={{ fontFamily: "'DM Mono', monospace" }}
                className="px-8 py-3 bg-primary-foreground text-primary text-xs uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
              >
                Start Reading — Free
              </button>
              <button
                style={{ fontFamily: "'DM Mono', monospace" }}
                className="px-8 py-3 border border-primary-foreground/40 text-primary-foreground text-xs uppercase tracking-[0.15em] hover:bg-primary-foreground/10 transition-colors"
              >
                Browse Collections
              </button>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ──────────────────────────────────────────────────────── */}
        <footer className="border-t border-border py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
              {/* Brand */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-7 h-7 text-primary">
                    <Mandala className="w-full h-full" />
                  </div>
                  <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-foreground">
                    Scriptura
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  Bringing the world&rsquo;s sacred wisdom traditions together in a single, reverent digital home — preserved for all who seek.
                </p>
                <div
                  style={{ fontFamily: "'DM Mono', monospace" }}
                  className="flex items-center gap-2 mt-6 text-[10px] text-muted-foreground"
                >
                  <Globe className="w-3 h-3" />
                  <span>Available in {LANGUAGES.length} languages</span>
                </div>
              </div>

              {/* Links */}
              {[
                { heading: "Collections", links: ["Vedas", "Upanishads", "Bhagavad Gītā", "Bible", "Qurʾān", "Tipiṭaka"] },
                { heading: "Explore", links: ["By Theme", "By Era", "By Language", "AI Search", "Comparisons"] },
                { heading: "Community", links: ["Reading Groups", "Annotations", "Scholars", "About Us", "Contact"] },
              ].map(({ heading, links }) => (
                <div key={heading}>
                  <h4
                    style={{ fontFamily: "'DM Mono', monospace" }}
                    className="text-[9px] uppercase tracking-[0.25em] text-foreground mb-4"
                  >
                    {heading}
                  </h4>
                  <ul className="space-y-2.5">
                    {links.map((l) => (
                      <li key={l}>
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <p
                style={{ fontFamily: "'DM Mono', monospace" }}
                className="text-[10px] text-muted-foreground"
              >
                © 2026 Scriptura · Ancient Texts, Eternal Preservation
              </p>
              <div className="flex items-center gap-6">
                {["Privacy", "Terms", "Accessibility", "Open Source"].map((l) => (
                  <a
                    key={l}
                    href="#"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                    className="text-[10px] text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
