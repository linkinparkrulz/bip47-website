'use client'

import { useState, useEffect } from 'react'

export default function AuthPage() {
  const [auth47Uri, setAuth47Uri] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateChallenge = async () => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/auth/challenge`)
      const data = await response.json()
      
      if (data.auth47Uri) {
        setAuth47Uri(data.auth47Uri)
      } else {
        setError('Failed to generate auth47 URI')
      }
    } catch (err) {
      setError('Error connecting to backend')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    generateChallenge()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8">
          Auth47 Authentication
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-gray-600 mb-6 text-center">
            Authenticate with your Bitcoin wallet using the auth47 protocol.
          </p>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {auth47Uri ? (
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded">
                <h3 className="font-semibold mb-2">Auth47 URI:</h3>
                <code className="text-sm break-all">{auth47Uri}</code>
              </div>
              
              <div className="text-center">
                <p className="mb-4">Scan this QR code with your Bitcoin wallet:</p>
                <div className="inline-block bg-white p-4 border-2 border-gray-300 rounded">
                  <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">QR Code</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={generateChallenge}
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Generate New Challenge'}
              </button>
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={generateChallenge}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Generate Auth47 Challenge'}
              </button>
            </div>
          )}
          
          <div className="mt-6 text-sm text-gray-500">
            <p className="font-semibold mb-2">How to use:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Copy the auth47 URI above</li>
              <li>Open your Bitcoin wallet (Sparrow, BlueWallet, etc.)</li>
              <li>Use the "Sign Message" feature</li>
              <li>Paste the auth47 URI as the message</li>
              <li>Sign with your Bitcoin key</li>
              <li>You'll be redirected back automatically</li>
            </ol>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <a href="/" className="text-blue-500 hover:underline">
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  )
}
