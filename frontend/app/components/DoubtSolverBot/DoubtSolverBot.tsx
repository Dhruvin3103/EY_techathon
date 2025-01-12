"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, HelpCircle, X, Send } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import  apiClient  from "@/app/api/client";

interface DoubtSolverBotProps {
  topicContent: string;
  chapterId: string;
  subchapterId: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

export function DoubtSolverBot({ 
  topicContent, 
  chapterId, 
  subchapterId,
  isOpen,
  onOpenChange 
}: DoubtSolverBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sessionId = `${chapterId}_${subchapterId}`;

  const handleOpen = async () => {
    if (!isOpen && messages.length === 0) {
      setIsLoading(true);
      try {
        await apiClient.startChat(topicContent, sessionId);
        setMessages([{
          id: `${Date.now()}_bot`,
          text: "Hi! I'm your AI doubt solver. How can I help you understand this topic better?",
          isBot: true
        }]);
      } catch (error) {
        console.error("Failed to start chat:", error);
      } finally {
        setIsLoading(false);
      }
    }
    onOpenChange(true);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `${Date.now()}_user`,
      text: input.trim(),
      isBot: false,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await apiClient.sendMessage(sessionId, input);
      console.log("Bot response:", response);
      const botMessage: Message = {
        id: `${Date.now()}_bot`,
        text: String(response) || "No response available.",
        isBot: true,
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to send message:", JSON.stringify(error));
      const errorMessage: Message = {
        id: `${Date.now()}_error`,
        text: `Sorry, process your message. Please try again.: ${error} <- this is error `,
        isBot: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"; 
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`; 
    }
  }, [input]);

  return (
    <>
      {!isOpen && (
        <motion.button
          onClick={handleOpen}
          className="fixed bottom-24 right-8 p-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-purple-500/20 transition-shadow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <HelpCircle className="w-6 h-6" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed top-0 right-0 w-[40%] h-full bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-lg border-l border-purple-500/20 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-purple-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Bot className="w-5 h-5 text-purple-300" />
                </div>
                <h3 className="text-lg font-semibold text-white">Doubt Solver</h3>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-purple-300" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isBot={message.isBot}
                />
              ))}
              {isLoading && (
                <div className="flex justify-center">
                  <div className="animate-pulse text-purple-300">
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-purple-500/20">
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()}
                  placeholder="Ask your doubt..."
                  disabled={isLoading}
                  className="flex-1 bg-purple-900/20 border border-purple-500/30 rounded-lg py-2 px-4 text-purple-100 placeholder:text-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="p-2 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition-colors disabled:opacity-50"
                >
                  <Send className="w-5 h-5 text-purple-300" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}