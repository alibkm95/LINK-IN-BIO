

export const formatNumber = (num) => {
  switch (true) {
    case (num <= 0):
      return "0"
    case (num > 0 && num < 1000):
      return num.toString()
    case (num >= 1000 && num < 1000000):
      return (num / 1000).toFixed(1).toString() + "K"
    case (num >= 1000000):
      return (num / 1000000).toFixed(1).toString() + "M"
    default:
      return num.toString()
  }
}

export const getCurrentDomain = () => {
  const { protocol, host } = window.location
  return `${protocol}//${host}`
}

export const extractDomain = (url) => {
  if (!url || typeof url !== 'string') {
    return null
  }

  let urlObj
  try {
    urlObj = new URL(url)
  } catch (error) {
    const urlWithoutProtocol = url.replace(/^https?:\/\//, '')
    urlObj = new URL(`http://${urlWithoutProtocol}`)
  }

  if (!urlObj.hostname || urlObj.hostname === 'localhost') {
    return null
  }
  return urlObj.hostname;
}