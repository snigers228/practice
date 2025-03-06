import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    if (!accessKey) {
        return NextResponse.json({ error: 'Unsplash API key is missing' }, { status: 500 });
    }

    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=20`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Unsplash API error: ${response.status}`);
        }
        const data = await response.json();
        return NextResponse.json({
            results: data.results,
            total_pages: data.total_pages
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
