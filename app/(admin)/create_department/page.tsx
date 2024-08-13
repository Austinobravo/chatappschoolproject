import React from 'react'
import DepartmentForm from './_components/DepartmentForm'

const page = () => {
  return (
    <section className='border-2 shadow-md rounded-md pb-7'>
    <div className='bg-blue-800 rounded-t-md py-2 text-center text-white'>
        Departments
    </div>
    <div className='flex justify-between items-center border-2 px-3 py-2 shadow-md'>
        <h2>Add a Department</h2>
        {/* <EditButton/> */}
        
    </div>
    <div>
        <div>
            <DepartmentForm/>
        </div>
    </div>

    </section>
  )
}

export default page




















