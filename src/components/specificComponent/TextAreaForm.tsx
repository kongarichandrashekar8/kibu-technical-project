

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { set, z } from "zod"
import * as React from "react";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,

  FormField,
  FormItem,

  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
type Note = {
    id: string;
    member: string;
    text: string;
    timestamp: string;
  };
const FormSchema = z.object({
  test: z
    .string()
})

export default function TextareaForm({selectedNote,saveNote}:{selectedNote:Note,saveNote:(n:Note)=>void}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {

    console.log('data ',data)
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  const [test,setTest]=useState('')
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  useEffect(()=>{
    setTest(selectedNote.text)
    console.log('selectedNote.text ',selectedNote.text)
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
    setDisabled(true)
  },[selectedNote])
  const [disabled,setDisabled]=useState<boolean>(true)
  const setTests=(val:string)=>{
    setTest(val)
    console.log(test)
    if(val!==selectedNote.text){
      setDisabled(false)
    }
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(test); 
    // Handle form submission logic here
    // You can also clear the textarea after submission

    saveNote({
      ...selectedNote, 'text':test
    })
    setTest("");
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="h-300 space-y-6">
        <FormField
          control={form.control}
          name="test"
          render={({ field }) => (
            <FormItem>

              <FormControl>
                <Textarea
                value={test}
                onChange={(e)=>setTests(e.currentTarget.value)}
                ref={textareaRef}
    
                  className="resize-none bg-[#F2F7FF]"
                />
              </FormControl>
  
              <FormMessage />
            </FormItem>
          )}
        />
         <div className="flex justify-end">
         <Button disabled={disabled} size={'lg'} type="submit" className="flex items-center space-x-2">
          <span>Save</span>
         <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
         </Button>
         </div>
        
      </form>
    </Form>
  )
}
