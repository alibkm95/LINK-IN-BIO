import React from 'react'

import Hero from '../components/Hero'
import FreeBanner from '../components/FreeBanner'
import Stats from '../components/Stats'

const Home = () => {
  return (
    <main className='max-w-7xl mx-auto mt-8'>
      <Hero />
      <Stats />
      <FreeBanner />
    </main>
  )
}

export default Home