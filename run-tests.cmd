@echo off
setlocal

cd /d "%~dp0"

echo.
echo ===============================================
echo  Automation Exercise - Playwright Test Runner
echo ===============================================
echo.

where npm.cmd >nul 2>&1
if errorlevel 1 (
  echo npm was not found. Please install Node.js first:
  echo https://nodejs.org/
  echo.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Installing project dependencies...
  call npm.cmd ci
  if errorlevel 1 (
    echo.
    echo Dependency installation failed.
    pause
    exit /b 1
  )
  echo.
)

echo Ensuring Playwright browsers are installed...
call npm.cmd run browsers:install
if errorlevel 1 (
  echo.
  echo Browser installation failed.
  pause
  exit /b 1
)

echo.
echo Running the full cross-browser suite in headed mode...
call npm.cmd run test:headed
set TEST_EXIT_CODE=%ERRORLEVEL%

echo.
if "%TEST_EXIT_CODE%"=="0" (
  echo All tests passed.
) else (
  echo Some tests failed. Check the Playwright HTML report for details.
)

echo.
choice /M "Open the Playwright HTML report now"
if errorlevel 2 goto done

call npm.cmd run report

:done
echo.
pause
exit /b %TEST_EXIT_CODE%
