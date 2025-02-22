chrome.runtime.onInstalled.addListener(() => {
    console.log("Privacy Simplified Extension Installed");

    // Hardcode the API key directly (replace with your actual API key)
    const apiKey = "AIzaSyD-SmrhAxhxCI82hmmr2DfdniD2AEf9Wzw"; // Replace this with your actual Gemini API key

    // Save the API key to Chrome storage
    chrome.storage.local.set({ geminiApiKey: apiKey }, () => {
        console.log("API Key loaded into local storage.");
    });
});
