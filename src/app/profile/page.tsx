'use client'
import type { ChangeEvent } from 'react'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import profilePic from '@/../../public/Default_pfp.jpg'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'
import { AuthContext } from '@/lib/firebase/auth'
import {
  getUserAttachment,
  getUsername,
  postUserAttachment,
  putUserAttachment,
  putUsername
} from '@/services/user/userService'
import { ShowToast } from '@/components/ShowToast'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const ProfilePage: React.FC = () => {
  const user = useContext(AuthContext)
  const [userName, setUserName] = useState<string>('')
  const [userPhotoURL, setUserPhotoURL] = useState<string | null>('')
  const userMail = user === 'loading' ? null : user?.email
  const saveProfileData = async (name: string) => {
    try {
      const response = await putUsername(name)
      setUserName(response.username)
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
        setUserPhotoURL(response.fileUrl)
      } catch (error) {
        console.log('No user attachment available')
      }
    }
    fetchUserAttachment()
  }, [])

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await getUsername()
        setUserName(response.username)
        return response.username
      } catch (error) {
        console.log('Error fetching userName')
      }
    }
    fetchUserName()
  }, [])

  const fileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      handleFileChange(file)
    }
  }
  const handleFileChange = async (file: File) => {
    try {
      const data = new FormData()
      data.append('file', file)
      let response = null
      if (userPhotoURL && userPhotoURL !== '') {
        response = await putUserAttachment(data)
      } else {
        response = await postUserAttachment(data)
      }
      setUserPhotoURL(response.profilePicture)
      ShowToast('Upload successful', 'your profile picture is successfully uploaded')
    } catch (error) {
      console.log('Error uploading the profile picture:', error)
      ShowToast('Error uploading the profile picture', 'Please upload file in jpg format only', 'destructive')
    }
  }

  const form = useForm()
  function onSubmit() {
    if (userName !== '') {
      saveProfileData(userName)
    } else {
      ShowToast('Error updating profile', 'Please enter a username', 'destructive')
    }
  }
  return (
    <div className="items-center">
      <div className="mx-10 my-8">
        <div className="mt-6 flex-col justify-center font-bold">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
              <FormField
                name="pic"
                render={() => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <Image
                        className=" block h-[130px] w-[130px] rounded-full"
                        src={userPhotoURL || profilePic}
                        width={400}
                        height={400}
                        alt="Profile"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" variant="outline">
                <label htmlFor="picture">Update</label>
                <input id="picture" accept="image/*,.jpg" type="file" hidden onChange={fileUpload} />
              </Button>
              <FormField
                name="username"
                render={() => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                render={() => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled type="email" value={userMail || 'Email'} placeholder="name@email.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default MainLayoutWrapper(ProfilePage)
