PowerShell Invoke-WebRequest -Uri 'https://raw.githubusercontent.com/mjfusa/Samples/master/electron/getstarted/setpath.ps1' -OutFile 'setpath.ps1'
PowerShell Invoke-WebRequest -Uri 'https://raw.githubusercontent.com/mjfusa/Samples/master/electron/getstarted/installtools.cmd' -OutFile 'installtools.cmd'
rem 1st run install choco
cmd.exe /c installtools.cmd
rem 2nd run install tools
cmd.exe /c installtools.cmd
