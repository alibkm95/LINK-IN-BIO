import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../context/userStore';
import useTicket from '../hooks/useTicket';

import LoginAlertModal from '../components/LoginAlertModal';
import supportImg from '../assets/support.svg'

import { PiHeadsetFill } from "react-icons/pi";
import { FaTicketAlt } from "react-icons/fa";
import { BsFillChatRightTextFill } from "react-icons/bs";

const Support = () => {
  const { authUser } = useUserStore()
  const { loading, createTicket } = useTicket()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!authUser) {
      return setShowLoginModal(true)
    }

    const { success } = await createTicket({ subject: title, message })

    if (success) {
      navigate('/panel?AS=tickets')
    }
  }

  const closeLoginModal = () => {
    setShowLoginModal(false)
  }

  return (
    <section className="w-full max-w-6xl mx-auto py-8 px-2  md:px-6">
      <div className="p-6 bg-base-200 rounded-box">
        <div className="flex items-center justify-center gap-2 font-bold mb-6 text-2xl md:justify-start lg:text-3xl">
          <PiHeadsetFill className='text-amber-500' />
          <h5>Support</h5>
        </div>
        <div className="grid grid-cols-1 gap-2 place-items-center md:grid-cols-2">
          <div className="bg-base-300 w-full rounded-box">
            <img src={supportImg} alt="support image" />
          </div>
          <div className='min-w-full px-4 pt-8'>
            <span className="text-2xl font-bold block mb-2">
              Create new ticket :
            </span>
            <form id='ticket-form' className='pt-2 max-w-96' onSubmit={e => { submitHandler(e) }}>
              <div className="flex flex-col gap-2">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text flex items-center gap-1">
                      <FaTicketAlt className='text-secondary' />
                      Tickets title :
                    </span>
                  </div>
                  <input
                    type="text"
                    name='title-input'
                    placeholder="Title ..."
                    value={title}
                    onChange={e => { setTitle(e.target.value) }}
                    className="input input-bordered input-sm w-full lg:input-md"
                  />
                </label>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text flex items-center gap-1">
                      <BsFillChatRightTextFill className='text-secondary' />
                      Message :
                    </span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered h-56"
                    placeholder="Message ..."
                    name='message-box'
                    value={message}
                    onChange={e => { setMessage(e.target.value) }}
                  ></textarea>
                </label>
              </div>
              <button type="submit" className="flex gap-4 btn btn-primary text-white mt-4 ms-auto">
                Submit
                {
                  loading && <span className="loading loading-ring loading-md"></span>
                }
              </button>
            </form>
          </div>
        </div>
      </div>
      {
        showLoginModal && <LoginAlertModal onCancel={closeLoginModal} />
      }
    </section>
  )
}

export default Support