'use client'
import type { ChangeEvent } from 'react'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowUpTrayIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/ui/button'
import profilePic from '@/../../public/Default_pfp.jpg'
import { FormContent } from '@/components/FormContent'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'
import { AuthContext, authResetPassword } from '@/lib/firebase/auth'
import { getUserAttachment, putUserAttachment, putUsername } from '@/services/user/userService'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ShowToast } from '@/components/ShowToast'
const ProfilePage: React.FC = () => {
  const user = useContext(AuthContext)
  const [fullName, setFullName] = useState('')
  const [userPhotoURL, setUserPhotoURL] = useState<string | null>('')
  const saveProfileData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const Userdata = new FormData()
      Userdata.append('name', fullName)
      const response = await putUsername(Userdata)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      console.log('Profile updated successfully:', data)
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

  const handleSubmit = async () => {
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
  const [uploadAttachment, setUploadAttachment] = useState<Blob | string>('')
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
    <div className="items-center space-x-7">
      <h1 className="py-2 pl-2 text-3xl font-bold">Edit Profile</h1>
      <div className="flex justify-center">
        <div className="m-2 ml-10 flex-col pt-12 ">
          <div className="flex justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Image
                  className="mb-5 block h-[180px] w-[180px] rounded-full transition duration-500 ease-in hover:cursor-pointer hover:shadow-[0_0_15px_15px_rgba(63,55,201,0.5)] hover:delay-75"
                  src={userPhotoURL || profilePic}
                  width={500}
                  height={500}
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
          </div>

          <div className="flex justify-center gap-1.5">
            <Button>
              <label htmlFor="files">Update</label>
              <input id="files" accept="image/*,.jpg" hidden type="file" onChange={fileUpload} />
            </Button>
            <Button onClick={handleFileChange} disabled={uploadAttachment === ''}>
              <ArrowUpTrayIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-6 flex-col justify-center font-bold">
            <form role="form" data-testid="create-profile-form" onSubmit={saveProfileData}>
              <FormContent
                id="Full Name"
                name="Full Name"
                label="Full Name"
                placeholder={userFullName || 'your full name here'}
                type="input"
                onChange={(e) => setFullName(e.target.value)}
              />
              <FormContent
                id="Email"
                name="Email"
                label="Email"
                placeholder={userMail || 'please write your email here'}
                type="input"
                readonly={!!userMail}
              />
              <div>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
            <div className=" mb-4 pt-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">Do you want to change your password?</label>
              <div>
                <Button className="bg-red-700" onClick={handleSubmit}>
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
