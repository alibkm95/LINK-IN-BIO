import React from 'react'

import ControlPanel from '../components/ControlPanel'
import UserAccount from '../components/UserAccount'
import AddNewLink from '../components/AddNewLink'
import UserLinksPanel from '../components/UserLinksPanel'
import UserNotifications from '../components/UserNotifications'

const Panel = () => {
  return (
    <section className='max-w-7xl mx-auto my-6 p-2 min-h-dvh'>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="relative">
          <ControlPanel />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          <div className="bg-base-200 rounded-box overflow-x-hidden shadow-lg h-full">
            {/* <UserAccount /> */}
            {/* <AddNewLink /> */}
            {/* <UserLinksPanel /> */}
            <UserNotifications />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Panel