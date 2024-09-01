const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("process.env.API_KEY");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

async function run() {
  const prompt = "how does next response work when importing NextReponse from next/server"

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return(text);
}

export default run();
