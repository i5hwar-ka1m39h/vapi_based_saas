import Link from 'next/link'
import React from 'react'
import NavComp from './navComp'

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
            <p>sign out</p>
            
        </div>

    </nav>
  )
}

export default Navbar