'use client'
import { motion } from 'framer-motion'
import { CalendarIcon, CheckCircleIcon, ClipboardListIcon } from 'lucide-react'


export default function Feature() {
  return (
    <div>
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-6 bg-indigo-50 rounded-xl"
          >
            <CalendarIcon className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Scheduling</h3>
            <p className="text-gray-600">Organize your tasks with intelligent scheduling and reminders</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-indigo-50 rounded-xl"
          >
            <ClipboardListIcon className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Project Tracking</h3>
            <p className="text-gray-600">Monitor progress and manage projects with ease</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 bg-indigo-50 rounded-xl"
          >
            <CheckCircleIcon className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Task Analytics</h3>
            <p className="text-gray-600">Get insights into your productivity and team performance</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
