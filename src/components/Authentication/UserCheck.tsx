'use client'
import React, { useContext } from 'react'
import { AuthProvider } from '@/context/auth'
import { MainLayout } from '@/components/MainLayout'
import Layout from '@/components/StartLayout'
import { AuthContext } from '@/lib/firebase/auth'

interface UserCheckComponentProps {
  children: React.ReactNode
}

export const UserCheckComponent: React.FC<UserCheckComponentProps> = ({ children }) => {
  const user = useContext(AuthContext)

  return <AuthProvider>{user ? <MainLayout>{children}</MainLayout> : <Layout>{children}</Layout>}</AuthProvider>
}
