import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card } from '../components/common'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <Card className="p-10 bg-slate-800 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
          <div className="space-y-6">
            {/* 404 Title */}
            <div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                404
              </h1>
              <h2 className="text-2xl font-semibold text-white mt-2">
                Page Not Found
              </h2>
              <p className="text-slate-400 mt-2">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            {/* Navigation Options */}
            <div className="space-y-4">
              <Button
                as={Link}
                to="/"
                variant="primary"
                size="lg"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                Go Home
              </Button>
              
              <Button
                as={Link}
                to="/dashboard"
                variant="secondary"
                className="w-full"
              >
                Go to Dashboard
              </Button>
            </div>

            {/* Go Back Button */}
            <button
              onClick={() => window.history.back()}
              className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
            >
              ← Go back to previous page
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default NotFound
