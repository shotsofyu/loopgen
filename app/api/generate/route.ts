import { NextRequest, NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'

// ─── AI provider ─────────────────────────────────────────────────────────────
// FREE: OpenRouter + Llama 3.3 70B (no credit card, no cost)
// TO UPGRADE later (1000+ users): change MODEL to 'anthropic/claude-sonnet-4-6'
// and add your OpenRouter key which gives access to Claude too.
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MODEL = 'openrouter/free'

const LOOP_DESCRIPTIONS: Record<string, string> = {
  refinement: 'a refinement loop that writes, self-critiques, and rewrites until quality criteria are met',
  batch: 'a batch processing loop that discovers work items, processes each one, tracks completion, and stops when the list is done',
  adversarial: 'an adversarial loop with a generator and a separate critic — the generator responds to critique until the critic approves',
  monitor: 'a monitoring loop that checks a condition on each cycle and only acts when something changes',
}

const DONE_DESCRIPTIONS: Record<string, string> = {
  tests: 'all relevant tests pass and the test runner exits 0',
  checklist: 'every item in the task checklist is checked off',
  quality: 'the output meets a defined quality rubric scored by a verifier',
  manual: 'the human reviews and explicitly approves the final output',
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    const { goal, workSource, loopType, doneWhen, constraints } = await req.json()

    if (!goal?.trim()) {
      return NextResponse.json({ error: 'Goal is required' }, { status: 400 })
    }

    // Rate limiting for free users
    if (userId) {
      const user = await clerkClient.users.getUser(userId)
      const isPro = user.publicMetadata?.plan === 'pro'

      if (!isPro) {
        const today = new Date().toISOString().split('T')[0]
        const lastUsageDate = user.publicMetadata?.lastUsageDate as string
        const dailyUsage = (user.publicMetadata?.dailyUsage as number) || 0
        const currentUsage = lastUsageDate === today ? dailyUsage : 0

        if (currentUsage >= 10) {
          return NextResponse.json(
            { error: 'Daily limit reached. Upgrade to Pro for unlimited charters.' },
            { status: 429 }
          )
        }

        await clerkClient.users.updateUserMetadata(userId, {
          publicMetadata: {
            ...user.publicMetadata,
            dailyUsage: currentUsage + 1,
            lastUsageDate: today,
          },
        })
      }
    }

    const systemPrompt = `You are an expert at writing Claude Code loop charters — structured prompts that tell Claude to run autonomously as a loop rather than stopping after one response.

A loop charter has exactly these sections (write each header in ALL CAPS on its own line):

GOAL
FIND THE WORK
HOW TO EXECUTE
HOW TO VERIFY
HOW TO REMEMBER
STOPPING CONDITION
ESCALATE IF
CONSTRAINTS

Rules:
- Be specific and operational — Claude must be able to start without asking questions
- STOPPING CONDITION and HOW TO VERIFY must be precise and checkable
- Use concrete file paths, commands, and examples where relevant
- Write in imperative voice
- Plain text only, no markdown formatting, no bullet symbols
- Each section content on separate lines below the header
- End with exactly: "Paste into Claude Code and type /goal to start the loop."`

    const userPrompt = `Write a Claude Code loop charter:

GOAL: ${goal}
WORK SOURCE: ${workSource || 'infer from goal'}
LOOP TYPE: ${LOOP_DESCRIPTIONS[loopType] || LOOP_DESCRIPTIONS.refinement}
DONE WHEN: ${DONE_DESCRIPTIONS[doneWhen] || DONE_DESCRIPTIONS.tests}
${constraints ? `ADDITIONAL CONSTRAINTS: ${constraints}` : ''}`

    const res = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'https://loopgenerator.app',
        'X-Title': 'Loop Generator',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`OpenRouter error: ${err}`)
    }

    const data = await res.json()
    const charter = data.choices?.[0]?.message?.content?.trim() || ''

    if (!charter) throw new Error('Empty response from AI')

    return NextResponse.json({ charter })
  } catch (error: any) {
    console.error('Generate error:', error)
    return NextResponse.json({ error: error.message || 'Generation failed' }, { status: 500 })
  }
}
