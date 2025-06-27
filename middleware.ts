// middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  const { pathname, search } = request.nextUrl

  // If there's no session and the user is trying to access a protected route
  if (!session && pathname.startsWith('/px')) {
    const returnUrl = encodeURIComponent(pathname + search)
    return NextResponse.redirect(
      new URL(`/login?returnUrl=${returnUrl}`, request.url)
    )
  }

  // If there's a session and the user is trying to access a public route
  if (session && ['/', '/login', '/signup'].includes(pathname)) {
    return NextResponse.redirect(new URL('/px/dashboard', request.url))
  }

  // If there's a session and the user is trying to access /px
  if (session && pathname === '/px') {
    return NextResponse.redirect(new URL('/px/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
}
