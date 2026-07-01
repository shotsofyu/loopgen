import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Blog — Loop Engineering, Claude Code Tips & AI Automation',
  description: 'Learn about loop engineering, Claude Code loop charters, and how to stop prompting and start looping.',
}

const posts = [
  {
    slug: 'stop-prompting-start-looping',
    title: 'Stop Prompting. Start Looping.',
    desc: 'Why the best Claude Code developers have stopped writing prompts and started writing loops — and how you can too.',
    date: 'July 1, 2026',
    readTime: '4 min read',
  },
  {
    slug: 'what-is-loop-engineering',
    title: 'What is Loop Engineering?',
    desc: 'Loop engineering is the new prompt engineering. Here\'s what it is, why it matters, and how to get started today.',
    date: 'July 1, 2026',
    readTime: '5 min read',
  },
  {
    slug: 'claude-code-loop-charter',
    title: 'How to Write a Perfect Claude Code Loop Charter',
    desc: 'A loop charter is the document that tells Claude Code what to do, how to verify it, and when to stop. Here\'s the exact format that works.',
    date: 'July 1, 2026',
    readTime: '6 min read',
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        <div className="mb-12">
          <p className="text-xs font-medium text-white/30 uppercase tracking-widest mb-3">Blog</p>
          <h1 className="text-3xl font-semibold text-white mb-3">Loop Engineering</h1>
          <p className="text-white/40">Guides, tips and ideas for developers building with Claude Code loops.</p>
        </div>
        <div className="space-y-6">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block card p-6 hover:border-loop-500/20 transition-colors group">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-white/25">{post.date}</span>
                <span className="text-white/10">·</span>
                <span className="text-xs text-white/25">{post.readTime}</span>
              </div>
              <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-loop-400 transition-colors">{post.title}</h2>
              <p className="text-sm text-white/40 leading-relaxed">{post.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
