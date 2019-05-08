# Electron App - Excel Data Streamer Sample

Your app can send and receive data to and from the [Excel Data Streamer](https://support.office.com/en-us/article/What-is-Data-Streamer-1d52ffce-261c-4d7b-8017-89e8ee2b806f). The Excel Data Streamer does this using the [App Service](https://docs.microsoft.com/en-us/windows/uwp/launch-resume/app-services) feature of Windows 10. This sample will show how you can do this with your Electron app.

This sample demonstrates how you can connect your Electron app with the Excel Datastreamer.

The sample included the following:
* An Electron app
* THe Electron app will call native WinRT APIs via JavaScript using the NodeRT libraries.
* The app converted to a Win32 app.
* The Win32 app packaged in an MSIX file for distribution.
* THe MSIX package includes:
1. The Win32 Electron App
2. A separate UWP App Service process that works with the Electron App.
3. The AppxManifest.xml configured for the App Service / Win32 app connection.

You will need the latest version of Office 365 installed to use the Datastreamer supported by this sample. Version 1904 or greater.

# Setup
## Environment 
* Windows 10 17134 or greater
* Chocolatey package installer
* node.js npm - Node Package Manager
* Python 2.7.16
* Visual Studio 2015 Build Tools
* Visual Studio 2019 Community Edition
* Electron framework cli
* Electron Builder cli
* NodeRT libraries

### Install Chocolatey
* https://chocolatey.org/install

### Install node.js and npm, python 2.7, Visual Studio tools
* choco install vscode
* choco install nodejs  
* choco install python2  
* choco install vcbuildtools  
* choco install visualstudio2019community  
* Start Visual Studio Installer and install the workloads:  
1. .NET Desktop Development  
2. Desktop Development with C++. 
3. Universal Windows Platform Development 
4. Install Windows 17134 SDK 
* npm install --global windows-build-tools
* Copy platform.winmd:  
  ```copy "c:\Program Files (x86)\Microsoft Visual Studio\2017\BuildTools\VC\Tools\MSVC\14.16.27023\lib\x86\store\references\platform.winmd" "C:\Windows\Microsoft.NET\Framework64\v4.0.30319\"```   
* Copy Windows.winmd:  
  ```copy "C:\Program Files (x86)\Windows Kits\10\UnionMetadata\10.0.17763.0\windows.winmd" "C:\Program Files (x86)\Windows Kits\10\UnionMetadata"```

## Install Electron and build the NodeRT libaries
npm install --save-dev electron  
Note: The NodeRT native Windows libraries will build using the VC build tools.  
Reference: https://github.com/electron/electron/blob/master/docs/tutorial/first-app.md  

## Install Electron-Builder to create Win32 app
npm install electron-builder 
Reference: https://www.electron.build/cli  

# Build the Electron app targeting Windows
cd samples\electron\getstarted  
.\node_modules\\.bin\electron-builder -w

# Sample Components 
## Open and build the AppServiceHost.sln solution in Visual Studio 2019
This solution contains three projects:  
1. **AppServiceHost** - UWP App Service implemented here.
2. **MyElectronApp** - WinForms placeholder app. This is necessary in order to work with the Packaging Project. We will overwrite it's contents with the Electron Win32 EXE.
3. **Packaging Project-Debug** - Packaging Project that contains App Service, Electron App and Manifest. The apps appearance and exposing of the app service is defined here. This runs Electron in debug mode and also allows for the debugging of the app service. 
4. **Packaging Project-Release** - Packaging Project that contains App Service, Electron App and Manifest. The apps appearance and exposing of the app service is defined here. This runs the Win32 version of the Electron app. 

# Run the sample (Debug)
1. Press F5 to build and run the sample. The Build targets should be for x86, Debug. The StartUp project should be **Packaging Project-Debug**. This will deploy the app and register the App Service.
2. Connect to the Excel Data Streamer:
   a. Click on the Data Steamer Tab  
   b. Click on **Connect to Device**  
   c. Click on **Packaging Project-Debug**  
   d. Click on **Start Data**  
   e. Switch focus to Electron App  
   f. Click on **Connect to App Service**  
   ```Note: In text box, you should see: OpenAsync: 0 ```  
   0 indicates no error 
   g. Click on **Setup Data Connection**  
   ```Note: In text box, you should see: sendMessageAsync: 0 ```  
   h. Click on **Write Data**
   i. Switch focus back to Excel
   ```Note: You should see data sent to Excel ```  
3. You can use the debug tools in Electron to debug your JavaScript and step through the calls to the App Service.

## Build the Win32 version of the Electron app  
.\node_modules\.bin\electron-builder -w

## Run the sample (Release)
Note that this will package the app built with Electron Builder.
1. Press F5 to build and run the sample. The Build targets should be for x86, Release. The StartUp project should be **Packaging Project-Release**. This will deploy the app and register the App Service.
2. Connect to the Excel Data Streamer:
   a. Click on the Data Steamer Tab  
   b. Click on **Connect to Device**  
   c. Click on **Packaging Project-Release**  
   d. Click on **Start Data**  
   e. Switch focus to Electron App  
   f. Click on **Connect to App Service**  
   ```Note: In text box, you should see: OpenAsync: 0 ```  
   0 indicates no error 
   g. Click on **Setup Data Connection**  
   ```Note: In text box, you should see: sendMessageAsync: 0 ```  
   h. Click on **Write Data**  
   i. Switch focus back to Excel
   ```Note: You should see data sent to Excel ```  



<!-- Include Dales VS debugging Project -->



<!-- ### Built as part of Install
## For building nodert libraries - in repo
Create a file ```.npmrc``` in the root of the project:  
runtime = electron  
target = 4.1.1  
target_arch = x64  
disturl = https://atom.io/download/atom-shell   -->

<!-- ## Build nodert libraries
https://www.npmjs.com/package/@nodert-win10/windows.applicationmodel.appservice  
npm install @nodert-win10-rs4/windows.applicationmodel.appservice

https://www.npmjs.com/package/@nodert-win10-rs4/windows.foundation.collections  
npm install @nodert-win10-rs4/windows.foundation.collections
 -->


