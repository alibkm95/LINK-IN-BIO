import React from 'react'

import Hero from '../components/Hero'
import FreeBanner from '../components/FreeBanner'

const Home = () => {
  return (
    <main className='max-w-7xl mx-auto mt-8'>
      <Hero />
      <FreeBanner />
    </main>
  )
}

export default Home