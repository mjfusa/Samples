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
for %%a in (git.install, vscode, nodejs, python2, vcbuildtools, procmon, 7zip.install, googlechrome) do choco install %%a -y
choco install visualstudio2019community --package-parameters "--allWorkloads --includeRecommended --includeOptional --passive --locale en-US" -y
choco install windows-sdk-10.1 --version 10.1.17134.12 -y
:end
