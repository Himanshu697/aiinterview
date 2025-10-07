import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import CreateInterviewDialog from '../_components/CreateInterviewDialog'

function EmptyState() {
  return (
    <div className="mt-14 flex flex-col items-center justify-center gap-6 border-dashed p-10 border-4 rounded-2xl bg-gray-50 text-center">
      <Image
        src={'/save.png'}
        alt="emptyState"
        width={200}
        height={200}
        priority
      /> 
      <h2 className="mt-2 text-lg text-gray-500">
        You do not have any interview created
      </h2>
      <CreateInterviewDialog />
    
    </div>
  )
}

export default EmptyState

