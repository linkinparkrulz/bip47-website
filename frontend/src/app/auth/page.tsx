'use client'

import { useState, useEffect } from 'react'
import QRCode from 'qrcode'

export default function AuthPage() {
  const [auth47Uri, setAuth47Uri] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateQRCode = async (uri: string) => {
    try {
      const qrDataUrl = await QRCode.toDataURL(uri, {
        width: 200,
        margin: 2,
        color: {
          dark: '#00ff41',
          light: '#000000'
        }
      })
      setQrCodeUrl(qrDataUrl)
    } catch (err) {
      console.error('Error generating QR code:', err)
    }
  }

  const generateChallenge = async () => {
    setLoading(true)
    setError('')
    setQrCodeUrl('')
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://bip47-website.up.railway.app'}/api/auth/challenge`)
      const data = await response.json()
      
      if (data.auth47Uri) {
        setAuth47Uri(data.auth47Uri)
        await generateQRCode(data.auth47Uri)
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
    <main className="min-h-screen bg-dark-bg text-terminal-green font-mono relative overflow-hidden scanlines crt-curve noise">
      {/* Matrix Rain Background */}
      <div className="matrix-rain"></div>
      
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="glitch-text text-5xl md:text-7xl font-bold mb-4" data-text="AUTH47">
              AUTH47
            </h1>
            <p className="text-xl md:text-2xl text-terminal-amber animate-pulse-cyber">
              BITCOIN AUTHENTICATION PROTOCOL
            </p>
          </div>
          
          {/* Main Terminal Window */}
          <div className="terminal-window mb-8">
            <div className="terminal-header">
              <div className="terminal-button close"></div>
              <div className="terminal-button minimize"></div>
              <div className="terminal-button maximize"></div>
              <span className="text-xs text-terminal-green ml-2">auth47-terminal</span>
            </div>
            <div className="terminal-content">
              <p className="text-terminal-green">
                <span className="text-terminal-amber">$</span> ./auth47 --init
              </p>
              <p className="text-terminal-green mt-2">
                Initializing Bitcoin authentication...
              </p>
              <p className="text-cyber-blue">
                ✓ Wallet connection ready
              </p>
              <p className="text-cyber-blue">
                ✓ Challenge generation online
              </p>
              <p className="text-terminal-amber">
                █ Awaiting wallet signature...
              </p>
            </div>
          </div>
          
          {/* Error Display */}
          {error && (
            <div className="terminal-window mb-6 border-2 border-cyber-red">
              <div className="terminal-header">
                <div className="terminal-button close"></div>
                <span className="text-xs text-cyber-red ml-2">error-log</span>
              </div>
              <div className="terminal-content">
                <p className="text-cyber-red">
                  <span className="text-terminal-amber">$</span> ERROR: {error}
                </p>
                <p className="text-cyber-red mt-2">
                  ! System malfunction detected
                </p>
              </div>
            </div>
          )}
          
          {/* Auth URI Display */}
          {auth47Uri ? (
            <div className="space-y-6">
              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="terminal-button close"></div>
                  <div className="terminal-button minimize"></div>
                  <div className="terminal-button maximize"></div>
                  <span className="text-xs text-terminal-green ml-2">auth47-uri</span>
                </div>
                <div className="terminal-content">
                  <p className="text-terminal-green">
                    <span className="text-terminal-amber">$</span> cat /tmp/auth47_challenge.txt
                  </p>
                  <div className="mt-4 p-4 bg-terminal-black border border-terminal-green rounded">
                    <code className="text-xs md:text-sm text-cyber-blue break-all font-mono">
                      {auth47Uri}
                    </code>
                  </div>
                  <p className="text-terminal-amber mt-4 terminal-cursor">
                    $ copy --clipboard
                  </p>
                </div>
              </div>
              
              {/* QR Code Section */}
              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="terminal-button close"></div>
                  <span className="text-xs text-terminal-green ml-2">qr-scanner</span>
                </div>
                <div className="terminal-content">
                  <p className="text-terminal-green">
                    <span className="text-terminal-amber">$</span> ./qr_generator --input auth47_uri
                  </p>
                  <div className="mt-4 flex justify-center">
                    <div className="bg-white p-4 border-2 border-terminal-green rounded">
                      {qrCodeUrl ? (
                        <img 
                          src={qrCodeUrl} 
                          alt="Auth47 QR Code" 
                          className="w-48 h-48"
                        />
                      ) : (
                        <div className="w-48 h-48 bg-black flex items-center justify-center">
                          <div className="cyber-loader"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-cyber-blue mt-4 text-center">
                    {qrCodeUrl ? '✓ QR code generated successfully' : '⚠ Generating QR code...'}
                  </p>
                </div>
              </div>
              
              {/* Generate New Button */}
              <button
                onClick={generateChallenge}
                disabled={loading}
                className="cyber-button w-full py-4 text-lg font-bold hover-glitch disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="cyber-loader mr-3"></div>
                    GENERATING NEW CHALLENGE...
                  </span>
                ) : (
                  'GENERATE NEW CHALLENGE'
                )}
              </button>
            </div>
          ) : (
            <div className="terminal-window">
              <div className="terminal-content text-center">
                <p className="text-terminal-green mb-6">
                  <span className="text-terminal-amber">$</span> ./auth47 --generate-challenge
                </p>
                <button
                  onClick={generateChallenge}
                  disabled={loading}
                  className="cyber-button px-8 py-4 text-lg font-bold hover-glitch disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <div className="cyber-loader mr-3"></div>
                      INITIALIZING...
                    </span>
                  ) : (
                    'GENERATE AUTH47 CHALLENGE'
                  )}
                </button>
              </div>
            </div>
          )}
          
          {/* Instructions */}
          <div className="terminal-window mt-8">
            <div className="terminal-header">
              <div className="terminal-button close"></div>
              <span className="text-xs text-terminal-green ml-2">instructions.txt</span>
            </div>
            <div className="terminal-content">
              <p className="text-terminal-green">
                <span className="text-terminal-amber">$</span> cat /usr/share/auth47/MANUAL.txt
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <p className="text-terminal-amber font-bold">PROTOCOL EXECUTION:</p>
                <ol className="list-decimal list-inside space-y-2 text-terminal-green">
                  <li>Copy the auth47 URI from terminal above</li>
                  <li>Launch Bitcoin wallet (Sparrow, BlueWallet, etc.)</li>
                  <li>Navigate to "Sign Message" protocol</li>
                  <li>Paste auth47 URI as message payload</li>
                  <li>Execute signature with private key</li>
                  <li>System will auto-redirect on verification</li>
                </ol>
              </div>
              <p className="text-cyber-blue mt-4">
                ✓ Protocol security: END-TO-END ENCRYPTED
              </p>
              <p className="text-cyber-blue">
                ✓ Network status: MAINNET READY
              </p>
            </div>
          </div>
          
          {/* Back Button */}
          <div className="text-center mt-8">
            <a 
              href="/" 
              className="cyber-button inline-block px-6 py-3 hover-glitch"
            >
              ← RETURN TO MAINFRAME
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
