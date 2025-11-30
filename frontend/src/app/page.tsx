export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg text-terminal-green font-mono relative overflow-hidden scanlines crt-curve noise">
      {/* Matrix Rain Background */}
      <div className="matrix-rain"></div>
      
      {/* Hero Section */}
      <section className="relative z-10 py-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="glitch-text text-6xl md:text-8xl font-bold mb-8" data-text="BIP47 & PAYNYM">
            BIP47 & PAYNYM
          </h1>
          <p className="text-2xl md:text-3xl text-terminal-amber mb-4 animate-pulse-cyber">
            SHOWCASE
          </p>
          <p className="text-lg md:text-xl text-terminal-green/80 max-w-3xl mx-auto mb-12">
            Explore the future of private Bitcoin transactions through BIP47 payment codes and Paynym identities
          </p>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="relative z-10 py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="/auth"
              className="cyber-button hover-glitch group relative block p-6 border-2 border-terminal-green rounded-lg bg-terminal-black/50 backdrop-blur-cyber transition-all duration-300 hover:shadow-cyber hover:scale-105"
            >
              <h2 className="text-xl font-bold text-terminal-green mb-3 group-hover:text-cyber-blue transition-colors">
                AUTH47
              </h2>
              <p className="text-terminal-green/70 text-sm">
                Bitcoin-based authentication protocol
              </p>
            </a>

            <a
              href="/dashboard"
              className="cyber-button hover-glitch group relative block p-6 border-2 border-terminal-green rounded-lg bg-terminal-black/50 backdrop-blur-cyber transition-all duration-300 hover:shadow-cyber hover:scale-105"
            >
              <h2 className="text-xl font-bold text-terminal-green mb-3 group-hover:text-cyber-blue transition-colors">
                DASHBOARD
              </h2>
              <p className="text-terminal-green/70 text-sm">
                Your Paynym profile & settings
              </p>
            </a>

            <a
              href="/bip47-lab"
              className="cyber-button hover-glitch group relative block p-6 border-2 border-terminal-green rounded-lg bg-terminal-black/50 backdrop-blur-cyber transition-all duration-300 hover:shadow-cyber hover:scale-105"
            >
              <h2 className="text-xl font-bold text-terminal-green mb-3 group-hover:text-cyber-blue transition-colors">
                BIP47 LAB
              </h2>
              <p className="text-terminal-green/70 text-sm">
                Payment code experimentation
              </p>
            </a>

            <a
              href="/guestbook"
              className="cyber-button hover-glitch group relative block p-6 border-2 border-terminal-green rounded-lg bg-terminal-black/50 backdrop-blur-cyber transition-all duration-300 hover:shadow-cyber hover:scale-105"
            >
              <h2 className="text-xl font-bold text-terminal-green mb-3 group-hover:text-cyber-blue transition-colors">
                GUESTBOOK
              </h2>
              <p className="text-terminal-green/70 text-sm">
                Leave your Bitcoin signature
              </p>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
