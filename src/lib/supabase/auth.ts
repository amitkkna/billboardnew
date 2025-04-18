import { supabase } from './client'

// Check if we're using mock implementation
const isMockImplementation =
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('https://') ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Mock user for development with your specific credentials
const mockUser = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  email: 'ai.amitkhera@gmail.com',
  user_metadata: {
    company_name: 'Your Company',
    contact_name: 'Amit Khera',
    contact_email: 'ai.amitkhera@gmail.com',
    contact_phone: '123-456-7890',
    address: '123 Main St',
    city: 'Your City',
    state: 'YS',
    zip_code: '12345'
  }
}

export async function signUp(email: string, password: string, userData: any) {
  if (isMockImplementation) {
    console.log('Using mock signup with:', { email, userData })
    // Return mock data for development
    return {
      user: mockUser,
      session: {
        access_token: 'mock-token',
        refresh_token: 'mock-refresh-token',
        expires_in: 3600
      }
    }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  })

  if (error) throw error

  // Create profile record
  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        company_name: userData.company_name,
        contact_name: userData.contact_name,
        contact_email: email,
        contact_phone: userData.contact_phone,
        address: userData.address,
        city: userData.city,
        state: userData.state,
        zip_code: userData.zip_code
      })

    if (profileError) throw profileError
  }

  return data
}

export async function signIn(email: string, password: string) {
  if (isMockImplementation) {
    console.log('Using mock signin with:', { email })

    // Check for your specific credentials
    if (email === 'ai.amitkhera@gmail.com' && password === 'admin123') {
      console.log('Successful login with your credentials')
      // Return mock data for development
      return {
        user: mockUser,
        session: {
          access_token: 'mock-token',
          refresh_token: 'mock-refresh-token',
          expires_in: 3600
        }
      }
    } else {
      // Throw an error for incorrect credentials
      throw new Error('Invalid login credentials')
    }
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw error

  return data
}

export async function signOut() {
  if (isMockImplementation) {
    console.log('Using mock signout')
    return
  }

  const { error } = await supabase.auth.signOut()

  if (error) throw error
}

export async function resetPassword(email: string) {
  if (isMockImplementation) {
    console.log('Using mock resetPassword with:', { email })
    return
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  })

  if (error) throw error
}

export async function updatePassword(password: string) {
  if (isMockImplementation) {
    console.log('Using mock updatePassword')
    return
  }

  const { error } = await supabase.auth.updateUser({
    password
  })

  if (error) throw error
}

export async function getUser() {
  if (isMockImplementation) {
    console.log('Using mock getUser')
    return mockUser
  }

  const { data, error } = await supabase.auth.getUser()

  if (error) return null

  return data.user
}

export async function getUserProfile() {
  if (isMockImplementation) {
    console.log('Using mock getUserProfile')
    return {
      ...mockUser,
      profile: {
        id: mockUser.id,
        company_name: mockUser.user_metadata.company_name,
        contact_name: mockUser.user_metadata.contact_name,
        contact_email: mockUser.user_metadata.contact_email,
        contact_phone: mockUser.user_metadata.contact_phone,
        address: mockUser.user_metadata.address,
        city: mockUser.user_metadata.city,
        state: mockUser.user_metadata.state,
        zip_code: mockUser.user_metadata.zip_code
      }
    }
  }

  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData.user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userData.user.id)
    .single()

  if (error) return null

  return {
    ...userData.user,
    profile: data
  }
}
