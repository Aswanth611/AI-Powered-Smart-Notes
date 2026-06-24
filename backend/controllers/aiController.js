const axios = require('axios');
const { SYSTEM_PROMPT } = require('../config/aiPrompt');

/**
 * Clean and parse the response from the LLM.
 * Removes markdown block syntax if present and parses it to JSON.
 */
function cleanAndParseJson(text) {
  let cleaned = text.trim();
  // Strip Markdown code block indicators if the LLM wrapped it
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '');
  }
  return JSON.parse(cleaned.trim());
}

/**
 * Controller to handle AI note analysis
 */
const analyzeNotes = async (req, res) => {
  try {
    const { text } = req.body;

    // Validate request input
    if (!text || typeof text !== 'string' || text.trim() === '') {
      return res.status(400).json({ error: 'Please enter your notes before analyzing.' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error('GROQ_API_KEY is not configured in backend .env file.');
      return res.status(500).json({ error: 'Groq API Key is not configured on the server.' });
    }

    const model = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';

    console.log(`Sending request to Groq API using model: ${model}...`);

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: text }
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' }
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 25000 // 25 seconds timeout
      }
    );

    const resultText = response.data.choices[0].message.content;
    console.log('Received response from Groq. Parsing...');

    let parsedData;
    try {
      parsedData = cleanAndParseJson(resultText);
    } catch (parseError) {
      console.error('Failed to parse JSON response from LLM:', resultText, parseError);
      return res.status(422).json({ error: 'AI returned invalid data format.' });
    }

    // Validate the expected schema: { summary: Array, actionItems: Array }
    if (!parsedData || !Array.isArray(parsedData.summary) || !Array.isArray(parsedData.actionItems)) {
      console.error('Invalid schema from LLM:', parsedData);
      return res.status(422).json({ error: 'AI response does not contain required fields.' });
    }

    return res.json({
      summary: parsedData.summary,
      actionItems: parsedData.actionItems
    });

  } catch (error) {
    console.error('Error in analyzeNotes controller:', error.message);
    if (error.response) {
      console.error('Groq API Error Details:', error.response.status, error.response.data);
      return res.status(error.response.status || 500).json({
        error: `Groq API Error: ${error.response.data.error?.message || 'Unable to analyze notes.'}`
      });
    }
    return res.status(500).json({ error: 'Unable to analyze notes. Please try again.' });
  }
};

module.exports = {
  analyzeNotes
};
