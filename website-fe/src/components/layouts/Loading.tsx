import { LoaderCircle } from 'lucide-react'

const Loading = () => {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center">
      <LoaderCircle className="animate-spin" />
      <p>Loading...</p>
    </section>
  )
}

export default Loading
