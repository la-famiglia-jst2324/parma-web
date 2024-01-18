'use client'

import React from 'react'
import { Home } from '@/components/dashboard/Home'
import { MainLayout } from '@/components/layout/MainLayout'

export default function Page() {
  return (
    <MainLayout>
      <Home />
    </MainLayout>
  )
}
