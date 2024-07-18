import React from 'react'

import Phone from '../components/Phone'
import UserProfile from '../components/UserProfile'
import ProfileLink from '../components/ProfileLink'

const Profile = () => {
  return (
    <section className='max-w-6xl mx-auto my-6 p-2'>
      <div className="flex gap-4 px-4 md:px-8 lg:px-14">
        <div className="hidden lg:block">
          <Phone />
        </div>
        <div className="flex-1 shadow-xl rounded-xl lg:rounded-[50px] overflow-x-hidden bg-base-200">
          <div>
            <UserProfile />
          </div>
          <div className="px-4 md:px-8 pb-4">
            <div>
              <p className="font-semibold my-4">
                About Me:
              </p>
              <p className='px-2'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem nihil saepe modi, tempore quas odio maiores ex minus quae eius accusamus ipsa quibusdam repellendus fugit asperiores molestias ratione nisi animi in nobis dicta recusandae consectetur repudiandae ullam? Fuga iste dolores nobis. Iusto tempore vitae repellendus, asperiores aperiam veritatis temporibus repellat possimus incidunt soluta provident aut saepe qui, ipsam velit quidem.
              </p>
            </div>
            <div className='flex flex-col gap-2 py-6'>
              <p className="text-lg font-semibold">Shared Links:</p>
              <ProfileLink domain={'npmjs.com'} />
              <ProfileLink domain={'t.me'} />
              <ProfileLink domain={'t.momo'} />
              <ProfileLink domain={'ig.com'} />
              <ProfileLink domain={'instagram.com'} />
              <ProfileLink domain={'google.com'} />
              <ProfileLink domain={'onlyfans.com'} />
              <ProfileLink domain={'github.com'} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile