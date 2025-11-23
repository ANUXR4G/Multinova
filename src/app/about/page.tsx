import Header from '@/components/molecules/Header/header'
import Footer from '@/components/organisms/Footer/Footer'
import React from 'react'
import Orb from './orb'

function Page() {
  return (
    <div>
        <Header />
        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Orb
    hoverIntensity={0.5}
    rotateOnHover={true}
    hue={0}
    forceHoverState={false}
  />
</div>
        <Footer />
    </div>
  )
}

export default Page