import React, { useEffect, useState } from 'react'
import { useUserStore } from '../context/userStore';
import toast from 'react-hot-toast';

import { FaEnvelope } from "react-icons/fa";
import { BsFillFileTextFill } from "react-icons/bs";

const ReportLinkModal = ({ onCancel, linkId }) => {

  const { authUser } = useUserStore()
  const [loading, setLoading] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [issue, setIssue] = useState('')

  useEffect(() => {
    if (authUser) {
      setUserEmail(authUser.email)
    }
  }, [authUser])

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!userEmail.length || !issue.length) {
      toast.error('Required fileds must be provided!')
      return onCancel()
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    if (!emailRegex.test(userEmail)) {
      toast.error('Inserted email is not a valid email address!')
      return onCancel()
    }

    setLoading(true)
    const res = await fetch(`/api/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        linkId,
        email: userEmail,
        description: issue
      })
    })

    const data = await res.json()

    if (res.status === 201) {
      setLoading(false)
      toast.success(data.msg)
      return onCancel()
    }

    setLoading(false)
    toast.error(data.msg)
    return onCancel()
  }

  return (
    <dialog
      id="loginAlertModal"
      className="modal modal-open modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Reporting link issues and rule violation by links</h3>
        <div className="modal-action justify-center">
          <div className='w-full'>
            <form name='report-form' className='flex flex-col gap-4' onSubmit={e => submitHandler(e)}>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text flex items-center gap-1">
                    <FaEnvelope className='text-primary' />
                    E-mail:
                  </span>
                </div>
                <input
                  name='email-report'
                  type="text"
                  placeholder='Insert your email...'
                  className="input input-sm input-bordered w-full"
                  value={userEmail}
                  onChange={e => { setUserEmail(e.target.value) }}
                />
              </label>
              <label className="form-control">
                <div className="label">
                  <span className="label-text flex items-center gap-1">
                    <BsFillFileTextFill className='text-primary' />
                    Desrciptions:
                  </span>
                </div>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Describe issues with the link..."
                  name='desc-report'
                  value={issue}
                  onChange={e => { setIssue(e.target.value) }}
                ></textarea>
              </label>
              <div>
                <button
                  type='submit'
                  className="inline-flex items-center gap-2 btn btn-sm text-white bg-emerald-500 hover:bg-emerald-600 ms-2"
                >
                  Report
                  {
                    loading && <span className="loading loading-spinner loading-xs"></span>
                  }
                </button>
                <button
                  type='button'
                  className="btn btn-sm text-white bg-red-500 hover:bg-red-600 ms-2"
                  onClick={onCancel}
                >
                  Cancle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default ReportLinkModal