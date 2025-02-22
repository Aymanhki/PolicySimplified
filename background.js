chrome.runtime.onInstalled.addListener(() => {
    console.log("Privacy Simplified Extension Installed");

    const apiKey = "AIzaSyD-SmrhAxhxCI82hmmr2DfdniD2AEf9Wzw";

    // Save the API key to Chrome storage
    chrome.storage.local.set({ geminiApiKey: apiKey }, () => {
        console.log("API Key loaded into local storage.");
    });
});
