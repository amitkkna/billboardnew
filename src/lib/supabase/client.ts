import { createClient } from '@supabase/supabase-js'

// Check if we have valid Supabase credentials
const hasValidCredentials =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('https://') &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a mock Supabase client for development if credentials are missing
let supabase: any

if (hasValidCredentials) {
  // Use real Supabase client with actual credentials
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
} else {
  // Create a mock client for development
  supabase = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({ data: { user: null }, error: { message: 'Mock auth: Please set up Supabase credentials' } }),
      signUp: async () => ({ data: { user: null }, error: { message: 'Mock auth: Please set up Supabase credentials' } }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
          order: () => ({
            limit: () => ({ data: [], error: null })
          })
        }),
        order: () => ({
          limit: () => ({ data: [], error: null })
        }),
        in: () => ({
          order: () => ({ data: [], error: null })
        }),
        gte: () => ({
          lte: () => ({
            order: () => ({ data: [], error: null })
          })
        })
      }),
      insert: () => ({
        select: async () => ({ data: [], error: null })
      }),
      update: () => ({
        eq: () => ({
          select: async () => ({ data: [], error: null })
        })
      }),
      delete: () => ({
        eq: async () => ({ error: null })
      })
    })
  }
}

export { supabase }
