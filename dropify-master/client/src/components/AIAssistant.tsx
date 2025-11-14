"use client"
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Brain } from 'lucide-react';

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      message: "How can I help you today?",
      type: "assistant",
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateContent = async (text: string) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDPaz76UWGXrT-38kCWPLBvVbysdwr9cUk',
        {
          contents: [
            {
              parts: [
                { text: text },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const assistantMessage = response.data.candidates[0]?.content?.parts[0]?.text || 'No response from Gemini API.';
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: assistantMessage, type: 'assistant' },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: 'Error fetching content from Gemini API.', type: 'assistant' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: userInput, type: 'user' },
      ]);
      generateContent(userInput);
      setUserInput('');
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-4xl bg-zinc-900 rounded-xl p-8 border border-zinc-800 shadow-lg">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-purple-500/20 rounded-lg">
            <Brain className="text-purple-400" size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-bold">AI Traffic Assistant</h2>
            <p className="text-zinc-400">How can I help you today?</p>
          </div>
        </div>

        <div className="space-y-4 mb-4 max-h-96 overflow-y-auto px-2">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}> 
              <div className={`max-w-[80%] p-4 rounded-lg ${msg.type === 'user' ? 'bg-purple-500/20 text-purple-100' : 'bg-zinc-800/50'}`}>
                <p className="whitespace-pre-line">{msg.message}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex space-x-2 items-center">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};