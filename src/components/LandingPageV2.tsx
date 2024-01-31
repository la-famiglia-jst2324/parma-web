import Link from 'next/link'
import { ChevronRight, LineChart, DatabaseZap, Newspaper } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  const router = useRouter()
  const cardClasses =
    'w-full max-w-sm p-2 bg-slate-900 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105'

  return (
    <div className="container mx-auto flex h-screen  flex-col px-6 text-white">
      <nav className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/DALLE-logo.png" width={60} height={60} alt="" className="rounded-full" />
          <span className="text-2xl font-semibold">ParmaAI</span>
          {process.env.NEXT_PUBLIC_ENV !== 'production' && <span>v0.4.4</span>}
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-gray-300 hover:text-white">
            Log in
          </Link>
          <Button
            onClick={() => {
              router.push('/signup')
            }}
            variant="indigo"
          >
            Sign up
          </Button>
        </div>
      </nav>
      <div className="flex h-full flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-semibold leading-tight">Empower Your Investments with ParmaAI</h1>
        <p className="mt-6 text-xl text-gray-300">
          Where Data Meets Insight. Revolutionize Your Venture Capital Journey by Tracking,
          <br />
          Monitoring, and Staying Ahead of the Curve with Real-time Analytics and News Updates!
        </p>
        <Button
          onClick={() => {
            router.push('/signup')
          }}
          className="mt-8"
          variant="indigo"
        >
          Get started
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Card className={cardClasses}>
            <CardHeader className="text-lg font-bold text-white">
              <LineChart className="mb-4 h-12 w-full" />
              Advanced Analytics
            </CardHeader>
            <CardContent className="text-gray-300">
              Compare companies at a glance! Uncover insights, spot trends, and make informed decisions effortlessly.
            </CardContent>
          </Card>
          <Card className={cardClasses}>
            <CardHeader className="text-lg font-bold text-white">
              <Newspaper className="mb-4 h-12 w-full" />
              Real-time News
            </CardHeader>
            <CardContent className="text-gray-300">
              Stay ahead in the fast-paced world of venture capital. Receive instant updates on subscribed companies.
            </CardContent>
          </Card>
          <Card className={cardClasses}>
            <CardHeader className=" text-lg font-bold text-white">
              <DatabaseZap className="mb-4 h-12 w-full" />
              Data Sourcing
            </CardHeader>
            <CardContent className="text-gray-300">
              Tailor your information stream, effortlessly integrating new data sources to expand your company tracking
              horizon.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
