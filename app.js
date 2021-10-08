const { readFileSync, writeFileSync, existsSync, lstatSync } = require('fs');
const { resolve } = require('path'); 
const { parseSync } = require('xml-reader');
const flags = require('ray-flags');
const { sucide } = require('sucide');

wallOfFileVerification(flags.f);






function wallOfFileVerification(fileName) {
	if (fileName == undefined) sucide("No valid .phtml file provided!");
	if (!existsSync(fileName)) sucide("The provided resource does not exist: " + fileName);
	if (!lstatSync(fileName).isFile()) sucide("Not a valid resource: " + fileName);
	if (!fileName.match('.phtml$')) sucide("Not a valid .phtml file: " + fileName);
}

