'use client'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import profilePic from '@/../../public/Default_pfp.jpg'
import { FormContent } from '@/components/FormContent'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'
import { AuthContext, getAuthToken, authResetPassword } from '@/lib/firebase/auth'
import ProfileImageModal from '@/components/profile/ProfileImageModal'
import SuccessInfo from '@/components/authentication/SuccessInfo'

// TODO: @Analytics team need to implement the api end points for attaching profile picture to firebase similar to the one for company attachment

const ProfilePage: React.FC = () => {
  const user = useContext(AuthContext)
  const [fullName, setFullName] = useState('')
  // const [email, setEmail] = useState(user !== 'loading' ? user?.email : '')

  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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
  // const router = useRouter()
  // const handleForgotPasswordClick = () => {
  //   router.push('/forgot-password')
  // }

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
  const handleSubmit = async () => {
    let timeoutId: NodeJS.Timeout | null = null
    try {
      if (!userMail) {
        // setError('Please enter your email.')
        return
      }
      // Add timeout
      timeoutId = setTimeout(() => {
        // setError('Your request could not be processed. Please try again.')
        // setLoading(false)
      }, 10000)

      await authResetPassword(userMail)
      clearTimeout(timeoutId)
      timeoutId = null
      setSuccess('We have sent instructions on your given email to reset your password.')
    } catch (error) {
      // setError(error instanceof Error ? error.message : 'Something went wrong.')
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }
  return (
    // <main className="m-4 flex h-[68em] flex-row items-start justify-start space-x-4" role="main">
    <div className="items-center space-x-7">
      <h1 className="py-2 pl-2 text-3xl font-bold">Edit Profile</h1>
      <div className="flex justify-center">
        <div className="m-2 ml-10 flex-col pt-12 ">
          <div className="flex justify-center">
            <Image
              className="hover:delay-50 mb-5 block h-[180px] w-[180px] rounded-full transition duration-500 ease-in hover:cursor-pointer hover:shadow-[0_0_15px_15px_rgba(63,55,201,0.5)]"
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

          <div className="flex justify-center">
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
          {/* </div> */}
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
            <div className=" mb-4 pt-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">Do you want to change your password?</label>
              <div>
                <Button
                  className="rounded bg-red-700 px-4 py-2 font-bold text-white hover:bg-red-600 focus:outline-none"
                  onClick={handleSubmit}
                >
                  Change Password
                </Button>
              </div>
              {success ? (
                <div className="m-15">
                  <SuccessInfo msg={success} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
    // </main>
  )
}

export default MainLayoutWrapper(ProfilePage)
