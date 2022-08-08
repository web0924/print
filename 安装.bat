@ECHO OFF

REM Register RFID Reader service
REM Copyright 2020 Chiyang Technology
REM Must run as Administrator(须以管理员身份运行)

REM chcp 936 
cd /d %~dp0
rdsvr.exe -service 
net start "RFID Reader Service"

pause
