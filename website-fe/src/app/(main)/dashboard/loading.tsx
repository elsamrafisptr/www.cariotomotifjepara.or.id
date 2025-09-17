import { LoaderCircleIcon } from 'lucide-react'

const LoadingDashboardPage = () => {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center">
      <LoaderCircleIcon className="animate-spin" />
      <p>Loading...</p>
    </section>
  )
}

export default LoadingDashboardPage
