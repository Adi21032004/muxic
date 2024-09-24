'use client'

import { signIn } from "next-auth/react"
import { signOut } from "next-auth/react"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music, Users, Zap } from "lucide-react"


function Appbar() {
    const session = useSession()
  return (
    <div className="flex items-center justify-between w-full">
    {/* Left Section: Logo */}
    <Link className="flex items-center" href="#">
      <Music className="h-6 w-6 text-purple-500" />
      <span className="ml-2 text-2xl font-bold text-purple-500">FanTune</span>
    </Link>

    {/* Right Section: Navigation Links */}
    <nav className="flex items-center gap-6 sm:gap-8">
      <Link
        className="text-sm font-medium hover:text-purple-400 transition-colors flex "
        href="#"
      >
        Features
      </Link>
      <Link
        className="text-sm font-medium hover:text-purple-400 transition-colors"
        href="#"
      >
        Pricing
      </Link>
      <Link href="#">
        {session.data?.user ? (
          <button
            className="m-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => signOut()}
          >
            Logout
          </button>
        ) : (
          <button
            className="m-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </Link>
    </nav>
  </div>
  )
}

export default Appbar