import { ElementType } from 'react'

import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'

const ServiceCard = ({
  Icon,
  title,
  description,
  links
}: {
  Icon: ElementType
  title: string
  description: string
  links: string[] | undefined
}) => {
  return (
    <Card className="border border-gray-200 transition-all duration-300 hover:border-blue-300 hover:shadow-lg">
      <CardContent className="p-8">
        <div className="mb-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="mb-3 text-xl font-semibold text-gray-900">{title}</h3>
          <p className="mb-4 leading-relaxed text-gray-600">
            {description.split(', ').map((part, i, arr) => {
              if (links && i === arr.length - 1) {
                const words = part.split(' ')
                return (
                  <span key={i}>
                    {i > 0 && ', '}
                    {words.map((word, wordIndex) => {
                      const cleanWord = word.replace(/[.,]/g, '')
                      const isLink = links.some(link =>
                        cleanWord
                          .toLowerCase()
                          .includes(link.toLowerCase().replace(/\s+/g, ''))
                      )
                      return isLink ? (
                        <span
                          key={wordIndex}
                          className="cursor-pointer text-blue-600 underline"
                        >
                          {word}{' '}
                        </span>
                      ) : (
                        <span key={wordIndex}>{word} </span>
                      )
                    })}
                  </span>
                )
              }
              return (
                <span key={i}>
                  {i > 0 && ', '}
                  {part}
                </span>
              )
            })}
          </p>
        </div>

        <Button
          variant="ghost"
          className="h-auto p-0 font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700"
        >
          Learn more →
        </Button>
      </CardContent>
    </Card>
  )
}

export default ServiceCard
