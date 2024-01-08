'use client'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import profilePic from '@/../../public/Default_pfp.jpg'
import { FormContent } from '@/components/FormContent'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'
import { AuthContext, getAuthToken } from '@/lib/firebase/auth'
import ProfileImageModal from '@/components/profile/ProfileImageModal'

// TODO: @Analytics team need to implement the api end points for attaching profile picture to firebase similar to the one for company attachment

const ProfilePage: React.FC = () => {
  const user = useContext(AuthContext)
  const [fullName, setFullName] = useState('')
  // const [email, setEmail] = useState(user !== 'loading' ? user?.email : '')

  const saveProfileData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = {
      fullName
    }

    try {
      const token = await getAuthToken(user)
      if (!token) return

      const response = await fetch('/api/profile', {
        method: 'PUT',
        cache: 'no-cache',
        body: JSON.stringify(formData),
        headers: {
          Authorization: token
        }
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

  const userMail = user === 'loading' ? null : user?.email
  const userFullName = user === 'loading' ? null : user?.displayName
  const userPhotoURL = user === 'loading' ? null : user?.photoURL
  // setEmail(userMail || '')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleImageClick = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  return (
    <main className="m-4 flex h-[68em] flex-row items-start justify-start space-x-4" role="main">
      <div className="items-center space-x-7">
        <h1 className="py-2 pl-2 text-3xl font-bold">Edit Profile</h1>

        <div className="flex">
          <div className="m-6 ml-10 pt-12">
            <div className="flex justify-center">
              <Image
                className="hover:delay-50 mb-5 block h-[140px] w-[140px] rounded-full transition duration-500 ease-in hover:cursor-pointer hover:shadow-[0_0_15px_15px_rgba(63,55,201,0.5)]"
                src={userPhotoURL || profilePic}
                width={500}
                height={500}
                alt="Profile"
                onClick={handleImageClick}
              />
              {isModalOpen && (
                <ProfileImageModal src={userPhotoURL?.toString() || profilePic} alt="Profile" onClose={closeModal} />
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
              <Button
                className="rounded bg-indigo-700 font-bold text-white hover:bg-blue-700 focus:outline-none"
                onClick={() => document.getElementById('profile-pic-input')?.click()}
              >
                New Profile Picture
              </Button>
            </div>
          </div>
          <div className="ml-60 pt-12 font-bold">
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
                // onChange={(event) => setEmail(userMail || event.target.value)}
                readonly={!!userMail}
              />

              <div>
                <Button
                  className="rounded bg-indigo-700 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                  type="submit"
                >
                  Save Changes
                </Button>
              </div>
            </form>
            <div className="mb-4 flex flex-col pt-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">Do you want to change your password?</label>
              <div>
                <Button
                  className="rounded bg-red-700 px-4 py-2 font-bold text-white hover:bg-red-600 focus:outline-none"
                  onClick={handleForgotPasswordClick}
                >
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MainLayoutWrapper(ProfilePage)
