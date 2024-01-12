"use client"
import NavbarScroll from '@/hooks/NavbarScroll'
import { cn } from '@/lib/utils'
import React from 'react'

const Navbar = () => {
  const isScroll = NavbarScroll()
  
  return (
    <header className={cn("fixed top-0 w-full p-6 bg-purple-600/10 backdrop-blur-sm",
    isScroll && "shadow-sm border-b "
    )}>Navbar</header>
  )
}

export default Navbar



// 