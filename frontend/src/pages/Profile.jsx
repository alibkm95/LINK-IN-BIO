import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'
import Phone from '../components/Phone'
import UserProfile from '../components/UserProfile'
import ProfileLink from '../components/ProfileLink'
import useUserProfile from '../hooks/useUserProfile'
import GlobalNotFound from './GlobalNotFound'

const Profile = () => {

  const { username } = useParams()
  const { loading, getProfile, profileData } = useUserProfile()

  useEffect(() => {
    getProfile(username)
  }, [username])

  return (
    <section className='max-w-6xl mx-auto my-6 p-2'>
      {
        loading &&
        <div className="flex items-center justify-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      }
      {
        !loading && !profileData && <GlobalNotFound />
      }
      {
        !loading && profileData &&
        <div className="flex gap-4 px-4 md:px-8 lg:px-14">
          <div className="hidden lg:block">
            <Phone user={profileData.user} />
          </div>
          <div className="flex-1 shadow-xl rounded-xl lg:rounded-[50px] overflow-x-hidden bg-base-200">
            <div>
              <UserProfile user={profileData.user} />
            </div>
            <div className="px-4 md:px-8 pb-4">
              {
                profileData.user.bio.length > 0 &&
                <div>
                  <p className="font-semibold my-4">
                    About Me:
                  </p>
                  <p className='px-2'>
                    {
                      profileData.user.bio
                    }
                  </p>
                </div>
              }
              <div className='flex flex-col gap-2 py-6'>
                <p className="text-lg font-semibold">Shared Links:</p>
                {
                  profileData.links.length < 1 &&
                  <div className="flex flex-col items-center justify-center gap-4 opacity-35">
                    <span className='text-3xl'>¯\_(ツ)_/¯</span>
                    <span>No link shared yet!!</span>
                  </div>
                }
                {
                  profileData.links.length >= 1 &&
                  profileData.links.map(link => (
                    <ProfileLink key={link._id} linkData={link} />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      }
    </section>
  )
}

export default Profile