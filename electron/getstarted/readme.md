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

## Install and build Electron
npm install --save-dev electron  
Note: The NodeRT native Windows libraries will build using the VC build tools.  
Reference: https://github.com/electron/electron/blob/master/docs/tutorial/first-app.md  

## Install Electron-Builder to create Win32 app
npm install electron-builder 
Reference: https://www.electron.build/cli  

# Build the Electron app targeting Windows
.\node_modules\.bin\electron-builder -w




# Running the sample
## Open and build the AppServiceHost Sample in Visual Studio 2019
This solution contains three projects:  
1. **AppServiceHost** - UWP App Hosting Web Service
2. **Electron-Datastreamer** - Packaging Project that will contain App Service, Electron App and Manifest. The apps appearance and exposing of the app service is defined here.
3. **MyElectronApp** - WinForms placeholder app. This is necessary in order to work with the Packaging Project. We will overwrite it's contents with the Electron Win32 EXE.

## Run the sample
1. Press F5 to build and run the sample. The Build targets should be for x64, Debug. The StartUp project should be **Electron-Datastreamer**.
2. Connect the Excel Datastreamer:  
   a. Start Excel  
   b. Select File | Options | Add-ins | COM Add-ins  
   c. Check 'Microsoft Data Streamer for Excel'

![COM Addin Options](images/Excel&#32;Data&#32;Streamer.png)


## Debug the sample
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


