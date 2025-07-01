# Accessibility Toolbar - Change Log

## Overview
This document describes all changes made to the Accessibility Toolbar project to make it functional and keep language data external.

## Problem Resolution

### 1. JavaScript Errors Fixed
- Language data is loaded asynchronously from `language.json`
- Fallback mechanism implemented for failed loading attempts

## File Changes

### `app/js/common.js`
**Main Changes**:

1. **Constructor Reworked**:
   ```javascript
   this.locale = { /* large language data */ };
   
   // After: External loading
   this.locale = null;
   this.currentLanguage = null;
   this.loadLanguageData();
   ```

2. **New Method `loadLanguageData()`**:
   - Loads language data from `./js/language.json`
   - Implements error handling with fallback
   - Calls all initialization methods after successful loading

3. **New Method `initializeEventListeners()`**:
   - All event listeners moved here from constructor
   - Called only after language data is loaded

4. **`checkLanguageBox()` Improved**:
   - Better access to `document.documentElement.lang`
   - More robust language detection

5. **CSS Embedding Corrected**:
   - `var allCss = '@@include("../css/all.min.css")';` only works during build
   - CSS is directly embedded from `all.min.css` (for browser compatibility)
   - changed the max-width to the min-width (mobilefirst)
   - the parent container is bigger on desktop taking 50svw viewport width and max width 

### `app/js/language.json`
**Change**: German translations (`de_DE`) 

### `app/index.html`
**Changes**:
- Script include changed from production to development: `src="minjs/common.min.js"`
- MicAccessTool initialization with configuration added

## Technical Improvements

### 1. Asynchronous Architecture
- Language data loaded asynchronously
- Proper error handling implemented
- Callback-based initialization

### 2. Better Error Handling
- Fallback to English when JSON loading fails
- Console logging for debugging
- Robust language detection

### 3. Modularity
- Event listeners separated from constructor
- Language data externalized
- Clearer method separation

## Build System

### `gulpfile.js`
- Switched from `node-sass` to `sass`
- Removed `outputStyle` from SASS configuration (compatibility)
- Downgraded Gulp plugins to compatible versions

### `package.json`
- Dependencies updated to older, compatible versions
- npm scripts added: `build`, `dev`, `serve`
- Using `sass` instead of `node-sass`

## Status

### ✅ Successfully Fixed
- [x] JavaScript runtime errors
- [x] Language data externalized  
- [x] Build system functional
- [x] German translations corrected
- [x] Asynchronous architecture implemented

### 🔄 Remaining Tasks
- [ ] Fully embed CSS in JS (Build-time vs. Runtime)
- [ ] Comprehensive browser testing
- [ ] Performance optimization
- [ ] Documentation expansion

## Technologies Used
- **Fetch API** for JSON loading
- **ES6 Classes** for object structure
- **Gulp 4.x** build system
- **SASS** for CSS preprocessing
- **LocalStorage** for settings persistence

## Developer Notes
1. Language data is located in `app/js/language.json`
2. CSS is currently embedded via `@@include` (build-time)
3. For local development: `npm run dev`
4. For production: `npm run build`

