import { Metadata } from 'next'

import { ReactNode } from 'react'

import { retrieveCart } from '@/lib/data/cart'
import { retrieveCustomer } from '@/lib/data/customer'
import { getBaseUrl } from '@/lib/utils'

import CartMismatchBanner from '@/components/elements/CartMismatchBanner'

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl())
}

export default async function PageLayout(props: { children: ReactNode }) {
  const customer = await retrieveCustomer()
  const cart = await retrieveCart()

  return (
    <>
      {customer && cart && <CartMismatchBanner customer={customer} cart={cart} />}

      {props.children}
    </>
  )
}
