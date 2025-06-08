import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Welcome to <span className="text-primary">BeDAO</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your comprehensive crypto trading platform with advanced analytics, social features, and secure wallet
            management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-black text-white hover:bg-black/90">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/chat">
              <Button size="lg" variant="outline">
                Start Trading
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-black/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-black" />
              </div>
              <CardTitle>Advanced Trading</CardTitle>
              <CardDescription>
                Professional trading tools with real-time market data and advanced charting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access spot trading, futures, and comprehensive market analysis tools
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-black/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-black" />
              </div>
              <CardTitle>Secure Wallet</CardTitle>
              <CardDescription>Multi-layer security with cold storage and advanced encryption</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Keep your assets safe with industry-leading security measures
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-black/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-black" />
              </div>
              <CardTitle>Social Trading</CardTitle>
              <CardDescription>Connect with traders, share insights, and learn from the community</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Join our vibrant community of crypto enthusiasts and professionals
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Start Trading?</CardTitle>
              <CardDescription>Join thousands of traders who trust BeDAO for their crypto journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button className="bg-black text-white hover:bg-black/90">Sign Up Now</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline">Already have an account?</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
