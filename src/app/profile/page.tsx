'use client'
import React, { useContext, useState } from 'react'
import { Button } from '@tremor/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import profilePic from '@/../../public/Default_pfp.jpg'
import { FormContent } from '@/components/FormContent'
import { MainLayoutWrapper } from '@/components/Layout/MainLayout'
import { AuthContext } from '@/lib/firebase/auth'
import ProfileImageModal from '@/components/Profile/ProfileImageModal'

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

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        cache: 'no-cache',
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      console.log('Profile updated successfully:', data)
    } catch (error) {
      console.error('Error updating profile:', error)
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]

      uploadFile(file)
    }
  }
  const router = useRouter()
  const handleForgotPasswordClick = () => {
    router.push('/forgot-password')
  }
  const user = useContext(AuthContext)

  const userMail = user === 'loading' ? null : user?.email
  const userFullName = user === 'loading' ? null : user?.displayName
  const userPhotoURL = user === 'loading' ? null : user?.photoURL

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleImageClick = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  return (
    <main className="m-4 flex h-[68em] flex-row items-start justify-start space-x-4" role="main">
      <div className=" m-6 flex min-h-[calc(100vh-90px)] flex-col items-start overflow-auto rounded-lg border-0 bg-white p-3 shadow-md">
        <div className=" items-center justify-start ">
          <div className="mb-3 items-center justify-start space-x-7">
            <h1 className="py-2 pl-2 text-3xl font-bold">Edit Profile</h1>

            <div className="flex">
              <div className=" pl-10 pt-12">
                <div className="pl-5">
                  <Image
                    className="mb-5 block h-[140px] w-[140px] rounded-full"
                    src={userPhotoURL || profilePic}
                    width={500}
                    height={500}
                    alt="Profile"
                    onClick={handleImageClick}
                  />
                  {isModalOpen && (
                    <ProfileImageModal
                      src={userPhotoURL?.toString() || profilePic}
                      alt="Profile"
                      onClose={closeModal}
                    />
                  )}
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
    </main>
  )
}

export default MainLayoutWrapper(ProfilePage)
