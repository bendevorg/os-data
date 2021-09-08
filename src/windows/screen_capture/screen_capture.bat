// 2>nul||@goto :batch
/*
:batch
@echo off
setlocal

:: find csc.exe
set "csc="
for /r "%SystemRoot%\Microsoft.NET\Framework\" %%# in ("*csc.exe") do  set "csc=%%#"

if not exist "%csc%" (
   echo no .net framework installed
   exit /b 10
)

if not exist "%~dp0/%~n0.exe" (
   call %csc% /nologo /r:"Microsoft.VisualBasic.dll" /out:"%~dp0/%~n0.exe" "%~dp0/printScreen.cs" || (
      exit /b %errorlevel%
   )
)
%~dp0/%~n0.exe %*
endlocal & exit /b %errorlevel%

*/