import { Metadata } from 'next'

import NotFound from '@/components/layouts/NotFound'

export const metadata: Metadata = {
  title: '404',
  description: 'Something went wrong'
}

const NotFoundPage = () => {
  return <NotFound />
}

export default NotFoundPage
