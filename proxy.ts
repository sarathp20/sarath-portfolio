// proxy.ts  (was middleware.ts)
import { auth }          from '@/auth'
import { NextResponse }  from 'next/server'

export default auth((req) => {   // function itself stays the same
  const isLoggedIn       = !!req.auth
  const isAdminDashboard = req.nextUrl.pathname.startsWith('/admin/dashboard')

  if (isAdminDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  if (req.nextUrl.pathname === '/admin' && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url))
  }
})

export const config = {
  matcher: ['/admin', '/admin/dashboard'],
}