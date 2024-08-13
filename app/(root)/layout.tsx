import Sidebar from '@/components/sidebar'
import { getCurrentUser } from '@/lib/serverSessionProvider'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
type Props = React.PropsWithChildren<{}>
const Layout = async ({children}: Props) => {
  const user = await getCurrentUser()
  if(!user) redirect("/login");
  if(user.email.includes("@mubi.org")){
    redirect("/dashboard")
  }
  return (
    <div className='bg-gray-300 h-full p-5 '>
      <div className='fixed w-full z-30 bg-gray-300 py-3 top-0'>
        <Image src={`/logo.jpg`} width={100} height={100} alt='' className='mix-blend-multiply w-10 h-10'/>
      </div>
      <div className='flex flex-row pt-6 w-full h-full'>
        <div>
            <Sidebar/>
        </div>
        <div className='w-full'>
          {children}
        </div>

      </div>
    </div>
  )
}

export default Layout