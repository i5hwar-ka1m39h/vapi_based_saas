import BotComponent from '@/components/botComponent';
import { getSingleBot } from '@/lib/actions/bot.actions';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

interface SingleBotParamsPage{
  params: Promise<{id:string}>
}


//this will contain  a single bot to interact with
const SingleBot = async({params}:SingleBotParamsPage) => {
  const {id}  = await params;
  const bot = await getSingleBot(id);
  const user = await currentUser();

  if(!user) redirect("/sign-in")
  if(!bot) redirect("/bots")
  return (
    <main>
      <article className='flex border rounded-lg justify-between p-6 max-md:flex-col'>
        <div className='flex items-center gap-2'>
          <div className='size-[72px] flex items-center justify-center rounded-lg max-md:hidden'>
            <Image src={`/icons/${bot.subject}.svg`} alt={`${bot.subject}`} width={35} height={35}/>

          </div>

          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>

              <p className='font-bold text-2xl'>{bot.name}</p>

              <div className='subject-badge max-sm:hidden'>
                {bot.subject}
              </div>

            </div>
            <p className='text-lg'>{bot.topic}</p>
          </div>
        </div>
        <div className='item-start text-2xl max-md:hidden'>
          {bot.duration} minutes
        </div>
      </article>
      <BotComponent {...bot} botId={id} userName={user.firstName!} userImage={user.imageUrl!}/>
    </main>
  )
}

export default SingleBot