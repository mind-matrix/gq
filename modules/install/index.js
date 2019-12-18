#! /usr/bin/env node
const program = require('commander');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

program
.arguments('<module>')
.action((module) => {
    fetch(`https://raw.githubusercontent.com/mind-matrix/gqmodules/master/${module}/manifest.json`)
    .then((res) => res.json())
    .then((json) => {
        if(!fs.existsSync(path.join(__dirname, `../${module}`)))
            fs.mkdirSync(path.join(__dirname, `../${module}`));
        fs.writeFileSync(path.join(__dirname, `../${module}/manifest.json`), JSON.stringify(json));
        json.files.forEach((file) => {
            fetch(`https://raw.githubusercontent.com/mind-matrix/gqmodules/master/${module}/${file}`)
            .then((res) => res.text())
            .then((content) => {
                if(!fs.existsSync(path.join(__dirname, `../${module}/${path.dirname(file)}`)))
                    fs.mkdirSync(path.join(__dirname, `../${module}/${path.dirname(file)}`), {recursive: true});
                fs.writeFileSync(path.join(__dirname, `../${module}/${file}`), content);
            });
        });
        console.log(json);
    });
})
.parse(process.argv);