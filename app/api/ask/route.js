import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
})

export async function POST(request) {
    const { question } = await request.json()
    
    const message = await client.messages.create({
        model: "claude-opus-4-5",
        max_tokens: 1024,
        system: "You are a helpful study assistant for college students. Explain concepts clearly and step by step.",
        messages: [
            { role: "user", content: question }
        ]
    })
    
    return Response.json({ answer: message.content[0].text })
}