"use client";
import { FAQ_TREE } from "@/Data/Faq";
import { useState, useRef, useEffect } from "react";



interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
  options?: { label: string; next: string }[];
}




function FormatMessage({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i, arr) => {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <span key={i}>
            {parts.map((part, j) =>
              j % 2 === 1 ? (
                <strong key={j} className="font-semibold">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
            {i < arr.length - 1 && <br />}
          </span>
        );
      })}
    </>
  );
}

export default function SupportChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const WORD_LIMIT = 500;
  const wordCount = inputValue.trim() === "" ? 0 : inputValue.trim().split(/\s+/).length;
  const isOverLimit = wordCount > WORD_LIMIT;

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      triggerNode("root", true);
    }
    if (isOpen) setHasUnread(false);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const triggerNode = (nodeKey: string, instant = false) => {
    const node = FAQ_TREE[nodeKey];
    if (!node) return;
    if (instant) {
      setMessages([{ role: "bot", text: node.message, options: node.options, id: Date.now() }]);
    } else {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: node.message, options: node.options, id: Date.now() },
        ]);
      }, 900);
    }
  };

  const handleOption = (option: { label: string; next: string }) => {
    setMessages((prev) => [
      ...prev.map((m) => ({ ...m, options: undefined })),
      { role: "user", text: option.label, id: Date.now() },
    ]);
    triggerNode(option.next);
  };

  const handleReset = () => {
    setMessages([]);
    triggerNode("root", true);
  };

  const sendMessage = async () => {
    const val = inputValue.trim();
    if (!val || isOverLimit) return;
    setInputValue("");
    setMessages((prev) => [
      ...prev.map((m) => ({ ...m, options: undefined })),
      { role: "user", text: val, id: Date.now() },
    ]);
    setIsTyping(true);
    try {
      console.log(val);
      
      const res = await fetch("/messageapi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: val }),
      });
      const data = await res.json();
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.reply ?? "Thanks for your message! We'll get back to you shortly. 😊",
          options: data.options ?? [
            { label: "📞 Talk to a human agent", next: "human" },
            { label: "🏠 Go to main menu", next: "root" },
          ],
          id: Date.now(),
        },
      ]);
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Sorry, something went wrong. Please try again or choose an option below.",
          options: [
            { label: "📞 Talk to a human agent", next: "human" },
            { label: "🏠 Go to main menu", next: "root" },
          ],
          id: Date.now(),
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Open support chat"
        className="fixed bottom-7 right-7 z-[999] w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
        )}

        {/* Unread dot */}
        {hasUnread && !isOpen && (
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-7 z-[999] w-[380px] max-h-[500px] rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300 max-sm:w-[calc(100vw-20px)] max-sm:right-2.5">

          {/* Header */}
          <div className="bg-primary px-4 py-3.5 flex items-center gap-3 shrink-0">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg shrink-0 ring-2 ring-white/30">
              🤖
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-tight">MyCurrency Support</p>
             
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleReset}
                title="Restart"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-sm font-medium"
              >
                ↺
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-sm"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50 dark:bg-gray-800/50 min-h-0">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                {/* Bubble */}
                <div
                  className={`max-w-[88%] px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "bot"
                      ? "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-tl rounded-tr-2xl rounded-br-2xl rounded-bl-2xl border border-gray-200 dark:border-gray-700 shadow-sm"
                      : "bg-primary text-white rounded-tl-2xl rounded-tr rounded-bl-2xl rounded-br-2xl shadow-sm"
                  }`}
                >
                  <FormatMessage text={msg.text} />
                </div>

                {/* Options */}
                {msg.options && (
                  <div className="flex flex-col gap-1.5 w-full max-w-[88%]">
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleOption(opt)}
                        className="text-left text-sm px-3.5 py-2.5 rounded-xl border border-primary/30 bg-primary/5 text-primary hover:bg-primary hover:text-white hover:border-primary font-medium transition-all duration-150 hover:translate-x-0.5 dark:bg-primary/10 dark:text-primary dark:border-primary/40 dark:hover:bg-primary dark:hover:text-white"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-tl rounded-tr-2xl rounded-br-2xl rounded-bl-2xl px-4 py-3 shadow-sm flex items-center gap-1.5">
                  {[0, 150, 300].map((delay, i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="px-3.5 pt-3 pb-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shrink-0">
            <div className="flex items-end gap-2">
              <textarea
                rows={3}
                placeholder="Type a message… (Enter to send, Shift+Enter for new line)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 resize-none text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isOverLimit}
                aria-label="Send"
                className="w-9 h-9 mb-0.5 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
            <p className={`text-right text-xs mt-1 ${isOverLimit ? "text-red-500 font-medium" : "text-gray-400"}`}>
              {wordCount}/{WORD_LIMIT} words
            </p>
          </div>


         
        </div>
      )}
    </>
  );
}