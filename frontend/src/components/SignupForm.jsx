import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoFingerPrint } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import useSignup from '../hooks/useSignup';

const SignupForm = ({ onStep, userSet }) => {

  const [username, setUsername] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { loading, signup } = useSignup()

  const submitHandler = async (e) => {
    e.preventDefault()
    const { success } = await signup({ username, email: userEmail, password: userPassword })

    if (success) {
      onStep(3)
      userSet(userEmail)
    }
  }

  return (
    <div className='min-w-full px-4 pt-8'>
      <span className="text-2xl font-bold block mb-2">
        Please fill the registration form:
      </span>
      <form id='signup-form' className='pt-2 max-w-96' onSubmit={e => { submitHandler(e) }}>
        <div className="flex flex-col gap-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text flex items-center gap-1">
                <FaUser className='text-secondary' />
                Select a unique username:
              </span>
            </div>
            <input
              type="text"
              name='fullName-input'
              placeholder="Username"
              className="input input-bordered input-sm w-full lg:input-md"
              value={username}
              onChange={e => { setUsername(e.target.value) }}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text flex items-center gap-1">
                <MdEmail className='text-secondary' />
                What is your E-Mail?
              </span>
            </div>
            <input
              type="email"
              name='email-input'
              placeholder="E-Mail"
              className="input input-bordered input-sm w-full lg:input-md"
              value={userEmail}
              onChange={e => { setUserEmail(e.target.value) }}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="w-full label-text flex items-center gap-1">
                <IoFingerPrint className='text-secondary' />
                Create a password:
                <div className="ms-auto">
                  {
                    showPassword &&
                    <IoMdEye
                      size={20}
                      className='cursor-pointer'
                      onClick={() => { setShowPassword(!showPassword) }}
                    />
                  }
                  {
                    !showPassword &&
                    <IoMdEyeOff
                      size={20}
                      className='cursor-pointer'
                      onClick={() => { setShowPassword(!showPassword) }}
                    />
                  }
                </div>
              </span>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password-input'
              placeholder="* * * * * * * *"
              className="input input-bordered input-sm w-full lg:input-md"
              value={userPassword}
              onChange={e => { setUserPassword(e.target.value) }}
            />
          </label>
        </div>
        <span className="text-sm block mt-3">
          Already have an account? <Link to='/login' className='link link-hover text-emerald-600 font-bold'>Login.</Link>
        </span>
        <button type="submit" className="flex gap-4 btn btn-primary text-white mt-4 ms-auto">
          Signup
          {
            loading && <span className="loading loading-ring loading-md"></span>
          }
        </button>
      </form>
    </div>
  )
}

export default SignupForm