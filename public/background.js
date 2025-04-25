// Apply theme to all active tabs
/* global chrome */
async function applyThemeToAllTabs(theme) {
    try {
        const tabs = await chrome.tabs.query({});

        for (const tab of tabs) {
            // Skip chrome:// and edge:// and about:// URLs which can't be modified
            if (tab.url.startsWith('chrome://') ||
                tab.url.startsWith('edge://') ||
                tab.url.startsWith('about://')) {
                continue;
            }

            try {
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    function: injectTheme,
                    args: [theme]
                });
            } catch (err) {
                console.error(`Error applying theme to tab ${tab.id}:`, err);
            }
        }
    } catch (err) {
        console.error('Error querying tabs:', err);
    }
}

// Function to be injected into tabs
function injectTheme(theme) {
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

// Listen for storage changes
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes.theme && namespace === 'sync') {
        applyThemeToAllTabs(changes.theme.newValue);
    }
});

// Apply theme when a new tab is created or updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        chrome.storage.sync.get(['theme'], (result) => {
            if (result.theme) {
                chrome.scripting.executeScript({
                    target: { tabId },
                    function: injectTheme,
                    args: [result.theme]
                }).catch(err => {
                    // Ignore errors for tabs we can't access
                    console.log(`Could not inject script into tab ${tabId}:`, err);
                });
            }
        });
    }
});
