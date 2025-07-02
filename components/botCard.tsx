import React from 'react'
import { Button } from './ui/button'
import { Bookmark, Clock8, Save } from 'lucide-react'
import Link from 'next/link'

interface BotCardsType{
    id:string
    topic:string 
    name:string 
    duration:number 
    color:string
    subject:string
}

const BotCards = ({id, topic, name, duration, color, subject}:BotCardsType) => {
  return (
    <article className='companion-card' style={{background:color}}>
        <div className='flex justify-between items-center'>
            <div className='subject-badge'>
                {subject}
            </div>

            <button className='companion-bookmark'><Bookmark color='white' size={15}/></button>

        </div>

        <h2 className='text-2xl font-bold'>{name}</h2>
        <p className='text-sm'>{topic}</p>
        <div className='flex items-center gap-2'>
            <Clock8 size={15}/>
            <p className='text-sm'>{duration} min</p>
        </div>

        <Link href={`/bots/${id}`} className='w-full'>
        <Button className='btn-primary justify-center w-full'>
            Checkout Bot
        </Button>
        
        </Link>

    </article>
  )
}

export default BotCards