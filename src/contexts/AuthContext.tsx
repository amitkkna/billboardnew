'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { signIn, signOut, signUp, getUserProfile } from '@/lib/supabase/auth'

type AuthContextType = {
  user: User | null
  profile: any | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string, userData: any) => Promise<any>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if we're using mock implementation
    const isMockImplementation =
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('https://') ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (isMockImplementation) {
      // For development, we'll just set loading to false
      setLoading(false)
      return () => {}
    }

    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: any } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user)
      } else {
        setLoading(false)
      }
    })

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } }: { data: { subscription: any } } = supabase.auth.onAuthStateChange(async (event: string, session: any) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchProfile(session.user)
      } else {
        setProfile(null)
        setLoading(false)
      }

      // Refresh the page on sign in or sign out
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        router.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  async function fetchProfile(currentUser: User) {
    try {
      setLoading(true)
      const profile = await getUserProfile()
      setProfile(profile?.profile || null)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  async function refreshProfile() {
    if (user) {
      await fetchProfile(user)
    }
  }

  const value = {
    user,
    profile,
    loading,
    signIn: async (email: string, password: string) => {
      try {
        const { user } = await signIn(email, password)
        return user
      } catch (error) {
        throw error
      }
    },
    signUp: async (email: string, password: string, userData: any) => {
      try {
        const { user } = await signUp(email, password, userData)
        return user
      } catch (error) {
        throw error
      }
    },
    signOut: async () => {
      await signOut()
      router.push('/')
    },
    refreshProfile
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
