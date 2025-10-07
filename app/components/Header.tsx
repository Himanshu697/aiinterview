import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

function Header() {
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        {/* Replace the div with the Image component */}
        <Image src="/logo.png" alt="Interview.AI Logo" width={28} height={28} />
        <h1 className="text-base font-bold md:text-2xl">AvtarPrepAI</h1>
      </div>
      <Link href={'/dashboard'}>
        <Button size={'lg'}>Get Started</Button>
      </Link>
    </nav>
  )
}

export default Header