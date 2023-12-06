'use client'
import React, { useState } from 'react'
import { Button } from '@tremor/react'
import Image from 'next/image'

const ProfilePage: React.FC = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
  }

  return (
    <div className="profile-form m-3 flex flex-col items-start rounded-lg border-0 bg-white p-3 shadow-md">
      <div className=" items-center justify-start ">
        <div className="mb-3 items-center justify-start space-x-7">
          <h1 className="title py-2 pl-2 text-3xl font-bold">Edit Profile</h1>

          <div className="flex">
            <div className="profile-image-container">
              <Image className="profile-image" src="path/to/your/img" width={500} height={500} alt="Profile" />

              <Button className="profile-pic-button">New Profile Picture</Button>
            </div>
            <div style={{ paddingLeft: '300px', width: '800px' }}>
              <form className="form-fields" onSubmit={handleFormSubmit}>
                <div className="form-field">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    className="input-fullname"
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    className="input-email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="oldPassword">Old Password</label>
                  <input
                    className="input-old-password"
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    className="input-new-password"
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="repeatPassword">Repeat New Password</label>
                  <input
                    className="input-repeat-password"
                    type="password"
                    placeholder="Repeat New Password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                </div>

                <Button className="save-button" type="submit">
                  Save Changes
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
