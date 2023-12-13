'use client'
import React, { useContext, useState } from 'react'
import { Button } from '@tremor/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import profilePic from '@/../../public/Default_pfp.jpg'
import { FormContent } from '@/components/FormContent'
import AuthCheck from '@/components/Authentication/AuthCheck'
import { MainLayout } from '@/components/MainLayout'
import { AuthContext } from '@/lib/firebase/auth'

// TODO: @Analytics team need to implement the api end points for attaching profile picture to firebase similar to the one for company attachment

const ProfilePage: React.FC = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')

  const saveProfileData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = {
      fullName,
      email
    }

    // Validate the form data here (if necessary)

    // Call the REST API endpoint
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        cache: 'no-cache',
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      // Handle the response here
      const data = await response.json()
      console.log('Profile updated successfully:', data)
      // Additional actions based on the response (e.g., redirect, show a message)
    } catch (error) {
      console.error('Error updating profile:', error)
      // Handle errors here (e.g., show error message to the user)
    }
  }
  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      // Post the form data to your API route for file upload
      // const response = ''
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }
  // Rest api still needs to be implemented
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      // Get the first file if multiple files are selected (assuming single file upload)
      const file = event.target.files[0]
      // setSelectedFile(file); // Save the file to the component's state

      // Here you might want to update the UI to show the file name or preview the image
      // ...

      // If you want to automatically upload after file selection:
      uploadFile(file)
    }
  }
  const router = useRouter()
  const handleForgotPasswordClick = () => {
    router.push('/forgot-password')
  }
  const user = useContext(AuthContext)
  console.log('user auth token: ', user?.getIdToken())

  const userMail = user?.email
  const userFullName = user?.displayName
  return (
    <MainLayout>
      <div className=" m-3 flex flex-col items-start overflow-auto rounded-lg border-0 bg-white p-3 shadow-md">
        <div className=" items-center justify-start ">
          <div className="mb-3 items-center justify-start space-x-7">
            <h1 className="py-2 pl-2 text-3xl font-bold">Edit Profile</h1>

            <div className="flex">
              <div className=" pl-10 pt-12">
                <div className="pl-10">
                  <Image
                    className="mb-5 block h-[100px] w-[100px] rounded-full"
                    src={profilePic}
                    width={500}
                    height={500}
                    alt="Profile"
                  />
                </div>

                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="profile-pic-input"
                    style={{ display: 'none' }}
                  />
                  <Button onClick={() => document.getElementById('profile-pic-input')?.click()}>
                    New Profile Picture
                  </Button>
                </div>
              </div>
              <div className="w-[700px] pl-72 pt-10 font-bold">
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
                    onChange={(e) => setEmail(e.target.value)}
                    readonly={!!userMail}
                  />

                  <div>
                    <Button
                      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                      type="submit"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
                <div className="mb-4 flex flex-col pt-4">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Do you want to change your password?
                  </label>
                  <div>
                    <Button
                      className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none"
                      onClick={handleForgotPasswordClick}
                    >
                      Change Password
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default AuthCheck(ProfilePage)

// function setSelectedFile(file: File) {
//   throw new Error('Function not implemented.')
// }
