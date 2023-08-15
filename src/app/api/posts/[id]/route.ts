import Post from '@/models/Post';
import connect from "@/utils/db";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (request: NextRequest, { params }: any) => {
  
  const { id } = params as any;

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

export const DELETE = async (request: NextRequest, { params }: any) => {
  const { id } = params as any;
  try {
    await connect();
    await Post.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("Error in response of DB", { status: 500 });
  }
};