import { motion } from "motion/react";
import { Quote } from "lucide-react";

export default function QuoteSection() {
  return (
    <section className="relative overflow-hidden bg-[#07111F] py-32 text-white">

      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/10 blur-[180px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-5xl rounded-[40px] border border-yellow-500/20 bg-white/5 p-16 text-center backdrop-blur-3xl"
      >

        <Quote
          size={70}
          className="mx-auto mb-10 text-yellow-400"
        />

        <h2 className="text-4xl font-black leading-relaxed md:text-5xl">

          "Truth is One.

          <br />

          The wise describe it

          <br />

          in many different ways."

        </h2>

        <p className="mt-10 text-xl text-yellow-300">

          — Rig Veda (Ekam Sat Vipra Bahudha Vadanti)

        </p>

        <div className="mx-auto mt-12 h-1 w-40 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" />

      </motion.div>

    </section>
  );
}