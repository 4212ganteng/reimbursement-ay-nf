'use client'

import { Provider } from "jotai"

import type { ChildrenType } from "@/@core/types"

export const ProviderJotai = ({ children }: ChildrenType) => {
  return (
    <Provider>
      {children}
    </Provider>
  )
}
