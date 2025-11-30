import './globals.css'

export const metadata = {
  title: 'BIP47 & Paynym Showcase | Cypherpunk Terminal',
  description: 'Bitcoin payment codes and Paynym authentication showcase - Cypherpunk terminal interface',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-mono antialiased">
        {children}
      </body>
    </html>
  )
}
