import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Check for auth cookie to determine if user is logged in
  const isLoggedIn = req.cookies.has('auth_status') && req.cookies.get('auth_status')?.value === 'logged_in'
  console.log('Middleware - Auth status:', { isLoggedIn, cookies: req.cookies.getAll() })

  // Check if the request is for a protected route
  const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard')
  const isAuthRoute = req.nextUrl.pathname.startsWith('/login') ||
                      req.nextUrl.pathname.startsWith('/signup') ||
                      req.nextUrl.pathname.startsWith('/reset-password')

  // Check if the user is coming from the login page
  const fromLogin = req.nextUrl.searchParams.get('fromLogin') === 'true'

  console.log('Route info:', { isProtectedRoute, isAuthRoute, fromLogin, path: req.nextUrl.pathname })

  // If accessing a protected route without being logged in, redirect to login
  if (isProtectedRoute && !isLoggedIn) {
    console.log('Redirecting to login - not logged in')
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Skip the direct access check in development mode
  const isDevelopment = process.env.NODE_ENV === 'development'
  console.log('Environment:', { isDevelopment, NODE_ENV: process.env.NODE_ENV })

  // Temporarily disable the direct access check
  // If accessing the dashboard directly (not from login), redirect to homepage
  // Only apply this rule if the user is trying to access the dashboard root
  if (false && !isDevelopment && req.nextUrl.pathname === '/dashboard' && !fromLogin && isLoggedIn) {
    console.log('Redirecting to homepage - direct dashboard access')
    return NextResponse.redirect(new URL('/', req.url))
  }

  // If accessing auth routes while logged in, redirect to dashboard with fromLogin flag
  if (isAuthRoute && isLoggedIn) {
    console.log('Redirecting to dashboard - already logged in')
    const dashboardUrl = new URL('/dashboard', req.url)
    dashboardUrl.searchParams.set('fromLogin', 'true')
    return NextResponse.redirect(dashboardUrl)
  }

  return res
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',  // Add admin routes if they exist
    '/login',
    '/signup',
    '/reset-password'
  ],
}
