const {app, BrowserWindow} = require('electron');
const path = require('path');
require('./server/express-app.js');

let win;

function createWindow(){
  win = new BrowserWindow({
  width: 800,
  height:600,
  webPreferences: {
      nodeIntegration: true
    }
  })

// win.loadFile('index.html')
// win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)
win.loadURL('http://localhost:5000/index.html');

win.on('closed', ()=> win=null)
}

app.on('ready', createWindow);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});


app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
