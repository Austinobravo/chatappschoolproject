import { getCurrentUser } from "@/lib/serverSessionProvider";
import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'
import { NextApiResponse } from "next";

export async function GET(request:Request) {
    const user = await getCurrentUser()

    if(!user){
        return NextResponse.json('Not found', {status: 404})
    }
    
    const currentUser = await prisma.user.findUnique({
        where:{
            id: user.id
        }
    })
    
    if(!currentUser){
        return NextResponse.json('Forbidden', {status: 403})
    }

    if(currentUser.id !== user.id){
        return NextResponse.json('Forbidden', {status: 403})
    }
    
    
    try{
        const conversations = await prisma.conversations.findMany({
            where: {
                departmentId: currentUser.departmentId!
            }
        })

        return NextResponse.json(conversations, { status: 200 });
        
    }
    catch(error){
        console.error("Error", error)
        return NextResponse.error()

    }
    
}
