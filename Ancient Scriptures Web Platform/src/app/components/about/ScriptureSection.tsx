import { motion } from "motion/react";
import { scriptures } from "./data";

export default function ScriptureSection() {
  return (
    <section className="relative bg-[#050816] py-32 text-white">

      <div className="mx-auto max-w-7xl px-8">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >

          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-yellow-400">
            Sacred Collections
          </p>

          <h2 className="text-5xl font-black">

            Explore The World's

            <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-500 bg-clip-text text-transparent">
              Greatest Scriptures
            </span>

          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-400">

            Every scripture has shaped civilizations,
            inspired generations and continues to guide millions
            through timeless wisdom.

          </p>

        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {scriptures.map((item, index) => (

            <motion.div

              key={item.id}

              initial={{
                opacity: 0,
                y: 70,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                delay: index * 0.15,
                duration: 0.7,
              }}

              viewport={{ once: true }}

              whileHover={{
                y: -10,
                scale: 1.02,
              }}

              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"

            >

              <div
                className="absolute right-0 top-0 h-40 w-40 rounded-full blur-3xl opacity-30"
                style={{
                  background: item.color,
                }}
              />

              <div
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
                style={{
                  backgroundColor: item.color,
                }}
              >
                {item.icon}
              </div>

              <h3 className="text-3xl font-bold">

                {item.name}

              </h3>

              <p className="mt-2 text-yellow-300">

                {item.tradition}

              </p>

              <div className="mt-6 space-y-3 text-gray-300">

                <p>

                  <span className="font-semibold text-white">
                    Period:
                  </span>{" "}
                  {item.period}

                </p>

                <p>

                  <span className="font-semibold text-white">
                    Language:
                  </span>{" "}
                  {item.language}

                </p>

              </div>

              <p className="mt-6 leading-8 text-gray-400">

                {item.description}

              </p>

              <div className="mt-8">

                <button className="rounded-full border border-yellow-500/40 px-6 py-3 transition hover:bg-yellow-500 hover:text-black">

                  Learn More

                </button>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}