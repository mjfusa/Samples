## Environment Setup
Install VS 2015
Install RS4 Windows SDK (17134)
Debugger for Chrome Extension in VS Code
https://github.com/Microsoft/vscode-recipes/tree/master/Electron


## Install Electron
npm install --save-dev electron
https://github.com/electron/electron/blob/master/docs/tutorial/first-app.md

## Install Electron-Builder to create Win32 app
https://www.electron.build/cli  
yarn add electron-builder --dev  

### Build Win32 App
.\node_modules\.bin\electron-builder -w

## For building nodert libraries
Create a file ```.npmrc``` in the root of the project:  
runtime = electron  
target = 4.1.1  
target_arch = x64  
disturl = https://atom.io/download/atom-shell  

## Build nodert libraries
https://www.npmjs.com/package/@nodert-win10/windows.applicationmodel.appservice  
npm install @nodert-win10/windows.applicationmodel.appservice

https://www.npmjs.com/package/@nodert-win10-rs4/windows.foundation.collections  
npm install @nodert-win10-rs4/windows.foundation.collections

## How to include renderer.js
index.html  
```html
<script>
      require('./renderer.js');
</script>
```




