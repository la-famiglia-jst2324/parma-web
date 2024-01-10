'use client'

import type { FormEvent } from 'react'
import React, { useState } from 'react'
import { ChannelType } from '@prisma/client'
// import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import SelectSection from '@/components/settings/SelectSection'
import ApiKeyConfiguration from '@/components/settings/ApiKeyConfiguration'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'
import { Input } from '@/components/ui/input'
// import useCompanies from '@/components/hooks/useCompanies'
// import {user} from '@/pages/api/user/[userId]'

function SettingsPage() {
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])
  const channels = [ChannelType.EMAIL, ChannelType.SLACK]

  // tbd
  const handleConfigureSlack = () => {}
  const handleConfigureAffinity = () => {}

  const saveChanges = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(selectedChannels)
  }
  return (
    <main>
      <div className="space-x-3 text-white">
        <h1 className="mb-2 p-4 text-3xl font-bold">Preferences</h1>

        <div className="pl-8">
          <h2 className="text-xl font-bold ">Report & Notification Configuration</h2>
          <form role="form" data-testid="create-datasource-form" onSubmit={saveChanges}>
            <SelectSection
              id="channel"
              title="Select Channel"
              description="Select channel for receiving reports and notifications"
              placeholder="Channel"
              options={channels.map(
                (channel) =>
                  channel.toString().toLowerCase().charAt(0).toUpperCase() + channel.toString().toLowerCase().slice(1)
              )}
              onValueChange={(value) => setSelectedChannels(value)}
              isMultiSelect={false}
            />
            <div>
              <div className="pb-1 pt-6 font-bold">
                <h3>Configure Email</h3>
              </div>
              <div className="flex">
                <div>
                  <h4 className="flex">Provide email address where you want to receive reports and notifications</h4>
                </div>
                <div className="absolute right-8 flex w-56 justify-center">
                  <Button
                    className="rounded bg-indigo-700 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                    // onClick={saveChanges}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
              <Input
                className="w-50 ml-1 mt-2 rounded bg-slate-800"
                placeholder="Enter Your Email Address"
                color=""
              ></Input>
            </div>
          </form>
        </div>

        <div
          className="p-5 pl-8"
          // onSubmit={saveChanges}
        >
          {/* <Button className="rounded bg-indigo-700 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none">
            Save changes
          </Button> */}
        </div>
        <div className="w-full rounded-b border-b border-gray-200 p-2"></div>

        <div className="p-8">
          <h2 className="text-xl font-bold ">API Keys</h2>

          <ApiKeyConfiguration serviceName="Slack" onConfigure={handleConfigureSlack} />
          <Input className="w-50 ml-1 mt-2 rounded bg-slate-800" placeholder="Enter Your API Key" color=""></Input>

          <ApiKeyConfiguration serviceName="OpenAI" onConfigure={handleConfigureSlack} />
          <Input className="w-50 ml-1 mt-2 rounded bg-slate-800" placeholder="Enter Your API Key" color=""></Input>

          <ApiKeyConfiguration serviceName="Affinity" onConfigure={handleConfigureAffinity} />
          <Input className="w-50 ml-1 mt-2 rounded bg-slate-800" placeholder="Enter Your API Key" color=""></Input>
        </div>

        <div className="w-full rounded-b border-b border-gray-200 p-2"></div>

        <div className="flex p-8">
          <h2 className="pt-4 text-xl font-bold">Delete Account</h2>
          <div className=" absolute right-8 w-[180px] pt-2 ">
            <Button className="rounded bg-red-700 font-bold text-white hover:bg-red-600 focus:outline-none">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MainLayoutWrapper(SettingsPage)
