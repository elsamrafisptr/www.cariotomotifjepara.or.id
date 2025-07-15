import Image from 'next/image'

import React from 'react'

import { Card, CardHeader, CardTitle } from '../ui/card'

const MotorProductCard = ({ title, src }: { title: string; src: string }) => {
  return (
    <Card>
      <CardHeader>
        <Image
          src={src}
          alt={title}
          width={1024}
          height={1024}
          className="aspect-video w-full bg-gray-200"
        />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
    </Card>
  )
}

export default MotorProductCard
