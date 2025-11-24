'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

// Conditionally register GSAP plugin only on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ExpertiseCategory {
  title: string
  image: string
  expertises: string[]
}

const useMatchMedia = (query: string): boolean => {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)
    const handleChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [query])
  return matches
}

const IconCross = ({ className, color }: { className?: string; color?: string }) => (
  <svg
    className={className}
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 0L23.09 16.91L40 20L23.09 23.09L20 40L16.91 23.09L0 20L16.91 16.91L20 0Z"
      fill={color || '#ed356d'}
    />
  </svg>
)

const Expertise = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const percentageRef = useRef<HTMLDivElement>(null)
  
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeExpertiseIndex, setActiveExpertiseIndex] = useState(0)
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const [spacerHeight, setSpacerHeight] = useState(0)
  
  const isMobile = useMatchMedia('(max-width: 1024px)')

  const categories: ExpertiseCategory[] = [
    {
      title: 'Creative & Visual Identity',
      image: '/images/expertise-creative.jpg',
      expertises: [
        'BRAND STRATEGY',
        'SOCIAL CREATIVES',
        'BRANDING',
        'PRINT MEDIA',
        'PACKAGING',
        'MOTION DESIGN',
        'UI/UX',
        'WEB DESIGN'
      ]
    },
    {
      title: 'Digital & Web Development',
      image: '/images/expertise-web.jpg',
      expertises: [
        'CUSTOM WEBSITES',
        'E-COMMERCE PLATFORMS',
        'WEB ANIMATION',
        'PROGRESSIVE WEB APPS',
        'API INTEGRATION',
        'SEO OPTIMIZATION',
        'DIGITAL CAMPAIGNS',
        'PERFORMANCE TUNING'
      ]
    },
    {
      title: 'Marketing & Performance',
      image: '/images/expertise-marketing.jpg',
      expertises: [
        'DIGITAL STRATEGY',
        'CONTENT MARKETING',
        'SOCIAL MEDIA',
        'EMAIL CAMPAIGNS',
        'ANALYTICS & INSIGHTS',
        'CONVERSION OPTIMIZATION',
        'BRAND POSITIONING'
      ]
    }
  ]

  // Set spacer height in useEffect
  useEffect(() => {
    if (typeof window !== 'undefined' && !isMobile) {
      setSpacerHeight(window.innerHeight * (categories.length + 1))
    }
  }, [isMobile, categories.length])

  useEffect(() => {
    if (isMobile || !containerRef.current || !lineRef.current || typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char')
        gsap.fromTo(
          chars,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.02,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }

      const totalHeight = window.innerHeight * (categories.length + 1)
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalHeight}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress
            setScrollPercentage(Math.round(progress * 100))
            const newIndex = Math.min(
              Math.floor(progress * categories.length),
              categories.length - 1
            )
            setActiveIndex(newIndex)
            const currentCategory = categories[newIndex]
            const categoryProgress = (progress * categories.length) % 1
            const expertiseIndex = Math.min(
              Math.floor(categoryProgress * currentCategory.expertises.length),
              currentCategory.expertises.length - 1
            )
            setActiveExpertiseIndex(expertiseIndex)
          }
        }
      })

      // Single progress line animation
      mainTimeline.to(progressLineRef.current, {
        height: '100%',
        duration: 1,
        ease: 'none'
      }, 0)

      if (percentageRef.current) {
        mainTimeline.to(percentageRef.current, {
          opacity: 1,
          duration: 0.1,
          ease: 'none'
        }, 0.05)
      }

      // Categories highlighting
      categories.forEach((_, index) => {
        const categoryEl = document.querySelector(`[data-category="${index}"]`)
        if (!categoryEl) return
        const startProgress = index / categories.length
        const endProgress = (index + 1) / categories.length
        mainTimeline.to(
          categoryEl,
          {
            color: '#ffffff',
            fontWeight: 500,
            duration: 0.1,
            ease: 'none'
          },
          startProgress
        )
        if (index < categories.length - 1) {
          mainTimeline.to(
            categoryEl,
            {
              color: '#666666',
              fontWeight: 300,
              duration: 0.1,
              ease: 'none'
            },
            endProgress
          )
        }
      })

      // Domains highlighting with custom color
      categories.forEach((category, catIndex) => {
        category.expertises.forEach((_, expIndex) => {
          const expertiseEl = document.querySelector(
            `[data-expertise="${catIndex}-${expIndex}"]`
          )
          if (!expertiseEl) return
          const categoryStart = catIndex / categories.length
          const categoryDuration = 1 / categories.length
          const expertiseStart = categoryStart + (expIndex / category.expertises.length) * categoryDuration
          const expertiseEnd = categoryStart + ((expIndex + 1) / category.expertises.length) * categoryDuration
          mainTimeline.to(
            expertiseEl,
            {
              color: '#b0a3ff',
              fontWeight: 400,
              scale: 1.07,
              duration: 0.05,
              ease: 'none'
            },
            expertiseStart
          )
          if (expIndex < category.expertises.length - 1) {
            mainTimeline.to(
              expertiseEl,
              {
                color: '#9ca3af',
                fontWeight: 300,
                scale: 1,
                duration: 0.05,
                ease: 'none'
              },
              expertiseEnd
            )
          }
        })
      })

    }, containerRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [isMobile, categories.length])

  const titleText = 'OUR EXPERTISES'

  return (
    <>
      <section className="relative flex flex-col overflow-hidden px-8 py-24">
        <h1 
          ref={titleRef}
          className="relative w-fit text-[#b0a3ff] text-5xl md:text-7xl lg:text-8xl font-bold mb-16 overflow-hidden"
        >
          {titleText.split('').map((char, index) => (
            <span key={index} className="char inline-block">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
          <IconCross 
            className="absolute -right-10 bottom-0 hidden md:block" 
            color="#ed356d" 
          />
        </h1>
        {!isMobile ? (
          <>
            <div 
              ref={containerRef}
              className="grid grid-cols-3 gap-12 items-center w-full max-w-7xl mx-auto min-h-screen"
            >
              {/* LEFT - Main Topics/Categories */}
              <div className="space-y-8">
                {categories.map((category, index) => (
                  <div
                    key={category.title}
                    data-category={index}
                    className="text-3xl xl:text-4xl transition-all duration-300 cursor-pointer leading-tight"
                    style={{
                      color: activeIndex === index ? '#ffffff' : '#666666',
                      fontWeight: activeIndex === index ? 500 : 300
                    }}
                  >
                    {category.title}
                  </div>
                ))}
              </div>
              {/* CENTER - Image */}
              <div className="flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden"
                  >
                    <Image
                      src={categories[activeIndex].image}
                      alt={categories[activeIndex].title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 rounded-[2rem] border-[3px] border-white/20 pointer-events-none" />
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* RIGHT - Domains/Expertise List with Progress Line */}
              <div className="relative pl-8">
                <div className="space-y-3">
                  {categories[activeIndex].expertises.map((expertise, index) => (
                    <div
                      key={`${activeIndex}-${expertise}`}
                      data-expertise={`${activeIndex}-${index}`}
                      className="text-xl xl:text-2xl font-light transition-all duration-300 cursor-pointer py-2"
                      style={{
                        color: activeExpertiseIndex === index ? '#b0a3ff' : '#9ca3af',
                        fontWeight: activeExpertiseIndex === index ? 400 : 300,
                        transform: activeExpertiseIndex === index ? 'scale(1.07)' : 'scale(1)'
                      }}
                    >
                      {expertise}
                    </div>
                  ))}
                </div>
                {/* Single Vertical Progress Line */}
                <div 
                  ref={lineRef}
                  className="absolute right-0 top-0 w-[2px] h-full bg-gray-800"
                >
                  <div
                    ref={progressLineRef}
                    className="absolute top-0 left-0 w-full h-0 bg-[#b0a3ff]"
                  >
                    {/* Dynamic Percentage */}
                    <div 
                      ref={percentageRef}
                      className="absolute -right-14 text-[#b0a3ff] text-sm font-bold whitespace-nowrap opacity-0"
                      style={{ 
                        top: scrollPercentage > 50 ? '50%' : `${scrollPercentage}%`,
                        transform: 'translateY(-50%)'
                      }}
                    >
                      {scrollPercentage}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {spacerHeight > 0 && <div style={{ height: `${spacerHeight}px` }} />}
          </>
        ) : (
          <div className="space-y-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                className="border-b border-gray-800 pb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full text-left"
                >
                  <h3 className="text-2xl font-light text-[#b0a3ff] mb-4">
                    {category.title}
                  </h3>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedIndex === index ? 'auto' : 0,
                    opacity: expandedIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden"
                >
                  <div className="space-y-6">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-3">
                      {category.expertises.map((expertise) => (
                        <div
                          key={expertise}
                          className="text-lg font-light text-[#b0a3ff]"
                        >
                          {expertise}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}

export default Expertise
