"use client"
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ClipboardDocumentListIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon 
} from '@heroicons/react/24/outline'

export default function Footer() {
  const footerSections = {
    company: ['About Us', 'Careers', 'Press'],
    product: ['Features', 'Pricing', 'FAQ'],
    resources: ['Blog', 'Documentation', 'Support'],
  }

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="col-span-1 lg:col-span-2"
          >
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <ClipboardDocumentListIcon className="h-8 w-8 text-indigo-400" />
              <span className="text-2xl font-bold">TaskMaster</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Streamline your workflow with our powerful task management solution.
            </p>
            <div className="space-y-4">
              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-center space-x-3 text-gray-400"
              >
                <EnvelopeIcon className="h-5 w-5" />
                <span>contact@taskmaster.com</span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-center space-x-3 text-gray-400"
              >
                <PhoneIcon className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-center space-x-3 text-gray-400"
              >
                <MapPinIcon className="h-5 w-5" />
                <span>123 Task Street, CA 94107</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([title, items], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="col-span-1"
            >
              <h3 className="text-lg font-semibold mb-6 capitalize">{title}</h3>
              <ul className="space-y-4">
                {items.map((item) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 10 }}
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    <Link href="#">{item}</Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-8 border-t border-gray-800 text-center text-gray-400"
        >
          <p>© {new Date().getFullYear()} TaskMaster. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}