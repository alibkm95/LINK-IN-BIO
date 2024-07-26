import React from 'react'

import { FaICursor } from "react-icons/fa";
import { FaLink } from "react-icons/fa";

const UpdateLinkForm = () => {
  return (
    <div className='bg-base-100 p-4 rounded-box shadow-md h-full'>
      <h4 className="text-xl font-bold pb-4 mb-4 border-b border-b-base-content/20">
        Update Link data:
      </h4>
      <form name='update-link-form' className="w-full">
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
          <div className="form-control w-52">
            <label className="label cursor-pointer">
              <span className="label-text">Active or disable:</span>
              <input
                type="checkbox"
                className="toggle toggle-success"
                name='active-link'
              />
            </label>
          </div>
        </div>
        <button className="block btn btn-success w-full max-w-60 mt-6 mx-auto">
          Update
        </button>
      </form>
    </div>
  )
}

export default UpdateLinkForm