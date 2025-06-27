'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'

function Header() {

    const pathname = usePathname()

    const isLoginPage = pathname === '/login'
    const isSignupPage = pathname === '/signup'
    const isDashboardPage = pathname.startsWith('/px')
    const isEditorPage = pathname.startsWith('/rs')

    if(isLoginPage || isSignupPage || isDashboardPage || isEditorPage) return null

  return (
    <div className='flex p-8 text-sm px-20 justify-between items-center'>
        <div className='flex items-center gap-20'>
            <Link href="/" className="flex items-center">
                <Image
                    src="/logo.svg"
                    alt="Resfolio Logo"
                    width={120}
                    height={32}
                    priority
                />
            </Link>
            <div className='flex items-center gap-4'>
                <Link href="/">Pricing</Link>
            <Link href="/">Blog</Link>
            <Link href="/">Support</Link>
        </div>
        </div>
        <div className='flex items-center gap-4'>
            <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild >
                <Link href="/signup" >Signup</Link>
            </Button>
        </div>
    </div>
  )
}

export default Header