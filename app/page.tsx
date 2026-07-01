import Link from 'next/link'
import Navbar from '@/components/Navbar'

const LOOP_TYPES = [
  { icon: '↺', name: 'Refinement', desc: 'Write → critique → rewrite until perfect' },
  { icon: '⟶', name: 'Batch', desc: 'Process a list of items one by one' },
  { icon: '⚔', name: 'Adversarial', desc: 'Generator vs. critic — best output wins' },
  { icon: '◉', name: 'Monitor', desc: 'Watch a condition and act when it changes' },
]

const STEPS = [
  { n: '01', title: 'Describe your goal', body: 'Plain language. What should be true when the work is done?' },
  { n: '02', title: 'Pick a loop type', body: 'Refinement, batch, adversarial, or monitor — we pick the right engine.' },
  { n: '03', title: 'Get your charter', body: 'A paste-ready loop charter drops in seconds. Copy it.' },
  { n: '04', title: 'Paste into Claude Code', body: 'Type /goal and walk away. Claude runs the loop.' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      {/* Hero */}
      <section className="grid-bg relative pt-32 pb-24 px-6 text-center overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] bg-loop-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-loop-500/10 border border-loop-500/20 text-loop-400 text-xs font-medium px-3 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-loop-400 animate-pulse" />
            Inspired by Boris Cherny, Head of Claude Code at Anthropic
          </div>

          <h1 className="text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight text-white mb-6">
            Stop prompting.<br />
            <span className="text-loop-400">Start looping.</span>
          </h1>

          <p className="text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
            Describe your goal. Get a ready-to-paste Claude Code loop charter in seconds. 
            Claude runs the loop — you ship the work.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/app" className="btn-primary px-8 py-3 text-base rounded-xl">
              Generate your first loop — free
            </Link>
            <Link href="/pricing" className="btn-ghost text-base">
              See pricing →
            </Link>
          </div>

          <p className="mt-5 text-white/25 text-xs">10 free charters per day · No card required</p>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 px-6 border-y border-white/[0.05]">
        <div className="max-w-2xl mx-auto text-center">
          <blockquote className="text-xl md:text-2xl font-medium text-white/80 leading-relaxed mb-4">
            "I don't prompt Claude anymore. I have loops running that prompt Claude and figure out what to do. My job is to write loops."
          </blockquote>
          <cite className="text-sm text-white/35 not-italic">
            Boris Cherny — Head of Claude Code, Anthropic · Acquired Unplugged, June 2026
          </cite>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="label text-center mb-3">How it works</p>
          <h2 className="text-3xl font-semibold text-center text-white mb-16">Four steps. Zero prompting.</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {STEPS.map(s => (
              <div key={s.n} className="card p-6">
                <div className="font-mono text-loop-500 text-sm mb-4">{s.n}</div>
                <h3 className="font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loop types */}
      <section className="py-24 px-6 bg-[#080810]">
        <div className="max-w-5xl mx-auto">
          <p className="label text-center mb-3">Loop types</p>
          <h2 className="text-3xl font-semibold text-center text-white mb-4">Four engines. Every kind of work.</h2>
          <p className="text-center text-white/40 mb-16 max-w-lg mx-auto">Each pattern is matched to a class of task. Pick the right one and your loop runs cleaner and stops reliably.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {LOOP_TYPES.map(t => (
              <div key={t.name} className="card p-6 flex items-start gap-5 group hover:border-loop-500/20 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-loop-500/10 flex items-center justify-center text-loop-400 text-lg flex-shrink-0 group-hover:bg-loop-500/20 transition-colors">
                  {t.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{t.name}</h3>
                  <p className="text-sm text-white/40">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example charter preview */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="label text-center mb-3">Example output</p>
          <h2 className="text-3xl font-semibold text-center text-white mb-16">This is what you get.</h2>
          <div className="card p-6 glow-border">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/[0.06]">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-xs text-white/30 font-mono">loop-charter.md</span>
            </div>
            <pre className="font-mono text-sm leading-7 text-white/70 overflow-x-auto whitespace-pre-wrap">
{`\x1b[34mGOAL\x1b[0m
Fix all broken internal links in /docs and produce a 
change report at docs/link-report.md.

\x1b[34mFIND THE WORK\x1b[0m
Run: grep -r "\\[.*\\](.*)" /docs --include="*.md" -l
Process each file in the returned list.

\x1b[34mHOW TO EXECUTE\x1b[0m
For each file: extract all markdown links, fetch each 
URL with a HEAD request, record any non-200 as broken,
replace with the correct URL or flag for manual review.

\x1b[34mHOW TO VERIFY\x1b[0m
Re-run the link checker on the modified file. Zero 
broken links = item complete.

\x1b[34mSTOPPING CONDITION\x1b[0m
All files processed and link checker returns 0 errors 
across the entire /docs tree.

\x1b[34mCONSTRAINTS\x1b[0m
Do not modify files in /docs/archive. Max 3 retries
per broken link before flagging for manual review.`}
            </pre>
          </div>
          <p className="text-center text-white/25 text-xs mt-4">Paste this into Claude Code → type /goal → walk away</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl font-semibold text-white mb-4">Ready to stop prompting?</h2>
          <p className="text-white/40 mb-8">Join developers who let loops do the work.</p>
          <Link href="/app" className="btn-primary px-10 py-4 text-base rounded-xl inline-block">
            Start generating loops free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/25">
          <span>© 2026 Loop Generator</span>
          <div className="flex gap-6">
            <Link href="/pricing" className="hover:text-white/50 transition-colors">Pricing</Link>
            <Link href="/app" className="hover:text-white/50 transition-colors">App</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
