@echo off
setlocal

set "ROOT=%~dp0"

start "Legal Aid Backend" powershell -NoExit -Command "Set-Location '%ROOT%backend'; & '%ROOT%.venv\Scripts\python.exe' app.py"
start "Legal Aid Frontend" powershell -NoExit -Command "Set-Location '%ROOT%frontend'; npm run dev"

echo.
echo Backend:  http://127.0.0.1:5000
echo Frontend: check the frontend window for the local port (usually 3000, 3001, or 3002)
echo.
echo Leave these windows open while you use the bot.
pause