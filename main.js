const { app, BrowserWindow } = require('electron');
let win;
const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "#ffffff",
  });
  win.loadURL(`http://localhost:5174/`);
//   win.loadURL(`file://${__dirname}/dist/index.html`);
  //   win.loadFile('index.html')
  win.on("closed", () => {
    win = null;
  });
};

app.on("ready", createWindow);

// app.whenReady().then(() => {
//   createWindow()

//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createWindow()
//     }
//   })
// })

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
