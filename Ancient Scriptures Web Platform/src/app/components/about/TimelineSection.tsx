import { motion } from "motion/react";
import { timeline } from "./data";

export default function TimelineSection() {
  return (
    <section className="relative overflow-hidden bg-[#07111F] py-32 text-white">

      {/* Background */}

      <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[180px]" />

      <div className="relative mx-auto max-w-6xl px-8">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >

          <p className="mb-4 uppercase tracking-[0.4em] text-yellow-400">

            Journey Through Time

          </p>

          <h2 className="text-5xl font-black">

            A Timeline of

            <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-500 bg-clip-text text-transparent">

              Human Spiritual History

            </span>

          </h2>

        </motion.div>

        <div className="relative">

          {/* Vertical Line */}

          <div className="absolute left-6 top-0 h-full w-1 rounded-full bg-yellow-500/30 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-20">

            {timeline.map((item, index) => (

              <motion.div

                key={index}

                initial={{
                  opacity: 0,
                  y: 50,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: index * .15,
                }}

                viewport={{ once: true }}

                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                } items-center gap-10`}

              >

                {/* Card */}

                <div className="w-full md:w-5/12">

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

                    <h3 className="text-3xl font-bold text-yellow-300">

                      {item.title}

                    </h3>

                    <p className="mt-3 text-lg text-gray-300">

                      {item.description}

                    </p>

                  </div>

                </div>

                {/* Dot */}

                <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#07111F] bg-yellow-500 text-xl font-bold shadow-[0_0_40px_rgba(245,158,11,.6)]">

                  ●

                </div>

                {/* Year */}

                <div className="w-full text-center md:w-5/12">

                  <span className="text-4xl font-black text-yellow-400">

                    {item.year}

                  </span>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}