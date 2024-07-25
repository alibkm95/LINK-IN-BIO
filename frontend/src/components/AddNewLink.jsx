import React from 'react'

import ProfileLink from './ProfileLink'

import { FaICursor } from "react-icons/fa";
import { FaLink } from "react-icons/fa";

const AddNewLink = () => {
  return (
    <div className='p-4'>
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-8 px-6 py-4">
        <FaLink className='text-amber-500' />
        Create new link
      </h2>
      <form name='new-link-form' className='flex flex-col gap-4 items-center justify-center'>
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
                defaultChecked
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
              />
            </label>
          </div>
        </div>
        <button className="btn btn-success w-full max-w-60">
          Add link
        </button>
      </form>
      <div className="divider text-sm">
        the generated link will appear below
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col items-center justify-center gap-4 opacity-35">
          <span className='text-3xl'>¯\_(ツ)_/¯</span>
          <span>no link added yet!</span>
        </div>
        <ProfileLink domain={'npmjs.com'} />
        <ProfileLink domain={'facebook.com'} />
        <ProfileLink domain={'of.com'} />
      </div>
    </div>
  )
}

export default AddNewLink