import React, { useEffect, useState } from 'react'

import ProfileLink from './ProfileLink'
import useLinkManager from '../hooks/useLinkManager';

import { FaICursor } from "react-icons/fa";
import { FaLink } from "react-icons/fa";

const AddNewLink = () => {

  const [linkTitle, setLinkTitle] = useState('')
  const [linkOrigin, setLinkOrigin] = useState('')
  const [showInMyProfile, setShowInMyProfile] = useState(true)
  const [ageRestriction, setAgeRestriction] = useState(false)
  const [addedLinks, setAddedLinks] = useState([])
  const { loading, addLink } = useLinkManager()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newLink = await addLink({ linkTitle, linkOrigin, showInMyProfile, ageRestriction })

    if (newLink) {
      setAddedLinks(prev => { return [...prev, newLink] })
      setLinkTitle('')
      setLinkOrigin('')
      setAgeRestriction(false)
      setShowInMyProfile(true)
    }
  }

  return (
    <div className='p-4'>
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-8 px-6 py-4">
        <FaLink className='text-amber-500' />
        Create new link
      </h2>
      <form name='new-link-form' className='flex flex-col gap-4 items-center justify-center' onSubmit={e => { handleSubmit(e) }}>
        <label className="form-control w-full max-w-lg">
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
            className="input input-bordered w-full max-w-lg"
            value={linkTitle}
            onChange={e => { setLinkTitle(e.target.value) }}
          />
        </label>
        <label className="form-control w-full max-w-lg">
          <div className="label">
            <span className="label-text flex items-center gap-1">
              <FaLink className='text-lg text-primary' />
              Link URL:
            </span>
          </div>
          <input
            name='link-url'
            type="text"
            placeholder="Type here the link URL"
            className="input input-bordered w-full max-w-lg"
            value={linkOrigin}
            onChange={e => { setLinkOrigin(e.target.value) }}
          />
        </label>
        <div className="flex flex-wrap justify-between items-center w-full max-w-lg">
          <div className="form-control w-52">
            <label className="label cursor-pointer">
              <span className="label-text">Show in my profile:</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                name='show-in-profile'
                checked={showInMyProfile}
                onChange={e => { setShowInMyProfile(e.target.checked ? true : false) }}
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
                checked={ageRestriction}
                onChange={e => { setAgeRestriction(e.target.checked ? true : false) }}
              />
            </label>
          </div>
        </div>
        <button className="flex items-center gap-1 btn btn-success w-full max-w-60">
          Add link
          {
            loading && <span className="loading loading-spinner loading-sm"></span>
          }
        </button>
      </form>
      <div className="divider text-sm">
        the generated link will appear below
      </div>
      <div className="flex flex-col gap-2">
        {
          addedLinks.length > 0 ?
            (
              addedLinks.map(link => (
                <ProfileLink key={link._id} linkData={link} />
              ))
            )
            :
            (
              <div className="flex flex-col items-center justify-center gap-4 opacity-35">
                <span className='text-3xl'>¯\_(ツ)_/¯</span>
                <span>no link added yet!</span>
              </div>
            )
        }
      </div>
    </div>
  )
}

export default AddNewLink