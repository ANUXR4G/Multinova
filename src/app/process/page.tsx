import Header from '@/components/molecules/Header/header'
import Footer from '@/components/organisms/Footer/Footer'
import Process from '@/components/organisms/Process/Process'
import React from 'react'
import Plasma from './plasma'

function Page() {
  return (
    <div className="w-full">
      <Header />
      
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Plasma 
    color="#af9ced"
    speed={0.6}
    direction="forward"
    scale={1.1}
    opacity={0.8}
    mouseInteractive={true}
  />
</div>
      
      <div className="mt-5">
        <Process />
      </div>
      
      <Footer />
    </div>
  )
}

export default Page
