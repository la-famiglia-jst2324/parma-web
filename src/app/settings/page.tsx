'use client'

import React, { useContext, useState } from 'react'
import { ChannelType } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AuthContext, authResetPassword } from '@/lib/firebase/auth'
import { ShowToast } from '@/components/ShowToast'
import { postNotificationChannel } from '@/services/report/reportService'

function SettingsPage() {
  const [selectedChannel, setSelectedChannel] = useState<string>('')
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

  const FormSchema = z.object({
    email: z.string().email({
      message: 'Email is not valid.'
    }),
    channel: z.string(),
    slack: z.string().optional()
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {}
  })
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log('sfr', values)
    if (values.channel === 'slack' && values.slack === '') {
      form.setError('slack', {
        message: 'Slack API Key is required'
      })
      ShowToast('Slack API Key is required', 'Please enter a valid slack api key', 'destructive')
    } else {
      try {
        await postNotificationChannel(
          values.channel === 'email' ? ChannelType.EMAIL : ChannelType.SLACK,
          values.email,
          values.slack || ''
        )
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

  return (
    <div className="items-center">
      <div className="mx-16">
        <div className="">
          <div className="mt-6 flex-col justify-center">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                  control={form.control}
                  name="channel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Channel</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          setSelectedChannel(value)
                          field.onChange(value)
                        }}
                        defaultValue={field.value}
                      >
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
                    </FormItem>
                  )}
                />

                {selectedChannel === 'slack' && (
                  <FormField
                    control={form.control}
                    name="slack"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slack API Key</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your slack API key" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is needed to send reports and notifications to your slack channel.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="example@email.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide an email where you want to receive reports and notifications.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
                <FormField
                  name=""
                  render={() => (
                    <FormItem>
                      <FormLabel>Reset Your Password</FormLabel>
                    </FormItem>
                  )}
                />

                <Button variant="destructive" type="button" onClick={resetPassword}>
                  Send Reset Link
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayoutWrapper(SettingsPage)
