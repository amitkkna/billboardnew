"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleLogout = () => {
    // Clear the auth cookie
    document.cookie = 'auth_status=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'

    // Redirect to homepage
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white shadow-md px-4 py-3 flex items-center justify-between">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="text-xl font-bold text-primary-700">BillboardConnect</div>
        <div className="relative">
          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:text-gray-900 focus:outline-none">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-0 z-20 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} lg:opacity-100 lg:pointer-events-auto`}>
        <div className="absolute inset-0 bg-gray-600 opacity-75 lg:hidden" onClick={toggleSidebar}></div>
        <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform lg:translate-x-0 z-30`}>
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <div className="text-xl font-bold text-primary-700">BillboardConnect</div>
          </div>
          <nav className="mt-5 px-2">
            <div className="space-y-1">
              <Link
                href="/dashboard"
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${isActive('/dashboard') ? 'bg-primary-100 text-primary-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <svg className={`mr-4 h-6 w-6 ${isActive('/dashboard') ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </Link>
              <Link
                href="/dashboard/billboards"
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${isActive('/dashboard/billboards') ? 'bg-primary-100 text-primary-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <svg className={`mr-4 h-6 w-6 ${isActive('/dashboard/billboards') ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
                My Billboards
              </Link>
              <Link
                href="/dashboard/inquiries"
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${isActive('/dashboard/inquiries') ? 'bg-primary-100 text-primary-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <svg className={`mr-4 h-6 w-6 ${isActive('/dashboard/inquiries') ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                </svg>
                Inquiries
              </Link>
              <Link
                href="/dashboard/bookings"
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${isActive('/dashboard/bookings') ? 'bg-primary-100 text-primary-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <svg className={`mr-4 h-6 w-6 ${isActive('/dashboard/bookings') ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Bookings
              </Link>
              <Link
                href="/dashboard/analytics"
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${isActive('/dashboard/analytics') ? 'bg-primary-100 text-primary-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <svg className={`mr-4 h-6 w-6 ${isActive('/dashboard/analytics') ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Analytics
              </Link>
            </div>
            <div className="mt-8">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Account
              </h3>
              <div className="mt-1 space-y-1">
                <Link
                  href="/dashboard/profile"
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${isActive('/dashboard/profile') ? 'bg-primary-100 text-primary-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                >
                  <svg className={`mr-4 h-6 w-6 ${isActive('/dashboard/profile') ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${isActive('/dashboard/settings') ? 'bg-primary-100 text-primary-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                >
                  <svg className={`mr-4 h-6 w-6 ${isActive('/dashboard/settings') ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <svg className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col">
        <div className="sticky top-0 z-10 lg:hidden h-16"></div>
        <main className="flex-1 pb-8">
          {children}
        </main>
      </div>
    </div>
  )
}
