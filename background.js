const API_KEY = 'AIzaSyD7CDgwyBqwkcAIt5Nu4gAXB24zojonke8'; // Replace with your Gemini API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`;

// Handle content summarization
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'summarize') {
    generateSummary(request.content)
      .then(summary => {
        chrome.runtime.sendMessage({
          type: "summary",
          url: request.url,
          summary: summary
        });
      })
      .catch(error => {
        console.error('Summary error:', error);SS
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