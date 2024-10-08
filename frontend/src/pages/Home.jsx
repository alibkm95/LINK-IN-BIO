import React from 'react'

import Hero from '../components/Hero'
import FreeBanner from '../components/FreeBanner'
import Stats from '../components/Stats'
import UpdateBanner from '../components/UpdateBanner'
import FAQ from '../components/FAQ'

const Home = () => {
  return (
    <main className='max-w-7xl mx-auto mt-8'>
      <Hero />
      <Stats />
      <FreeBanner />
      <UpdateBanner />
      <FAQ />
    </main>
  )
}

export default Home