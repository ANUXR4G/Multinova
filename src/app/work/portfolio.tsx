'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Project {
  id: string
  title: string
  description: string
  image: string
  category: string
  previewUrl: string
  tags: string[]
}

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('web') // Changed from 'all' to 'web'

  const categories = [
    { id: 'web', label: 'Web Development' },
    { id: 'design', label: 'UI/UX Design' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'branding', label: 'Branding' }
  ]

  const projects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce solution built with Next.js, featuring seamless checkout and inventory management.',
      image: '/images/project-1.jpg',
      category: 'web',
      previewUrl: 'https://example.com/project1',
      tags: ['Next.js', 'React', 'Tailwind']
    },
    {
      id: '2',
      title: 'Brand Identity Design',
      description: 'Complete brand identity package including logo, color palette, and brand guidelines for a tech startup.',
      image: '/images/project-2.jpg',
      category: 'branding',
      previewUrl: 'https://example.com/project2',
      tags: ['Branding', 'Logo', 'Design']
    },
    {
      id: '3',
      title: 'Fitness Tracking App',
      description: 'Mobile app for tracking workouts, nutrition, and progress with social features and AI coaching.',
      image: '/images/project-3.jpg',
      category: 'mobile',
      previewUrl: 'https://example.com/project3',
      tags: ['React Native', 'Mobile', 'AI']
    },
    {
      id: '4',
      title: 'Dashboard UI Kit',
      description: 'Comprehensive dashboard UI kit with 50+ components and dark/light mode support.',
      image: '/images/project-4.jpg',
      category: 'design',
      previewUrl: 'https://example.com/project4',
      tags: ['Figma', 'UI Kit', 'Components']
    },
    {
      id: '5',
      title: 'Portfolio Website',
      description: 'Creative portfolio website with stunning animations and smooth transitions built with Framer Motion.',
      image: '/images/project-5.jpg',
      category: 'web',
      previewUrl: 'https://example.com/project5',
      tags: ['Next.js', 'Framer Motion', 'GSAP']
    },
    {
      id: '6',
      title: 'Restaurant Booking App',
      description: 'Seamless restaurant discovery and booking platform with real-time availability and reviews.',
      image: '/images/project-6.jpg',
      category: 'mobile',
      previewUrl: 'https://example.com/project6',
      tags: ['Flutter', 'Firebase', 'Maps']
    },
    {
      id: '7',
      title: 'SaaS Landing Page',
      description: 'High-converting SaaS landing page with interactive animations and optimized conversion funnels.',
      image: '/images/project-7.jpg',
      category: 'web',
      previewUrl: 'https://example.com/project7',
      tags: ['Next.js', 'TypeScript', 'SEO']
    },
    {
      id: '8',
      title: 'Real Estate Platform',
      description: 'Full-stack real estate platform with property listings, virtual tours, and mortgage calculator.',
      image: '/images/project-8.jpg',
      category: 'web',
      previewUrl: 'https://example.com/project8',
      tags: ['React', 'Node.js', 'PostgreSQL']
    }
  ]

  const filteredProjects = projects.filter(project => project.category === activeCategory)

  return (
    <section className="py-20 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Featured <span className="text-[#b0a3ff]">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore my latest work across web development, design, and mobile applications
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-[#b0a3ff] text-white shadow-lg shadow-[#b0a3ff]/50'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  layout: { duration: 0.3 }
                }}
                className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-[#b0a3ff]/50 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="h-full"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  
                  {/* Overlay on Hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex items-center justify-center"
                  >
                    <motion.a
                      href={project.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 bg-[#b0a3ff] text-white rounded-full font-medium hover:bg-[#9b8fe6] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Preview Project
                    </motion.a>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl font-bold text-white group-hover:text-[#b0a3ff] transition-colors"
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 text-sm line-clamp-3"
                  >
                    {project.description}
                  </motion.p>

                  {/* Tags */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-2"
                  >
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  {/* Bottom Button */}
                  <motion.a
                    href={project.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-[#b0a3ff] transition-colors mt-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    View Details
                  </motion.a>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#b0a3ff]/50 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-xl">No projects found in this category</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Portfolio
