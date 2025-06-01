import React from 'react'

const Home = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-4xl font-bold text-gray-900">
        Welcome to Cari Otomotif Jepara
      </h1>
      <p className="mb-8 text-lg text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Feature {i}</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt.
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
