import {prismaClient} from "@/app/lib/db";
import { z } from "zod";
import { NextRequest,NextResponse } from "next/server";
import { getServerSession } from "next-auth";

const downvoteSchema = z.object({
    streamId: z.string()
})

export async function POST(req:NextRequest) {
    const session = await getServerSession();

    const user = await prismaClient.user.findFirst({
        where: {
            email: session?.user?.email ?? ""
        }
    })

    if(!user){
        return NextResponse.json({
            message: "User not authorised"
        },{status: 403})
    }

    try {
        const data = downvoteSchema.parse(await req.json())
        await prismaClient.upvote.delete({
            where: {
                userId_streamId: {
                    userId: user.id,
                    streamId: data.streamId
                }
            }
        })
    } catch (error) {
        return NextResponse.json({
            message: "Error while downvoting"
        },{status: 403})
    }

    return NextResponse.json({
        message: "All good"
    })
}