"use client";
import { useState, useRef, useEffect } from "react";

const FAQ_TREE = {
  root: {
    message: "👋 Hello! I'm your ForexPro support assistant.\n\nWhat can I help you with today?",
    options: [
      { label: "💱 How to Buy Currency", next: "buy" },
      { label: "💰 How to Sell Currency", next: "sell" },
      { label: "📦 Order Issues", next: "orders" },
      { label: "🏦 Forex Card Help", next: "forex_card" },
      { label: "❓ Something Else", next: "other" },
    ],
  },
  buy: {
    message: "Great! Let me help you with buying currency.\n\nWhat specifically are you looking for?",
    options: [
      { label: "📊 Check current exchange rates", next: "rates" },
      { label: "🛒 How to place a buy order", next: "place_buy" },
      { label: "💳 Payment methods accepted", next: "payment" },
      { label: "⏱ How long does delivery take?", next: "delivery" },
      { label: "⬅️ Go Back", next: "root" },
    ],
  },
  sell: {
    message: "I'll help you sell your currency.\n\nWhat do you need to know?",
    options: [
      { label: "💵 Best rates to sell today", next: "sell_rates" },
      { label: "📋 Documents required", next: "documents" },
      { label: "🏧 How to submit sell request", next: "place_sell" },
      { label: "🔄 Refund after sell", next: "refund" },
      { label: "⬅️ Go Back", next: "root" },
    ],
  },
  orders: {
    message: "Let's sort out your order issue.\n\nWhat's the problem?",
    options: [
      { label: "🔍 Track my order", next: "track" },
      { label: "❌ Cancel an order", next: "cancel" },
      { label: "⚠️ Order not delivered", next: "not_delivered" },
      { label: "💸 Wrong amount received", next: "wrong_amount" },
      { label: "⬅️ Go Back", next: "root" },
    ],
  },
  forex_card: {
    message: "Forex Card support — what do you need?",
    options: [
      { label: "🆕 Apply for a Forex Card", next: "apply_card" },
      { label: "🔒 Block / Unblock card", next: "block_card" },
      { label: "💰 Reload card balance", next: "reload" },
      { label: "📉 Check card balance", next: "check_balance" },
      { label: "⬅️ Go Back", next: "root" },
    ],
  },
  other: {
    message: "No problem! Tell me what you're looking for and I'll connect you with the right help.\n\nYou can also type your question below 👇",
    options: [
      { label: "📞 Talk to a human agent", next: "human" },
      { label: "📧 Send us an email", next: "email" },
      { label: "⬅️ Go Back", next: "root" },
    ],
  },
  rates: {
    message: "📊 **Live Exchange Rates**\n\nOur rates are updated every 30 seconds from live market feeds. You can:\n• View the rate ticker at the top of the page\n• Check the rates table on our homepage\n• Rates shown include our competitive spread\n\nIs there anything else about rates?",
    options: [
      { label: "🛒 Place a buy order now", next: "place_buy" },
      { label: "🔔 Set a rate alert", next: "rate_alert" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  place_buy: {
    message: "🛒 **How to Place a Buy Order**\n\n1️⃣ Select the currency you want to buy\n2️⃣ Enter the amount (min ₹500 equivalent)\n3️⃣ Choose delivery or pickup\n4️⃣ Complete KYC if first order\n5️⃣ Pay via UPI, NetBanking, or Card\n6️⃣ Confirm your order!\n\nYour order is locked at the rate shown at checkout.",
    options: [
      { label: "💳 Payment methods", next: "payment" },
      { label: "⏱ Delivery times", next: "delivery" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  payment: {
    message: "💳 **Accepted Payment Methods**\n\n✅ UPI (GPay, PhonePe, Paytm)\n✅ Net Banking (all major banks)\n✅ Credit / Debit Cards\n✅ NEFT / RTGS for large orders\n\n⚠️ Cash payments not accepted online. Visit a branch for cash transactions.",
    options: [
      { label: "⬅️ Back to Buy", next: "buy" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  delivery: {
    message: "⏱ **Delivery Timelines**\n\n🏙 Same-city delivery: 2–4 hours\n🌆 Metro cities: Next business day\n🗺 Other cities: 2–3 business days\n✈️ Airport pickup: Available at 50+ airports\n\nOrders placed before 2 PM are processed same day.",
    options: [
      { label: "📦 Track my order", next: "track" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  sell_rates: {
    message: "💵 **Today's Best Sell Rates**\n\nOur sell rates are highly competitive. To get the best rate:\n• Sell during peak trading hours (10 AM – 4 PM IST)\n• Larger amounts get better rates\n• Lock your rate before market close\n\nCheck the live ticker on our homepage for current rates!",
    options: [
      { label: "📋 Documents needed", next: "documents" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  documents: {
    message: "📋 **Documents Required to Sell**\n\n✅ Valid Passport or Aadhaar\n✅ PAN Card (mandatory above ₹50,000)\n✅ Original purchase receipt\n✅ Bank account details for payout\n\nKYC is a one-time process — once verified, future transactions are seamless.",
    options: [
      { label: "📤 Submit sell request", next: "place_sell" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  place_sell: {
    message: "📤 **How to Submit a Sell Request**\n\n1️⃣ Go to 'Sell Currency' on the homepage\n2️⃣ Select your currency & amount\n3️⃣ Upload required documents\n4️⃣ Choose payout method (bank transfer)\n5️⃣ Drop off currency at nearest branch or schedule pickup\n6️⃣ Funds credited within 24–48 hours!",
    options: [
      { label: "🔄 Refund policy", next: "refund" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  refund: {
    message: "🔄 **Refund Policy**\n\nIf you cancel a sell order before processing:\n• Full refund of currency — no charges\n• After processing: subject to current exchange rate\n\nRefunds for overpayment are processed within 5–7 business days to your original payment method.",
    options: [
      { label: "❌ Cancel an order", next: "cancel" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  track: {
    message: "🔍 **Track Your Order**\n\nYou can track your order via:\n• 'My Orders' section in your account\n• SMS/Email updates (sent automatically)\n• Order tracking link in your confirmation email\n\nNeed the tracking ID? Check your registered email or SMS.",
    options: [
      { label: "⚠️ Order not delivered", next: "not_delivered" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  cancel: {
    message: "❌ **Cancelling an Order**\n\nYou can cancel within **30 minutes** of placing a buy order (before processing begins).\n\nTo cancel:\n1️⃣ Go to My Orders → Select order\n2️⃣ Click 'Cancel Order'\n3️⃣ Refund processed in 3–5 business days\n\n⚠️ Orders in delivery cannot be cancelled.",
    options: [
      { label: "💸 Refund timeline", next: "refund" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  not_delivered: {
    message: "⚠️ **Order Not Delivered?**\n\nWe're sorry to hear that! Here's what to do:\n\n1️⃣ Wait until the estimated delivery window passes\n2️⃣ Check your tracking link for updates\n3️⃣ If still unresolved — our team will investigate within 24 hours and redeliver or issue a full refund.",
    options: [
      { label: "📞 Talk to an agent", next: "human" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  wrong_amount: {
    message: "💸 **Received Wrong Amount?**\n\nThis is rare but we'll fix it fast!\n\n📸 Please take a photo of what you received and contact us. We'll:\n• Verify your order details\n• Send the correct amount or process a refund\n• Resolve within 48 hours guaranteed",
    options: [
      { label: "📞 Talk to an agent now", next: "human" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  apply_card: {
    message: "🆕 **Apply for a Forex Card**\n\n✅ Zero issuance fee for new customers\n✅ Accepted in 150+ countries\n✅ Load up to 15 currencies\n✅ Chip & PIN secured\n\nApply online in 5 minutes — card delivered in 3–5 business days. Valid ID + PAN required.",
    options: [
      { label: "💰 Reload card", next: "reload" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  block_card: {
    message: "🔒 **Block / Unblock Your Forex Card**\n\n**To block immediately:**\n• Call our 24/7 hotline: 1800-XXX-XXXX\n• Or use the Card section in your account\n\n**To unblock:**\n• Login → My Cards → Unblock\n• OTP verification required\n\nBlocking is instant. Your balance is safe.",
    options: [
      { label: "📞 Call hotline now", next: "human" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  reload: {
    message: "💰 **Reload Your Forex Card**\n\n1️⃣ Login → My Forex Cards\n2️⃣ Select currency to reload\n3️⃣ Enter amount & pay\n4️⃣ Card reloaded instantly!\n\n💡 Tip: Reload during business hours for best rates. Minimum reload: ₹1,000 equivalent.",
    options: [
      { label: "📉 Check balance", next: "check_balance" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  check_balance: {
    message: "📉 **Check Your Card Balance**\n\n• **App/Website**: Login → My Cards → View Balance\n• **SMS**: Send BAL <last 4 digits> to 56789\n• **ATM**: Check balance at any ATM worldwide\n• **IVR**: Call 1800-XXX-XXXX\n\nBalance shown in all loaded currencies.",
    options: [
      { label: "💰 Reload card", next: "reload" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  rate_alert: {
    message: "🔔 **Set a Rate Alert**\n\nThis feature is coming soon! We'll notify you when your target rate is hit.\n\nFor now, you can check the live ticker on our homepage or call us to lock a rate manually.",
    options: [
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  human: {
    message: "📞 **Connecting you to a human agent...**\n\nOur support team is available:\n🕐 Mon–Sat: 9 AM – 8 PM IST\n🕐 Sun: 10 AM – 5 PM IST\n\n📞 **1800-XXX-XXXX** (Toll Free)\n📧 **support@forexpro.in**\n\nAverage wait time: ~3 minutes",
    options: [
      { label: "📧 Send email instead", next: "email" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  email: {
    message: "📧 **Email Support**\n\nSend your query to:\n✉️ **support@forexpro.in**\n\nInclude:\n• Your registered mobile/email\n• Order ID (if applicable)\n• Description of issue\n\nWe respond within **4 business hours**.",
    options: [
      { label: "📞 Call instead", next: "human" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
};

function formatMessage(text) {
  return text.split("\n").map((line, i) => {
    const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    return (
      <span key={i} dangerouslySetInnerHTML={{ __html: bold + (i < text.split("\n").length - 1 ? "<br/>" : "") }} />
    );
  });
}

export default function SupportChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentNode, setCurrentNode] = useState("root");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      triggerNode("root", true);
    }
    if (isOpen) setHasUnread(false);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const triggerNode = (nodeKey, instant = false) => {
    const node = FAQ_TREE[nodeKey];
    if (!node) return;
    setCurrentNode(nodeKey);
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

  const handleOption = (option) => {
    setMessages((prev) => [
      ...prev.map((m) => ({ ...m, options: undefined })),
      { role: "user", text: option.label, id: Date.now() },
    ]);
    triggerNode(option.next);
  };

  const handleReset = () => {
    setMessages([]);
    setCurrentNode("root");
    triggerNode("root", true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        .chat-wrap * { box-sizing: border-box; font-family: 'Sora', sans-serif; }

        .chat-bubble-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0ea5e9, #0369a1);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px rgba(14,165,233,0.45), 0 2px 8px rgba(0,0,0,0.2);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .chat-bubble-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 12px 40px rgba(14,165,233,0.55);
        }
        .chat-bubble-btn svg { width: 26px; height: 26px; fill: white; }

        .unread-dot {
          position: absolute;
          top: 2px; right: 2px;
          width: 14px; height: 14px;
          background: #ef4444;
          border-radius: 50%;
          border: 2px solid white;
          animation: pulse-dot 1.6s infinite;
        }
        @keyframes pulse-dot {
          0%,100% { transform: scale(1); opacity:1; }
          50% { transform: scale(1.3); opacity:0.7; }
        }

        .chat-window {
          position: fixed;
          bottom: 100px;
          right: 28px;
          z-index: 9998;
          width: 380px;
          max-height: 600px;
          border-radius: 20px;
          background: #0f172a;
          border: 1px solid rgba(14,165,233,0.2);
          box-shadow: 0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: chat-in 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes chat-in {
          from { opacity:0; transform: scale(0.85) translateY(20px); }
          to { opacity:1; transform: scale(1) translateY(0); }
        }

        .chat-header {
          background: linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%);
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .chat-avatar {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #38bdf8, #0ea5e9);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          box-shadow: 0 0 0 3px rgba(56,189,248,0.25);
        }
        .chat-header-info { flex: 1; }
        .chat-header-name { color: #fff; font-weight: 600; font-size: 15px; }
        .chat-header-status { color: #7dd3fc; font-size: 12px; display: flex; align-items: center; gap: 4px; }
        .status-dot { width: 7px; height: 7px; background: #4ade80; border-radius: 50%; animation: pulse-dot 2s infinite; }

        .chat-header-actions { display: flex; gap: 8px; }
        .hdr-btn {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(255,255,255,0.1);
          border: none; cursor: pointer; color: #bae6fd;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
          font-size: 14px;
        }
        .hdr-btn:hover { background: rgba(255,255,255,0.18); }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          scrollbar-width: thin;
          scrollbar-color: rgba(14,165,233,0.3) transparent;
        }

        .msg-bot, .msg-user {
          display: flex;
          flex-direction: column;
          gap: 8px;
          animation: msg-in 0.25s ease;
        }
        @keyframes msg-in {
          from { opacity:0; transform: translateY(8px); }
          to { opacity:1; transform: translateY(0); }
        }
        .msg-bot { align-items: flex-start; }
        .msg-user { align-items: flex-end; }

        .msg-bubble {
          max-width: 88%;
          padding: 11px 14px;
          border-radius: 16px;
          font-size: 13.5px;
          line-height: 1.6;
        }
        .msg-bot .msg-bubble {
          background: #1e293b;
          color: #e2e8f0;
          border-radius: 4px 16px 16px 16px;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .msg-user .msg-bubble {
          background: linear-gradient(135deg, #0ea5e9, #0369a1);
          color: #fff;
          border-radius: 16px 16px 4px 16px;
        }

        .options-grid {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-top: 4px;
        }
        .option-btn {
          background: rgba(14,165,233,0.08);
          border: 1px solid rgba(14,165,233,0.25);
          color: #7dd3fc;
          border-radius: 10px;
          padding: 9px 13px;
          font-size: 13px;
          font-family: 'Sora', sans-serif;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s;
          font-weight: 500;
        }
        .option-btn:hover {
          background: rgba(14,165,233,0.18);
          border-color: rgba(14,165,233,0.5);
          color: #e0f2fe;
          transform: translateX(3px);
        }

        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 12px 14px;
          background: #1e293b;
          border-radius: 4px 16px 16px 16px;
          width: fit-content;
          border: 1px solid rgba(255,255,255,0.06);
          animation: msg-in 0.25s ease;
        }
        .typing-dot {
          width: 7px; height: 7px;
          background: #38bdf8;
          border-radius: 50%;
          animation: typing-bounce 1.2s infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing-bounce {
          0%,60%,100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }

        .chat-footer {
          padding: 12px 14px;
          border-top: 1px solid rgba(255,255,255,0.06);
          background: #0f172a;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .chat-input {
          flex: 1;
          background: #1e293b;
          border: 1px solid rgba(14,165,233,0.2);
          border-radius: 10px;
          color: #e2e8f0;
          font-size: 13px;
          font-family: 'Sora', sans-serif;
          padding: 9px 12px;
          outline: none;
          transition: border-color 0.15s;
        }
        .chat-input::placeholder { color: #475569; }
        .chat-input:focus { border-color: rgba(14,165,233,0.5); }
        .send-btn {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #0ea5e9, #0369a1);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.15s, opacity 0.15s;
        }
        .send-btn:hover { transform: scale(1.08); }
        .send-btn svg { width: 16px; height: 16px; fill: white; }

        .chat-powered {
          text-align: center;
          font-size: 10.5px;
          color: #334155;
          padding: 6px 0 8px;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.03em;
        }

        @media (max-width: 440px) {
          .chat-window { width: calc(100vw - 20px); right: 10px; bottom: 90px; }
        }
      `}</style>

      <div className="chat-wrap">
        {/* Floating Button */}
        <button className="chat-bubble-btn" onClick={() => setIsOpen((v) => !v)} aria-label="Open support chat">
          {isOpen ? (
            <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          ) : (
            <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
          )}
          {hasUnread && !isOpen && <span className="unread-dot" />}
        </button>

        {/* Chat Window */}
        {isOpen && (
          <div className="chat-window">
            {/* Header */}
            <div className="chat-header">
              <div className="chat-avatar">🤖</div>
              <div className="chat-header-info">
                <div className="chat-header-name">ForexPro Support</div>
                <div className="chat-header-status">
                  <span className="status-dot" />
                  Online — typically replies instantly
                </div>
              </div>
              <div className="chat-header-actions">
                <button className="hdr-btn" onClick={handleReset} title="Restart">↺</button>
                <button className="hdr-btn" onClick={() => setIsOpen(false)} title="Close">✕</button>
              </div>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={msg.role === "bot" ? "msg-bot" : "msg-user"}>
                  <div className="msg-bubble">{formatMessage(msg.text)}</div>
                  {msg.options && (
                    <div className="options-grid">
                      {msg.options.map((opt, i) => (
                        <button key={i} className="option-btn" onClick={() => handleOption(opt)}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="msg-bot">
                  <div className="typing-indicator">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="chat-footer">
              <input
                className="chat-input"
                placeholder="Type a message…"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    const val = e.target.value.trim();
                    e.target.value = "";
                    setMessages((prev) => [
                      ...prev.map((m) => ({ ...m, options: undefined })),
                      { role: "user", text: val, id: Date.now() },
                    ]);
                    setIsTyping(true);
                    setTimeout(() => {
                      setIsTyping(false);
                      setMessages((prev) => [
                        ...prev,
                        {
                          role: "bot",
                          text: "Thanks for your message! For the best help, please choose from the options above, or I can connect you with a human agent. 😊",
                          options: [
                            { label: "📞 Talk to a human agent", next: "human" },
                            { label: "🏠 Go to main menu", next: "root" },
                          ],
                          id: Date.now(),
                        },
                      ]);
                    }, 1000);
                  }
                }}
              />
              <button className="send-btn" aria-label="Send">
                <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}