:: Created by hns , please don't edit manually.
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe" "%~dp0\..\hns-cli\bin\hns" %*
) ELSE (
  node "%~dp0\..\hns-cli\bin\hns" %*
)
