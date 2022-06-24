#! /usr/bin/env node

const {execSync} = require("child_process")
const {existsSync, writeFileSync, mkdirSync} = require("fs")

const TypescriptPackageJson = `
{
    "name":"{entry}",
    "version":"1.0.0",
    "description":"",
    "main":"{entry}.ts",
    "dependencies":{},
    "devDependencies":{},
    "scripts":{"dev": "nodemon --ext ts,js,json,env --watch src/*  --exec npm run start", "start": "npx ts-node {EntryPath}"},
    "author":"",
    "license":"ISC"
}
`

const GitIngnore = `
gitnode.js

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Snowpack dependency directory (https://snowpack.dev/)
web_modules/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional stylelint cache
.stylelintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variable files
.env
.env.development.local
.env.test.local
.env.production.local
.env.local

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next
out

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
# Comment in the public line in if your project uses Gatsby and not Next.js
# https://nextjs.org/blog/next-9-1#public-directory-support
# public

# vuepress build output
.vuepress/dist

# vuepress v2.x temp and cache directory
.temp
.cache

# Docusaurus cache and generated files
.docusaurus

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# yarn v2
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*

# Sass
.sass-cache/
*.css.map
*.sass.map
*.scss.map
`

function CreateTypescript(entry){
    const EntryPath = `./src/${entry}.ts`

    console.log(`Creating typescript project!`)

    if (existsSync(EntryPath)) {
        console.log(`Echo ${EntryPath} already exist!`)
        return
    }

    mkdirSync(`./src`)

    writeFileSync("./package.json", TypescriptPackageJson.trim()
    .replaceAll("{entry}", entry)
    .replaceAll("{EntryPath}", EntryPath))


    execSync("npm install typescript @types/node ts-node nodemon lodash") 

    writeFileSync("./.gitignore", GitIngnore.trim())

    writeFileSync(EntryPath, "")

    execSync("git init")
    execSync("code ./src/")

    console.log(`Created typescript project! Entry: (${EntryPath})`)
}


CreateTypescript("index")
