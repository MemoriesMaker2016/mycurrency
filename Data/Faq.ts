export const FAQ_TREE: Record<
  string,
  { message: string; options: { label: string; next: string }[] }
> = {
  root: {
    message:
      "👋 Hello! I'm your MyCurrency support assistant.\n\nWhat can I help you with today?",
    options: [
      { label: "💱 How to Buy Currency", next: "buy" },
      { label: "💰 How to Sell Currency", next: "sell" },
      { label: "📦 Order Issues", next: "orders" },
      { label: "🏦 Forex Card Help", next: "forex_card" },
      { label: "❓ Something Else", next: "other" },
    ],
  },
  buy: {
    message:
      "Great! Let me help you with buying currency.\n\nWhat specifically are you looking for?",
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
    message:
      "No problem! Tell me what you're looking for and I'll connect you with the right help.\n\nYou can also type your question below 👇",
    options: [
      { label: "📞 Talk to a human agent", next: "human" },
      { label: "📧 Send us an email", next: "email" },
      { label: "⬅️ Go Back", next: "root" },
    ],
  },
  rates: {
    message:
      "📊 **Live Exchange Rates**\n\nOur rates are updated every 30 seconds from live market feeds. You can:\n• View the rate ticker at the top of the page\n• Check the rates table on our homepage\n• Rates shown include our competitive spread\n\nIs there anything else about rates?",
    options: [
      { label: "🛒 Place a buy order now", next: "place_buy" },
      { label: "🔔 Set a rate alert", next: "rate_alert" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  place_buy: {
    message:
      "🛒 **How to Place a Buy Order**\n\n1️⃣ Select the currency you want to buy\n2️⃣ Enter the amount (min ₹500 equivalent)\n3️⃣ Choose delivery or pickup\n4️⃣ Complete KYC if first order\n5️⃣ Pay via UPI, NetBanking, or Card\n6️⃣ Confirm your order!\n\nYour order is locked at the rate shown at checkout.",
    options: [
      { label: "💳 Payment methods", next: "payment" },
      { label: "⏱ Delivery times", next: "delivery" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  payment: {
    message:
      "💳 **Accepted Payment Methods**\n\n✅ UPI (GPay, PhonePe, Paytm)\n✅ Net Banking (all major banks)\n✅ Credit / Debit Cards\n✅ NEFT / RTGS for large orders\n\n⚠️ Cash payments not accepted online. Visit a branch for cash transactions.",
    options: [
      { label: "⬅️ Back to Buy", next: "buy" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  delivery: {
    message:
      "⏱ **Delivery Timelines**\n\n🏙 Same-city delivery: 2–4 hours\n🌆 Metro cities: Next business day\n🗺 Other cities: 2–3 business days\n✈️ Airport pickup: Available at 50+ airports\n\nOrders placed before 2 PM are processed same day.",
    options: [
      { label: "📦 Track my order", next: "track" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  sell_rates: {
    message:
      "💵 **Today's Best Sell Rates**\n\nOur sell rates are highly competitive. To get the best rate:\n• Sell during peak trading hours (10 AM – 4 PM IST)\n• Larger amounts get better rates\n• Lock your rate before market close\n\nCheck the live ticker on our homepage for current rates!",
    options: [
      { label: "📋 Documents needed", next: "documents" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  documents: {
    message:
      "📋 **Documents Required to Sell**\n\n✅ Valid Passport or Aadhaar\n✅ PAN Card (mandatory above ₹50,000)\n✅ Original purchase receipt\n✅ Bank account details for payout\n\nKYC is a one-time process — once verified, future transactions are seamless.",
    options: [
      { label: "📤 Submit sell request", next: "place_sell" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  place_sell: {
    message:
      "📤 **How to Submit a Sell Request**\n\n1️⃣ Go to 'Sell Currency' on the homepage\n2️⃣ Select your currency & amount\n3️⃣ Upload required documents\n4️⃣ Choose payout method (bank transfer)\n5️⃣ Drop off currency at nearest branch or schedule pickup\n6️⃣ Funds credited within 24–48 hours!",
    options: [
      { label: "🔄 Refund policy", next: "refund" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  refund: {
    message:
      "🔄 **Refund Policy**\n\nIf you cancel a sell order before processing:\n• Full refund of currency — no charges\n• After processing: subject to current exchange rate\n\nRefunds for overpayment are processed within 5–7 business days to your original payment method.",
    options: [
      { label: "❌ Cancel an order", next: "cancel" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  track: {
    message:
      "🔍 **Track Your Order**\n\nYou can track your order via:\n• 'My Orders' section in your account\n• SMS/Email updates (sent automatically)\n• Order tracking link in your confirmation email\n\nNeed the tracking ID? Check your registered email or SMS.",
    options: [
      { label: "⚠️ Order not delivered", next: "not_delivered" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  cancel: {
    message:
      "❌ **Cancelling an Order**\n\nYou can cancel within **30 minutes** of placing a buy order (before processing begins).\n\nTo cancel:\n1️⃣ Go to My Orders → Select order\n2️⃣ Click 'Cancel Order'\n3️⃣ Refund processed in 3–5 business days\n\n⚠️ Orders in delivery cannot be cancelled.",
    options: [
      { label: "💸 Refund timeline", next: "refund" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  not_delivered: {
    message:
      "⚠️ **Order Not Delivered?**\n\nWe're sorry to hear that! Here's what to do:\n\n1️⃣ Wait until the estimated delivery window passes\n2️⃣ Check your tracking link for updates\n3️⃣ If still unresolved — our team will investigate within 24 hours and redeliver or issue a full refund.",
    options: [
      { label: "📞 Talk to an agent", next: "human" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  wrong_amount: {
    message:
      "💸 **Received Wrong Amount?**\n\nThis is rare but we'll fix it fast!\n\n📸 Please take a photo of what you received and contact us. We'll:\n• Verify your order details\n• Send the correct amount or process a refund\n• Resolve within 48 hours guaranteed",
    options: [
      { label: "📞 Talk to an agent now", next: "human" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  apply_card: {
    message:
      "🆕 **Apply for a Forex Card**\n\n✅ Zero issuance fee for new customers\n✅ Accepted in 150+ countries\n✅ Load up to 15 currencies\n✅ Chip & PIN secured\n\nApply online in 5 minutes — card delivered in 3–5 business days. Valid ID + PAN required.",
    options: [
      { label: "💰 Reload card", next: "reload" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  block_card: {
    message:
      "🔒 **Block / Unblock Your Forex Card**\n\n**To block immediately:**\n• Call our 24/7 hotline: 1800-XXX-XXXX\n• Or use the Card section in your account\n\n**To unblock:**\n• Login → My Cards → Unblock\n• OTP verification required\n\nBlocking is instant. Your balance is safe.",
    options: [
      { label: "📞 Call hotline now", next: "human" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  reload: {
    message:
      "💰 **Reload Your Forex Card**\n\n1️⃣ Login → My Forex Cards\n2️⃣ Select currency to reload\n3️⃣ Enter amount & pay\n4️⃣ Card reloaded instantly!\n\n💡 Tip: Reload during business hours for best rates. Minimum reload: ₹1,000 equivalent.",
    options: [
      { label: "📉 Check balance", next: "check_balance" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  check_balance: {
    message:
      "📉 **Check Your Card Balance**\n\n• **App/Website**: Login → My Cards → View Balance\n• **SMS**: Send BAL <last 4 digits> to 56789\n• **ATM**: Check balance at any ATM worldwide\n• **IVR**: Call 1800-XXX-XXXX\n\nBalance shown in all loaded currencies.",
    options: [
      { label: "💰 Reload card", next: "reload" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  rate_alert: {
    message:
      "🔔 **Set a Rate Alert**\n\nThis feature is coming soon! We'll notify you when your target rate is hit.\n\nFor now, you can check the live ticker on our homepage or call us to lock a rate manually.",
    options: [{ label: "🏠 Go to main menu", next: "root" }],
  },
  human: {
    message:
      "📞 **Connecting you to a human agent...**\n\nOur support team is available:\n🕐 Mon–Sat: 9 AM – 8 PM IST\n🕐 Sun: 10 AM – 5 PM IST\n\n📞 **1800-XXX-XXXX** (Toll Free)\n📧 **support@forexpro.in**\n\nAverage wait time: ~3 minutes",
    options: [
      { label: "📧 Send email instead", next: "email" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
  email: {
    message:
      "📧 **Email Support**\n\nSend your query to:\n✉️ **support@forexpro.in**\n\nInclude:\n• Your registered mobile/email\n• Order ID (if applicable)\n• Description of issue\n\nWe respond within **4 business hours**.",
    options: [
      { label: "📞 Call instead", next: "human" },
      { label: "🏠 Go to main menu", next: "root" },
    ],
  },
};