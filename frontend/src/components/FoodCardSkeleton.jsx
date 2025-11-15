import React from 'react'

function FoodCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="relative h-56 bg-gray-200">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        <div className="absolute top-4 right-4 bg-white/80 px-4 py-2 rounded-full">
          <div className="w-12 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="p-6 bg-gradient-to-b from-white to-gray-50">
        <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
        <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
        <div className="w-5/6 h-4 bg-gray-200 rounded mb-4"></div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-300 rounded-full"></div>
            ))}
          </div>
          <div className="w-8 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default FoodCardSkeleton