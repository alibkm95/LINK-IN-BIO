import React, { useState } from 'react'

import { GoNumber } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import useVerify from '../hooks/useVerify';

const Verification = ({ onStep, appliedUser }) => {

  const [verificationCode, setVerificationCode] = useState('')
  const { loading, verify } = useVerify()
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const { success } = await verify({ code: verificationCode, email: appliedUser })

    if (success) {
      onStep(4)
      setTimeout(() => {
        navigate('/panel')
      }, 5000);
    }
  }

  return (
    <div className='min-w-full px-4 pt-8'>
      <span className="text-2xl font-bold block mb-2">
        Please verify your E-Mail:
      </span>
      <p className="">
        Please enter the 6-digit code sent to your email address. If you have not received an email, please check your spam folder.
      </p>
      <form className="pt-2 max-w-96" id="verification-form" onSubmit={e => { submitHandler(e) }}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text flex items-center gap-1">
              <GoNumber size={25} className='text-secondary' />
              Insert 6-digit code:
            </span>
          </div>
          <input
            type="text"
            name='fullName-input'
            placeholder="******"
            className="input input-bordered input-sm w-full lg:input-md"
            value={verificationCode}
            onChange={e => { setVerificationCode(e.target.value) }}
          />
        </label>
        <div className="my-4">
          <button type="submit" className="flex gap-4 btn btn-primary text-white ms-auto">
            Verify
            {
              loading && <span className="loading loading-ring loading-md"></span>
            }
          </button>
        </div>
      </form>
    </div>
  )
}

export default Verification