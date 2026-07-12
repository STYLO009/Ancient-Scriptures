import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#050816] py-36 text-white">

      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-orange-500/10" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-5xl px-8 text-center"
      >

        <Sparkles
          size={60}
          className="mx-auto mb-8 text-yellow-400"
        />

        <h2 className="text-6xl font-black">

          Begin Your

          <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-500 bg-clip-text text-transparent">

            Journey of Wisdom

          </span>

        </h2>

        <p className="mx-auto mt-10 max-w-3xl text-xl leading-9 text-gray-300">

          Explore sacred scriptures, ask meaningful questions,
          compare philosophies and discover timeless wisdom with
          the help of Artificial Intelligence.

        </p>

        <button className="group mt-16 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-10 py-5 text-xl font-bold text-black transition-all hover:scale-105">

          Explore Scriptures

          <ArrowRight className="ml-3 inline transition group-hover:translate-x-1" />

        </button>

      </motion.div>

    </section>
  );
}