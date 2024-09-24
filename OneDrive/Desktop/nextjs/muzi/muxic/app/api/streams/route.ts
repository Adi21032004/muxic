import {prismaClient} from "@/app/lib/db";
import { array, z } from "zod";
import { NextRequest,NextResponse } from "next/server";
import * as youtubesearchapi from "youtube-search-api";
const ytRegex = new RegExp('^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([a-zA-Z0-9_-]{11})')

const createStreamSchema = z.object({
    createrId: z.string(),
    url: z.string().url()//can parse it in a better way
})

type ThumbnailDetail = {
    url: string;
    width: number;
    height: number;
  };

export async function POST(req:NextRequest) {
    try {
        const data = createStreamSchema.parse(await req.json())
        const yt = ytRegex.test(data.url)

        if(!yt){
            return NextResponse.json({
                message: "Wrong URL format"
            },{status: 411})
        }

        const extractedId = data.url.split("?v=")[1]
        const url = data.url
        // console.log(youtubesearchapi)
        const res = await youtubesearchapi.GetVideoDetails(extractedId)
        // console.log(typeof(res))
        // console.log(res.thumbnail)
        const thumbnail: ThumbnailDetail[] = res.thumbnail.thumbnails;
        console.log(thumbnail)
        thumbnail.sort((a:{width: number},b:{width: number}) => a.width < b.width ? -1 : 1)
        
        const stream = await prismaClient.stream.create({
            data: {
                userId: data.createrId,
                url,
                extractedId,
                type: 'Youtube',
                title: res.title ?? "can't find video",
                smallimg: (thumbnail?.length>1 ? thumbnail[thumbnail.length - 2].url : thumbnail[thumbnail.length - 1].url) || 'https://www.youtube.com/watch?v=L2K9aPPHPy0',
                bigimg: thumbnail[thumbnail.length - 1].url || 'https://www.youtube.com/watch?v=L2K9aPPHPy0'
            }
        })

        return NextResponse.json({
            stream,
            message: "stream added successfully"
        },{status: 200})

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "error while adding a stream"
        },{status: 411})
    }
}