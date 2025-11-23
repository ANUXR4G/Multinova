"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"

type ProductTeaserCardProps = {
  imageSrc?: string
}

export const ProductTeaserCard = ({
  imageSrc = "https://storage.googleapis.com/storage.magicpath.ai/user/282171029206482944/assets/882ef3dd-3459-4fd8-a939-52ceada51d5c.png",
}: ProductTeaserCardProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSubmitStatus("success")
    setIsSubmitting(false)
    setFormData({ name: "", email: "", subject: "", message: "" })
    setTimeout(() => setSubmitStatus("idle"), 3000)
  }

  return (
    <div className="w-full">

      <section className="w-full px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1] }}
              className="col-span-12 lg:col-span-6 bg-[#e9e9e9] rounded-[40px] p-12 lg:p-16 flex flex-col justify-center aspect-square overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1], delay: 0.3 }}
                className="mb-8"
              >
                <h2 className="text-[56px] leading-[60px] tracking-tight text-[#202020] mb-4" style={{ fontWeight: "500", fontFamily: "var(--font-figtree), Figtree, sans-serif" }}>
                  Get in Touch
                </h2>
                <p className="text-lg leading-7 text-[#404040]" style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif" }}>
                  Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1], delay: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#202020] mb-2">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-white rounded-2xl border border-[#d0d0d0] focus:border-[#156d95] focus:outline-none focus:ring-2 focus:ring-[#156d95]/20 transition-all duration-200 text-[#202020]" placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#202020] mb-2">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-white rounded-2xl border border-[#d0d0d0] focus:border-[#156d95] focus:outline-none focus:ring-2 focus:ring-[#156d95]/20 transition-all duration-200 text-[#202020]" placeholder="john@example.com" />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#202020] mb-2">Subject</label>
                  <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 bg-white rounded-2xl border border-[#d0d0d0] focus:border-[#156d95] focus:outline-none focus:ring-2 focus:ring-[#156d95]/20 transition-all duration-200 text-[#202020]" placeholder="How can we help?" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#202020] mb-2">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full px-4 py-3 bg-white rounded-2xl border border-[#d0d0d0] focus:border-[#156d95] focus:outline-none focus:ring-2 focus:ring-[#156d95]/20 transition-all duration-200 text-[#202020] resize-none" placeholder="Tell us more about your project..." />
                </div>

                <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: isSubmitting ? 1 : 0.98 }} className="w-full cursor-pointer text-white bg-black rounded-full px-6 py-4 text-base font-medium whitespace-nowrap transition-all duration-200 ease-[cubic-bezier(0.455,0.03,0.515,0.955)] hover:bg-[#125a7a] disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>

                {submitStatus === "success" && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center text-sm text-[#156d95] font-medium">
                    ✓ Message sent successfully!
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center text-sm text-red-600 font-medium">
                    ✗ Something went wrong. Please try again.
                  </motion.div>
                )}
              </motion.form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1], delay: 0.2 }}
              className="col-span-12 lg:col-span-6 bg-white rounded-[40px] flex justify-center items-center aspect-square overflow-hidden relative"
            >
              <Image
                src={imageSrc}
                alt="Contact showcase"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
