const {contextBridge} = require('electron');

const {
	documentExport,
	documentImport,
	askUserToDiscardChanges,
} = require('./lib/modals');

// Electron helpers exposed in the browser context as `window.electron`.
contextBridge.exposeInMainWorld('electron', {
	processPlatform: () => process.platform,
	documentExport,
	documentImport,
	askUserToDiscardChanges,
});
