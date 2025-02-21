import { API_KEY } from './config.js';

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`;

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'summarize') {
    generateSummary(request.content)
      .then(summary => {
        chrome.runtime.sendMessage({
          type: "summary",
          url: request.url,
          summary: summary
        });
      });
    return true;
  }
});

async function generateSummary(content) {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Summarize this legal document in simple terms. Focus on key points about user rights, data collection, and obligations. Use bullet points. Maximum 150 words. Document: ${content.substring(0, 15000)}`
          }]
        }]
      })
    });
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    return "⚠️ Could not generate summary. Click to view full document.";
  }
}