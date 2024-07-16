import React, { useState } from 'react'

import { IoFingerPrint } from "react-icons/io5";
import { GoNumber } from "react-icons/go";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

// import useRecover from '../hooks/useRecover';

const RecoverForm = () => {

  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [password, setPassword] = useState('')
  const [disableFind, setDisableFind] = useState(false)
  const [disableReset, setDisableReset] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  // const { loading, findAccount, recover } = useRecover()
  const loading = true //temp
  const navigate = useNavigate()

  const findAccHandler = async (e) => {
    e.preventDefault()

    // if (disableFind) return

    // const { success } = await findAccount({ email })

    // if (success) {
    //   e.target.reset()
    //   setDisableFind(true)
    //   setDisableReset(false)
    // }
  }

  const resetPassHandler = async (e) => {
    e.preventDefault()

    // if (disableReset) return

    // const { success } = await recover({ verificationCode, password })

    // if (success) {
    //   e.target.reset()
    //   navigate('/login')
    // }
  }

  return (
    <div className='min-w-full px-4 pt-8'>
      <span className="text-2xl font-bold block mb-2">
        Find your account:
      </span>
      <form className="pt-2 max-w-96" id="find-acc-form" onSubmit={e => { findAccHandler(e) }}>
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
            value={email}
            onChange={e => { setEmail(e.target.value) }}
            disabled={disableFind ? 'disabled' : ''}
          />
        </label>
        <div className="my-4">
          <button
            type="submit"
            className="flex gap-4 btn btn-primary text-white ms-auto"
            disabled={disableFind ? 'disabled' : ''}
          >
            Find my account
            {
              loading && <span className="loading loading-ring loading-md"></span>
            }
          </button>
        </div>
      </form>
      <span className="text-xl font-bold block mb-2">
        Verify & change your password:
      </span>
      <form id='signup-form' className='pt-2 max-w-96' onSubmit={e => { resetPassHandler(e) }}>
        <div className="flex flex-col gap-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text flex items-center gap-1">
                <GoNumber size={25} className='text-secondary' />
                Insert 6-digit code that sent to you:
              </span>
            </div>
            <input
              type="text"
              name='fullName-input'
              placeholder="******"
              className="input input-bordered input-sm w-full lg:input-md"
              value={verificationCode}
              onChange={e => { setVerificationCode(e.target.value) }}
              disabled={disableReset ? 'disabled' : ''}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="w-full label-text flex items-center gap-1">
                <IoFingerPrint className='text-secondary' />
                Create a new password:
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
              disabled={disableReset ? 'disabled' : ''}
            />
          </label>
        </div>
        <button
          type="submit"
          className="flex gap-4 btn btn-primary text-white mt-4 ms-auto"
          disabled={disableReset ? 'disabled' : ''}
        >
          Submit
          {
            loading && <span className="loading loading-ring loading-md"></span>
          }
        </button>
      </form>
    </div>
  )
}

export default RecoverForm