import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));



  const promptSchema = new mongoose.Schema({
  prompt: String,
  response: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Prompt = mongoose.model("Prompt", promptSchema);

app.post("/api/save", async (req, res) => {
  try {
    const { prompt, response } = req.body;

    const data = await Prompt.create({
      prompt,
      response,
    });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Save failed",
    });
  }
});
// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});



//  AI Route
app.post("/api/ask-ai", async (req, res) => {
  try {
    const { prompt } = req.body;
  console.log(prompt)  
    console.log("Received prompt:", prompt);

  const response = await axios.post(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    model: "openai/gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:5000",
      "X-Title": "AI Flow App",
    },
  }
);
    const answer = response.data.choices[0].message.content;

    res.json({
      success: true,
      answer: answer,
    });
  } catch (error) {
     console.log("FULL ERROR:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: "AI request failed",
    });
  }
});
const PORT = process.env.PORT || 5000;
//  Start Server
app.listen(PORT, () => {
   console.log(`Server running on ${PORT}`);
});