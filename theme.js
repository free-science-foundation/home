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
