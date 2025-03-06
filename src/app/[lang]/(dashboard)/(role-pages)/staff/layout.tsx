import React from 'react'

import { redirect } from 'next/navigation'

import type { ChildrenType } from '@/@core/types'
import serverAuth from '@/libs/server-auth'

export default async function Layout({ children }: ChildrenType) {

  const user = await serverAuth()

  if (user?.Role !== 'STAFF') {
    redirect('/home')
  }

  return (
    <div>{children}</div>
  )
}
