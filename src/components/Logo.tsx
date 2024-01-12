import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link
    href={"/"}
    >
    <Image
    alt="Logo"
    width={120}
    height={30}
    src={"/assets/images/logo.svg"}
    />
    </Link>
  )
}

export default Logo