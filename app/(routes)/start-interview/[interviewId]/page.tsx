"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Send } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

function Interview() {
  const {interviewId}=useParams();
  return (
    <div className='flex flex-col items-center justify-center mt-14'>
      <div className='max-w-3xl w-full'> 
        <Image src="/interview.png" alt='interview' width={400} height={200} className='w-full h-[300px] object-cover'/>
        <div className='p-6 flex flex-col items-center space-y-5'>
            <h2 className='font-bold text-3xl text-center'>Ready to start Interview</h2>
            <p className='text-gray-500 text-center'>The interview will last 30 minute are you rady to begin ?</p>
            <Link href={'/start-interview/'+interviewId+'/start'}>
            <Button>Start Interview <ArrowRight /> </Button>
            </Link>

            <hr />
        <div className='p-6 bg-gray-50 rounded-2xl'>
              <h2 className='font-semibold text-2xl'>Want to sent interview link to someone?</h2>
              <div className='flex gap-5 w-full items-center max-w-xl mt-2'>
               <Input placeholder='Enter email address' className='w-full'></Input>
               <Button> <Send /></Button>
               </div>  
        </div>
    </div>
    </div>  
      
    </div>
  )
}

export default Interview
