@ECHO OFF

REM Define Variables:
set OLD_VERSION=%1
set NEW_VERSION=%2

set LOCAL_PATH=C:\Users\Philipp\Scala\ebox-elexis\
set REMOTE_PATH=/srv/www/ebox-elexis/dev/
set PACKAGE_NAME=ebox-elexis-%NEW_VERSION%.zip

set DISTRIBUTION=%localPath%target\universal\%PACKAGE_NAME%

set SERVER=Pharmed

ECHO Deploying version %NEW_VERSION% (upgrading from %OLD_VERSION%)...

ECHO create bundle..
cd %LOCAL_PATH%frontend
CALL gulp bundle
cd ..

REM copy files from frontend
ECHO copying files...
robocopy frontend\jspm_packages public\jspm_packages /MIR  /NFL /NDL /NJH /NJS /nc /ns
robocopy frontend\dist public\dist /MIR  /NFL /NDL /NJH /NJS /nc /ns
robocopy frontend\styles public\styles /MIR  /NFL /NDL /NJH /NJS /nc /ns

XCOPY frontend\config.js public\config.js* /Y /D

ECHO unbundle..
cd %LOCAL_PATH%frontend
CALL gulp unbundle
cd ..

REM Create package
ECHO creating dist-package...
CALL activator.bat dist
