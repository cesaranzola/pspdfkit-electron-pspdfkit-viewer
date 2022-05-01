const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const pspdfkitMain = require('./lib/pspdfkit-main');

const path = require('path');
const url = require('url');

let mainWindow = null;
let windowInCreation = false;

function createWindow() {
	windowInCreation = true;
	pspdfkitMain.initialize();

	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		titleBarStyle: 'hidden',
		webPreferences: {
			contextIsolation: true,
			nodeIntegration: false,
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	windowInCreation = false;

	// And load the `index.html` of the app.
	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, 'index.html'),
			protocol: 'file:',
			slashes: true,
		})
	);

	// Open the DevTools.
	// mainWindow.webContents.openDevTools();

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		mainWindow = null;
		pspdfkitMain.cleanup();
	});
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	if (mainWindow === null && windowInCreation === false) {
		createWindow();
	}
});
