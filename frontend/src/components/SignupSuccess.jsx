import React from 'react'
import { Link } from 'react-router-dom'

const SignupSuccess = () => {
  return (
    <div className='min-w-full px-4 pt-8'>
      <span className="text-2xl font-bold block mb-2">
        🎉 Registeration success 🎉
      </span>
      <p className="">
        Registration completed successfully! Automatic redirection will lead you to your panel. if it not worked please use the button below.
      </p>
      <Link to='/panel' className='btn btn-primary text-white m-4'>
        Go to my panel
      </Link>
    </div>
  )
}

export default SignupSuccess