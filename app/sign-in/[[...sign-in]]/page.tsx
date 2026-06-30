import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-loop-500 flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">L</div>
          <h1 className="text-xl font-semibold text-white">Sign in to Loop Generator</h1>
        </div>
        <SignIn appearance={{
          elements: {
            rootBox: 'w-full',
            card: 'bg-[#111118] border border-white/[0.06] shadow-none rounded-2xl',
            headerTitle: 'hidden',
            headerSubtitle: 'hidden',
            formButtonPrimary: 'bg-loop-500 hover:bg-loop-600',
            footerActionLink: 'text-loop-400 hover:text-loop-300',
          }
        }} />
      </div>
    </main>
  )
}
