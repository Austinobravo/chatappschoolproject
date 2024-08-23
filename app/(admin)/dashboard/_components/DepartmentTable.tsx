"use client"
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import Image from 'next/image'
  
const DepartmentTable = () => {
    const [allDepartments, setAllDepartment] = React.useState<any | undefined>(undefined)
    const {data:session} = useSession()
    const userId = session?.user.id
    // const getLevels = (dept:string) => {
    //     const levels = allDepartments.map((each) => dept.filter((level) => level.name.includes(each.name)))

    // }
    React.useEffect(()=> {
        const fetchData = async () => {
            const response = await fetch('api/department')
            if(response.ok){
                const data = await response.json()
                setAllDepartment(data.formattedDepartments)
            }
            else{
                toast.error(response.statusText)
            }

        }
        if(userId){
            fetchData()
        }

    }, [userId])
  return (
    <>
        {allDepartments === undefined ?
        <div className='flex justify-center items-center h-screen'>
            <Image src='/logo.jpg' width={100} height={100} alt='Loading...' className='w-20 h-20 animate-pulse flex justify-center items-center'/>
        </div>
        :
        allDepartments.length > 0 ?
        <Table>
        <TableCaption>A list of all the departments.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="">Department Name</TableHead>
            <TableHead>Department Level</TableHead>
            </TableRow>
        </TableHeader>
            {allDepartments?.map((department:any) => (
                <TableBody key={department.name}>
                    <TableRow>
                    <TableCell className="font-medium">{department.name}</TableCell>
                    <TableCell>{department.levels}</TableCell>
                    </TableRow>
                </TableBody>

            ))}
        </Table>
        : 
            <p>No data</p>
        }
    </>

  )
}

export default DepartmentTable