'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGFM from 'remark-gfm'

export default function Home() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleAsk() {
    setLoading(true)
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    })
    const data = await response.json()
    setAnswer(data.answer)
    setLoading(false)
  }

  return (
    <main className = "min-h-screen flex flex-col items-center justify-center bg-black gap-6">
      <h1 className = "text-white text-5xl font-bold">StudyMate</h1>
      <div className = "relative">
        <textarea
          className = "w-96 h-32 p-4 rounded-lg bg-zinc-900 text-white border border-zinc-700 resize-none focus:outline-none focus:border-zinc-500"
          placeholder = "Ask a question about your coursework..."
          value = {question}
          onChange = {(e) => setQuestion(e.target.value)}
        />
        <button className = "absolute bottom-2 right-2 bg-zinc-700 text-white px-4 py-2 rounded-lg hover:bg-zinc-500" onClick = {handleAsk}>
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </div>
      {answer && (
        <div className = "w-96 p-4 rounded-lg bg-zinc-900 text-white border border-zinc-700 prose prose-invert">
          <ReactMarkdown remarkPlugins = {[remarkGFM]}>{answer}</ReactMarkdown>
        </div>
      )}
    </main>
  )
}