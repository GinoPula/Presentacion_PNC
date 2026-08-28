@echo off
REM ejecutar_pipeline.bat -- envoltorio para el Programador de tareas de Windows.
REM Corre el pipeline completo (todas las regiones), hace commit+push si hubo
REM cambios, y guarda la salida en pipeline\logs\ para poder revisar despues
REM si una corrida fallo (ej. sin VPN, contrasena vencida, etc.).
REM
REM AJUSTA la primera linea (cd /d) a la ruta real de tu proyecto si es
REM distinta de D:\Presentacion_PNC.

cd /d "D:\Presentacion_PNC"

if not exist "pipeline\logs" mkdir "pipeline\logs"

for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd_HHmmss"') do set STAMP=%%i

python pipeline\generar_todas_regiones.py --repo "D:\Presentacion_PNC" --git-push > "pipeline\logs\pipeline_%STAMP%.log" 2>&1

REM Borra logs de mas de 30 dias para que la carpeta no crezca sin limite.
forfiles /p "pipeline\logs" /m *.log /d -30 /c "cmd /c del @path" 2>nul
