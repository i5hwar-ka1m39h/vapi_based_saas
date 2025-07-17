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