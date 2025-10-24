"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Mic, MicOff, Send, X } from "lucide-react"
import { DISHES_BY_COUNTRY } from "@/lib/dishes-data"

interface Message {
  id: string
  type: "user" | "assistant"
  text: string
  timestamp: Date
}

export function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const recognitionRef = useRef<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = "en-US"

        recognitionRef.current.onstart = () => {
          setIsListening(true)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }

        recognitionRef.current.onresult = (event: any) => {
          let interimTranscript = ""
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              setInputText((prev) => prev + transcript)
            } else {
              interimTranscript += transcript
            }
          }
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error)
          setIsListening(false)
        }
      }
    }
  }, [])

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1
      utterance.pitch = 1
      utterance.volume = 1

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)

      window.speechSynthesis.speak(utterance)
      synthRef.current = utterance
    }
  }

  const generateDemoResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    // Greeting responses
    if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return "Hello! Welcome to Compass Cuisine. I can help you explore authentic dishes from China, France, India, Italy, Japan, and Mexico. What would you like to know?"
    }

    // Help request
    if (input.includes("help") || input.includes("what can you do")) {
      return "I can help you with: dish information, recipes, cooking tips, dietary preferences, and recommendations. Just ask me about any of our cuisines!"
    }

    // Country-specific queries
    const countries = Object.keys(DISHES_BY_COUNTRY)
    for (const country of countries) {
      if (input.includes(country.toLowerCase())) {
        const dishes = DISHES_BY_COUNTRY[country as keyof typeof DISHES_BY_COUNTRY]
        const dishNames = dishes.map((d) => d.name).join(", ")
        return `Great choice! From ${country}, we have: ${dishNames}. Would you like to know more about any of these dishes?`
      }
    }

    // Dish-specific queries
    for (const country in DISHES_BY_COUNTRY) {
      const dishes = DISHES_BY_COUNTRY[country as keyof typeof DISHES_BY_COUNTRY]
      for (const dish of dishes) {
        if (input.includes(dish.name.toLowerCase())) {
          return `${dish.name} is a delicious ${country} dish with a rating of ${dish.rating} stars. ${dish.review} Would you like to know the recipe or more details?`
        }
      }
    }

    // Recipe request
    if (input.includes("recipe") || input.includes("how to make") || input.includes("ingredients")) {
      return "I'd be happy to help with a recipe! Which dish would you like to know how to make? Just mention the dish name."
    }

    // Dietary preferences
    if (input.includes("vegetarian") || input.includes("vegan") || input.includes("gluten")) {
      return "We have many options for dietary preferences! Our Indian, Italian, and Japanese cuisines offer great vegetarian choices. Would you like specific recommendations?"
    }

    // Rating/review queries
    if (input.includes("best") || input.includes("rating") || input.includes("popular")) {
      return "All our dishes are highly rated! Our top-rated dishes include Peking Duck from China (4.9 stars), Sushi from Japan (4.8 stars), and Coq au Vin from France (4.7 stars). Which interests you?"
    }

    // Default helpful response
    return "That's a great question! I can help you explore our dishes from China, France, India, Italy, Japan, and Mexico. Feel free to ask about specific dishes, recipes, or cuisines!"
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: inputText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsLoading(true)

    try {
      const aiResponse = generateDemoResponse(inputText)

      // Simulate slight delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        text: aiResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Speak the response
      speakText(aiResponse)
    } catch (error) {
      console.error("Error generating response:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        text: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
        aria-label="Open voice assistant"
      >
        <Mic className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-24px)] bg-card border border-border rounded-lg shadow-2xl flex flex-col max-h-96 animate-scale-in">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
            <h3 className="font-semibold">Compass Cuisine Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary/80 p-1 rounded transition-colors"
              aria-label="Close assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <p className="text-sm">Ask me anything about our dishes!</p>
                <p className="text-xs mt-2">Use voice or type your questions.</p>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted text-muted-foreground rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4 space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type or speak..."
                className="flex-1 px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputText.trim()}
                className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  isListening
                    ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                }`}
                aria-label={isListening ? "Stop listening" : "Start listening"}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-4 h-4" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    Start Listening
                  </>
                )}
              </button>

              {isSpeaking && (
                <button
                  onClick={() => window.speechSynthesis.cancel()}
                  className="px-3 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 text-sm font-medium transition-colors"
                  aria-label="Stop speaking"
                >
                  Stop Speaking
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
