/* global chrome */
// Apply theme based on storage settings
function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
    // Fix media like images and videos
    const media = document.querySelectorAll('img, picture, video');
    media.forEach(mediaItem => {
      mediaItem.style.filter = 'invert(1) hue-rotate(180deg)';
    });
  } else {
    document.documentElement.style.filter = '';
    const media = document.querySelectorAll('img, picture, video');
    media.forEach(mediaItem => {
      mediaItem.style.filter = '';
    });
  }
}

// Initial theme application
chrome.storage.sync.get(['theme'], function (result) {
  if (result.theme) {
    applyTheme(result.theme);
  }
});

// Listen for theme changes
chrome.storage.onChanged.addListener(function (changes) {
  if (changes.theme) {
    applyTheme(changes.theme.newValue);
  }
});