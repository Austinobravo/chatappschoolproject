import React from 'react'
import AdminNavbar from "@/app/(admin)/_components/adminNavbar"
import Sidebar from './_components/sidebar'
import { getSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useUserStore } from '@/hooks/store/useUserStore'
import { getCurrentUser } from '@/lib/serverSessionProvider'
// import { getCurrentUser } from '@/lib/session'

const AdminLayout = async  ({children}: {children: React.ReactNode}) => {
  const user = await getCurrentUser()
  if(!user) redirect("/admin");
  if(!user.email.includes("@mubi.org")){
    redirect("/conversations")
  }
  return (
    <div>
        <AdminNavbar/>
        <div className='md:pt-28 pt-32'>
          <div className='md:block hidden'>
              <Sidebar/>
          </div>
          <main className='md:pl-[300px] py-2 md:px-7 px-'>
              {children}

          </main>

        </div>
    </div>
  )
}

export default AdminLayout