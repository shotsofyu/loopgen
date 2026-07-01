import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Stop Prompting. Start Looping. | Loop Generator Blog',
  description: 'Why the best Claude Code developers have stopped writing prompts and started writing loops — and how you can too.',
  openGraph: {
    title: 'Stop Prompting. Start Looping.',
    description: 'Why the best Claude Code developers have stopped writing prompts and started writing loops.',
    type: 'article',
  },
}

export default function Post() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <article className="max-w-2xl mx-auto px-6 pt-28 pb-20">
        <div className="mb-10">
          <Link href="/blog" className="text-xs text-white/30 hover:text-white/60 transition-colors">← Blog</Link>
          <div className="flex items-center gap-3 mt-4 mb-6">
            <span className="text-xs text-white/25">July 1, 2026</span>
            <span className="text-white/10">·</span>
            <span className="text-xs text-white/25">4 min read</span>
          </div>
          <h1 className="text-4xl font-semibold text-white leading-tight mb-4">Stop Prompting. Start Looping.</h1>
          <p className="text-lg text-white/50 leading-relaxed">Why the best Claude Code developers have stopped writing prompts and started writing loops — and how you can too.</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-white/70 leading-relaxed">
          <p>In June 2026, Boris Cherny — the creator of Claude Code at Anthropic — said something that changed how developers think about AI:</p>

          <blockquote className="border-l-2 border-loop-500 pl-6 my-8">
            <p className="text-white/80 text-lg font-medium italic">"I don't prompt Claude anymore. I have loops running that prompt Claude and figure out what to do. My job is to write loops."</p>
          </blockquote>

          <p>This single statement captures a fundamental shift happening in AI-assisted development. The developers shipping the most with Claude Code aren't spending hours crafting perfect prompts. They're building systems that run autonomously.</p>

          <h2 className="text-xl font-semibold text-white mt-10 mb-4">What's wrong with prompting?</h2>
          <p>Nothing — for simple tasks. Ask Claude to explain a function, fix a bug, or draft an email. Prompting works fine.</p>
          <p>But for complex work — refactoring a codebase, processing hundreds of files, iterating on a design until it's perfect — prompting breaks down. You're constantly babysitting. Claude finishes one step and stops. You have to push it forward. The context gets lost. You forget where you were.</p>
          <p>Prompting puts you in the loop. Looping puts Claude in the loop.</p>

          <h2 className="text-xl font-semibold text-white mt-10 mb-4">What is a loop?</h2>
          <p>A loop is a structured instruction set that tells Claude to keep working until a specific condition is met. Instead of "fix this bug," you write a loop charter that says:</p>
          <ul className="list-none space-y-2 my-4">
            <li className="flex gap-3"><span className="text-loop-400 mt-1">→</span><span>Here's the goal (verifiable end state)</span></li>
            <li className="flex gap-3"><span className="text-loop-400 mt-1">→</span><span>Here's where the work lives</span></li>
            <li className="flex gap-3"><span className="text-loop-400 mt-1">→</span><span>Here's how to do each item</span></li>
            <li className="flex gap-3"><span className="text-loop-400 mt-1">→</span><span>Here's how to verify it's done correctly</span></li>
            <li className="flex gap-3"><span className="text-loop-400 mt-1">→</span><span>Here's when to stop</span></li>
            <li className="flex gap-3"><span className="text-loop-400 mt-1">→</span><span>Here's when to ask for help</span></li>
          </ul>
          <p>Claude reads the charter, starts working, checks its own output, corrects mistakes, and keeps going until it's done. You come back to finished work.</p>

          <h2 className="text-xl font-semibold text-white mt-10 mb-4">The skill shift</h2>
          <p>Prompt engineering was about crafting the perfect single instruction. Loop engineering is about designing a system. You think about edge cases, stopping conditions, verification criteria. It's closer to writing a test suite than writing a sentence.</p>
          <p>This is actually a more valuable skill. Loops are reusable. A loop charter for "fix all broken links in /docs" works on any project with a /docs folder.</p>

          <h2 className="text-xl font-semibold text-white mt-10 mb-4">Get started in 30 seconds</h2>
          <p>You don't need to learn a new framework or install anything. Loop Generator turns your goal into a paste-ready Claude Code loop charter. Describe what you want done, pick a loop type, and get a charter you can paste directly into Claude Code.</p>

          <div className="mt-10 p-6 card border-loop-500/20 bg-loop-500/5">
            <p className="text-white font-medium mb-2">Ready to stop prompting?</p>
            <p className="text-white/50 text-sm mb-4">Generate your first loop charter free — no card required.</p>
            <Link href="/app" className="btn-primary inline-block">Generate a loop charter →</Link>
          </div>
        </div>
      </article>
    </main>
  )
}
