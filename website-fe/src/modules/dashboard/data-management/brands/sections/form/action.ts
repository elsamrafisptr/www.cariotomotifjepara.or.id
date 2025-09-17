'use client'

import { useRouter } from 'next/navigation'

import { brandSchema } from '@/common/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Slugify function remains the same
function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function useAddBrandForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof brandSchema>>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: '',
      type: undefined,
      imageUrl: ''
    }
  })

  async function onSubmit(values: z.infer<typeof brandSchema>) {
    startTransition(async () => {
      try {
        const generatedUrl = `/${values.type.toLowerCase()}/${slugify(values.name)}`

        await fetch('/api/v1/brands', {
          method: 'POST',
          body: JSON.stringify({
            name: values.name,
            url: generatedUrl,
            type: values.type,
            imageUrl: values.imageUrl
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        form.reset()
        router.refresh()
      } catch (error) {
        console.error(error)
      }
    })
  }

  return { form, isPending, onSubmit }
}
