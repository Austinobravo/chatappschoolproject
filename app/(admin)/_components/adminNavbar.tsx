"use client"
import { ChevronRight } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
const links = [
    {
        name: "User",
        href: "/users"
    },
    {
        name: "Shipment",
        href: "/shipment"
    },
    {

        name: "Support",
        href: "/support"
    },
    {

        name: "Edit Shipment",
        href: "/edit_shipment"
    },
    {

        name: "Add Shipment",
        href: "/add_shipment"
    },
]
const AdminNavbar = () => {
    const pathname = usePathname()
    const {data:session} = useSession()
    const router = useRouter()
    const logOut = async () => {
        const SignOut = await signOut({redirect:false})
        if(SignOut.url) router.push("/admin")
    }

  return (
    <section className='fixed z-10 w-full'>
        <div className='bg-blue-700 w-full items-center  py-5 flex justify-between md:px-6 px-1'>
            <div className='font-bold md:text-lg text-white'>
                <p>Admin Dashboard</p>
            </div>
            <div>
                <ul className='flex flex-wrap md:flex-nowrap space-x-3 items-center'>
                    <li>Welcome <span className='text-white font-bold'>{session?.user.username.charAt(0).toUpperCase() }{session?.user.username.slice(1)}</span></li>
                    <li className='bg-red-500 py-1 px-3 text-white  text-xs rounded-md cursor-pointer' ><span onClick={logOut}>Logout</span></li>
                </ul>
            </div>
        </div>
        <div className='bg-blue-200 flex w-full py-2 items-center px-6'>
            <Link href="/dashboard">
                <p className='font-bold cursor-pointer' >Dashboard</p>

            </Link>
            <p className='font-bold cursor-pointer'>
                {links.map((link, index) => (
                    <span key={index}>
                        
                        <Link href={link.href} className='flex items-center'>
                            {pathname === link.href ? <><ChevronRight size={15}/> {link.name} </> : ""}
                        </Link>

                    </span>
                ))}
            </p>
        </div>
        
    </section>
  )
}

export default AdminNavbar