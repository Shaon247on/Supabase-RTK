"use client"
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Supabase', href: '/supabase' },
    { name: 'RTK', href: '/rtk' },
    { name: 'FAQ', href: '/faq' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center space-x-2">
              <ClipboardDocumentListIcon className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-indigo-900">TaskMaster</span>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.1 }}
                  className="relative group"
                >
                  <Link
                    href={link.href}
                    className="text-gray-700 hover:text-indigo-600 font-medium"
                  >
                    {link.name}
                  </Link>
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-indigo-600 font-medium"
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium"
            >
              Sign Up
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}