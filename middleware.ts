import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ✅ Define exactly which /admin routes subadmin can access
// Add more routes here anytime you want to grant subadmin access
const SUBADMIN_ALLOWED_ROUTES = [
  '/admin/orders',
]

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // ── not logged in ──────────────────────────────
  if (!token) {
    if (pathname.startsWith('/profile') || pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }

  // ── decode JWT ─────────────────────────────────
  let role: string = ''
  try {
    const parts = token.split('.')
    if (parts.length !== 3) throw new Error('Invalid JWT')

    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const decoded = Buffer.from(base64, 'base64').toString('utf-8')
    if (!decoded) throw new Error('Empty payload')

    const payload = JSON.parse(decoded)
    role = payload?.role ?? ''
  } catch {
    const res = NextResponse.redirect(new URL('/login', request.url))
    res.cookies.delete('token')
    return res
  }

  // ── already logged in trying to go to /login ───
  if (pathname === '/login') {
    if (role === 'user')     return NextResponse.redirect(new URL('/profile', request.url))
    if (role === 'subadmin') return NextResponse.redirect(new URL('/admin/orders', request.url))
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // ── block non-admin from /admin ────────────────
  if (pathname.startsWith('/admin') && role === 'user') {
    return NextResponse.redirect(new URL('/profile', request.url))
  }

  // ── block non-user from /profile ───────────────
  if (pathname.startsWith('/profile') && role !== 'user') {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // ── subadmin route restriction ─────────────────
  if (role === 'subadmin' && pathname.startsWith('/admin')) {
    const isAllowed = SUBADMIN_ALLOWED_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(route + '/')
    )
    if (!isAllowed) {
      // Redirect subadmin to their default page if they try to access other routes
      return NextResponse.redirect(new URL('/admin/orders', request.url))
    }
  }

  // ── notifications routing ──────────────────────
  if (pathname.startsWith('/notifications')) {
    const isAdminLike = role === 'admin' || role === 'subadmin'
    if (isAdminLike && !pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin/notifications', request.url))
    }
    if (role === 'user' && pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/notifications', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/admin/:path*', '/login', '/notifications']
}