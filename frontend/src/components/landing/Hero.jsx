import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../common'

const Hero = () => {
  const navigate = useNavigate()

  const handleStartChatting = () => {
    navigate('/login')
  }

  const handleLearnMore = () => {
    // Scroll to features section or navigate to about page
    const featuresSection = document.getElementById('features')
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-700 py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Your AI Mental Health
          <br />
          <span className="text-indigo-400">Companion</span>
        </h1>
        
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Experience compassionate AI support available 24/7. A safe space for your thoughts, 
          feelings, and mental wellness journey.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="primary"
            size="xl"
            className="hover:scale-105 shadow-lg"
            onClick={handleStartChatting}
          >
            Start Chatting
          </Button>
          <Button 
            variant="outline"
            size="xl"
            onClick={handleLearnMore}
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Hero