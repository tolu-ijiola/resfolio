'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Footer = () => {

    const pathname =   usePathname()

    const isLoginPage = pathname === '/login'
    const isSignupPage = pathname === '/signup'
    const isDashboardPage = pathname.startsWith('/px')
    const isEditorPage = pathname.startsWith('/rs')

    if(isLoginPage || isSignupPage || isDashboardPage || isEditorPage) return null

  return (
    <footer className="bg-white pt-16 pb-8 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
          <Link href="/" className="flex items-center">
                <Image
                    src="/logo.svg"
                    alt="Resfolio Logo"
                    width={120}
                    height={32}
                    priority
                />
            </Link>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Products</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-teal-800 transition-colors">Templates</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-teal-800 transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-teal-800 transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Company</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-teal-800 transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-teal-800 transition-colors">Contact</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-teal-800 transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Learn</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-teal-800 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-teal-800 transition-colors">Privacy</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-teal-800 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <div className="text-xs text-gray-500 mb-4 md:mb-0">
            © 2025 ResPay Ltd. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-teal-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-teal-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-teal-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;