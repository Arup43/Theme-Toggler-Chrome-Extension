# Theme Toggler Chrome Extension

A powerful Chrome extension that allows users to toggle between light and dark themes across all web pages. Built with React and Vite, this extension provides a seamless way to customize your browsing experience with a simple toggle switch.

## 🌟 Features

- **Global Theme Toggle**: Switch between light and dark modes with a single click
- **Cross-Tab Synchronization**: Theme changes apply to all open tabs automatically
- **Persistent Settings**: Your theme preference is saved and restored across browser sessions
- **Smart Media Handling**: Images and videos are properly inverted in dark mode
- **Modern UI**: Clean, intuitive popup interface built with React
- **Real-time Updates**: Theme changes are applied instantly without page refresh

## 🛠️ Technology Stack

- **Frontend**: React 19 with Hooks and Context API
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: CSS with modern design patterns
- **Chrome APIs**: Storage, Tabs, Scripting, and Content Scripts
- **Manifest Version**: 3 (Latest Chrome Extension standard)

## 📦 Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Google Chrome browser

### Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Theme-Toggler-Chrome-Extension
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build the extension**

   ```bash
   npm run build
   ```

4. **Load the extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked" and select the `dist` folder from the project
   - The extension should now appear in your extensions list

### Development Mode

For development with hot reloading:

```bash
npm run dev
```

## 🚀 Usage

1. **Access the Extension**: Click on the Theme Toggler icon in your Chrome toolbar
2. **Toggle Theme**: Use the switch in the popup to toggle between light and dark modes
3. **Automatic Application**: The theme will be applied to all open tabs and new tabs automatically
4. **Persistent Settings**: Your theme preference is saved and will be restored when you restart Chrome

## 📁 Project Structure

```
Theme-Toggler-Chrome-Extension/
├── public/                 # Static assets and Chrome extension files
│   ├── manifest.json      # Extension manifest (Manifest V3)
│   ├── background.js      # Service worker for cross-tab functionality
│   ├── content.js         # Content script for theme injection
│   └── icons/             # Extension icons (16px, 48px, 128px)
├── src/                   # React source code
│   ├── Popup.jsx          # Main popup component
│   ├── ThemeContext.jsx   # React context for theme management
│   ├── main.jsx           # React entry point
│   └── styles/            # CSS files
├── dist/                  # Built extension (generated)
├── package.json           # Dependencies and scripts
└── vite.config.js         # Vite configuration
```

## 🔧 How It Works

### Theme Application

The extension uses CSS filters to invert colors and apply dark mode:

- **Light Mode**: No filters applied (default appearance)
- **Dark Mode**: `invert(1) hue-rotate(180deg)` filter applied to the entire page
- **Media Fix**: Images and videos are re-inverted to maintain proper appearance

### Cross-Tab Synchronization

- **Background Script**: Monitors theme changes and applies them to all tabs
- **Content Script**: Injects theme styles into individual pages
- **Storage API**: Persists theme preference across browser sessions

### React Integration

- **Context API**: Manages theme state globally within the popup
- **Chrome Storage**: Syncs theme preference with Chrome's storage system
- **Real-time Updates**: Theme changes trigger immediate UI updates

## 🎨 Customization

### Adding New Themes

To add additional themes beyond light/dark:

1. Modify `ThemeContext.jsx` to support more theme options
2. Update the toggle logic in `Popup.jsx`
3. Add corresponding CSS filters in `content.js` and `background.js`

### Styling Changes

- Edit `src/popup.css` for popup appearance
- Modify `src/index.css` for global styles
- Update icon files in `public/` for branding changes

## 🐛 Troubleshooting

### Common Issues

1. **Extension not loading**

   - Ensure you're using Chrome (not Chromium)
   - Check that Developer mode is enabled
   - Verify the `dist` folder contains all necessary files

2. **Theme not applying to certain sites**

   - Some sites (chrome://, edge://, about://) cannot be modified
   - Check browser console for any error messages

3. **Build errors**
   - Clear `node_modules` and reinstall dependencies
   - Ensure Node.js version is 16 or higher

### Debug Mode

Enable debug logging by adding `console.log` statements in the content and background scripts.

**Happy browsing with your preferred theme!** 🌙☀️
