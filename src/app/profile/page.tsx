'use client'
import type { ChangeEvent } from 'react'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowUpTrayIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/ui/button'
import profilePic from '@/../../public/Default_pfp.jpg'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'
import { AuthContext, authResetPassword } from '@/lib/firebase/auth'
import { getUserAttachment, putUserAttachment, putUsername } from '@/services/user/userService'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ShowToast } from '@/components/ShowToast'
import { Input } from '@/components/ui/input'
const ProfilePage: React.FC = () => {
  const user = useContext(AuthContext)
  console.log('user:', user)
  const [fullName, setFullName] = useState('')
  const [userPhotoURL, setUserPhotoURL] = useState<string | null>('')
  const [uploadAttachment, setUploadAttachment] = useState<Blob | string>('')

  const saveProfileData = async () => {
    try {
      const response = await putUsername(fullName)
      // const userD = await getUsername()
      // console.log('UserName', userD)
      console.log('value:', response.displayName)
      ShowToast('Profile updated successfully', 'You have successfully updated your profile')
    } catch (error) {
      console.error('Error updating profile:', error)
      ShowToast('Error updating profile', 'Please try again', 'destructive')
    }
  }
  useEffect(() => {
    const fetchUserAttachment = async () => {
      try {
        const response = await getUserAttachment()
        console.log('value:', response.fileUrl)
        setUserPhotoURL(response.fileUrl)
      } catch (error) {
        console.warn('No user attachment available', error)
      }
    }
    fetchUserAttachment()
  }, [])
  const userMail = user === 'loading' ? null : user?.email
  const userFullName = user === 'loading' ? null : user?.displayName

  const resetPassword = async () => {
    let timeoutId: NodeJS.Timeout | null = null
    try {
      if (!userMail) {
        return
      }
      timeoutId = setTimeout(() => {}, 10000)
      await authResetPassword(userMail)
      clearTimeout(timeoutId)
      timeoutId = null
      ShowToast('We have sent instructions on your given email to reset your password.', 'Please check your email')
    } catch (error) {
      console.error('Error resetting password:', error)
      ShowToast('Error resetting password', 'Please try again', 'destructive')
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }

  const fileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      console.log('File:', file)
      setUploadAttachment(file)
    }
  }
  const handleFileChange = async () => {
    try {
      console.log('uploadAttachment:', uploadAttachment)
      const data = new FormData()
      data.append('file', uploadAttachment)
      const response = await putUserAttachment(data)
      console.log('value:', response.profilePicture)
      setUserPhotoURL(response.profilePicture)
      ShowToast('Upload successful', 'your profile picture is successfully uploaded')
    } catch (error) {
      console.error('Error uploading the profile picture:', error)
      ShowToast('Error uploading the profile picture', 'Please upload file in jpg format only', 'destructive')
    }
    setUploadAttachment('')
  }

  return (
    <div className="items-center">
      <h1 className="py-2 pl-2 text-3xl font-bold">Edit Profile</h1>
      <div className="mx-10">
        <div className="pt-12 ">
          <div className=" mb-4 flex-col justify-center">
            <label className="mb-2 block text-sm font-bold text-gray-700">Profile Picture</label>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Image
                className="mb-5 block h-[150px] w-[150px] rounded-full hover:cursor-pointer"
                src={userPhotoURL || profilePic}
                width={400}
                height={400}
                alt="Profile"
              />
            </DialogTrigger>
            <DialogContent>
              <Image
                src={userPhotoURL?.toString() || profilePic}
                alt={'Profile'}
                width={510}
                height={400}
                className="rounded"
              />
            </DialogContent>
          </Dialog>

          <div className="flex gap-4">
            <Button>
              <label htmlFor="files">Update</label>
              <input id="files" accept="image/*,.jpg" hidden type="file" onChange={fileUpload} />
            </Button>
            <Button variant="ghost" onClick={handleFileChange} disabled={uploadAttachment === ''}>
              <ArrowUpTrayIcon className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-6 flex-col justify-center font-bold">
            <div className=" mb-4 flex-col justify-center">
              <label className="mb-2 block text-sm font-bold text-gray-700">Email</label>
              <Input className="focus-visible:ring-0" placeholder={userMail ?? ''} readOnly />
            </div>
            <div className=" mb-4 flex-col justify-center">
              <label className="mb-2 block text-sm font-bold text-gray-700">Full Name</label>
              <Input
                placeholder={userFullName || 'your full name here'}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <Button type="submit" onClick={saveProfileData}>
                Save Changes
              </Button>
            </div>
            <div className=" mb-4 pt-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">Do you want to change your password?</label>
              <div>
                <Button className="bg-red-700" onClick={resetPassword}>
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayoutWrapper(ProfilePage)
