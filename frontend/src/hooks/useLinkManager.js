import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const useLinkManager = () => {
  const [loading, setLoading] = useState(false)
  const [links, setLinks] = useState([])
  const [linkStats, setLinkStats] = useState(null)
  const [redirectionLink, setRedirectionLink] = useState(null)

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

  const getUserLinks = async () => {
    setLoading(true)

    const res = await fetch('/api/link/u')
    const data = await res.json()

    if (res.status === 200) {
      setLoading(false)
      return setLinks(data.links)
    }

    setLoading(false)
    return setLinks([])
  }

  const getLinkStats = async (linkId) => {
    setLoading(true)

    const res = await fetch(`/api/stat/link/${linkId}`)
    const data = await res.json()

    if (res.status === 200) {
      setLoading(false)
      return setLinkStats(data)
    }

    setLoading(false)
    return setLinkStats(null)
  }

  const updateLink = async (linkData) => {
    const isValidURL = validateURL(linkData.linkOrigin)

    if (!isValidURL) { return { success: false } }

    setLoading(true)

    const bodyObj = {
      originURL: linkData.linkOrigin,
      title: linkData.linkTitle.length > 0 ? linkData.linkTitle : null,
      setShowInProfile: linkData.showInMyProfile,
      setRestriction: linkData.ageRestriction,
      setActive: linkData.active,
    }

    const res = await fetch(`/api/link/${linkData.linkId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyObj)
    })

    const data = await res.json()

    if (res.status === 200) {
      setLoading(false)
      toast.success('Link data updated successfully.')
      return { success: true }
    }

    setLoading(false)
    toast.error(data.msg)
    return { success: false }
  }

  const removeLink = async (linkId) => {

    setLoading(true)

    const res = await fetch(`/api/link/${linkId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })

    const data = await res.json()

    if (res.status === 200) {
      setLoading(false)
      toast.success(data.msg)
      return { success: true }
    }

    setLoading(false)
    toast.error(data.msg)
    return { success: false }
  }

  const getRedirectInfo = async (shortId) => {
    setLoading(true)

    const res = await fetch(`/api/link/r/${shortId}`)
    const data = await res.json()

    if (res.status === 200) {
      setLoading(false)
      return setRedirectionLink(data.link)
    }

    setLoading(false)
    return setRedirectionLink(null)
  }

  return { loading, addLink, updateLink, removeLink, getUserLinks, links, getLinkStats, linkStats, redirectionLink, getRedirectInfo }
}

const validateURL = (url) => {
  if (!url.length) {
    toast.error('Link URL is not provided!')
    return false
  }

  const URLRegex = /^(https?:\/\/)(?:www\.)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,6})(\/[a-zA-Z0-9.-]*)*(?:\?(.*))?\/?$/

  const isValid = URLRegex.test(url)

  if (!isValid) {
    toast.error('URL format error! \nThe valid format exp is: \nhttps://exaple.com')
    return false
  }

  return true
}

export default useLinkManager