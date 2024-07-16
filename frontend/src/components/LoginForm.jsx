import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { MdEmail } from "react-icons/md";
import { IoFingerPrint } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
// import useLogin from '../hooks/useLogin';

const LoginForm = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const loading = false // tepm

  // const { loading, login } = useLogin()

  const submitHandler = async (e) => {
    e.preventDefault()
    // const { success } = await login({ email, password })

    // if (success) navigate('/panel')
  }

  return (
    <div className='min-w-full px-4 pt-8'>
      <span className="text-2xl font-bold block mb-2">
        Please fill the login form:
      </span>
      <form id='signup-form' className='pt-2 max-w-96' onSubmit={e => { submitHandler(e) }}>
        <div className="flex flex-col gap-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text flex items-center gap-1">
                <MdEmail className='text-secondary' />
                Your E-Mail:
              </span>
            </div>
            <input
              type="email"
              name='email-input'
              placeholder="E-Mail"
              className="input input-bordered input-sm w-full lg:input-md"
              value={email}
              onChange={e => { setEmail(e.target.value) }}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="w-full label-text flex items-center gap-1">
                <IoFingerPrint className='text-secondary' />
                Your Password:
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
              value={password}
              onChange={e => { setPassword(e.target.value) }}
            />
          </label>
        </div>
        <span className="text-sm block mt-3">
          Don't have an account? <Link to='/signup' className='link link-hover text-emerald-600 font-bold'>Create new one.</Link>
        </span>
        <span className="text-sm block mt-3">
          Forgot your login info? <Link to='/recover' className='link link-hover text-emerald-600 font-bold'>Recover.</Link>
        </span>
        <button type="submit" className="flex gap-4 btn btn-primary text-white mt-4 ms-auto">
          Login
          {
            loading && <span className="loading loading-ring loading-md"></span>
          }
        </button>
      </form>
    </div>
  )
}

export default LoginForm