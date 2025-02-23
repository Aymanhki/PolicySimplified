chrome.runtime.onInstalled.addListener(() => {
    console.log("Privacy Simplified Extension Installed");

    
    const apiKey = ""; //Removing API key until I get a fix.

    // Save the API key to Chrome storage
    chrome.storage.local.set({ geminiApiKey: apiKey }, () => {
        console.log("API Key loaded into local storage.");
    });
});
