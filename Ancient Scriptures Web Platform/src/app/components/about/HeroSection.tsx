import { motion } from "motion/react";
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  Brain,
  ScrollText,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* Animated Background */}

      <div className="absolute inset-0 overflow-hidden">

        <motion.div
          animate={{
            x: [0, 80, -50, 0],
            y: [0, -80, 60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-yellow-500/20 blur-[140px]"
        />

        <motion.div
          animate={{
            x: [0, -120, 40, 0],
            y: [0, 100, -60, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-orange-500/20 blur-[160px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/10 blur-[180px]"
        />

      </div>

      {/* Floating Symbols */}

      <div className="absolute inset-0 pointer-events-none">

        {[
          "🕉",
          "✝",
          "☪",
          "☸",
          "📜",
          "✨",
          "🪔",
          "🌙",
        ].map((symbol, index) => (

          <motion.div
            key={index}
            className="absolute text-4xl opacity-20"
            initial={{
              y: 50,
              opacity: 0,
            }}
            animate={{
              y: [-30, 30, -30],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 8 + index,
              repeat: Infinity,
              delay: index * 0.5,
            }}
            style={{
              left: `${10 + index * 11}%`,
              top: `${15 + (index % 3) * 25}%`,
            }}
          >
            {symbol}
          </motion.div>

        ))}

      </div>

      {/* Grid */}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Hero */}

      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-8 text-center">

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className="mb-6 flex items-center gap-3 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-6 py-3 backdrop-blur-xl"
        >

          <Sparkles className="h-5 w-5 text-yellow-400" />

          <span className="text-sm tracking-widest uppercase text-yellow-300">

            Ancient Wisdom • Modern Intelligence

          </span>

        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="max-w-6xl text-6xl font-black leading-tight md:text-8xl"
        >

          Discover

          <br />

          <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-500 bg-clip-text text-transparent">

            Ancient Scriptures

          </span>

        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
          }}
          className="mt-10 max-w-4xl text-lg leading-9 text-gray-300 md:text-2xl"
        >

          Journey through the timeless wisdom of the Vedas,
          Upanishads, Bible, Quran and Tripitaka using an
          AI-powered semantic search platform that connects
          humanity's greatest spiritual traditions into one
          intelligent experience.

        </motion.p>
                <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.8,
          }}
          className="mt-14 flex flex-wrap items-center justify-center gap-6"
        >
          <button className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 text-lg font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.45)]">
            <BookOpen className="h-5 w-5" />
            Explore Scriptures
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>

          <button className="group flex items-center gap-3 rounded-full border border-yellow-500/40 bg-white/5 px-8 py-4 text-lg font-semibold backdrop-blur-xl transition-all duration-300 hover:bg-yellow-500/10">
            <Brain className="h-5 w-5 text-yellow-400" />
            Ask AI
          </button>
        </motion.div>

        {/* Glass Cards */}

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.2,
            duration: 0.8,
          }}
          className="mt-24 grid w-full max-w-6xl gap-6 md:grid-cols-3"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
            <ScrollText className="mb-5 h-10 w-10 text-yellow-400" />
            <h3 className="mb-3 text-2xl font-bold">
              Ancient Knowledge
            </h3>
            <p className="leading-8 text-gray-300">
              Explore sacred scriptures preserved across
              civilizations for thousands of years.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
            <Brain className="mb-5 h-10 w-10 text-orange-400" />
            <h3 className="mb-3 text-2xl font-bold">
              AI Powered
            </h3>
            <p className="leading-8 text-gray-300">
              Semantic search and intelligent retrieval
              provide meaningful answers with citations.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
            <Sparkles className="mb-5 h-10 w-10 text-yellow-300" />
            <h3 className="mb-3 text-2xl font-bold">
              Universal Wisdom
            </h3>
            <p className="leading-8 text-gray-300">
              Bringing together the Vedas, Upanishads,
              Bible, Quran and Tripitaka on one platform.
            </p>
          </div>
        </motion.div>

        {/* Stats */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.6,
          }}
          className="mt-20 flex flex-wrap justify-center gap-12"
        >
          {[
            ["5000+", "Years of Wisdom"],
            ["5", "Major Scriptures"],
            ["AI", "Semantic Search"],
            ["24/7", "Instant Insights"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="text-center"
            >
              <h2 className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-5xl font-black text-transparent">
                {value}
              </h2>

              <p className="mt-2 text-gray-400">
                {label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}

        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="mt-24"
        >
          <div className="mx-auto flex h-14 w-8 justify-center rounded-full border border-yellow-500/40">
            <div className="mt-2 h-3 w-3 rounded-full bg-yellow-400" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}