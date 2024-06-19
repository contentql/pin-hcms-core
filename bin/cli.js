#!/usr/bin/env node
const { execsync } = require('child_process')

const runCommand = command => {
  try {
    execsync(`${command}`, { stdio: 'inherit' })
    return true
  } catch (error) {
    console.error(`Failed to execute the command: ${command}`, error)
    return false
  }
}

const repoName = process.env.argv[2]
const gitCheckoutCommand = `git clone --depth 1 https://github.com/contentql/pin-hcms-core ${repoName}`
const installDepsCommand = `cd ${repoName} && pnpm i`

console.log(`Cloning the repository with name ${repoName}`)
const checkedOut = runCommand(gitCheckoutCommand)
if (!checkedOut) {
  process.exit(-1)
}

console.log(`Installing dependencies for ${repoName}`)
const installedDeps = runCommand(installDepsCommand)
if (!installedDeps) {
  process.exit(-1)
}

console.log(
  'Congratulations! You are ready. Follow the following commands to start',
)
console.log(`cd ${repoName}`)
console.log('pnpm run dev')
