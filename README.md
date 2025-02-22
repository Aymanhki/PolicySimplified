# Privacy Simplified 🔒

Privacy Simplified is a Chrome extension that helps users understand privacy policies and terms of service quickly and effectively. Instead of reading through lengthy legal documents, this extension uses AI to extract and summarize key points that matter to you.

![Policy Simplified Logo](https://fonts.gstatic.com/s/i/materialiconsoutlined/policy/v1/24px.svg)

## Features

- 🔍 Automatic detection of privacy policy and terms of service content
- 📝 AI-powered summarization using Google's Gemini 1.5 Flash model
- 🎯 Provides concise and easy-to-understand summaries for better comprehension
- 📌 Bulleted key points for easy reading
- 💨 Fast and lightweight with a clean, modern interface

## How It Works

1. The extension scans the current webpage for privacy-related content
2. It extracts relevant text containing terms like "privacy" or "terms"
3. Using the Gemini AI model, it processes and summarizes the content
4. The summary is presented in an easy-to-read format with key points

## Installation

1. Clone this repository:
```bash
git clone https://github.com/Aymanhki/PolicySimplified.git
```

2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the cloned repository folder

## Usage

1. Navigate to any website's privacy policy or terms and conditions page
2. Click on the Privacy Simplified extension icon in your Chrome toolbar
3. Click the "Summarize" button
4. Review the simplified key points presented to you

## Technical Details

### Technology Stack
- JavaScript (64.5%)
- CSS (21.4%)
- HTML (14.1%)

### Components
- `popup/`: Contains the extension's user interface
  - `popup.html`: Main extension interface
  - `popup.js`: Core functionality and API integration
  - `popup.css`: Styling and visual elements
- `background.js`: Extension initialization and API key management
- `content.js`: Webpage content extraction logic

### API Integration
The extension uses Google's Gemini 1.5 Flash model for AI-powered summarization. You'll need to:
1. Get your own Gemini API key
2. Replace the placeholder API key in `background.js`

## Privacy Considerations

- The extension only activates on privacy policy and terms of service pages
- Text processing is limited to 1000 characters to prevent API overload
- All processing is done securely through Google's Gemini API
- No user data is stored or transmitted except for the text being summarized

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Project Link: [https://github.com/Aymanhki/PolicySimplified](https://github.com/Aymanhki/PolicySimplified)

---

Made with ❤️ for a more transparent web
