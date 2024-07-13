import React, { useRef, useState, useEffect } from 'react'
import Lottie from 'react-lottie-player'

import UpdateAnimationData from '../assets/update.json'

import { BsEmojiSunglassesFill } from "react-icons/bs";

const UpdateBanner = () => {

  const updatePlayerRef = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count === 2) updatePlayerRef.current?.goToAndStop(200, true)
  }, [count])

  return (
    <section className='md:pt-4 lg:pt-8'>
      <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-4">
        <div className="p-8 flex flex-col gap-4 items-center text-center md:gap-8">
          <h1 className='text-4xl font-extrabold sm:text-5xl lg:text-7xl text-nowrap'>
            Up to date <BsEmojiSunglassesFill className='inline text-amber-400 bg-blue-950 rounded-full p-px' />
          </h1>
          <p className="max-w-xl mx-auto font-semibold text-lg leading-6 md:leading-8 md:text-2xl lg:leading-10 lg:text-4xl">
            There is no need to change your profile link in your social networks bio section. just update your links in your panel and Boom, you are good to go!
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Lottie
            ref={updatePlayerRef}
            animationData={UpdateAnimationData}
            play={true}
            loop={true}
            onLoopComplete={() => { setCount(prev => prev + 1) }}
          />
        </div>
      </div>
    </section>
  )
}

export default UpdateBanner