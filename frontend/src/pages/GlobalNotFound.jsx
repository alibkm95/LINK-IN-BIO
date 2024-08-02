import React from 'react'
import { Link } from 'react-router-dom'

import NotFoundImage from '../assets/404.svg'

const GlobalNotFound = () => {
  return (
    <div className='min-h-screen p-4 flex items-center justify-center'>
      <div className="w-full max-w-6xl bg-base-300 h-full rounded-box shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div>
            <img className='max-w-md mx-auto' src={NotFoundImage} alt="404" />
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-3xl font-bold md:text-4xl lg:text-5xl">Not Fount !!!</p>
            <p className='text-center md:text-xl lg:text-2xl'>sorry! we could not find any result!!! </p>
            <Link to='/' className='btn btn-success'>
              return to HOME page
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlobalNotFound