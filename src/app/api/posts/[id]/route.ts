import Post from '@/models/Post';
import connect from "@/utils/db";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  
  const id = '64d4722204c2691ef348ced7';

  try {
    await connect();
    const post = await Post.findById(id);
    return new NextResponse(JSON.stringify(post), { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse('Error in db', {
      status: 500,
    });
  }
}