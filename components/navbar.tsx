import Link from 'next/link'
import React from 'react'
import NavComp from './navComp'
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <Link href={"/"}>
        <div className='flex items-center gap-2.5 cursor-pointer'>
            <img src="/images/logo.svg" alt="app logo" />
        </div>
        </Link>

        <div className='flex items-center gap-8'>
            <NavComp/>
            <SignedOut>
              
                <SignInButton>
                  <button className='btn-signin'>Sign In</button>
                </SignInButton>
              
            </SignedOut>
            <SignedIn>
              <UserButton/>
            </SignedIn>
           
            
        </div>

    </nav>
  )
}

export default Navbar