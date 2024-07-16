import React, { useState } from 'react'

import RecoverForm from '../components/RecoverForm';

import { TfiReload } from "react-icons/tfi";

import recoverImg from '../assets/recover.svg'

const Recover = () => {

  return (
    <section className='w-full max-w-6xl mx-auto my-6 p-2'>
      <div className="bg-base-200 p-4 rounded-box md:p-8">
        <div className="flex items-center justify-center gap-2 font-bold mb-6 text-2xl md:justify-start lg:text-3xl">
          <TfiReload className='text-amber-500' />
          <h5>Recover</h5>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1 bg-base-300 rounded-box">
            <img className='w-full block' src={recoverImg} alt="" />
          </div>
          <div className='flex-1 overflow-x-hidden'>
            <div className="flex flex-col">
              <RecoverForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Recover