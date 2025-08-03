export default async function handler(request, response) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method not allowed' });
  }

  const geminiApiKey = process.env.GEMINI_API_KEY;
  const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${geminiApiKey}`;

  try {
    const geminiResponse = await fetch(geminiApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request.body), // Forward the request body from your frontend
    });

    if (!geminiResponse.ok) {
      const errorBody = await geminiResponse.text();
      console.error("Gemini API Error:", errorBody);
      return response.status(geminiResponse.status).json({ message: 'Error from Gemini API' });
    }

    const data = await geminiResponse.json();
    return response.status(200).json(data);

  } catch (error) {
    console.error("Serverless function error:", error);
    return response.status(500).json({ message: 'Internal server error' });
  }
}