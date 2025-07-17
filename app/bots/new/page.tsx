import React from 'react'
import BotForm from '@/components/botForm'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'


//this is the page to create new bot
const NewBots = async() => {
  const {userId} = await auth()
  if(!userId) redirect("/sign-in")
  return (
    <main className='min-lg:w-1/3 min-md:w-2/3 items-center justify-center pb-10'>
      <article className=' w-full flex flex-col gap-4'>
        <h1>Bot builder</h1>
        <BotForm/>
      </article>
    </main>
  )
}

export default NewBots