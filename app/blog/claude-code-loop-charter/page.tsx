import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'How to Write a Perfect Claude Code Loop Charter | Loop Generator Blog',
  description: 'A loop charter tells Claude Code what to do, how to verify it, and when to stop. Here\'s the exact format and each section explained with examples.',
  openGraph: {
    title: 'How to Write a Perfect Claude Code Loop Charter',
    description: 'The exact format for Claude Code loop charters — every section explained with examples.',
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
            <span className="text-xs text-white/25">6 min read</span>
          </div>
          <h1 className="text-4xl font-semibold text-white leading-tight mb-4">How to Write a Perfect Claude Code Loop Charter</h1>
          <p className="text-lg text-white/50 leading-relaxed">A loop charter is the document that tells Claude Code what to do, how to verify it, and when to stop. Here's the exact format that works.</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-white/70 leading-relaxed">
          <p>A loop charter is what you paste into Claude Code to start an autonomous loop. It's the difference between babysitting Claude through each step and coming back to finished work.</p>
          <p>A good loop charter has eight sections. Here's each one explained.</p>

          {[
            {
              section: 'GOAL',
              desc: 'A single, precise statement of the finished state. Must be verifiable — Claude needs to be able to check whether it\'s been achieved.',
              good: 'Fix all broken internal links in /docs and write a report to docs/link-report.md listing every change made.',
              bad: 'Fix the docs.',
            },
            {
              section: 'FIND THE WORK',
              desc: 'Where Claude discovers what needs to be done. Be specific about paths, commands, or data sources.',
              good: 'Run: grep -r "[.*](.*)" /docs --include="*.md" -l to get a list of files. Process each file in the returned list.',
              bad: 'Look at the docs folder.',
            },
            {
              section: 'HOW TO EXECUTE',
              desc: 'Step-by-step instructions for each work item. Claude should be able to start without asking questions.',
              good: 'For each file: extract all markdown links, send a HEAD request to each URL, record any non-200 as broken, replace with correct URL or flag for manual review.',
              bad: 'Fix each broken link.',
            },
            {
              section: 'HOW TO VERIFY',
              desc: 'The exact condition that means one item is done correctly. This is what separates reliable loops from ones that silently produce bad output.',
              good: 'Re-run the link checker on the modified file. Zero broken links = item complete.',
              bad: 'Check the links look right.',
            },
            {
              section: 'HOW TO REMEMBER',
              desc: 'How Claude tracks progress across iterations. Usually a markdown state file.',
              good: 'After each file, append a line to ./loop-progress.md: "✓ filename.md — N links fixed". On restart, read this file to skip completed items.',
              bad: 'Remember what you\'ve done.',
            },
            {
              section: 'STOPPING CONDITION',
              desc: 'The exact criteria that ends the entire loop. Without this, loops spin forever or stop too early.',
              good: 'All files in the initial list have a ✓ entry in loop-progress.md AND the link checker returns 0 errors across the entire /docs tree.',
              bad: 'Stop when done.',
            },
            {
              section: 'ESCALATE IF',
              desc: 'Edge cases that require human input before proceeding. These prevent Claude from making irreversible decisions on its own.',
              good: 'A broken link has no obvious replacement. The link checker crashes. More than 50 links are broken in a single file.',
              bad: 'Ask me if unsure.',
            },
            {
              section: 'CONSTRAINTS',
              desc: 'Hard rules that cannot be broken under any circumstance.',
              good: 'Do not modify files in /docs/archive. Max 3 HTTP retries per URL. Maintain UTF-8 encoding.',
              bad: 'Be careful.',
            },
          ].map(s => (
            <div key={s.section} className="mt-8">
              <h2 className="text-lg font-semibold text-loop-400 mb-2 font-mono">{s.section}</h2>
              <p className="text-white/60 mb-4">{s.desc}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="card p-4 border-green-500/20 bg-green-500/5">
                  <p className="text-xs text-green-400 mb-2 font-medium">✓ Good</p>
                  <p className="text-sm text-white/60">{s.good}</p>
                </div>
                <div className="card p-4 border-red-500/20 bg-red-500/5">
                  <p className="text-xs text-red-400 mb-2 font-medium">✗ Bad</p>
                  <p className="text-sm text-white/60">{s.bad}</p>
                </div>
              </div>
            </div>
          ))}

          <h2 className="text-xl font-semibold text-white mt-12 mb-4">Don't write it from scratch</h2>
          <p>Writing a loop charter by hand for the first time takes 20–30 minutes. Getting all eight sections right takes practice.</p>
          <p>Loop Generator does it in seconds. Describe your goal, pick a loop type, and get a paste-ready charter. It handles the structure, the stopping condition, the verification criteria — everything.</p>

          <div className="mt-10 p-6 card border-loop-500/20 bg-loop-500/5">
            <p className="text-white font-medium mb-2">Generate a loop charter now</p>
            <p className="text-white/50 text-sm mb-4">Free to use. No card required. Paste straight into Claude Code.</p>
            <Link href="/app" className="btn-primary inline-block">Generate my loop charter →</Link>
          </div>
        </div>
      </article>
    </main>
  )
}
