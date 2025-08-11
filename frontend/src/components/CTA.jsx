import React from 'react'

const CTA = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-500 py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands who have found support and healing through Hearth's compassionate AI companion.
        </p>
        <button className="bg-white text-blue-500 hover:bg-gray-50 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg">
          Start Your Free Chat
        </button>
      </div>
    </section>
  )
}

export default CTA
