import React from 'react'
import EditButton from './_components/EditButton'
import DepartmentTable from './_components/DepartmentTable'

const Dashboard = () => {
  return (
    <section className='border-2 shadow-md rounded-md pb-7'>
    <div className='bg-blue-800 rounded-t-md py-2 text-center text-white'>
        Departments
    </div>
    <div className='flex justify-between items-center border-2 px-3 py-2 shadow-md'>
        <h2>All Departments</h2>
        <EditButton/>
        
    </div>
    <div>
        <div>
            <DepartmentTable/>
        </div>
    </div>

</section>
  )
}

export default Dashboard