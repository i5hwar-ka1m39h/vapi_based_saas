import React from 'react'
import BotForm from '@/components/botForm'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { newBotPermission } from '@/lib/actions/bot.actions'
import Image from 'next/image'
import Link from 'next/link'


//this is the page to create new bot
const NewBots = async() => {
  const {userId} = await auth()
  if(!userId) redirect("/sign-in")
  const canCreateNewBot = await newBotPermission()
  return (
    <main className='min-lg:w-1/3 min-md:w-2/3 items-center justify-center pb-10'>
      {canCreateNewBot ?(<article className=' w-full flex flex-col gap-4'>
        <h1>Bot builder</h1>
        <BotForm/>
      </article>) : (
        <article className='companion-limit'>
          <Image src={"/images/limit.svg"} alt='limit reached' width={360} height={230}/>
          <div className='cta-badge'>
            Upgrade your plan
          </div>
          <h1>You have reached the plan limit</h1>
          <p>This is the current limit of your plan. Upgrade to continue learning and get premium features.</p>
          <Link href={"/subscription"} className='btn-primary w-full justify-center'>
            Upgrade my plan
          </Link>

        </article>
      )}
    </main>
  )
}

export default NewBots