import React, { useEffect, useState } from 'react'

import { useUserStore } from '../context/userStore';
import useUserUpdate from '../hooks/useUserUpdate';

import { FaUserCircle } from "react-icons/fa";
import { FaFingerprint } from "react-icons/fa";
import { BsFillInfoSquareFill } from "react-icons/bs";

const AccountUpdateForm = () => {

  const { authUser } = useUserStore()
  const [username, setUsername] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [bio, setBio] = useState('')
  const [coverFile, setCoverFile] = useState(null)
  const [profileFile, setProfileFile] = useState(null)
  const { loading, updateUser } = useUserUpdate()

  useEffect(() => {
    if (authUser) {
      setUsername(authUser.username)
      setBio(authUser.bio)
    }
  }, [authUser])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userUpdateInfos = {
      username: username.length ? username : null,
      oldPassword: oldPassword.length ? oldPassword : null,
      newPassword: newPassword.length ? newPassword : null,
      bio,
      coverImg: coverFile,
      profileImg: profileFile
    }

    await updateUser(userUpdateInfos)
  }

  return (
    <form name='user-account-update-form' className='px-4 pb-4 lg:px-8 flex flex-col gap-2' onSubmit={e => { handleSubmit(e) }}>
      <h2 className="text-xl font-bold">Account info:</h2>
      <div className="divider my-0"></div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text flex items-center gap-1">
            <FaUserCircle className='text-primary' />
            Username:
          </span>
        </div>
        <input
          name='username-input'
          type="text"
          placeholder="username"
          className="input input-bordered w-full"
          value={username}
          onChange={e => { setUsername(e.target.value) }}
        />
      </label>
      <div className="flex flex-col md:flex-row gap-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text flex items-center gap-1">
              <FaFingerprint className='text-primary' />
              Old password:
            </span>
          </div>
          <input
            name='old-password-input'
            type="text"
            placeholder="old password"
            className="input input-bordered w-full"
            value={oldPassword}
            onChange={e => { setOldPassword(e.target.value) }}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text flex items-center gap-1">
              <FaFingerprint className='text-primary' />
              New password:
            </span>
          </div>
          <input
            name='new-password-input'
            type="text"
            placeholder="new password"
            className="input input-bordered w-full"
            value={newPassword}
            onChange={e => { setNewPassword(e.target.value) }}
          />
        </label>
      </div>
      <label className="form-control">
        <div className="label">
          <span className="label-text flex items-center gap-1">
            <BsFillInfoSquareFill className='text-primary' />
            Your bio:
          </span>
        </div>
        <textarea
          className="textarea textarea-bordered h-36"
          placeholder="bio"
          name='bio-input'
          value={bio}
          onChange={e => { setBio(e.target.value) }}
        ></textarea>
      </label>
      <div className="divider my-0"></div>
      <ul className="list list-disc marker:text-red-600">
        <span className='font-semibold pb-2 block'>note:</span>
        <li className="list-item ms-4 text-xs">
          if you dont want to update your password, leave password fields blank.
        </li>
        <li className="list-item ms-4 text-xs">
          preferred profile picture size is 100x100 px, max 2MB.
        </li>
        <li className="list-item ms-4 text-xs">
          preferred cover picture size is 850x300 px, max 5MB.
        </li>
      </ul>
      <div className="flex flex-wrap gap-2 mt-4">
        <label htmlFor='profile-img-file' className={`btn btn-sm btn-accent ${!profileFile ? 'btn-outline' : ''}`}>
          {profileFile ? 'Profile image selected' : 'Select new profile image'}
          <input
            type="file"
            name="profile-img-file"
            id="profile-img-file"
            className='hidden'
            onChange={e => { setProfileFile(e.target.files[0] ? e.target.files[0] : null) }}
          />
        </label>
        <label htmlFor='cover-img-file' className={`btn btn-sm btn-secondary ${!coverFile ? 'btn-outline' : ''}`}>
          {coverFile ? 'Cover image selected' : 'Select new cover image'}
          <input
            type="file"
            name="cover-img-file"
            id="cover-img-file"
            className='hidden'
            onChange={e => { setCoverFile(e.target.files[0] ? e.target.files[0] : null) }}
          />
        </label>
        <button type="submit" className="flex items-center gap-2 btn btn-sm btn-success">
          Update info
          {
            loading && <span className="loading loading-spinner loading-sm"></span>
          }
        </button>
      </div>
    </form>
  )
}

export default AccountUpdateForm