import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { image } = request.body; // Expecting base64 string

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-001" });

    const prompt = `Analyze this image of a stock list. Extract stock symbols, names, and prices. 
    Return a JSON array ONLY, like: [{"symbol": "AAPL", "name": "Apple", "price": 150.00}].
    Do not use markdown formatting.`;

    const result = await model.generateContent([
      prompt,
      { inlineData: { data: image, mimeType: "image/png" } }
    ]);
    
    const text = result.response.text();
    
    // Clean the response to ensure valid JSON
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const stocks = JSON.parse(cleanText);

    return response.status(200).json({ stocks });

  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: error.message });
  }
}
