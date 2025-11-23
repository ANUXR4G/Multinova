'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const WhatOurClientsSay = () => {
  const containerRef = useRef(null)
  
  // Track scroll progress with smoother range
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'start 0.2']
  })

  // Add spring physics for ultra-smooth animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    mass: 0.5
  })

  // Word-by-word reveal animation
  const text = "Syncrely has become our go-to resource for crafting exquisite brand identities and designing cutting-edge websites."
  const words = text.split(' ')

  return (
    <div 
      ref={containerRef}
      className="space-y-8 w-11/12 min-[1800px]:max-w-[1600px] max-w-[1200px] mx-auto"
    >
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 1,
          ease: [0.25, 0.4, 0.25, 1]
        }}
        className="text-[18px] sm:text-[24px] min-[1800px]:text-[30px]"
      >
        <span className="text-primaryGreen">✦ </span> What our clients say:
      </motion.p>

      <p className="text-[28px] sm:text-[70px] min-[1800px]:text-[90px] leading-none sm:leading-tight">
        {words.map((word, index) => {
          const start = index / words.length
          const end = start + (1 / words.length)
          
          return (
            <Word 
              key={index} 
              range={[start, end]} 
              progress={smoothProgress}
            >
              {word}
            </Word>
          )
        })}
      </p>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 1.2,
          delay: 0.3,
          ease: [0.25, 0.4, 0.25, 1]
        }}
        className="flex gap-8"
      >
        <Image
          src={'/profile-image.webp'}
          width={60}
          height={60}
          className="rounded-full object-cover"
          alt="Image of Andrew Eltorkey"
        />
        <div>
          <p className="font-semibold text-[18px] tracking-wide">
            Andrew Eltorkey
          </p>
          <p className="text-primaryGrey tracking-wide">Founded of Prosperys</p>
        </div>
      </motion.div>
    </div>
  )
}

// Word component with smoother animations
const Word = ({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0.15, 1])
  const y = useTransform(progress, range, [10, 0])
  
  return (
    <motion.span 
      style={{ opacity, y }}
      className="inline-block mr-[0.25em] will-change-transform"
    >
      {children}
    </motion.span>
  )
}

export default WhatOurClientsSay
