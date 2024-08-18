import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import ControlPanel from '../components/ControlPanel'
import UserAccount from '../components/UserAccount'
import AddNewLink from '../components/AddNewLink'
import UserLinksPanel from '../components/UserLinksPanel'
import UserNotifications from '../components/UserNotifications'
import UserTicketsPanel from '../components/UserTicketsPanel'

const Panel = () => {

  const location = useLocation()
  const panelContainerRef = useRef(null)
  const AS = new URLSearchParams(location.search).get('AS')
  const [activeSection, setActiveSection] = useState(AS ? AS : 'account')

  useEffect(() => {
    setActiveSection(AS ? AS : 'account')
    panelContainerRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [AS])

  return (
    <section className='max-w-7xl mx-auto my-6 p-2 min-h-dvh'>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="relative">
          <ControlPanel activeSection={activeSection} />
        </div>
        <div className="md:col-span-2 lg:col-span-3" ref={panelContainerRef}>
          <div className="bg-base-200 rounded-box overflow-x-hidden shadow-lg h-full">
            {
              activeSection === 'account' && <UserAccount />
            }
            {
              activeSection === 'newLink' && <AddNewLink />
            }
            {
              activeSection === 'myLinks' && <UserLinksPanel />
            }
            {
              activeSection === 'notifications' && <UserNotifications />
            }
            {
              activeSection === 'tickets' && <UserTicketsPanel />
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Panel