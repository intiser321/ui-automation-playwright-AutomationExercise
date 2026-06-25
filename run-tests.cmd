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

echo Node version:
node -v
echo npm version:
npm.cmd -v
echo.

echo Installing project dependencies from package-lock.json...
echo This also fixes stale or copied node_modules folders from another machine.
call npm.cmd ci
if errorlevel 1 (
  echo.
  echo Dependency installation failed.
  pause
  exit /b 1
)
echo.

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
powershell -NoProfile -ExecutionPolicy Bypass -Command "$env:PLAYWRIGHT_HTML_OPEN='never'; npm.cmd run test:headed -- --reporter=line,html 2>&1 | Tee-Object -FilePath 'last-test-run.log'; exit $LASTEXITCODE"
set TEST_EXIT_CODE=%ERRORLEVEL%

echo.
if "%TEST_EXIT_CODE%"=="0" (
  echo All tests passed.
) else (
  echo Some tests failed. Check the Playwright HTML report for details.
  echo Console output was saved to last-test-run.log.
)

echo.
choice /M "Open the Playwright HTML report now"
if errorlevel 2 goto done

call npm.cmd run report

:done
echo.
pause
exit /b %TEST_EXIT_CODE%
