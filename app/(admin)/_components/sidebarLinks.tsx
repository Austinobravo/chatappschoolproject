"use client"
import { Phone, Ship, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import React from 'react'
const links = [
    {
        icon: User,
        name: "Add Department",
        href: "/dashboard"
    },
    // {
    //     icon: Ship,
    //     name: "Shipment",
    //     href: "/shipment"
    // },
    // {
    //     icon: Phone,
    //     name: "Support",
    //     href: "/support"
    // },
]
const SidebarLinks = () => {
    // const [active, setActive] = React.useState("User")
    const pathname = usePathname()
  return (
    <section>
        <div className='border-2 shadow'>
            <ul className=' divide-y-2'>
                {links.map((link, index) => {
                    const Icon = link.icon

                    return (
                        <div key={index} className={`py-2 ${ pathname.includes(link.href) && " text-white font-bold bg-amber-500 "}`} >
                            <Link href={link.href} className={`flex items-center px-4 space-x-2  `}>
                                <div>
                                    <Icon/>
                                </div>
                                <div>
                                    {link.name}

                                </div>

                            </Link>

                        </div>
                    )
                })}
            </ul>
            
        </div>
    </section>
  )
}

export default SidebarLinks