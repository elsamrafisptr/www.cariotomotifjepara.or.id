'use client'

import { productTypeOptions } from '@/common/types'
import { upload } from '@imagekit/next'
import { RefreshCwIcon } from 'lucide-react'
import { useRef, useState } from 'react'

import useAddBrandForm from './action'

import ImageUpload from '@/components/elements/image-upload'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

/* eslint-disable @typescript-eslint/no-explicit-any */

export function AddBrandForm() {
  const { form, isPending, onSubmit } = useAddBrandForm()

  const selectedFileRef = useRef<File | null>(null)

  const [uploading, setUploading] = useState(false)

  const handleSubmitWrapper = form.handleSubmit(async values => {
    const file = selectedFileRef.current

    if (file) {
      try {
        setUploading(true)
        const resp = await fetch('/api/upload-auth')
        if (!resp.ok) throw new Error('Upload auth failed')
        const auth = await resp.json()
        const result = await upload({
          expire: auth.expire,
          token: auth.token,
          signature: auth.signature,
          publicKey: auth.publicKey,
          file,
          fileName: file.name
        })

        const uploadedUrl = (result as any).url ?? (result as any).filePath ?? null

        if (!uploadedUrl) throw new Error('No uploaded URL returned')

        values.imageUrl = uploadedUrl
      } catch (err) {
        console.error('Image upload failed', err)

        setUploading(false)

        return
      } finally {
        setUploading(false)
      }
    }

    await onSubmit(values)
  })

  return (
    <Form {...form}>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">Add Brand</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Brand</DialogTitle>
            <DialogDescription>
              Make changes to your new brand here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitWrapper} className="space-y-4">
            <fieldset>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="brand's name"
                          disabled={isPending || uploading}
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"Brand's Type"}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a brand's type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full">
                          {productTypeOptions.map((item, idx) => (
                            <SelectItem key={idx} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Image upload: do not upload here, we upload on submit */}
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={() => (
                    <FormItem>
                      <FormLabel>Brand Image</FormLabel>
                      <FormControl>
                        <ImageUpload
                          multiple={false}
                          accept="image/*"
                          onChange={(files: File[]) => {
                            selectedFileRef.current = files?.[0] ?? null
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" disabled={isPending || uploading}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isPending || uploading}>
                  {isPending || uploading ? (
                    <>
                      <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                      {uploading ? 'Uploading...' : 'Loading...'}
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </DialogFooter>
            </fieldset>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  )
}
