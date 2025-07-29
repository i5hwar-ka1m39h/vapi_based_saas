'use client';
import { formUrlQuery, removeKeysFromURLquery } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SearchInput = () => {
    const pathName = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const query = searchParams.get("topic") || "";
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(()=>{
        const delayedFn = setTimeout(()=>{
            if(searchQuery){
            const newURL = formUrlQuery({
                params:searchParams.toString(),
                key:"topic",
                value:searchQuery
            })

            router.push(newURL, {scroll:false})
        }else{
            if(pathName === "/bots"){
                const newURL = removeKeysFromURLquery({
                    params: searchParams.toString(),
                    keysToRemove:["topic"]
                })

                router.push(newURL, {scroll:false})
            }
        }
        }, 300)

        return ()=> clearTimeout(delayedFn)
        
    },[searchParams, pathName, searchQuery, router])
  return (
    <div className='relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit'>
        <Image src={"/icons/search.svg"} alt='search' width={15} height={15}/>
        <input type="text" onChange={(e)=>setSearchQuery(e.target.value)}  value={searchQuery} placeholder='Search bots' className='outline-none'/>
    </div>
  )
}

export default SearchInput