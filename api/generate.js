export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages, max_tokens = 2000 } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

  if (!apiKey) return res.status(500).json({ error: 'API key not configured on server' });

  const contents = (messages || []).map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: typeof m.content === 'string' ? m.content : String(m.content) }]
  }));

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: { maxOutputTokens: max_tokens }
      })
    });

    const data = await response.json();
    if (!response.ok) {
      const msg = data.error?.message || JSON.stringify(data);
      return res.status(response.status).json({ error: msg });
    }

    const text =
      data.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? '';
    if (!text) {
      const block = data.promptFeedback?.blockReason;
      return res.status(400).json({
        error: block ? `Content blocked: ${block}` : 'Empty model response'
      });
    }

    return res.status(200).json({ content: [{ text }] });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
