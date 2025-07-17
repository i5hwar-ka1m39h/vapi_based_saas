'use client'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { subjects } from "@/constants"
import { Textarea } from "./ui/textarea"
import { createBot } from "@/lib/actions/bot.actions"
import { redirect } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  subject: z.string().min(1, { message: "subject is required" }),
  topic: z.string().min(1, { message: "topic is required" }),
  voice: z.string().min(1, { message: "voice is required" }),
  style: z.string().min(1, { message: "style is required" }),
  duration: z.coerce.number().min(1, { message: "duration is required" })
})

const BotForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const bot = await createBot(values)
    if(bot){
      redirect(`/bots/${bot.id}`)
    }else{
      console.log("failed to create the bot");
      redirect("/")
      
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bot Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter a bot name" {...field} className="input"/>
              </FormControl>
              <FormDescription>
                This is name of the bot that you are buiding
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bot Subject</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(each=>(
                      <SelectItem value={each} key={each} className="Capitalize">{each}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Subject the bot is about
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bot Topic</FormLabel>
              <FormControl>
                <Textarea placeholder="Integration and derivatives" {...field} className="input" />
              </FormControl>
              <FormDescription>
                What should the bot help you with.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bot voice</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="Select voice" />
                  </SelectTrigger>
                  <SelectContent>
                    
                      <SelectItem value={"Male"}  className="Capitalize">Male</SelectItem>
                      <SelectItem value={"Female"}  className="Capitalize">Female</SelectItem>
                    
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Select voice
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bot voice style</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="Select voice style" />
                  </SelectTrigger>
                  <SelectContent>
                    
                      <SelectItem value={"formal"}  className="Capitalize">Formal</SelectItem>
                      <SelectItem value={"Casual"}  className="Capitalize">Casual</SelectItem>
                    
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Select voice style
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

       

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated session duration in minutes</FormLabel>
              <FormControl>
                <Input placeholder="Enter minutes" type="number" {...field} className="input" />
              </FormControl>
              <FormDescription>
                This is bot time
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer">Build the bot</Button>
      </form>
    </Form>
  )
}

export default BotForm