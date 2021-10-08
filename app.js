const { readFileSync, writeFileSync, existsSync, lstatSync } = require('fs');
const { resolve } = require('path'); 
const { parseSync } = require('xml-reader');
const flags = require('ray-flags');
const { sucide } = require('sucide');

console.log(flags);
// # Flags Info
// 1. Use the `--stylesheet` flag to attach a JSON file with variables.

if (flags.f == undefined) sucide("No valid .phtml file provided!");
if (!existsSync(flags.f)) sucide("The provided resource does not exist: " + flags.f);
if (!lstatSync(flags.f).isFile()) sucide("Not a valid resource: " + flags.f);
if (!flags.f.match('.phtml$')) sucide("Not a valid .phtml file: " + flags.f);





