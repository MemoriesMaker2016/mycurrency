// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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

  // ── decode WITHOUT verifying (no secret needed) ──
  // real verification happens in your Node backend on every API call
  let role: string = ''
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    role = payload.role
  } catch {
    const res = NextResponse.redirect(new URL('/login', request.url))
    res.cookies.delete('token')
    return res
  }

  

  // ── already logged in trying to go to /login ──
  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // ── role based protection ──────────────────────
  if (pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/profile', request.url))
  }

  if (pathname.startsWith('/profile') && role !== 'user') {
    return NextResponse.redirect(new URL('/admin', request.url))
  }




  if (pathname.startsWith('/notifications')) {
    if (role === 'admin' && !pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin/notifications', request.url))
    }

    if (role === 'user' && pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/notifications', request.url))
    }
  }



  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/admin/:path*', '/login' , '/notifications']
}
