import Post from '@/models/Post';
import connect from "@/utils/db";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await connect();
    const posts = await Post.find();
    return new NextResponse(JSON.stringify(posts), { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse('Error in db', {
      status: 500,
    });
  }
}