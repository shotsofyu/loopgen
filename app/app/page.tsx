'use client'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const LOOP_TYPES = [
  { id: 'refinement', label: 'Refinement', desc: 'Write → critique → rewrite', icon: '↺' },
  { id: 'batch',      label: 'Batch',       desc: 'Process a list of items',   icon: '⟶' },
  { id: 'adversarial',label: 'Adversarial', desc: 'Generator vs. critic',       icon: '⚔' },
  { id: 'monitor',    label: 'Monitor',     desc: 'Watch & act on changes',     icon: '◉' },
]

const DONE_OPTIONS = [
  { id: 'tests',    label: 'All tests pass' },
  { id: 'checklist',label: 'Checklist complete' },
  { id: 'quality',  label: 'Quality score met' },
  { id: 'manual',   label: "I'll decide" },
]

export default function AppPage() {
  const { isSignedIn, user } = useUser()
  const [goal, setGoal] = useState('')
  const [workSource, setWorkSource] = useState('')
  const [loopType, setLoopType] = useState('refinement')
  const [doneWhen, setDoneWhen] = useState('tests')
  const [constraints, setConstraints] = useState('')
  const [charter, setCharter] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const isPro = user?.publicMetadata?.plan === 'pro'
  const usageCount = (user?.publicMetadata?.dailyUsage as number) || 0
  const FREE_LIMIT = 10

  const canGenerate = isSignedIn ? (isPro || usageCount < FREE_LIMIT) : usageCount < 1

  async function generate() {
    if (!goal.trim()) return
    setLoading(true)
    setError('')
    setCharter('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, workSource, loopType, doneWhen, constraints }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Generation failed')
      setCharter(data.charter)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  function copy() {
    navigator.clipboard.writeText(charter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Highlight charter sections
  function renderCharter(text: string) {
    return text.split('\n').map((line, i) => {
      const isSectionHeader = /^[A-Z][A-Z\s]+$/.test(line.trim()) && line.trim().length > 2
      return (
        <div key={i} className={isSectionHeader ? 'text-loop-400 font-medium mt-4 first:mt-0' : 'text-white/70'}>
          {line || '\u00A0'}
        </div>
      )
    })
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-white mb-1">Loop Generator</h1>
          <p className="text-white/40 text-sm">Describe a goal. Get a paste-ready Claude Code loop charter.</p>
        </div>

        {/* Usage indicator */}
        {isSignedIn && !isPro && (
          <div className="card px-4 py-3 mb-6 flex items-center justify-between">
            <span className="text-sm text-white/50">
              <span className="text-white font-medium">{FREE_LIMIT - usageCount}</span> free charters remaining today
            </span>
            <Link href="/pricing" className="text-xs text-loop-400 hover:text-loop-300 transition-colors">
              Upgrade for unlimited →
            </Link>
          </div>
        )}

        {isPro && (
          <div className="card px-4 py-3 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-sm text-white/50">Pro plan · Unlimited charters</span>
          </div>
        )}

        {/* Form */}
        <div className="space-y-6">
          <div>
            <label className="label">What's your goal?</label>
            <textarea
              className="input h-24 resize-none"
              placeholder="e.g. Go through all markdown files in /docs and fix broken links, then output a report of what changed"
              value={goal}
              onChange={e => setGoal(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Where does the work live?</label>
            <input
              className="input"
              placeholder="e.g. /docs folder, a GitHub repo, a task list, a CSV file..."
              value={workSource}
              onChange={e => setWorkSource(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Loop type</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {LOOP_TYPES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setLoopType(t.id)}
                  className={`card p-3 text-left transition-all ${
                    loopType === t.id
                      ? 'border-loop-500/50 bg-loop-500/5'
                      : 'hover:border-white/10'
                  }`}
                >
                  <div className="text-xl mb-2">{t.icon}</div>
                  <div className={`text-sm font-medium ${loopType === t.id ? 'text-loop-400' : 'text-white'}`}>{t.label}</div>
                  <div className="text-xs text-white/30 mt-0.5 leading-tight">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Done when…</label>
            <div className="grid grid-cols-2 gap-2">
              {DONE_OPTIONS.map(o => (
                <button
                  key={o.id}
                  onClick={() => setDoneWhen(o.id)}
                  className={`card px-4 py-2.5 text-sm text-left transition-all ${
                    doneWhen === o.id
                      ? 'border-loop-500/50 text-loop-400 bg-loop-500/5'
                      : 'text-white/60 hover:border-white/10 hover:text-white/80'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Constraints <span className="normal-case tracking-normal text-white/25">(optional)</span></label>
            <input
              className="input"
              placeholder="e.g. Don't touch /archive, max 3 retries per item..."
              value={constraints}
              onChange={e => setConstraints(e.target.value)}
            />
          </div>

          {!isSignedIn ? (
            <div className="card p-6 text-center">
              <p className="text-white/50 text-sm mb-4">Sign in to generate loop charters</p>
              <Link href="/sign-up" className="btn-primary">Create free account</Link>
              <p className="text-xs text-white/25 mt-3">10 free charters per day after signup</p>
            </div>
          ) : !canGenerate ? (
            <div className="card p-6 text-center">
              <p className="text-white/50 text-sm mb-4">You've used your 10 free charters for today.</p>
              <Link href="/pricing" className="btn-primary">Upgrade to Pro — unlimited</Link>
            </div>
          ) : (
            <button
              onClick={generate}
              disabled={loading || !goal.trim()}
              className="btn-primary w-full py-3.5 text-base disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Writing your loop charter...
                </>
              ) : 'Generate loop charter'}
            </button>
          )}
        </div>

        {error && (
          <div className="mt-6 card border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">{error}</div>
        )}

        {/* Charter output */}
        {charter && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-white/60">Your loop charter</span>
              <button
                onClick={copy}
                className="flex items-center gap-1.5 text-xs text-loop-400 bg-loop-500/10 border border-loop-500/20 px-3 py-1.5 rounded-lg hover:bg-loop-500/20 transition-colors"
              >
                {copied ? '✓ Copied!' : '⎘ Copy charter'}
              </button>
            </div>
            <div className="card glow-border p-6">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/[0.06]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs text-white/25 font-mono">loop-charter.md</span>
              </div>
              <div className="font-mono text-sm leading-7 whitespace-pre-wrap">
                {renderCharter(charter)}
              </div>
            </div>
            <p className="text-center text-white/25 text-xs mt-3">
              Paste into Claude Code and type <code className="text-loop-400">/goal</code> to start the loop
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
