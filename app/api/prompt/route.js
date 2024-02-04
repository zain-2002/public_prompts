import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database"
export const GET = async (req) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            },
        });
    } catch (error) {
        console.error('Error fetching prompts:', error);
        return new Response('Failed to fetch all prompts', {
            status: 500,
        });
    }
};

