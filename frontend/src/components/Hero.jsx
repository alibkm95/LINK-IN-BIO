import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player'

import HeroAnimationData from '../assets/hero.json'

import { PiShootingStarFill } from "react-icons/pi";

const Hero = () => {

  const heroPlayerRef = useRef(null)

  const handlePause = () => {
    heroPlayerRef.current.pauseAnimation()
    // setTimeout(() => {
    //   console.log('here')
    //   heroPlayerRef.current?.pause()
    // }, 5000);
  }

  return (
    <section className='md:pt-4 lg:pt-8'>
      <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-4">
        <div className="p-8 flex flex-col gap-4 items-center text-center md:gap-8">
          <h1 className='text-4xl font-extrabold sm:text-5xl lg:text-7xl text-nowrap'>
            <span className="text-primary">{`{ `}</span>
            Link in bio
            <span className="text-primary">{` }`}</span>
          </h1>
          <p className="max-w-xl mx-auto font-semibold text-lg leading-6 md:leading-8 md:text-2xl lg:leading-10 lg:text-4xl">
            Never change your bio link in your social networks ever again! Create a free account and use our services for 100% free.
          </p>
          <Link to='/panel' className="btn btn-primary transition-all hover:scale-105 w-64 text-xl">
            Get Started
            <PiShootingStarFill />
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <Player
            ref={heroPlayerRef}
            src={HeroAnimationData}
            autoplay={true}
            loop={true}
            onEvent={event => { if (event === 'complete') handlePause() }}
          />
        </div>
      </div>
    </section>
  )
}

export default Hero