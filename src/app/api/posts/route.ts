import Post from '@/models/Post';
import connect from "@/utils/db";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const username = url.searchParams.get('username');
  try {
    await connect();
    const posts = username ? await Post.find({username}) : await Post.find();
    return new NextResponse(JSON.stringify(posts), { status: 200 })
  } catch (error) {
    return new NextResponse('Error in db', {
      status: 500,
    });
  }
}

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const newPost = new Post(body);

  try {
    await connect();

    await newPost.save();

    return new NextResponse("Post has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};