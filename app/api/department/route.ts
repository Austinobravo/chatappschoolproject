import { getCurrentUser } from "@/lib/serverSessionProvider";
import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'
import { NextApiResponse } from "next";

export async function POST(request: Request, response: NextApiResponse){
    const data = await request.json()
    const accessingUser = await getCurrentUser()

    if(!accessingUser){
        return NextResponse.json('Forbidden ', {status: 403})
    }

    const {name, level} = data
    const userId = accessingUser.id

    const levelNumber = parseInt(level)
    const conversationName = String(`${name} ${level}`)
    try{
        await prisma.$transaction(async(newPrisma) => {
            const existingDepartmentAndLevel = await prisma.departmentLevels.findFirst({
                where:{
                    AND:{
                        level:{
                            levelNumber:levelNumber
                        },
                        department:{
                            name: name
                        }

                    },
                },
            })
            if(existingDepartmentAndLevel){
                throw Error('Department exists')
            }
            
            let existingLevel = await newPrisma.level.findUnique({
                where:{
                    levelNumber: levelNumber
                }
            })
            
            let existingDepartment = await prisma.department.findUnique({
                where:{
                    name: name,
                }
            })

            if(!existingLevel){
                existingLevel = await newPrisma.level.create({
                    data:{
                        levelNumber: levelNumber
                    }
                })
            }
            if(!existingDepartment){
                existingDepartment = await newPrisma.department.create({
                    data: {
                        name: name,
                        levels:{
                            connect:{
                                id: existingLevel.id
                            }
                        }
                        
                    }
                    
                })
                
            }
            
            await newPrisma.departmentLevels.create({
                data:{
                    departmentId: existingDepartment.id,
                    levelId: existingLevel.id
                }
            })

            await newPrisma.conversations.create({
                data: {
                    departmentId: existingDepartment.id,
                    name: conversationName,
                    createdBy: userId,
                }

            })

        })
        return NextResponse.json('Created', { status: 200 });
    }
    catch(error){
        console.log('err', error)
        return NextResponse.json('An error occured', {status: 505})
    }
    
}

export async function GET(request:Request) {
    try{

        const allDepartments = await prisma.department.findMany({
            orderBy:{
                createdAt: 'asc'
            },
            include:{
                levels:{
                    select:{
                        levelNumber: true
                    }
                }
            }
            
        })

        const allDepartmentsLevels = await prisma.departmentLevels.findMany({
            include:{
                level:{
                    select:{
                        levelNumber: true
                    }
                },
                department:{
                    select:{
                        name: true
                    }
                },
            }
            
        })
        // const formattedDepartments = allDepartmentsLevels.map((department) => ({
        //     name: department.department.name,
        //     levels: department.level.levelNumber
        // }))

        const groupedDepartments: { [key: string]: number[] } = {};

        allDepartmentsLevels.forEach((entry) => {
            const departmentName = entry.department.name;
            const levelNumber = entry.level.levelNumber;

            if (!groupedDepartments[departmentName]) {
                groupedDepartments[departmentName] = [];
            }
            groupedDepartments[departmentName].push(levelNumber);
        });

        // Format the data to return
        const formattedDepartments = Object.keys(groupedDepartments).map((name) => ({
            name,
            levels: groupedDepartments[name].sort((a, b) => a - b).join(', ')
        }));

        const response = {formattedDepartments, allDepartments}

        return NextResponse.json(response, {status: 200})

    }
    catch(error){
        console.log("error", error)
        return NextResponse.json({status: 505})
    }
}