'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

import { Eye, EyeOff, Facebook, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

export const formSchema = z.object({
    name: z.string().min(1, {message: "This field is mandatory"}).max(50, {message: "Your username exceeded the limit"}),
    level: z.string().min(1, {message: "This field is mandatory"}).max(50, {message: "Your input exceeded the limit"}),
})

const DepartmentForm = () => {
    const [isPasswordShown, setIsPasswordShown] = React.useState<boolean>(false)
    const [isConfirmPasswordShown, setIsConfirmPasswordShown] = React.useState<boolean>(false)
    const [isAcceptedTerms, setIsAcceptedTerms] = React.useState<boolean>(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            level: "",
        }
    })
    const isSubmitting = form.formState.isSubmitting
    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try{
                const response = await fetch('/api/department', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                })

                if(response.ok){
                    const message = await response.json()
                    toast.success(message)
                    form.reset()
                    router.push('/dashboard')
                }
                else{
                    console.error("res", response)
                    toast.error(response.statusText)
                } 

        }
        catch(error){
            console.error("error", error)
        }
    }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className='px-4'>
        <FormField
            control={form.control}
            name='name'
            render={({field}) => (
                <FormItem className='!space-y-0'>
                    <FormLabel className="text-muted-foreground">Department Name</FormLabel>
                    <FormControl>
                        <Input placeholder='Department name' {...field} className='bg-transparent focus:border-l-green-700 ring-offset-transparent focus-visible:!ring-offset-0 focus-visible:!ring-0 border-l-8 border-l-blue-500  ' />
                    </FormControl>
                    <FormMessage className='text-red-500'/>
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name='level'
            render={({field}) => (
                <FormItem className='!space-y-0'>
                    <FormLabel className="text-muted-foreground">Department Level</FormLabel>
                    <FormControl>
                        <Input placeholder='Department level' {...field} className='bg-transparent focus:border-l-green-700 ring-offset-transparent focus-visible:!ring-offset-0 focus-visible:!ring-0 border-l-8 border-l-blue-500  ' />
                    </FormControl>
                    <FormMessage className='text-red-500'/>
                </FormItem>
            )}
        />

        <div className='w-full my-4'>
            <Button type='submit' className='rounded-none px-9 py-1 w-full text-white' disabled={isSubmitting}>{isSubmitting ? <span className='flex justify-center items-center'><Loader2 className='animate-spin'/></span> : 'Create'}</Button>
        </div>

    </form>


    </Form>
  )
}

export default DepartmentForm