'use client'

import React, { useContext, useState } from 'react'
import { ChannelPurpose, ChannelType } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AuthContext, authResetPassword } from '@/lib/firebase/auth'
import { ShowToast } from '@/components/ShowToast'
import { postNotificationChannel, postNotificationSubscription } from '@/services/report/reportService'
import { Label } from '@/components/ui/label'

function SettingsPage() {
  const [selectedChannel, setSelectedChannel] = useState<string>('')
  const [destination, setDestination] = useState<string>('')
  const [slackapi, setSlackapi] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const user = useContext(AuthContext)
  const resetPassword = async () => {
    const userMail = user === 'loading' ? null : user?.email
    try {
      if (!userMail) {
        return
      }
      await authResetPassword(userMail)
      ShowToast('We have sent instructions on your given email to reset your password.', 'Please check your email')
    } catch (error) {
      console.error('Error resetting password:', error)
      ShowToast('Error resetting password', 'Please try again', 'destructive')
    }
  }

  const form = useForm()
  async function onSubmit() {
    if (selectedChannel === 'slack') {
      if (slackapi === '') {
        ShowToast('Slack API Key is required', 'Please try again', 'destructive')
      } else if (destination === '') {
        ShowToast('Channel name is required', 'Please try again', 'destructive')
      } else {
        try {
          const response = await postNotificationChannel(ChannelType.SLACK, destination, slackapi)
          await postNotificationSubscription(response.id, ChannelPurpose.REPORT)
          ShowToast(
            'Channel added successfully',
            'You will now receive reports and notifications on your selected channel'
          )
        } catch (error) {
          console.log('An error has occurred: ', error)
          throw error
        }
      }
    } else if (selectedChannel === 'email') {
      if (email === '') {
        ShowToast('Email is required', 'Please try again', 'destructive')
      } else {
        try {
          const response = await postNotificationChannel(ChannelType.EMAIL, email, '')
          await postNotificationSubscription(response.id, ChannelPurpose.REPORT)
          ShowToast(
            'Channel added successfully',
            'You will now receive reports and notifications on your selected channel'
          )
        } catch (error) {
          console.log('An error has occurred: ', error)
          throw error
        }
      }
    }
  }

  return (
    <main role="main">
      <div className="mx-10 my-8">
        <div className="flex-col justify-center">
          <div className="mb-2 flex items-center">
            <Label className="text-base font-bold">Report and notification configuration</Label>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
              <FormField
                name="channel"
                render={() => (
                  <FormItem>
                    <FormLabel>Channel</FormLabel>
                    <Select onValueChange={(val) => setSelectedChannel(val)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Channel" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="slack">Slack</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormDescription>Select a channel to receive reports and notifications.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {selectedChannel === 'slack' && (
                <>
                  <FormField
                    name="slack"
                    render={() => (
                      <FormItem>
                        <FormLabel>Channel Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter slack channel name"
                            onChange={(e) => setDestination(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="slack"
                    render={() => (
                      <FormItem>
                        <FormLabel>Slack API Key</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your slack API key" onChange={(e) => setSlackapi(e.target.value)} />
                        </FormControl>
                        <FormDescription>
                          This is needed to send reports and notifications to your slack channel.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {selectedChannel === 'email' && (
                <FormField
                  name="email"
                  render={() => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@email.com"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide an email where you want to receive reports and notifications.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button type="submit" disabled={!selectedChannel}>
                Submit
              </Button>
              <FormField
                name=""
                render={() => (
                  <FormItem>
                    <FormLabel>Reset Your Password</FormLabel>
                    <FormDescription>Reset link will be sent to your registered email address.</FormDescription>
                  </FormItem>
                )}
              />

              <Button variant="outline" type="button" onClick={resetPassword}>
                Reset
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  )
}

export default MainLayoutWrapper(SettingsPage)
