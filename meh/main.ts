import { app, BrowserWindow } from 'electron'
//import * as path from 'path'
const Bundler = require("parcel-bundler");


//createDevWindow();

let mainWindow;
let parcelStarted = false

function createParcelWindow() {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  mainWindow.loadURL("http://localhost:1234");

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}


const INDEX_FILE = "./src/client/index.html";

const options = {
  cache: false
};

function* createDevWindow() {
  const bundler = new Bundler(INDEX_FILE, options);
  yield bundler.serve()
  yield createParcelWindow()
  yield parcelStarted = true
}


app.on("ready", createDevWindow);


app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit();
  }
});


app.on("activate", function() {
  if (parcelStarted = false) {
    createDevWindow();
  }
});


