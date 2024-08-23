import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'
import { getCurrentUser } from "@/lib/serverSessionProvider";
export async function POST(request: Request, response: NextApiResponse){
    const data = await request.json()
    const accessingUser = await getCurrentUser()

    if(!accessingUser?.id){
        return NextResponse.json('Forbidden', {status: 403})
    }
    
    if(data.userId !== accessingUser?.id){
        return NextResponse.json('Forbidden', {status: 403})
    }

    const usersInConversation = await prisma.conversationsMembers.findMany({
        where: {
            conversationId: data.conversationId
        }
    })

    const userInConversation = usersInConversation.find((user) => user.userId === data.userId)

    if(!userInConversation){
        return NextResponse.json('Forbidden', {status: 403})
    }
    try{
        const existingConversation = await prisma.$transaction(async (newPrisma) => {
            await newPrisma.message.create({
                data: {
                    message: data.message,
                    userId: data.userId,
                    conversationId: data.conversationId
                }
            })
    
            const conversation = await newPrisma.conversations.update({
                where: {
                    id: data.conversationId,
                },
                data: {
                    lastMessage: data.message
                },
                include:{
                    message: true
                }
            })
            
            return conversation
            
        })

        const conversationMember = await prisma.user.findMany({
            where: {
                id:{
                    in: usersInConversation.map((member) => member.userId)
                } 
            }
        });
        if (!conversationMember) {
            return  NextResponse.json("Not Found", {status: 404});
        }
        const totalMembers = conversationMember.length
        let response = {conversationMember,existingConversation, totalMembers}
        return NextResponse.json(response, {status: 201})

    }
    catch(error){
        console.log('err', error)
        return NextResponse.json('An error occured', {status: 505})
    }
    
}