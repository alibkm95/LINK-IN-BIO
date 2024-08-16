import React, { useState } from 'react'
import toast from 'react-hot-toast'

const useLinkManager = () => {

  const [loading, setLoading] = useState(false)

  const addLink = async (linkData) => {

    const isValidURL = validateURL(linkData.linkOrigin)

    if (!isValidURL) { return null }

    setLoading(true)

    const bodyObj = {
      destinationURL: linkData.linkOrigin,
      title: linkData.linkTitle.length > 0 ? linkData.linkTitle : null,
      showInProfile: linkData.showInMyProfile,
      ageRestriction: linkData.ageRestriction
    }

    const res = await fetch('/api/link', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyObj)
    })

    const data = await res.json()

    if (res.status === 201) {
      setLoading(false)
      toast.success('New link added.')
      return data.link
    }

    setLoading(false)
    toast.error(data.msg)
    return null
  }

  const updateLink = async (linkData) => {
    // implement update links
  }

  const removeLink = async (linkId) => {
    // implement removing link
  }

  return { loading, addLink, updateLink, removeLink }
}

const validateURL = (url) => {
  if (!url.length) {
    toast.error('Link URL is not provided!')
    return false
  }

  const URLRegex = /^(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/

  const isValid = URLRegex.test(url)

  if (!isValid) {
    toast.error('Link URL is not in a valid format!')
    return false
  }

  return true
}

export default useLinkManager