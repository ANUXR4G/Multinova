'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const StepNumber = ({ step }: { step: string }) => {
  return (
    <motion.span 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      className="rounded-full py-3 bg-[#0c070c] px-4 text-white font-medium text-[20px] block z-10 relative"
    >
      {step}
    </motion.span>
  )
}

// Word component for smooth reveal
const Word = ({ children, range, progress }: { children: string, range: number[], progress: any }) => {
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

// Text reveal component
const TextReveal = ({ text, className }: { text: string, className?: string }) => {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'start 0.2']
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    mass: 0.5
  })

  const words = text.split(' ')

  return (
    <span ref={containerRef} className={className}>
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
    </span>
  )
}

const Process = () => {
  const lineContainerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: lineContainerRef,
    offset: ['start 0.7', 'end 0.3']
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="py-16 lg:py-36 bg-white rounded-[32px] w-11/12 m-auto">
      <main className="pl-[5%] m-auto space-y-20 lg:space-y-40">
        <h1 className="text-black text-[35px] lg:text-[50px] xl:text-[100px] w-full leading-none pr-[5%]">
          <TextReveal 
            text="The world moves fast, we keep pace. Cut through the noise with" 
          />
          {' '}
          <TextReveal 
            text="our process." 
            className="text-[#b0a3ff]"
          />
        </h1>
        <div className="flex justify-between text-black relative">
          <div className="lg:w-1/2 flex gap-4 lg:gap-16 h-fit z-20">
            {/* Single continuous line container */}
            <div ref={lineContainerRef} className="flex flex-col items-center text-black relative">
              {/* Background line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-gray-300"></div>
              
              {/* Animated progress line */}
              <motion.div
                style={{ height: lineHeight }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#0c070c] origin-top"
              ></motion.div>

              {/* Step numbers positioned over the line */}
              <StepNumber step={'01'} />
              <div className="h-[150px] md:h-[400px]"></div>
              <StepNumber step={'02'} />
              <div className="h-[150px] md:h-[400px]"></div>
              <StepNumber step={'03'} />
            </div>

            <div className="flex justify-between items-stretch flex-col -my-2">
              <span className="h-[210px] lg:h-[450px]">
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 1,
                    ease: [0.25, 0.4, 0.25, 1]
                  }}
                  className="text-[25px] sm:text-[70px] font-medium text-black"
                >
                  Subscribe
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 1,
                    delay: 0.2,
                    ease: [0.25, 0.4, 0.25, 1]
                  }}
                  className="text-sm sm:text-[22px] max-w-[500px] tracking-wide leading-snug text-black"
                >
                  Choose a plan and get started with your first design request
                  right away. We&apos;ll invite you to your Trello board and a
                  private Slack channel for effective collaboration.
                </motion.p>
              </span>
              <span className="h-[210px] lg:h-[450px]">
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 1,
                    ease: [0.25, 0.4, 0.25, 1]
                  }}
                  className="text-[25px] sm:text-[70px] font-medium text-black"
                >
                  Receive
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 1,
                    delay: 0.2,
                    ease: [0.25, 0.4, 0.25, 1]
                  }}
                  className="text-sm sm:text-[22px] max-w-[500px] tracking-wide leading-snug text-black"
                >
                  Expect your designs to be delivered consistently within 2-3
                  business days on average. Review designs and submit revisions
                  if needed.
                </motion.p>
              </span>
              <span className="">
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 1,
                    ease: [0.25, 0.4, 0.25, 1]
                  }}
                  className="text-[25px] sm:text-[70px] font-medium text-black"
                >
                  Keep Going
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 1,
                    delay: 0.2,
                    ease: [0.25, 0.4, 0.25, 1]
                  }}
                  className="text-sm sm:text-[22px] max-w-[500px] tracking-wide leading-snug text-black"
                >
                  Choose a plan and get started with your first design request
                  right away. We&apos;ll invite you to your Trello board and a
                  private Slack channel for effective collaboration.
                </motion.p>
              </span>
            </div>
          </div>
          <motion.video
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-200px" }}
            transition={{ 
              duration: 1.2,
              ease: [0.25, 0.4, 0.25, 1]
            }}
            width="830"
            height="1200"
            autoPlay
            loop
            muted
            playsInline
            className="overflow-hidden object-cover w-[830px] h-[1200px] hidden min-[1200px]:block -translate-y-10 absolute bottom-0 right-0"
          >
            <source src="/videos/process.mp4" type="video/mp4" />
          </motion.video>
        </div>
      </main>
    </section>
  )
}

export default Process
