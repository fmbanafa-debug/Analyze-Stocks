const { GoogleGenerativeAI } = require("@google/generative-ai");

// Replace with your actual key or use process.env
const genAI = new GoogleGenerativeAI("YOUR_API_KEY_HERE");

async function listModels() {
  try {
    // This is the command the error asked you to run
    const modelResponse = await genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Actually listing them requires a different call depending on SDK version,
    // but since your SDK is old, we can try the raw fetch method which is safer:
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_API_KEY_HERE`
    );
    const data = await response.json();

    console.log("Available Models:");
    data.models.forEach(m => {
        if(m.name.includes("flash")) console.log(m.name);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

listModels();
