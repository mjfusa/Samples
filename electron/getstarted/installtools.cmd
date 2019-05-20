set REPO="http://github.com/mjfusa/samples"
:checkPrivileges 
NET FILE 1>NUL 2>NUL
if '%errorlevel%' == '0' ( goto continue 
) else ( powershell "saps -filepath %0 -verb runas" >nul 2>&1)
exit /b
:continue
cd %~dp0
powershell Set-ExecutionPolicy bypass -force
powershell -f setpath.ps1
powershell Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
for %%a in (git.install, vscode, nodejs, vcbuildtools, procmon, 7zip.install, googlechrome) do choco install %%a -y
choco install visualstudio2019community --package-parameters "--allWorkloads --includeRecommended --includeOptional --passive --locale en-US" -y
:eds
md \EDS
cd \EDS
cmd.exe /c git clone %REPO%
cd samples\electron\getstarted\electron
cmd.exe /c npm install --global windows-build-tools
cmd.exe /c npm config set python C:\Python27\python.exe
cmd.exe /c npm install --save-dev electron
cmd.exe /c npm install electron-builder
cmd.exe /c .\node_modules\\.bin\electron-builder -w
:end
