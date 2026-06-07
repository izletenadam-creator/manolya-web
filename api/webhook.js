// Vercel Serverless Function for Instagram Webhook

const META_VERIFY_TOKEN = process.env.META_VERIFY_TOKEN; // "manolya_bot_2026" vs.
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

module.exports = async function handler(req, res) {
  // 1. GET Request: Meta Webhook Verification
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === META_VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      return res.status(200).send(challenge);
    } else {
      return res.status(403).send('Forbidden');
    }
  }

  // 2. POST Request: Handling incoming Instagram Messages
  if (req.method === 'POST') {
    const body = req.body;

    // Check if it's an Instagram event
    if (body.object === 'instagram') {
      try {
        for (const entry of body.entry) {
          if (!entry.messaging) continue;
          
          for (const webhookEvent of entry.messaging) {
            const senderId = webhookEvent.sender.id;
            const message = webhookEvent.message;

            // If it's a text message, process it
            if (message && message.text) {
              const userText = message.text;
              console.log('Received message from sender', senderId, ':', userText);

              // 2.1 Call Gemini AI
              const aiResponse = await generateGeminiReply(userText);

              // 2.2 Send Reply back via Meta Graph API
              await sendMetaReply(senderId, aiResponse);
            }
          }
        }
        return res.status(200).send('EVENT_RECEIVED');
      } catch (error) {
        console.error('Error processing POST request:', error);
        return res.status(500).send('INTERNAL_SERVER_ERROR');
      }
    } else {
      // Not an Instagram event
      return res.status(404).send('Not Found');
    }
  }

  // Handle other HTTP methods
  return res.status(405).send('Method Not Allowed');
}

// Function to call Gemini 2.5 Flash via REST API
async function generateGeminiReply(userText) {
  if (!GEMINI_API_KEY) {
    console.error('No Gemini API key found.');
    return "Şu anda teknik bir bakımdan geçiyoruz, lütfen daha sonra tekrar deneyin.";
  }

  const systemInstruction = `
Sen Manolya Çiçekçilik (Kütahya/Simav) dükkanının akıllı yapay zeka asistanısın. 
Gelen müşterilere sıcak, profesyonel ve samimi bir dille yardımcı oluyorsun.
Hizmetlerimiz: Düğün, nişan organizasyonu, vip buketler, çikolata, gelin arabası süsleme vs.
Amacın satışı bağlamak, müşteriye harika hissettirmek ve gerektiğinde dükkana yönlendirmek.
Çok uzun yazma, mesajlaştığını unutma (WhatsApp/DM tarzı kısa, emojili).
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: [
          { parts: [{ text: userText }] }
        ]
      })
    });

    const data = await response.json();
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    }
    return "Maalesef şu an yanıt üretemiyorum.";
  } catch (err) {
    console.error('Gemini error:', err);
    return "Bağlantı hatası oluştu.";
  }
}

// Function to send DM via Meta Graph API
async function sendMetaReply(recipientId, text) {
  if (!META_ACCESS_TOKEN) {
    console.error('No Meta Access Token found.');
    return;
  }

  try {
    const response = await fetch('https://graph.facebook.com/v19.0/me/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${META_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text: text }
      })
    });

    const result = await response.json();
    if (result.error) {
      console.error('Meta API Error:', result.error);
    } else {
      console.log('Successfully sent message to', recipientId);
    }
  } catch (err) {
    console.error('Fetch error during sendMetaReply:', err);
  }
}
