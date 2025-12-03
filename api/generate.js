// File: api/generate.js
// This serverless function runs on Vercel and keeps your API key safe.

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  // 1. Get the data from your frontend
  const payload = await req.json();

  // 2. Get your key from Vercel Environment Variables
  const apiKey = process.env.GEMINI_API_KEY; 

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Missing Gemini API Key' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 3. Forward the request to Google
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    // 4. Send the answer back to your frontend
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

Once you push these changes to GitHub, Vercel will automatically redeploy your site, and the AI features will work securely!
