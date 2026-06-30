import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function GET(req: NextRequest) {
  const { userId } = auth()
  if (!userId) return NextResponse.redirect(new URL('/sign-in', req.url))

  // Return a page that opens Razorpay checkout
  const html = `<!DOCTYPE html>
<html>
<head><script src="https://checkout.razorpay.com/v1/checkout.js"></script></head>
<body>
<script>
  var options = {
    key: "${process.env.RAZORPAY_KEY_ID}",
    amount: 90000,
    currency: "INR",
    name: "Loop Generator",
    description: "Pro Plan - Unlimited charters",
    recurring: 1,
    handler: function(response) {
      window.location.href = "/dashboard?upgraded=true";
    },
    prefill: {},
    theme: { color: "#4f6ef7" }
  };
  var rzp = new Razorpay(options);
  rzp.open();
</script>
</body>
</html>`

  return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } })
}
