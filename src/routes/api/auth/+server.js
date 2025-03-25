// Since we're using static adapter, we'll move the auth logic to the client
export const prerender = true;

export async function GET() {
    return new Response(JSON.stringify({ message: 'Auth endpoint' }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function POST({ request }) {
    const { password } = await request.json();
    const isValid = password === "remyremy";
    
    return new Response(JSON.stringify({ isValid }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}