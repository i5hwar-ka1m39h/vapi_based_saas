import BotCards from '@/components/botCard';
import SearchInput from '@/components/searchInput';
import SubjectFilter from '@/components/subjectFilter';
import { getAllBots } from '@/lib/actions/bot.actions';
import React from 'react'
//this will have the list of all the bots created by all the users
const Bots = async({searchParams}:SearchParams) => {
  const params = await searchParams;
  const subject = params.subject ? params.subject : "";
  const topic = params.topic ? params.topic : "";

  const bots = await getAllBots({topic, subject})
  return (
    <main>
      <section className='flex justify-between gap-4 max-sm:flex-col'>
        <h1>Bot Library</h1>
        <div className='flex gap-4'>
          <SearchInput/>
          <SubjectFilter/>
        </div>

      </section>

      <section className='companions-grid'>
        {bots.map((each)=>(
          <BotCards key={each.id} {...each} />
        ))}

      </section>
    </main>
  )
}

export default Bots