import { NextRequest } from "next/server"
import {prismaClient} from "@/app/lib/db"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth";

export async function GET(req:NextRequest) {
    try {
        const session = await getServerSession();
        
        const user = await prismaClient.user.findFirst({
          where: {
              email: session?.user?.email ?? ""
          }
      })
        
      if(!user){
        return NextResponse.json({
            message: "User Unauthorised"
        },{status: 403})
    }
        return NextResponse.json({
            user
        })
    } catch (error) {
        return NextResponse.json({
            message: "User not authenticated"
        })
    }
}
