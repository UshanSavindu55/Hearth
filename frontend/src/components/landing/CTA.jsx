import React from 'react'
import { Button, Card } from '../common'

const CTA = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Card 
          padding="xl" 
          shadow="xl" 
          rounded="2xl"
          className="bg-white/10 backdrop-blur-sm border-white/20"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands who have found support and healing through Hearth's compassionate AI companion.
          </p>
          <Button 
            variant="secondary" 
            size="xl"
            className="bg-white text-blue-600 hover:bg-gray-50 hover:scale-105 shadow-lg"
          >
            Start Your Free Chat
          </Button>
        </Card>
      </div>
    </section>
  )
}

export default CTA
