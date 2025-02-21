let isLoading = false;

chrome.runtime.onMessage.addListener((message) => {
  const loader = document.querySelector('.loader');
  const linksDiv = document.getElementById('links');
  const summariesDiv = document.getElementById('summaries');

  if (message.type === "policyLinks") {
    linksDiv.innerHTML = '';
    message.data.forEach(link => {
      const linkElement = document.createElement('a');
      linkElement.className = 'policy-link';
      linkElement.href = link.url;
      linkElement.textContent = link.text;
      linkElement.target = '_blank';
      
      linkElement.addEventListener('click', async (e) => {
        e.preventDefault();
        isLoading = true;
        loader.hidden = false;
        
        chrome.runtime.sendMessage({
          type: "summarize",
          url: link.url,
          content: await fetchPageContent(link.url)
        });

        window.open(link.url, '_blank');
      });

      linksDiv.appendChild(linkElement);
    });
  }

  if (message.type === "summary") {
    isLoading = false;
    loader.hidden = true;
    
    const summaryElement = document.createElement('div');
    summaryElement.className = 'summary';
    summaryElement.innerHTML = `
      <h3>${new URL(message.url).hostname}</h3>
      <p>${message.summary}</p>
    `;
    
    summariesDiv.appendChild(summaryElement);
  }
});

async function fetchPageContent(url) {
  try {
    const response = await fetch(url);
    const text = await response.text();
    return text;
  } catch (error) {
    return null;
  }
}