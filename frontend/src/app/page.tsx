export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="header-banner">
          BIP47 & Paynym Showcase
        </p>
      </div>

      <div className="relative flex place-items-center hero-gradient z-negative-1">
        <h1 className="text-4xl font-bold">
          Welcome to BIP47 & Paynym Showcase
        </h1>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="/auth"
          className="card"
        >
          <h2>
            Auth47 Authentication
          </h2>
          <p>
            Authenticate with Bitcoin wallets using auth47 protocol.
          </p>
        </a>

        <a
          href="/dashboard"
          className="card"
        >
          <h2>
            Dashboard
          </h2>
          <p>
            View your authenticated profile and settings.
          </p>
        </a>

        <a
          href="/bip47-lab"
          className="card"
        >
          <h2>
            BIP47 Lab
          </h2>
          <p>
            Experiment with Bitcoin payment codes.
          </p>
        </a>

        <a
          href="/guestbook"
          className="card"
        >
          <h2>
            Guestbook
          </h2>
          <p>
            Leave a message with your Bitcoin identity.
          </p>
        </a>
      </div>
    </main>
  )
}
