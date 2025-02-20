const { OpenAI } = require("openai");

const ErrorHandler = require('../lib/ErrorHandler');
const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.DEEPSEEK
});

async function getAiResponse(req, res) {
    try {
        const { content = "Ola deepseek"} = req.body;

        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: content }],
            model: "deepseek-chat",
        });

        const response = completion.choices[0].message.content
        res.status(200).json(response);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
}

module.exports = {
    getAiResponse,
};