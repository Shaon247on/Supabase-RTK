'use client'
import { motion } from 'framer-motion'
import { ChevronDownIcon } from 'lucide-react';


export default function Hero() {
  return (
    <div>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-screen flex flex-col items-center justify-center px-4"
      >
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="text-6xl font-bold text-indigo-900 mb-6"
        >
          TaskMaster Pro
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-700 mb-8 text-center max-w-2xl"
        >
          Streamline your workflow with our intelligent task management solution
        </motion.p>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold"
          >
            Login
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold border-2 border-indigo-600"
          >
            Sign Up
          </motion.button>
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10"
        >
          <ChevronDownIcon className="h-8 w-8 text-indigo-600" />
        </motion.div>
      </motion.section>
    </div>
  );
}
