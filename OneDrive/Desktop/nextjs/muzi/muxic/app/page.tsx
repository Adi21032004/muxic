import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music, Users, Zap } from "lucide-react"
import Appbar from "./components/appbar"
import Redirect from "./components/redirect"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-800">
        <Appbar/>
        <Redirect/>
      </header>
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Let Your Fans Choose the Soundtrack
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            FanTune revolutionizes music streaming by putting the power in your fans' hands. Create unforgettable streams where your audience shapes the playlist.
          </p>
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <div className="flex flex-col items-center space-y-2 p-4 bg-gray-800 rounded-lg">
              <Users className="h-8 w-8 text-purple-400" />
              <h3 className="text-lg font-semibold">Engage Fans</h3>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 bg-gray-800 rounded-lg">
              <Zap className="h-8 w-8 text-purple-400" />
              <h3 className="text-lg font-semibold">Boost Viewership</h3>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 bg-gray-800 rounded-lg">
              <Music className="h-8 w-8 text-purple-400" />
              <h3 className="text-lg font-semibold">Discover Music</h3>
            </div>
          </div>
          <div className="max-w-md mx-auto">
            <form className="flex space-x-2">
              <Input 
                className="flex-1 bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400" 
                placeholder="Enter your email" 
                type="email"
              />
              <Button type="submit" className="bg-purple-600 text-white hover:bg-purple-700">
                Get Started
              </Button>
            </form>
            <p className="text-sm mt-2 text-gray-400">
              Join now and start streaming with your fans!
            </p>
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-800">
        <p>© 2023 FanTune. All rights reserved.</p>
      </footer>
    </div>
  )
}