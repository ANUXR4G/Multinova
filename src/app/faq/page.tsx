import Header from '@/components/molecules/Header/header'
import Footer from '@/components/organisms/Footer/Footer'
import React from 'react'
import Prism from './prism'
import FAQAccordion from './faq'

function Page() {
  return (
    <div>
        <Header />
        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Prism
    animationType="rotate"
    timeScale={0.5}
    height={3.5}
    baseWidth={5.5}
    scale={3.6}
    hueShift={0}
    colorFrequency={1}
    noise={0.5}
    glow={1}
  />
</div>
<FAQAccordion />
        <Footer />
    </div>
  )
}

export default Page