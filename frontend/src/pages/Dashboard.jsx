import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button } from '../components/common'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('user')

    if (!token) {
      // Redirect to login if no token
      navigate('/login')
      return
    }

    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [navigate])

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    
    // Redirect to login
    navigate('/login')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Welcome, {user.username || user.name || 'User'}!
          </h1>
          <Button 
            onClick={handleLogout}
            variant="secondary"
            className="bg-red-600 hover:bg-red-700"
          >
            Logout
          </Button>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 bg-slate-800 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Profile</h2>
            <div className="space-y-2 text-slate-300">
              <p><span className="font-medium">Username:</span> {user.username || 'N/A'}</p>
              <p><span className="font-medium">Email:</span> {user.email || 'N/A'}</p>
              <p><span className="font-medium">Member since:</span> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
            </div>
          </Card>

          <Card className="p-6 bg-slate-800 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Button className="w-full" variant="primary">Start Chat</Button>
              <Button className="w-full" variant="secondary">View History</Button>
              <Button className="w-full" variant="secondary">Settings</Button>
            </div>
          </Card>

          <Card className="p-6 bg-slate-800 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Stats</h2>
            <div className="space-y-2 text-slate-300">
              <p><span className="font-medium">Conversations:</span> 0</p>
              <p><span className="font-medium">Messages:</span> 0</p>
              <p><span className="font-medium">Active Time:</span> 0h</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
