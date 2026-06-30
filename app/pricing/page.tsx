import Link from 'next/link'
import Navbar from '@/components/Navbar'

const FREE_FEATURES = [
  '3 loop charters per day',
  'All 4 loop types',
  'Copy to clipboard',
  'Claude Code ready output',
]

const PRO_FEATURES = [
  'Unlimited loop charters',
  'All 4 loop types',
  'Export as .md file',
  'Charter history',
  'Priority generation',
  'Early access to new loop types',
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
        <p className="label mb-3">Pricing</p>
        <h1 className="text-4xl font-semibold text-white mb-4">Simple, honest pricing</h1>
        <p className="text-white/40 mb-16 max-w-md mx-auto">Start free. Upgrade when you're shipping loops every day.</p>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
          {/* Free */}
          <div className="card p-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-1">Free</h2>
              <p className="text-white/40 text-sm">For builders getting started</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-semibold text-white">$0</span>
              <span className="text-white/30 text-sm ml-1">/ month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {FREE_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-white/60">
                  <span className="text-white/20">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/sign-up" className="block w-full text-center border border-white/10 hover:border-white/20 text-white/60 hover:text-white py-2.5 rounded-xl text-sm transition-all">
              Get started free
            </Link>
          </div>

          {/* Pro */}
          <div className="card p-8 border-loop-500/30 bg-loop-500/5 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-loop-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">Most popular</div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-1">Pro</h2>
              <p className="text-white/40 text-sm">For teams shipping with loops every day</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-semibold text-white">$9</span>
              <span className="text-white/30 text-sm ml-1">/ month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {PRO_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                  <span className="text-loop-400">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/api/checkout" className="block w-full text-center btn-primary py-2.5 rounded-xl text-sm text-center">
              Upgrade to Pro
            </Link>
          </div>
        </div>

        <p className="mt-10 text-white/20 text-xs">
          Cancel anytime. Billed monthly. No contracts.
        </p>
      </div>
    </main>
  )
}
