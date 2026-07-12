import { motion } from "motion/react";
import {
  Brain,
  Database,
  Search,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Semantic Search",
    description:
      "The user's question is understood based on meaning rather than keywords.",
    color: "text-blue-400",
  },
  {
    icon: Database,
    title: "Knowledge Retrieval",
    description:
      "Relevant passages are retrieved from scriptures using vector embeddings.",
    color: "text-green-400",
  },
  {
    icon: Brain,
    title: "AI Understanding",
    description:
      "A Large Language Model combines retrieved passages with context.",
    color: "text-yellow-400",
  },
  {
    icon: MessageSquare,
    title: "Trusted Answer",
    description:
      "The user receives an accurate response together with scripture citations.",
    color: "text-orange-400",
  },
];

export default function AISection() {
  return (
    <section className="relative bg-[#050816] py-32 text-white overflow-hidden">

      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-8">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="uppercase tracking-[0.4em] text-yellow-400">
            AI Powered Platform
          </p>

          <h2 className="mt-5 text-5xl font-black">
            How Our AI
            <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-500 bg-clip-text text-transparent">
              Understands Ancient Scriptures
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-400">
            Combining Retrieval-Augmented Generation (RAG), vector
            embeddings and modern Large Language Models to deliver
            reliable scripture-based answers.
          </p>
        </motion.div>

        <div className="mt-24 grid gap-10 md:grid-cols-4">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (

              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
              >

                <div className={`mb-6 ${step.color}`}>
                  <Icon size={48} />
                </div>

                <h3 className="text-2xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-5 leading-8 text-gray-400">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <ArrowRight
                    size={28}
                    className="absolute -right-6 top-1/2 hidden -translate-y-1/2 text-yellow-400 lg:block"
                  />
                )}

              </motion.div>

            );
          })}

        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto mt-24 max-w-5xl rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-10 backdrop-blur-xl"
        >

          <h3 className="text-center text-3xl font-bold">
            Retrieval-Augmented Generation (RAG)
          </h3>

          <p className="mt-6 text-center text-lg leading-9 text-gray-300">
            Instead of generating answers from memory alone, our AI
            first searches authentic scripture sources, retrieves the
            most relevant passages, and then generates responses based
            on those verified texts. This ensures greater accuracy,
            transparency and trustworthiness.
          </p>

        </motion.div>

      </div>

    </section>
  );
}