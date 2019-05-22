set REPO="http://github.com/mjfusa/samples"
:checkPrivileges 
NET FILE 1>NUL 2>NUL
if '%errorlevel%' == '0' ( goto continue 
) else ( powershell "saps -filepath %0 -verb runas" >nul 2>&1)
exit /b
:continue
cd %~dp0
powershell Set-ExecutionPolicy bypass -force
powershell Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
set "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin;c:\program files\nodejs;C:\Program Files\Git\cmd"
for %%a in (git.install, nodejs, python2) do choco install %%a -y
choco install windows-sdk-10.1 --version 10.1.17134.12 -y
copy "c:\Program Files (x86)\Microsoft Visual Studio\2017\BuildTools\VC\Tools\MSVC\14.16.27023\lib\x86\store\references\platform.winmd" "C:\Windows\Microsoft.NET\Framework64\v4.0.30319\"   
copy "C:\Program Files (x86)\Windows Kits\10\UnionMetadata\10.0.17134.0\windows.winmd" "C:\Program Files (x86)\Windows Kits\10\UnionMetadata"


rem for %%a in (git.install, vscode, nodejs, vcbuildtools, procmon, 7zip.install, googlechrome) do choco install %%a -y
rem choco install visualstudio2019community --package-parameters "--add Microsoft.VisualStudio.Workload.ManagedDesktop --add Microsoft.VisualStudio.Workload.NativeDesktop --add Microsoft.VisualStudio.Workload.NetCoreTools --add Microsoft.VisualStudio.Workload.Universal  --includeRecommended --includeOptional --passive --locale en-US" -y
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
