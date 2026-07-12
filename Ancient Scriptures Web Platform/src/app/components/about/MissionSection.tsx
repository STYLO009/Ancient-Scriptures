import { motion } from "motion/react";
import { Brain, BookOpen, Sparkles, Globe } from "lucide-react";

export default function MissionSection() {
  return (
    <section className="relative overflow-hidden bg-[#07111F] py-32 text-white">

      {/* Background Glow */}

      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-yellow-500/10 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-orange-500/10 blur-[150px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-20 px-8 lg:grid-cols-2">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-5 py-2">

            <Sparkles className="h-4 w-4 text-yellow-400" />

            <span className="text-sm uppercase tracking-widest text-yellow-300">
              Our Mission
            </span>

          </div>

          <h2 className="text-5xl font-black leading-tight">

            Preserving Ancient Wisdom

            <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-500 bg-clip-text text-transparent">

              Through Artificial Intelligence

            </span>

          </h2>

          <p className="mt-8 text-lg leading-9 text-gray-300">

            Humanity has produced countless sacred scriptures,
            each preserving timeless wisdom, philosophy and
            guidance. Yet these texts often remain separated by
            language, geography and tradition.

          </p>

          <p className="mt-6 text-lg leading-9 text-gray-300">

            Our mission is to bring these scriptures together
            into one intelligent platform where anyone can
            search, compare and understand their teachings
            using modern Artificial Intelligence while
            respecting their original context.

          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

              <BookOpen className="mb-4 h-9 w-9 text-yellow-400" />

              <h3 className="mb-2 text-xl font-bold">

                Sacred Knowledge

              </h3>

              <p className="text-gray-400">

                Explore scriptures across multiple religions
                from one unified platform.

              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

              <Globe className="mb-4 h-9 w-9 text-orange-400" />

              <h3 className="mb-2 text-xl font-bold">

                Universal Access

              </h3>

              <p className="text-gray-400">

                Making ancient teachings easier to discover
                for everyone.

              </p>

            </div>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative flex items-center justify-center"
        >

          {/* Big Glass Card */}

          <div className="relative w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-10 backdrop-blur-3xl">

            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-yellow-500/20 blur-3xl" />

            <Brain className="mx-auto h-20 w-20 text-yellow-400" />

            <h3 className="mt-8 text-center text-3xl font-bold">

              AI Wisdom Engine

            </h3>

            <p className="mt-5 text-center leading-8 text-gray-300">

              Semantic Search

              <br />

              Vector Embeddings

              <br />

              Intelligent Retrieval

              <br />

              Context Aware Responses

            </p>

          </div>

          {/* Floating Card */}

          <motion.div

            animate={{
              y: [0, -15, 0],
            }}

            transition={{
              duration: 4,
              repeat: Infinity,
            }}

            className="absolute -left-6 bottom-10 rounded-2xl border border-yellow-500/20 bg-[#0F172A]/90 p-5 backdrop-blur-xl"

          >

            <div className="flex items-center gap-3">

              <Sparkles className="text-yellow-400" />

              <div>

                <p className="font-semibold">

                  AI Assisted Discovery

                </p>

                <p className="text-sm text-gray-400">

                  Ancient Knowledge × Modern Intelligence

                </p>

              </div>

            </div>

          </motion.div>

        </motion.div>

      </div>

    </section>
  );
}