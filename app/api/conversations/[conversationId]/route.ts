import { getCurrentUser } from "@/lib/serverSessionProvider"
import {   NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request:NextRequest, {params}: {params:{conversationId: string}}) {
    const conversationId = params.conversationId
    const accessingUser = await getCurrentUser()

    if(!accessingUser?.id){
        return NextResponse.json("Forbidden",{status: 403})
    }

    const existingConversation = await prisma.conversations.findUnique({
        where:{
            id:conversationId
        },
        include:{
            message: true
        }
    })
   
    if(!existingConversation){
        return NextResponse.json("Not Found", {status: 404})
    }

    try{

        const otherMember = await prisma.conversationsMembers.findMany({
            where:{
                conversationId: conversationId
            }
        })
        const totalMembers = otherMember.length

        const conversationMember = await prisma.user.findMany({
            where: {
                id:{
                    in: otherMember.map((member) => member.userId)
                } 
            }
        });
        if (!conversationMember) {
            return  NextResponse.json("Not Found", {status: 404});
        }
        let response = {conversationMember,existingConversation, totalMembers}
       
        return NextResponse.json(response, {status: 200})

    }
    catch(error){
        console.log("error", error)
        return NextResponse.json({status: 505})
    }
}

