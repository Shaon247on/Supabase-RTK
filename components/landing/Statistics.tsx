"use client"

import { motion } from 'framer-motion'

export default function Statistics() {
  return (
    <div>
      <section className="py-20 px-4 bg-indigo-900 text-white">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div>
            <motion.h2 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              className="text-5xl font-bold mb-2"
            >
              10k+
            </motion.h2>
            <p className="text-indigo-200">Active Users</p>
          </div>
          <div>
            <motion.h2 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-bold mb-2"
            >
              50k+
            </motion.h2>
            <p className="text-indigo-200">Tasks Completed</p>
          </div>
          <div>
            <motion.h2 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-5xl font-bold mb-2"
            >
              99%
            </motion.h2>
            <p className="text-indigo-200">Satisfaction Rate</p>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
