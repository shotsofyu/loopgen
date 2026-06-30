import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default async function DashboardPage({
  searchParams
}: {
  searchParams: { upgraded?: string }
}) {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const user = await currentUser()
  const isPro = user?.publicMetadata?.plan === 'pro'
  const dailyUsage = (user?.publicMetadata?.dailyUsage as number) || 0
  const upgraded = searchParams.upgraded === 'true'

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-white mb-1">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}
          </h1>
          <p className="text-white/40 text-sm">Here's your Loop Generator dashboard.</p>
        </div>

        {upgraded && (
          <div className="card border-green-500/30 bg-green-500/5 p-4 mb-6 flex items-center gap-3">
            <span className="text-green-400 text-lg">✓</span>
            <p className="text-sm text-green-400">You're now on Pro! Unlimited loop charters activated.</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="card p-5">
            <p className="label mb-1">Plan</p>
            <p className="text-xl font-semibold text-white">{isPro ? 'Pro' : 'Free'}</p>
            {isPro && <p className="text-xs text-loop-400 mt-1">Unlimited charters</p>}
          </div>
          <div className="card p-5">
            <p className="label mb-1">Used today</p>
            <p className="text-xl font-semibold text-white">{dailyUsage}</p>
            {!isPro && <p className="text-xs text-white/30 mt-1">of 3 free</p>}
          </div>
          <div className="card p-5">
            <p className="label mb-1">Status</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm text-white/60">Active</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/app" className="card p-6 hover:border-loop-500/30 transition-colors group">
            <div className="text-2xl mb-3">⟳</div>
            <h3 className="font-semibold text-white mb-1 group-hover:text-loop-400 transition-colors">Generate a loop charter</h3>
            <p className="text-sm text-white/40">Turn a goal into a paste-ready Claude Code loop</p>
          </Link>

          {!isPro && (
            <Link href="/pricing" className="card p-6 border-loop-500/20 bg-loop-500/5 hover:border-loop-500/40 transition-colors group">
              <div className="text-2xl mb-3">⚡</div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-loop-400 transition-colors">Upgrade to Pro</h3>
              <p className="text-sm text-white/40">Unlimited charters for $9/month</p>
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}
