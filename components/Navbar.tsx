'use client'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#0a0a0f]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-loop-500 flex items-center justify-center text-white text-xs font-bold">L</div>
          <span className="font-semibold text-white text-sm">Loop Generator</span>
        </Link>

        <div className="flex items-center gap-1">
          <Link href="/blog" className="btn-ghost">Blog</Link>
            <Link href="/pricing" className="btn-ghost">Pricing</Link>

          <SignedOut>
            <Link href="/sign-in" className="btn-ghost">Sign in</Link>
            <Link href="/sign-up" className="btn-primary ml-1">Get started free</Link>
          </SignedOut>

          <SignedIn>
            <Link href="/dashboard" className="btn-ghost">Dashboard</Link>
            <div className="ml-2">
              <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: 'w-8 h-8' } }} />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  )
}
