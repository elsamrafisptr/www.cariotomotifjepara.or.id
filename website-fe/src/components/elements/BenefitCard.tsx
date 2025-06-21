import { ElementType } from 'react'

import { Card, CardContent } from '../ui/card'

const BenefitCard = ({
  Icon,
  title,
  description
}: {
  Icon: ElementType
  title: string
  description: string
}) => {
  return (
    <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl">
      <CardContent className="p-8">
        <div className="mb-6">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100">
            <Icon className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="mb-3 text-xl font-semibold text-gray-900">{title}</h3>
          <p className="leading-relaxed text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BenefitCard
