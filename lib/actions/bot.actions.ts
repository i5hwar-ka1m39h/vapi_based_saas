'use server'
import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase"

export const createBot = async(formData:CreateCompanion) =>{
    const {userId:author} = await auth()
    const supabase =  createSupabaseClient()

    const {data, error} = await supabase.from('bots').insert({...formData, author}).select()

    if(error || !data) throw new Error(error.message || "failer to create a bot")

    return data[0]
}

export const getAllBots = async({limit=10, page=1, subject, topic}:GetAllCompanions)=>{
    const supabase = createSupabaseClient()
    // console.log(`${process.env.NEXT_PUBLIC_SUPABASE_URL} and ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`);
    

    let query = supabase.from('bots').select()

    if(subject && topic){
        query = query.ilike('subject', `%${subject}%`).or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
    }else if(subject){
        query = query.ilike("subject", `%${subject}%`)
    }else if(topic){
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    query = query.range((page-1)*limit, page*limit-1)

    const {data:bots, error} = await query;

    if(error) throw new Error(error.message);

    return bots;
}

export const getSingleBot = async(id:string) =>{
    const supabase = createSupabaseClient()

    const {data, error} = await supabase.from('bots').select().eq('id', id)
    if(error || !data) throw new Error(error.message ||"the bot with given id don't exist"  ) 
    
    return data[0];
}