/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image'

import { X } from 'lucide-react'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type FileItem = {
  id: string
  file: File
  previewUrl: string
  progress: number
  status: 'idle' | 'uploading' | 'done' | 'error'
}

type Props = {
  multiple?: boolean
  accept?: string
  maxFiles?: number
  value?: File[]
  onChange?: (files: File[]) => void
  autoUpload?: boolean
  uploadFn?: (
    file: File,
    onProgress: (p: number) => void,
    signal?: AbortSignal
  ) => Promise<any>
  className?: string
}

const makeId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`

const ImageUpload = forwardRef((props: Props, ref) => {
  const {
    multiple = false,
    accept = 'image/*',
    maxFiles,
    value,
    onChange,
    autoUpload = false,
    uploadFn,
    className = ''
  } = props

  const inputRef = useRef<HTMLInputElement | null>(null)
  const [items, setItems] = useState<FileItem[]>([])
  const abortControllers = useRef<Map<string, AbortController>>(new Map())

  // Controlled value -> sync
  useEffect(() => {
    if (value) {
      const newItems = value.map(f => ({
        id: makeId(),
        file: f,
        previewUrl: URL.createObjectURL(f),
        progress: 0,
        status: 'idle' as const
      }))
      // revoke old previews
      setItems(prev => {
        prev.forEach(p => URL.revokeObjectURL(p.previewUrl))
        return newItems
      })
    }
  }, [value])

  useEffect(() => {
    return () => {
      // cleanup previews and abort controllers
      items.forEach(i => URL.revokeObjectURL(i.previewUrl))
      abortControllers.current.forEach(ac => ac.abort())
    }
  }, [])

  useImperativeHandle(ref, () => ({
    getFiles: () => items.map(i => i.file),
    clear: () => handleClear()
  }))

  const pushFiles = (files: FileList | File[]) => {
    const arr = Array.from(files)
    if (!multiple && arr.length > 1) arr.splice(1)
    let allowed = arr
    if (maxFiles !== undefined) {
      const canAdd = Math.max(0, maxFiles - items.length)
      allowed = arr.slice(0, canAdd)
    }
    const fileItems = allowed.map(f => ({
      id: makeId(),
      file: f,
      previewUrl: URL.createObjectURL(f),
      progress: 0,
      status: 'idle' as const
    }))
    setItems(prev => {
      const next = multiple ? [...prev, ...fileItems] : [...fileItems]
      // notify parent
      onChange?.(next.map(i => i.file))
      return next
    })

    if (autoUpload && uploadFn) {
      fileItems.forEach(fi => startUpload(fi))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    pushFiles(e.target.files)
    e.currentTarget.value = '' // reset so same file can be selected again
  }

  const handleRemove = (id: string) => {
    setItems(prev => {
      const next = prev.filter(p => p.id !== id)
      const removed = prev.find(p => p.id === id)
      if (removed) {
        URL.revokeObjectURL(removed.previewUrl)
        // abort upload if in progress
        const ac = abortControllers.current.get(id)
        if (ac) {
          ac.abort()
          abortControllers.current.delete(id)
        }
      }
      onChange?.(next.map(i => i.file))
      return next
    })
  }

  const handleClear = () => {
    setItems(prev => {
      prev.forEach(p => URL.revokeObjectURL(p.previewUrl))
      abortControllers.current.forEach(ac => ac.abort())
      abortControllers.current.clear()
      onChange?.([])
      return []
    })
  }

  const startUpload = async (item: FileItem) => {
    if (!uploadFn) return
    setItems(prev =>
      prev.map(p => (p.id === item.id ? { ...p, status: 'uploading', progress: 0 } : p))
    )
    const ac = new AbortController()
    abortControllers.current.set(item.id, ac)

    try {
      await uploadFn(
        item.file,
        (p: number) => {
          setItems(prev =>
            prev.map(pp => (pp.id === item.id ? { ...pp, progress: p } : pp))
          )
        },
        ac.signal
      )

      setItems(prev =>
        prev.map(p => (p.id === item.id ? { ...p, status: 'done', progress: 100 } : p))
      )
      abortControllers.current.delete(item.id)
    } catch (err) {
      if ((err as any)?.name === 'AbortError') {
        // treat as removed/cancelled
        setItems(prev => prev.filter(p => p.id !== item.id))
        abortControllers.current.delete(item.id)
        return
      }
      setItems(prev =>
        prev.map(p => (p.id === item.id ? { ...p, status: 'error' } : p))
      )
      abortControllers.current.delete(item.id)
    }
  }

  const handleUploadAll = () => {
    items.forEach(i => {
      if (i.status === 'idle' && uploadFn) startUpload(i)
    })
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept={accept}
          multiple={multiple}
          ref={inputRef}
          onChange={handleInputChange}
        />
        {uploadFn && (
          <Button type="button" onClick={handleUploadAll}>
            Upload all
          </Button>
        )}
        <Button type="button" variant="ghost" onClick={handleClear}>
          Clear
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {items.map(item => (
          <div key={item.id} className="relative">
            <div className="bg-muted aspect-square w-full overflow-hidden rounded-md border">
              <Image
                src={item.previewUrl}
                alt={item.file.name}
                className="h-full w-full object-cover"
                height={1024}
                width={1024}
              />
            </div>

            {/* overlay controls */}
            <div className="absolute top-1 right-1 flex gap-1">
              <button
                type="button"
                className="rounded-full bg-white/80 p-1 hover:bg-white"
                onClick={() => handleRemove(item.id)}
                aria-label="Remove"
              >
                <X size={14} />
              </button>
            </div>

            <div className="mt-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="max-w-[80%] truncate">{item.file.name}</span>
                <span className="text-muted-foreground text-[11px]">
                  {Math.round(item.file.size / 1024)} KB
                </span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded bg-gray-200">
                <div
                  style={{ width: `${item.progress}%` }}
                  className="from-primary h-full bg-gradient-to-r to-emerald-500"
                />
              </div>
              <div className="mt-1 text-[11px]">{item.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

ImageUpload.displayName = 'ImageUpload'
export default ImageUpload
