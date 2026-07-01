import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'What is Loop Engineering? | Loop Generator Blog',
  description: 'Loop engineering is the new prompt engineering. Here\'s what it is, why it matters, and how to get started with Claude Code loops today.',
  openGraph: {
    title: 'What is Loop Engineering?',
    description: 'Loop engineering is the new prompt engineering. Here\'s what it is and how to get started.',
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
            <span className="text-xs text-white/25">5 min read</span>
          </div>
          <h1 className="text-4xl font-semibold text-white leading-tight mb-4">What is Loop Engineering?</h1>
          <p className="text-lg text-white/50 leading-relaxed">Loop engineering is the new prompt engineering. Here's what it is, why it matters, and how to get started today.</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-white/70 leading-relaxed">
          <p>If you've been following AI-assisted development, you've heard of prompt engineering — the art of crafting instructions that get the best results from AI models. Loop engineering is what comes next.</p>

          <h2 className="text-xl font-semibold text-white mt-10 mb-4">The definition</h2>
          <p>Loop engineering is the practice of designing autonomous AI workflows that run iteratively until a goal is achieved. Instead of writing one perfect prompt, you design a system with four components:</p>

          <div className="space-y-4 my-6">
            {[
              { n: '01', t: 'A verifiable goal', d: 'The finished state described precisely enough that Claude can check if it\'s achieved.' },
              { n: '02', t: 'An execution pattern', d: 'How Claude should approach each unit of work — what to do, in what order.' },
              { n: '03', t: 'A verification method', d: 'How Claude checks its own output after each step. The loop only continues if verification passes.' },
              { n: '04', t: 'A stopping condition', d: 'The exact criteria that ends the loop. Without this, loops run forever or stop too early.' },
            ].map(item => (
              <div key={item.n} className="flex gap-4 p-4 card">
                <span className="font-mono text-loop-500 text-sm flex-shrink-0">{item.n}</span>
                <div>
                  <p className="text-white font-medium mb-1">{item.t}</p>
                  <p className="text-sm text-white/40">{item.d}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold text-white mt-10 mb-4">Four types of loops</h2>
          <p>Not all work fits the same loop pattern. Loop engineering recognizes four fundamental patterns:</p>

          <div className="space-y-3 my-6">
            {[
              { icon: '↺', name: 'Refinement loops', desc: 'Write → critique → rewrite. Used for any creative or quality-sensitive work. The loop runs until output meets a quality rubric.' },
              { icon: '⟶', name: 'Batch loops', desc: 'Process a list of items one by one. Used for transforming multiple files, records, or tasks with consistent logic.' },
              { icon: '⚔', name: 'Adversarial loops', desc: 'A generator and a critic in opposition. The generator produces output, the critic attacks it, the generator responds. Quality emerges from tension.' },
              { icon: '◉', name: 'Monitor loops', desc: 'Check a condition on a schedule and act only when something changes. Used for watching codebases, APIs, or data streams.' },
            ].map(l => (
              <div key={l.name} className="flex gap-4 p-4 card">
                <span className="text-xl flex-shrink-0">{l.icon}</span>
                <div>
                  <p className="text-white font-medium mb-1">{l.name}</p>
                  <p className="text-sm text-white/40">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold text-white mt-10 mb-4">Why now?</h2>
          <p>Claude Code made loop engineering practical. It's an agentic environment where Claude can read files, write files, run commands, and check results — all without human intervention between steps. The loop has a runtime.</p>
          <p>Before agentic tools existed, loop engineering was theoretical. Now it's how the best developers ship.</p>

          <h2 className="text-xl font-semibold text-white mt-10 mb-4">The loop charter</h2>
          <p>The document that describes a loop is called a loop charter. It's the artifact you paste into Claude Code to start a loop running. A good loop charter has eight sections: GOAL, FIND THE WORK, HOW TO EXECUTE, HOW TO VERIFY, HOW TO REMEMBER, STOPPING CONDITION, ESCALATE IF, and CONSTRAINTS.</p>
          <p>Writing a good loop charter from scratch takes practice. Loop Generator does it for you in seconds.</p>

          <div className="mt-10 p-6 card border-loop-500/20 bg-loop-500/5">
            <p className="text-white font-medium mb-2">Generate your first loop charter</p>
            <p className="text-white/50 text-sm mb-4">Describe a goal and get a paste-ready charter for Claude Code. Free to use.</p>
            <Link href="/app" className="btn-primary inline-block">Try Loop Generator free →</Link>
          </div>
        </div>
      </article>
    </main>
  )
}
