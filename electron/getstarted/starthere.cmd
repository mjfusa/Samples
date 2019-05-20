cd %USERPROFILE%
PowerShell Invoke-WebRequest -Uri 'https://raw.githubusercontent.com/mjfusa/Samples/master/electron/getstarted/setpath.ps1' -OutFile 'setpath.ps1'
PowerShell Invoke-WebRequest -Uri 'https://raw.githubusercontent.com/mjfusa/Samples/master/electron/getstarted/installtools.cmd' -OutFile 'installtools.cmd'
cmd.exe /c installtools.cmd
