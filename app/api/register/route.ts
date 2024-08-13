import { formSchema } from "@/lib/validation"
import { NextResponse } from "next/server"
import prisma from '@/lib/prisma'
import { hashedPassword } from "@/lib/helpers"

export async function POST(request: Request, response: Response){
    const data = await request.json()
    const {email, username, password, department} = data


    const parsedForm = await formSchema.safeParseAsync(data)
    if(!parsedForm.success){
        return NextResponse.json(parsedForm.error, {status: 403})
    }
    const newPassword = await hashedPassword(password)

    const existingEmail = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if(existingEmail){
        return NextResponse.json('Email already used', {status: 403})
    }

   try{
    await prisma.$transaction(async(newPrisma) => {
        const conversations = await newPrisma.conversations.findMany({
            where:{
                departmentId: department
            }
        })
        if(!conversations){
            return NextResponse.json('No such conversation', {status: 400})
        }

        console.log("convo", conversations)

        const newUser = await newPrisma.user.create({
            data: {
                email,
                username,
                password:newPassword , 
                departmentId: department
            }
        })

        console.log("user", newUser)

        await Promise.all(conversations.map(async (conversation) => {
                await newPrisma.conversationsMembers.create({
                    data: {
                        conversationId: conversation.id,
                        userId: newUser.id
                    }
                });
            }));
        });
    return NextResponse.json('Success', {status: 201})


   }
   catch(error){
    console.error("error", error)
    return NextResponse.json('An error occurred while creating the user', { status: 500 });
   }
}