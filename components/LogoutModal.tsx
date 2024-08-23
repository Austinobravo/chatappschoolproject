import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/hooks/store/useUserStore'

type Props= {
    toggle: () => void
}
const LogoutModal = ({toggle}: Props) => {
    const {clearStorage} = useUserStore()
    const router = useRouter()
    const logOut = async () => {
        const SignOut = await signOut({redirect:false})
        if(SignOut.url){
            clearStorage()
            router.push("/")
            // toggle()
        } 
    }
  return (
    <div className='w-full space-y-2'>
        <Button className='w-full' onClick={toggle}>Cancel</Button>
        <Button variant={'destructive'} className='w-full' onClick={logOut}>Log out</Button>
    </div>
  )
}

export default LogoutModal