#! /usr/bin/env node
const program = require('commander');
const fs = require('fs');

const modules = fs.readdirSync('./modules');
modules.forEach((mod) => {
    var manifest = JSON.parse(fs.readFileSync(`./modules/${mod}/manifest.json`, { encoding: 'utf-8' }));
    program.command(manifest.command, manifest.description, { executableFile: `./modules/${mod}/index.js` }).alias(manifest.alias);
});
program.parse(process.argv);