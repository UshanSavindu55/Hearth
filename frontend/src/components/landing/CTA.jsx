import React from 'react'
import { Button, Card } from '../common'

const CTA = () => {
  return (
    <section className="bg-gradient-to-b from-slate-800 to-slate-900 py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Card 
          padding="xl"
          shadow="xl"
          rounded="2xl"
          bgColor="bg-slate-800/50 backdrop-blur-sm border-slate-700/50"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands who have found support and healing through Hearth's compassionate AI companion.
          </p>
          <Button 
            variant="primary"
            size="xl"
            bgcolor="bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 shadow-lg"
          >
            Start Your Free Chat
          </Button>
        </Card>
      </div>
    </section>
  )
}

export default CTA