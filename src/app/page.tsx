'use client'

import React from 'react'
import { Home } from '@/components/Dashboard/Home'
import { MainLayout } from '@/components/Layout/MainLayout'

export default function Page() {
  return (
    <MainLayout>
      <Home />
    </MainLayout>
  )
}
