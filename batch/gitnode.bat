@echo off

if exist package.json (echo package.json already exist! & pause & exit)

set "var=%1"
if "%var%"=="" set /p "var=Enter entry name (index.ts): " || set "var=index"

echo {"compilerOptions": {"target": "esnext", "lib": ["dom"], "moduleResolution": "node"}}   >> tsconfig.json
echo {"name":"%var%","version":"1.0.0","description":"","main":"%var%.ts","dependencies":{},"devDependencies":{}, "scripts":{"dev": "nodemon --ext ts,js,json,env --watch *  --exec npm run start", "start": "npx ts-node %var%.ts"},,"author":"","license":"ISC"} >> package.json
type nul > %var%.ts

npm install typescript @types/node ts-node nodemon lodash


git init
curl https://raw.githubusercontent.com/github/gitignore/main/Node.gitignore -o .gitingore

code .
