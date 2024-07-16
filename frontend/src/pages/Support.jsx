import React, { useState } from 'react'

// import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import supportImg from '../assets/support.svg'

import { PiHeadsetFill } from "react-icons/pi";
import { FaTicketAlt } from "react-icons/fa";
import { BsFillChatRightTextFill } from "react-icons/bs";
// import LoginAlertModal from '../components/LoginAlertModal';

const Support = () => {
  // const { authUser } = useAuthContext()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    // setLoading(true)

    // if (!title.trim().length || !message.trim().length) {
    //   setLoading(false)
    //   return toast.error('required fields are empty!')
    // }

    // if (!authUser) {
    //   return setShowLoginModal(true)
    // }

    // const res = await fetch('/api/ticket', {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ subject: title.trim(), message: message.trim() })
    // })

    // const data = await res.json()

    // if (res.status !== 201) {
    //   setLoading(false)
    //   return toast.error(data.error)
    // }

    // setLoading(false)
    // toast.success('Ticket sent successfully!')
    // return navigate('/panel')
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
        // showLoginModal && <LoginAlertModal onCancel={closeLoginModal} />
      }
    </section>
  )
}

export default Support