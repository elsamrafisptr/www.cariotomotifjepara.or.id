import Link from 'next/link'

import { GalleryVerticalEndIcon } from 'lucide-react'
import { Fragment } from 'react'

import RegisterForm from '@/modules/auth/register'

const RegisterPage = () => {
  return (
    <Fragment>
      <div className="absolute z-50 flex h-screen w-full cursor-not-allowed items-center justify-center bg-black text-center text-white opacity-75">
        <span className="max-w-xs">
          THIS PAGE IS CLOSED NO MORE USER REGISTRATION FOR A WHILE
        </span>
      </div>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link href="/" className="flex items-center gap-2 self-center font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEndIcon className="size-4" />
            </div>
            Cari Otomotif Website
          </Link>
          <RegisterForm />
        </div>
      </div>
    </Fragment>
  )
}

export default RegisterPage
