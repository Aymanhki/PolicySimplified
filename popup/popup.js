
const apiKey = ""; //Removing API key until I get a fix.

document.getElementById("summarize").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: extractText
    }, async (results) => {
        let text = results[0].result || "No relevant content found.";
        
        // Hide instructions and button after summarization
        document.getElementById("instructions").style.display = "none";
        document.getElementById("instruction-list").style.display = "none";
        document.getElementById("summarize").style.display = "none";

        // Get the summarized text
        let summary = await summarizeWithGemini(text, apiKey);
        document.getElementById("summary").innerText = summary || "Summarization failed.";
    });
});

// Extract relevant text (terms, privacy, etc.) from the page
function extractText() {
    let text = "";
    let elements = document.body.querySelectorAll("p, div");
    elements.forEach(el => {
        if (el.innerText.toLowerCase().includes("privacy") || el.innerText.toLowerCase().includes("terms")) {
            text += el.innerText + "\n";
        }
    });
    return text.slice(0, 1000); // Limit text length to avoid API overload
}

// Summarize the content with a focus on how it affects you and use dashes for points
async function summarizeWithGemini(text, apiKey) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Provide a list of key points from the following privacy policy and website features, specifically focusing on how they affect you and things you should be aware of. Use dashes ( • ) to list the points and avoid using bullet points, asterisks, or special symbols. Replace the term "user" with "you." \n\n${text}`  // Focus on "you" with dashes and an intro message
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Log the raw API response before parsing
        const rawResponse = await response.text();
        console.log("Raw API Response:", rawResponse);  // Log raw response text

        // Parse the response
        const data = JSON.parse(rawResponse);
        console.log("Parsed API Response:", data);  // Log parsed JSON response

        // Check the structure of the response for expected output
        const keyPoints = data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text;
        
        if (keyPoints) {
            // Return the summary with "Here is what we found for you:" and dashes
            return "Here is what we found for you:\n\n" + keyPoints.trim();  // Ensure no extraneous whitespace
        } else {
            return "Error extracting key points: No valid key points found in the response.";
        }
    } catch (error) {
        console.error("Error fetching Gemini API:", error);
        return `Error extracting key points: ${error.message}`;
    }
}
