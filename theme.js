// Theme Toggle Functionality
(function() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Check for saved theme preference or default to system preference
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }
  
  // Apply theme
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update checkbox state
    if (themeToggle) {
      themeToggle.checked = (theme === 'dark');
    }
  }
  
  // Initialize theme on page load
  const preferredTheme = getPreferredTheme();
  setTheme(preferredTheme);
  
  // Toggle theme on checkbox change
  if (themeToggle) {
    themeToggle.addEventListener('change', function() {
      const newTheme = this.checked ? 'dark' : 'light';
      setTheme(newTheme);
    });
  }
  
  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
})();

// Language Selector Functionality
(function() {
  const languageSelector = document.querySelector('.language-selector');
  const languageBtn = document.querySelector('.language-btn');
  const currentLangSpan = document.querySelector('.current-lang');
  const langOptions = document.querySelectorAll('.lang-option');
  
  if (!languageSelector || !languageBtn) return;
  
  // Language codes to display names
  const langCodes = {
    'en': 'EN',
    'es': 'ES',
    'pt': 'PT',
    'fr': 'FR',
    'de': 'DE',
    'it': 'IT',
    'nl': 'NL',
    'pl': 'PL',
    'ro': 'RO',
    'hu': 'HU',
    'cs': 'CS',
    'el': 'EL',
    'sv': 'SV',
    'da': 'DA',
    'no': 'NO',
    'fi': 'FI',
    'bg': 'BG',
    'hr': 'HR',
    'sr': 'SR',
    'sk': 'SK',
    'sl': 'SL',
    'lt': 'LT',
    'lv': 'LV',
    'et': 'ET',
    'sq': 'SQ',
    'mk': 'MK',
    'be': 'BE',
    'uk': 'UK',
    'ru': 'RU',
    'ca': 'CA',
    'gl': 'GL',
    'eu': 'EU',
    'ga': 'GA',
    'cy': 'CY',
    'is': 'IS',
    'mt': 'MT',
    'tr': 'TR',
    'ar': 'AR',
    'fa': 'FA',
    'ur': 'UR',
    'hi': 'HI',
    'bn': 'BN',
    'pa': 'PA',
    'gu': 'GU',
    'mr': 'MR',
    'te': 'TE',
    'ta': 'TA',
    'kn': 'KN',
    'ml': 'ML',
    'si': 'SI',
    'ne': 'NE',
    'zh': 'ZH',
    'ja': 'JA',
    'ko': 'KO',
    'id': 'ID',
    'ms': 'MS',
    'tl': 'TL',
    'ceb': 'CEB',
    'vi': 'VI',
    'th': 'TH',
    'lo': 'LO',
    'my': 'MY',
    'km': 'KM',
    'sw': 'SW',
    'ha': 'HA',
    'yo': 'YO',
    'ig': 'IG',
    'ff': 'FF',
    'am': 'AM',
    'ti': 'TI',
    'om': 'OM',
    'so': 'SO',
    'mg': 'MG',
    'sn': 'SN',
    'zu': 'ZU'
  };
  
  // Get saved language or default to English
  function getSavedLanguage() {
    return localStorage.getItem('language') || 'en';
  }
  
  // Set language
  function setLanguage(lang) {
    localStorage.setItem('language', lang);
    if (currentLangSpan) {
      currentLangSpan.textContent = langCodes[lang] || 'EN';
    }
    
    // Update active state
    langOptions.forEach(option => {
      option.classList.toggle('active', option.dataset.lang === lang);
    });
    
    // Set HTML lang attribute
    document.documentElement.lang = lang;
    
    // Close dropdown
    languageSelector.classList.remove('open');
    languageBtn.setAttribute('aria-expanded', 'false');
  }
  
  // Initialize language
  const savedLang = getSavedLanguage();
  setLanguage(savedLang);
  
  // Toggle dropdown
  languageBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    const isOpen = languageSelector.classList.toggle('open');
    this.setAttribute('aria-expanded', isOpen);
  });
  
  // Handle language selection
  langOptions.forEach(option => {
    option.addEventListener('click', function() {
      const lang = this.dataset.lang;
      setLanguage(lang);
    });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!languageSelector.contains(e.target)) {
      languageSelector.classList.remove('open');
      languageBtn.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Close dropdown on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      languageSelector.classList.remove('open');
      languageBtn.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Legal Disclaimer Modal Functionality
(function() {
  const disclaimerOverlay = document.getElementById('disclaimer-overlay');
  const disclaimerAgree = document.getElementById('disclaimer-agree');
  const disclaimerAccept = document.getElementById('disclaimer-accept');
  
  if (!disclaimerOverlay) return;
  
  const DISCLAIMER_KEY = 'fsf_disclaimer_accepted';
  const DISCLAIMER_VERSION = '1.0'; // Increment this to force re-acceptance
  
  // Check if disclaimer was already accepted
  function isDisclaimerAccepted() {
    const accepted = localStorage.getItem(DISCLAIMER_KEY);
    return accepted === DISCLAIMER_VERSION;
  }
  
  // Show disclaimer modal
  function showDisclaimer() {
    disclaimerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Focus on the modal for accessibility
    setTimeout(() => {
      if (disclaimerAgree) {
        disclaimerAgree.focus();
      }
    }, 100);
  }
  
  // Hide disclaimer modal
  function hideDisclaimer() {
    disclaimerOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }
  
  // Accept disclaimer
  function acceptDisclaimer() {
    localStorage.setItem(DISCLAIMER_KEY, DISCLAIMER_VERSION);
    hideDisclaimer();
  }
  
  // Enable/disable accept button based on checkbox
  if (disclaimerAgree && disclaimerAccept) {
    disclaimerAgree.addEventListener('change', function() {
      disclaimerAccept.disabled = !this.checked;
    });
    
    disclaimerAccept.addEventListener('click', function() {
      if (!disclaimerAgree.checked) return;
      acceptDisclaimer();
    });
  }
  
  // Prevent closing by clicking overlay (must explicitly accept or decline)
  disclaimerOverlay.addEventListener('click', function(e) {
    // Only allow closing if clicking directly on overlay, not modal content
    // But we don't want users to close without accepting, so do nothing
  });
  
  // Trap focus within modal
  disclaimerOverlay.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      const focusableElements = disclaimerOverlay.querySelectorAll(
        'input, button, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
    
    // Prevent Escape from closing (must explicitly accept or decline)
    if (e.key === 'Escape') {
      e.preventDefault();
    }
  });
  
  // Show disclaimer on page load if not accepted
  if (!isDisclaimerAccepted()) {
    // Small delay to ensure page is rendered
    setTimeout(showDisclaimer, 300);
  }
})();
