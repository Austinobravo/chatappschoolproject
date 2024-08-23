"use client"
import { useSession } from 'next-auth/react'
import React, { PropsWithChildren } from 'react'
import { useRouter } from 'next/navigation'
type Props = PropsWithChildren<{}>
const AuthLayout = ({children}: Props) => {
    const [open, setOpen] = React.useState<boolean>(true)
    const router = useRouter()
    const {data:session} = useSession()
    if(session){
        router.push("/conversations")        
    }

  return (
    <div> 
        {children}
    </div>
  )
}

export default AuthLayout