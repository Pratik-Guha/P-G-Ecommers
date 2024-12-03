"use client"
import AuthContextProvider from '@/contexts/AuthContext';
import { EllipsisVertical, UserCircle, X } from 'lucide-react';
import React, { useState } from 'react'
import HeaderClientButton from './HeaderClientButton';
import LogoutButton from './LogoutButton';

export default function HeaderMobile() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
       <button
        className="md:hidden h-6 w-6 flex justify-center items-center rounded-full hover:opacity-60"
        onClick={() => setIsMenuOpen(true)}
      >
        <EllipsisVertical size={20}/>
        
      </button>

      {/* Sliding Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-md z-50 flex flex-col p-5">
          {/* Close Button */}
          <button
            className="self-end mb-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={20} />
          </button>

          {/* Menu Items */}
          <AuthContextProvider>
            <HeaderClientButton />
          </AuthContextProvider>
          <Link href={"/account"} target="_blank">
            <button
              title="my account"
              className="h-6 w-6 flex justify-center items-center rounded-full hover:opacity-60 mt-2"
            >
              <UserCircle size={20} />
            </button>
          </Link>
          <AuthContextProvider>
            <LogoutButton />
          </AuthContextProvider>
        </div>
      )}
    </>
  )
}
