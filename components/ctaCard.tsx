import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const CtaCard = () => {
  return (
    <section className='cta-section'>
      <div className='cta-badge'>Start learning your own way</div>
      <h2 className='text-3xl font-bold'>Build and personalize learning companion</h2>
      <p>Pick a name, subject, voice and personality - and start learning through voice conversations that feels natural and fun.</p>
       <Image src={"images/cta.svg"} alt='cta logo' width={362} height={232}/>
       <Button className='btn-primary'>
        <Image src={"icons/plus.svg"} alt='add new' width={12} height={12}/>
        <Link href={"/bots/new"}>
        <p>Build a new Bot</p>
        </Link>
       </Button>
    </section>
  )
}

export default CtaCard