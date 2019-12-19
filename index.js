#! /usr/bin/env node
const program = require('commander');
const fs = require('fs');
const path = require('path');

const modules = fs.readdirSync(path.join(__dirname, './modules'));
modules.forEach((mod) => {
    var manifest = JSON.parse(fs.readFileSync(path.join(__dirname,`./modules/${mod}/manifest.json`), { encoding: 'utf-8' }));
    program.command(manifest.command, manifest.description, { executableFile: path.join(__dirname, `./modules/${mod}/index.js`) }).alias(manifest.alias);
});
program.parse(process.argv);