import { getCurrentUser } from './../../../../lib/serverSessionProvider';
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma'
export async function GET(request:NextRequest, {params}: {params:{userId: string}}) {

    if(!params){
        return NextResponse.json("Forbidden",{status: 403})
    }

    const userId = params.userId
    const accessingUser = await getCurrentUser()

    if(userId !== accessingUser?.id){
        return NextResponse.json("Forbidden",{status: 403})
    }
    try{
        const user = await prisma.user.findUnique({
            omit: {
                password: true
            },
            where: {
                id: userId
            },
            include:{
                conversations: true,
                conversationMembers: true,
                messages: true 
            }
            
        })
        return NextResponse.json(user, {status: 200})
    }
    catch(error){
        console.log('error', error)
        return NextResponse.json('An error occured', {status: 505})
    }
    
}