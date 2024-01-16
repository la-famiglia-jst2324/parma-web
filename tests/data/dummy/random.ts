import { v4 as uuid } from 'uuid'

export const randomPositiveInteger = () => {
  return Math.floor(Math.random() * 1000000000) + 1
}

export const randomUniqueToken = () => {
  return uuid()
}

export const randomTimestampStr = () => {
  // Add random time between 0 and 1 day to current time
  const now = new Date()
  const randomTime = Math.floor(Math.random() * 86400000)
  return new Date(now.getTime() + randomTime).toISOString()
}

export const randomTimestamp = () => {
  // Add random time between 0 and 1 day to current time
  const now = new Date()
  const randomTime = Math.floor(Math.random() * 86400000)
  return new Date(now.getTime() + randomTime)
}

export const randomFileReference = (file: boolean = true) => {
  const filename = file ? `/${randomUniqueToken()}.png` : ''
  return `/test/path/${randomUniqueToken()}${filename}`
}

export const randomUrl = (file: boolean = true) => {
  return `https://google.com${randomFileReference(file)}`
}
