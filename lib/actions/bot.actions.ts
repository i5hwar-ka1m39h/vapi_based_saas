'use server'
import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase"
import { useId } from "react"

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


export const addToSessionHistory = async(botId:string) =>{
    const supabase = createSupabaseClient();

    const{ userId } = await auth();

    const {data, error} =await supabase.from('session_history').insert({
        bot_id:botId,
        user_id: userId,

    })

    if(error) throw new Error(error.message);

    return data;


}

export const fetchSessionHistory = async(limit=10) =>{
    const supabase = createSupabaseClient();

    const {data, error} = await supabase.from('session_history').select(`bots:bot_id (*)`).order('created_at', {ascending:false}).limit(limit)

    if(error) throw new Error(error.message);

    return data.map(({bots})=>bots);

}

export const fetchUserSessionHistory = async(userId:string, limit=10) =>{
    const supabase = createSupabaseClient();

    

    const {data, error} = await supabase
    .from('session_history')
    .select(`bots:bot_id (*)`)
    .eq('user_id', useId)
    .order('created_at', {ascending:false})
    .limit(limit)

    if(error) throw new Error(error.message);

    return data.map(({bots})=>bots);

}

export const getUserBots = async(userId:string) =>{
    const supabase = createSupabaseClient();

    

    const {data, error} = await supabase
    .from('bots')
    .select()
    .eq('author', useId)
    .order('created_at', {ascending:false})
    

    if(error) throw new Error(error.message);

    return data

}

export const newBotPermission = async() =>{
    const {userId, has} = await auth();
    const supabase = createSupabaseClient()

    let limit = 0;

    if(has({plan:"advance"})){
        return true;
    }else if(has({feature:"3_active_bots"})){
        limit=3
    }else if(has({feature:"10_active_bots"})){
        limit = 10
    }

    const {data, error} = await supabase.from("bots").select('id', {count:"exact"}).eq('author', useId);

    if(error) throw new Error(error.message);

    const botCount = data.length;

    if(botCount >= limit){
        return false;
    }else{
        return true;
    }
}