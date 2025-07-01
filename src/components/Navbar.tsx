'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import {
  Home,
  User,
  Plus,
  Pencil,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

interface UserProfile {
  username: string
  full_name?: string
  avatar_url?: string
}

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('username, full_name, avatar_url')
          .eq('id', user.id)
          .single()

        if (data) setProfile(data)
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const { data } = await supabase
            .from('profiles')
            .select('username, full_name, avatar_url')
            .eq('id', session.user.id)
            .single()
          if (data) setProfile(data)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const navLinks = [
    { name: 'Discover', href: '/', icon: Home },
    { name: 'Your Profile', href: `/profile/${profile?.username}`, icon: User },
    { name: 'Add Project', href: '/build/projects', icon: Plus },
    { name: 'Edit Profile', href: '/build/profile', icon: Pencil },
  ]

  return (
    <nav className="w-full z-50 sticky top-0 bg-black/50 backdrop-blur-xl border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 text-transparent bg-clip-text"
        >
          DevConnect
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-4">
          {navLinks.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                pathname === href
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-800/60 hover:text-white'
              }`}
            >
              <Icon size={16} />
              {name}
            </Link>
          ))}
        </div>

        {/* Right - Avatar or Auth */}
        <div className="flex items-center gap-3">
          {user && profile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-0 rounded-full border border-gray-700 hover:ring-2 hover:ring-blue-500/30 transition"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={profile.avatar_url || ''} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {profile.full_name?.[0] || profile.username?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-red-400 hover:bg-red-950 hover:text-red-300 cursor-pointer font-medium rounded-md"
                >
                  <LogOut size={16} className="mr-2" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() => router.push('/auth')}
                className="text-gray-300 hover:text-white"
              >
                Sign In
              </Button>
              <Button
                onClick={() => router.push('/auth')}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="lg:hidden px-4 py-3 border-t border-gray-800 bg-black/80">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {navLinks.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === href
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon size={16} />
              {name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
