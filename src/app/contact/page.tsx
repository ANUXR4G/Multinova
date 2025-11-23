import React from 'react'
import LightRaysPage from './hero'
import { ProductTeaserCard } from './ProductTeaserCard'
import Footer from '@/components/organisms/Footer/Footer'

function Page() {
  return (
    <div>
        <LightRaysPage />
        <ProductTeaserCard />
        <Footer />
    </div>
  )
}

export default Page