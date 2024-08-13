import { PrismaClient } from "@prisma/client";
import { hashedPassword } from "./helpers";

const prisma = new PrismaClient()
async function main() {
    const newUser = await prisma.user.create({
        data:{
            username: "Rector",
            email: 'rector@mubi.org',
            password: await hashedPassword('!Password1'),
            userType: "admin"
        }
    })
    // const newDepartment = await prisma.department.create({
    //     data:{
    //         levelNumber: 200,
    //         name: 'Computer Science'
    //     }
    // })
    console.log('newUser', newUser)
    // console.log('newDepartment', newDepartment)


}
main()
.then(async() =>{
    await prisma.$disconnect()
})
.catch(async(error) => {
    console.error("error", error)
    await prisma.$disconnect()
    process.exit(1)
})