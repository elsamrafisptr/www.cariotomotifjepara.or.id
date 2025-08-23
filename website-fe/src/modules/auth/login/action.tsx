'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import LoginSchema from './schema'

import { authClient } from '@/lib/auth-client'

export default function useLoginForm() {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    startTransition(async () => {
      try {
        await authClient.signIn.email(
          {
            email: values.email,
            password: values.password
          },
          {
            onSuccess() {
              form.reset()
              window.location.href = '/dashboard'
            },
            onError(ctx) {
              console.error(ctx.error.message)
            }
          }
        )
      } catch (error) {
        console.error(error)
      }
    })
  }

  return { form, isPending, onSubmit }
}
