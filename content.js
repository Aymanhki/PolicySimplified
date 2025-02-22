chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extract") {
        let text = "";
        
        // Extract relevant text from paragraphs or divs containing "privacy" or "terms"
        let elements = document.body.querySelectorAll("p, div");
        elements.forEach(el => {
            if (el.innerText.toLowerCase().includes("privacy") || el.innerText.toLowerCase().includes("terms")) {
                text += el.innerText + "\n";
            }
        });
        
        // If no relevant text is found, send a default message
        if (!text) {
            text = "No relevant content found.";
        }

        // Send the extracted text back as a response
        sendResponse({ data: text });
    }
});
