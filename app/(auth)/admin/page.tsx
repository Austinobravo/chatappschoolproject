'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import Link from 'next/link'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff, Facebook, Loader2 } from 'lucide-react'
import { passwordSchema } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {signIn} from 'next-auth/react'

const AdminPage = () => {
    const [isPasswordShown, setIsPasswordShown] = React.useState<boolean>(false)
    // const callbackUrl = useSearchParams().get('callbackUrl') || '/dashboard'
    const router = useRouter()
    const formSchema = z.object({
        email: z.string().min(1, {message: "This field is mandatory"}).email('Please enter a valid email.'),
        password: passwordSchema
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const isSubmitting = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const {email, password} = values
        try{
            const response = await signIn('credentials',{
                redirect:false,
                email: email.trim(),
                password: password.trim(),
                callbackUrl: '/dashboard'
            })

            if(response?.error) return toast.error(response.error)
            if(response?.ok){
                toast.success('Login Successful')
                return router.push('/dashboard') 
                
            }
            
        }catch(error){
            toast.error(`${error}`)
        }
    }
    return (
            <div className='flex justify-center items-center w-full'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='px-4 md:w-[420px] shadow  w-full mx-auto h-screen flex flex-col justify-center items-center '>
                <h2 className='font-bold text-4xl pb-3'>Administrator</h2>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({field}) => (
                            <FormItem className='!space-y-0  w-full'>
                                <FormLabel className="text-muted-foreground">Email</FormLabel>
                                <FormControl>
                                    <Input placeholder='Your Email Address' {...field} className='bg-transparent focus:border-l-green-700 ring-offset-transparent focus-visible:!ring-offset-0 focus-visible:!ring-0 border-l-8 border-l-blue-500  ' />
                                </FormControl>
                                <FormMessage className='text-red-500'/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({field}) => (
                            <FormItem className='pt-3 !space-y-0 relative w-full'>
                                <FormLabel className="text-muted-foreground">Password</FormLabel>
                                <FormControl>
                                    <Input type={isPasswordShown ? 'text' : 'password'} placeholder='Your Password' {...field}  className='bg-transparent focus:border-l-green-700 ring-offset-transparent focus-visible:!ring-offset-0 focus-visible:!ring-0 border-l-8 border-l-blue-500  ' />
                                </FormControl>
                                <span className='absolute right-5 top-[44px] cursor-pointer' onClick={()=> setIsPasswordShown(!isPasswordShown)}>
                                {isPasswordShown 
                                        ?
                                        <EyeOff/>
                                    :
                                        <Eye/>
                                    }
                                    </span>
                                <FormMessage className='text-red-500'/>
                                {/* <p>!Password1</p> */}
                            </FormItem>
                        )}
                    />
                    <div className='flex justify-between w-full items-center py-4'>
                        <div className="flex space-x-2">
                            <Checkbox id="terms1" className=''/>
                            <div className="leading-none">
                                <label
                                htmlFor="terms1"
                                className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                Remember me
                                </label>
                            </div>
                            </div>
                            <Link href={``} className='text-xs font-medium underline text-primary'>Forgot Password?</Link>
                        </div>
                    <div className='w-full'>
                        <Button type='submit' className='rounded-none px-9 py-1 w-full text-white'disabled={isSubmitting}>{isSubmitting ? <span className='flex justify-center items-center'><Loader2 className='animate-spin'/></span> : 'Login'}</Button>
                    </div>

                </form>
            </Form>
            </div>
  )
}


export default AdminPage