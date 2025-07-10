import { Card, CardContent } from '../ui/card'

const BenefitCard = ({
  order,
  title,
  description
}: {
  order: number
  title: string
  description: string
}) => {
  return (
    <Card className="border-black bg-white/80 shadow-none transition-colors duration-300 hover:cursor-pointer hover:border-blue-600">
      <CardContent className="p-8">
        <div className="mb-6">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100">
            <p className="text-2xl font-bold text-blue-600">{order}</p>
          </div>
          <h3 className="mb-3 text-xl font-semibold text-gray-900">{title}</h3>
          <p className="leading-relaxed text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BenefitCard
