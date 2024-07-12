import React from 'react'
import { Link } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player'

import FreeAnimationData from '../assets/free.json'

import { TiUserAdd } from "react-icons/ti";

const FreeBanner = () => {
  return (
    <section className='md:pt-4 lg:pt-8 mt-8'>
      <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-4">
        <div className='flex items-center justify-center'>
          <Player
            className='max-w-md'
            src={FreeAnimationData}
            autoplay={true}
          />
        </div>
        <div className="p-8 flex flex-col gap-4 items-center text-center md:gap-8">
          <h1 className='text-4xl font-extrabold sm:text-5xl lg:text-7xl text-nowrap'>
            <span className="text-secondary">{`% `}</span>
            It's Free
            <span className="text-secondary">{` %`}</span>
          </h1>
          <p className="max-w-xl mx-auto font-semibold text-lg leading-6 md:leading-8 md:text-2xl lg:leading-10 lg:text-4xl">
            Link-In-Bio is free to use and does not charge users any fees. Create a free account, add your social networks and share your profile on your social networks.
          </p>
          <Link to='/panel' className="btn btn-secondary transition-all hover:scale-105 w-64 text-xl">
            Create a free account
            <TiUserAdd />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FreeBanner