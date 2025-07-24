"use client"
import { motion } from 'framer-motion'
export default function CTA() {
  return (
    <div>
      <section className="py-20 px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-indigo-900 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-700 mb-8">Join thousands of teams who trust TaskMaster Pro</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold"
          >
            Start Free Trial
          </motion.button>
        </motion.div>
      </section>
    </div>
  )
}
