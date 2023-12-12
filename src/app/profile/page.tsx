'use client'
import React, { useState } from 'react'
import { Button } from '@tremor/react'
import Image from 'next/image'
import profilePic from '@/../../public/Default_pfp.jpg'
import { FormContent } from '@/components/FormContent'
import AuthCheck from '@/components/Authentication/AuthCheck'
import { MainLayout } from '@/components/MainLayout'

const ProfilePage: React.FC = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const saveProfileData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Create an object with the form data
    const formData = {
      fullName,
      email,
      oldPassword,
      newPassword,
      repeatPassword
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

  return (
    <MainLayout>
      <div className="profile-form m-3 flex flex-col items-start rounded-lg border-0 bg-white p-3 shadow-md">
        <div className=" items-center justify-start ">
          <div className="mb-3 items-center justify-start space-x-7">
            <h1 className="title py-2 pl-2 text-3xl font-bold">Edit Profile</h1>

            <div className="flex">
              <div className="profile-image-container pl-10 pt-12">
                <div className="pl-10">
                  <Image className="profile-image" src={profilePic} width={500} height={500} alt="Profile" />
                </div>

                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="profile-pic-input"
                    style={{ display: 'none' }}
                  />
                  <Button
                    className="profile-pic-button"
                    onClick={() => document.getElementById('profile-pic-input')?.click()}
                  >
                    New Profile Picture
                  </Button>
                </div>
              </div>
              <div className="text-bold w-[800px] pl-72  pt-10">
                <form role="form" data-testid="create-profile-form" onSubmit={saveProfileData}>
                  <FormContent
                    id="Full Name"
                    name="Full Name"
                    label="Full Name"
                    placeholder="your full name here"
                    type="input"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <FormContent
                    id="Email"
                    name="Email"
                    label="Email"
                    placeholder="your email here"
                    type="input"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FormContent
                    id="password"
                    name="Old Password"
                    label="Old Password"
                    placeholder="your old password here"
                    type="input"
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <FormContent
                    id="Password"
                    name="New Password"
                    label="New Password"
                    placeholder="your new password here"
                    type="input"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <FormContent
                    id="password"
                    name="Repeat New Password"
                    label="Repeat New Password"
                    placeholder="your new password here"
                    type="input"
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                  <div>
                    <button
                      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                      type="submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
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
