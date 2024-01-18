'use client'

import React from 'react'
import { Home } from '@/components/dashboard/Home'
import { MainLayout } from '@/components/layout/MainLayout'
import { CommandInterface } from '@/components/CommandInterface'

export default function Page() {
  return (
    <MainLayout>
      <CommandInterface />
      <Home />
    </MainLayout>
  )
}
