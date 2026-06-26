@echo off
cd /d "%~dp0" || (
  echo Unable to open the project folder.
  echo Please extract the project to a normal folder, then run this file again.
  echo.
  pause
  exit /b 1
)

call "%~dp0run-tests.cmd"
exit /b %ERRORLEVEL%
