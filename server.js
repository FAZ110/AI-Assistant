require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(req.body.message);
        const response = await result.response;
        res.json({ reply: response.text() });
    } catch (error) {
        console.error("GEMINI ERROR:", error);
        res.status(500).json({ error: "AI failed to respond" });
    }
});

app.listen(3000, () => console.log("Vault running on http://localhost:3000"));