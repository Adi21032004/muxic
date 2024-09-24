import {prismaClient} from "@/app/lib/db";
import { z } from "zod";
import { NextRequest,NextResponse } from "next/server";
import { getServerSession } from "next-auth";

const UpvoteSchema = z.object({
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
        const data = UpvoteSchema.parse(await req.json())
        await prismaClient.upvote.create({
            data: {
                userId: user.id,
                streamId: data.streamId
            }
        })
    } catch (error) {
        return NextResponse.json({
            message: "Error while upvoting"
        },{status: 403})
    }

    return NextResponse.json({
        message: "All good"
    })
}

export async function GET(req:NextRequest) {
    const creatorId = req.nextUrl.searchParams.get("createrId")
    const streams = await prismaClient.stream.findMany({
        where: {
            userId: creatorId ?? ""
        }
    })

    return NextResponse.json({
        streams
    })
}