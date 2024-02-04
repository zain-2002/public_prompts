import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';
import {  NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
export const dynamic = 'force-dynamic';
export const GET = async (request) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate('creator');
    const path = request.nextUrl.searchParams.get("path") || "/";

    revalidatePath(path);

    return NextResponse.json(prompts);
  } catch (error) {
    console.error('Error fetching prompts:', error);
    return new Response('Failed to fetch all prompts', {
      status: 500,
    });
  }
};
