"use client"

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "What services do you offer?",
    answer: "We offer a comprehensive range of services including web design, development, branding, and digital marketing solutions. Our team specializes in creating custom solutions tailored to your specific business needs."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on scope and complexity. A simple website typically takes 4-6 weeks, while more complex applications can take 3-6 months. We'll provide a detailed timeline during our initial consultation."
  },
  {
    question: "What is your pricing structure?",
    answer: "Our pricing is project-based and depends on your specific requirements. We offer flexible payment plans and can work within various budget ranges. Contact us for a detailed quote tailored to your needs."
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes! We offer comprehensive support and maintenance packages to ensure your digital presence remains optimal. This includes updates, security patches, performance monitoring, and technical assistance."
  },
  {
    question: "Can you work with existing systems?",
    answer: "Absolutely. We have extensive experience integrating with existing systems and platforms. Whether you need to enhance current infrastructure or migrate to new solutions, we can help seamlessly."
  },
  {
    question: "What technologies do you use?",
    answer: "We use modern, industry-standard technologies including React, Next.js, TypeScript, Tailwind CSS, Node.js, and various cloud platforms. We choose the best tech stack for each project's specific requirements."
  }
]

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400 text-lg">
          Find answers to common questions about our services
        </p>
      </motion.div>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: [0.25, 0.4, 0.25, 1]
            }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-white/8"
          >
            <motion.button
              onClick={() => toggleAccordion(index)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
              className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors duration-300"
            >
              <span className="text-lg md:text-xl font-semibold text-white pr-8">
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.25, 0.4, 0.25, 1],
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-6 h-6 text-gray-400" />
              </motion.div>
            </motion.button>

            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: "auto", 
                    opacity: 1,
                    transition: {
                      height: {
                        duration: 0.5,
                        ease: [0.25, 0.4, 0.25, 1]
                      },
                      opacity: {
                        duration: 0.4,
                        delay: 0.1,
                        ease: [0.25, 0.4, 0.25, 1]
                      }
                    }
                  }}
                  exit={{ 
                    height: 0, 
                    opacity: 0,
                    transition: {
                      height: {
                        duration: 0.4,
                        ease: [0.25, 0.4, 0.25, 1]
                      },
                      opacity: {
                        duration: 0.3,
                        ease: [0.25, 0.4, 0.25, 1]
                      }
                    }
                  }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    exit={{ y: -10 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                    className="px-6 pb-5 text-gray-300 leading-relaxed"
                  >
                    {item.answer}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default FAQAccordion
