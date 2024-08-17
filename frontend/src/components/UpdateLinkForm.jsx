import React, { useEffect, useState } from 'react'

import useLinkManager from '../hooks/useLinkManager';

import { FaICursor } from "react-icons/fa";
import { FaLink } from "react-icons/fa";

const UpdateLinkForm = ({ link, onRefetch }) => {

  const { loading, updateLink } = useLinkManager()
  const [linkTitle, setLinkTitle] = useState('')
  const [linkOrigin, setLinkOrigin] = useState('')
  const [showInMyProfile, setShowInMyProfile] = useState(false)
  const [ageRestriction, setAgeRestriction] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (link) {
      setLinkTitle(link.title)
      setLinkOrigin(link.longLink)
      setShowInMyProfile(link.showInProfile)
      setAgeRestriction(link.isAgeRestrict)
      setActive(link.isActive)
    }
  }, [link])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { success } = await updateLink({
      linkOrigin,
      linkTitle,
      showInMyProfile,
      ageRestriction,
      active,
      linkId: link._id
    })

    if (success) {
      onRefetch()
    }
  }

  return (
    <div className='bg-base-100 p-4 rounded-box shadow-md h-full'>
      <h4 className="text-xl font-bold pb-4 mb-4 border-b border-b-base-content/20">
        Update Link data:
      </h4>
      {
        !link &&
        <span className="loading loading-bars loading-md"></span>
      }
      {
        link &&
        <form name='update-link-form' className="w-full" onSubmit={e => { handleSubmit(e) }}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text flex items-center gap-1">
                <FaICursor className='text-lg text-primary' />
                Link title:
              </span>
            </div>
            <input
              name='link-title'
              type="text"
              placeholder="Type here the title of link"
              className="input input-bordered w-full"
              value={linkTitle ? linkTitle : ''}
              onChange={e => { setLinkTitle(e.target.value) }}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text flex items-center gap-1">
                <FaLink className='text-lg text-primary' />
                Link origin URL:
              </span>
            </div>
            <input
              name='link-url'
              type="text"
              placeholder="Type here the link URL"
              className="input input-bordered w-full"
              value={linkOrigin}
              onChange={e => { setLinkOrigin(e.target.value) }}
            />
          </label>
          <div className="flex flex-wrap justify-between items-center w-full">
            <div className="form-control w-52">
              <label className="label cursor-pointer">
                <span className="label-text">Show in my profile:</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  name='show-in-profile'
                  checked={showInMyProfile ? true : false}
                  onChange={e => { setShowInMyProfile(e.target.checked) }}
                />
              </label>
            </div>
            <div className="form-control w-52">
              <label className="label cursor-pointer">
                <span className="label-text">Set age restriction:</span>
                <input
                  type="checkbox"
                  className="toggle toggle-secondary"
                  name='age-restriction'
                  checked={ageRestriction ? true : false}
                  onChange={e => { setAgeRestriction(e.target.checked) }}
                />
              </label>
            </div>
            <div className="form-control w-52">
              <label className="label cursor-pointer">
                <span className="label-text">Active or disable:</span>
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  name='active-link'
                  checked={active ? true : false}
                  onChange={e => { setActive(e.target.checked) }}
                />
              </label>
            </div>
          </div>
          <button className="flex items-center gap-2 btn btn-success w-full max-w-60 mt-6 mx-auto">
            Update
            {
              loading && <span className="loading loading-spinner loading-sm"></span>
            }
          </button>
        </form>
      }
    </div>
  )
}

export default UpdateLinkForm