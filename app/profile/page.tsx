import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { fetchUserSessionHistory, getUserBots } from '@/lib/actions/bot.actions'
import Image from 'next/image'
import Recents from '@/components/recents'

const ProfilePage = async () => {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  const bots = await getUserBots(user.id)
  const sessionHistory = await fetchUserSessionHistory(user.id);

  return (
    <main className='min-lg:w-3/4'>
      <section className='flex justify-between gap-4 max-sm:flex-col items-center'>
        <div className='flex items-center gap-4'>
          <Image src={user.imageUrl} alt={user.firstName!} width={110} height={110} />
          <div className='flex flex-col gap-2 '>
            <h1 className='font-black text-2xl'>
              {user.firstName} {user.lastName}
            </h1>
            <p className='text-sm text-muted-foreground'>
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>

        </div>

        <div className='flex gap-4'>
          <div className='border border-black rounded-lg p-3 gap-2 flex flex-col h-fit'>
            <div className='flex gap-2 items-center'>
              <Image src={"/icons/check.svg"} alt='checkmark' height={22} width={22}/>
              <p className='text-2xl font-bold'>{sessionHistory.length}</p>
            </div>
            <div>Lessons completed</div>

          </div>
          <div className='border border-black rounded-lg p-3 gap-2 flex flex-col h-fit'>
            <div className='flex gap-2 items-center'>
              <Image src={"/icons/cap.svg"} alt='cap' height={22} width={22}/>
              <p className='text-2xl font-bold'>{bots.length}</p>
            </div>
            <div>Bots</div>

          </div>
        </div>


      </section>
      <Accordion type="multiple" >
        <AccordionItem value="recent">
          <AccordionTrigger className='text-2xl font-bold'>Recent session</AccordionTrigger>
          <AccordionContent>
            <Recents title='Recents sessions' bots={sessionHistory} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="bots">
          <AccordionTrigger className='text-2xl font-bold'>My bots {bots.length}</AccordionTrigger>
          <AccordionContent>
            <Recents title='My bots' bots={bots} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

    </main>
  )
}

export default ProfilePage