
import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { isDev } from './isDev';
import {tester} from './tester'
let mainWindow;


const args = process.argv.slice(1);
let dev = args.some(arg => arg === '--dev');

console.log(isDev)

function createWindow() {
  tester()
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });


  // if (dev) {mainWindow.loadURL("http://localhost:1234")} 
  // else {mainWindow.loadURL("file:///" + path.join(__dirname, "..", "client/index.html"))}
  
  isDev ? mainWindow.loadURL("http://localhost:1234") : mainWindow.loadURL("file:///" + path.join(__dirname, "..", "app/index.html"))


  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}


app.on("ready", createWindow);


app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit();
  }
});


app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});


