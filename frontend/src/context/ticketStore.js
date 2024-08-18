import { create } from 'zustand';
import toast from 'react-hot-toast';

const useTicketStore = create((set) => ({
  loading: false,
  userTickets: [],
  ticket: null,

  createTicket: async ({ subject, message }) => {
    set({ loading: true })

    if (!subject.length || !message.length) {
      set({ loading: false })
      toast.error('required fields are empty!')
      return { success: false }
    }

    const res = await fetch('/api/ticket', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, message })
    })

    const data = await res.json()

    if (res.status === 201) {
      set({ loading: false })
      toast.success(data.msg)
      return { success: true }
    }

    set({ loading: false })
    toast.error(data.msg)
    return { success: false }
  },

  getUserTickets: async () => {
    set({ loading: true })

    const res = await fetch('/api/ticket')
    const data = await res.json()

    if (res.status === 200) {
      set({ loading: false, userTickets: data.tickets })
    } else {
      set({ loading: false, userTickets: [] })
    }
  },

  getSingleTicket: async (ticketId) => {
    set({ loading: true })

    const res = await fetch(`/api/ticket/${ticketId}`)
    const data = await res.json()

    if (res.status === 200) {
      set({ loading: false, ticket: data.ticket })
    } else {
      set({ loading: false, ticket: null })
    }
  },

  addNewMessage: async ({ ticketId, message, file }) => {
    set({ loading: true })

    if (!message.length) {
      set({ loading: false })
      return toast.error('required fields are empty!')
    }

    const formData = new FormData()
    formData.append('newMessage', message)
    formData.append('attachment', file)

    const res = await fetch(`/api/ticket/add/${ticketId}`, {
      method: "PATCH",
      body: formData
    })

    const data = await res.json()

    if (res.status === 200) {
      set({ loading: false, ticket: data.ticket })
      return toast.success('New message sent.')
    }

    set({ loading: false })
    return toast.error(data.msg)
  }
}))

export default useTicketStore