const POLICY_KEYWORDS = [
    'privacy policy', 'terms of service', 
    'terms and conditions', 'legal', 'cookie policy'
  ];
  
  function findPolicyLinks() {
    const links = Array.from(document.querySelectorAll('a'));
    const matches = [];
  
    links.forEach(link => {
      const href = link.href.toLowerCase();
      const text = link.textContent.toLowerCase();
      
      const isPolicyLink = POLICY_KEYWORDS.some(keyword => 
        href.includes(keyword) || text.includes(keyword)
      );
  
      if (isPolicyLink) {
        matches.push({
          text: link.textContent.trim(),
          url: link.href
        });
      }
    });
  
    chrome.runtime.sendMessage({
      type: "policyLinks",
      data: matches
    });
  }
  
  // Initial scan
  findPolicyLinks();
  
  // Optional: Rescan when page changes
  const observer = new MutationObserver(funpolicySimplified);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });