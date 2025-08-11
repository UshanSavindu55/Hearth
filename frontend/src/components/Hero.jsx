import React from 'react'

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Your AI Mental Health
          <br />
          <span className="text-blue-500">Companion</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Experience compassionate AI support available 24/7. A safe space for your thoughts, 
          feelings, and mental wellness journey.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg">
            Start Chatting
          </button>
          <button className="border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-500 px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-200">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
