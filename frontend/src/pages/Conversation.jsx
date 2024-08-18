import React, { useEffect, useState } from 'react'
import TicketDetailes from '../components/TicketDetailes'
import Messages from '../components/Messages'
import { useParams } from 'react-router-dom'
import GlobalNotFound from '../pages/GlobalNotFound'
import useTicketStore from '../context/ticketStore'

const Conversation = () => {

  const { ticketId } = useParams()
  const { loading, ticket, getSingleTicket } = useTicketStore()

  useEffect(() => {
    if (ticketId) {
      getSingleTicket(ticketId)
    }
  }, [ticketId])

  return (
    <section className='max-w-7xl mx-auto my-6 p-2 min-h-dvh'>
      {
        loading &&
        <div className="flex items-center justify-center">
          <span className="loading loading-lg loading-bars"></span>
        </div>
      }
      {
        !loading && !ticket && <GlobalNotFound />
      }
      {
        ticket &&
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="relative">
            <TicketDetailes />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <Messages />
          </div>
        </div>
      }
    </section>
  )
}

export default Conversation