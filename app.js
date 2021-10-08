const { readFileSync, writeFileSync, existsSync, lstatSync } = require('fs');
const { resolve } = require('path'); 
const { parseSync } = require('xml-reader');
const flags = require('ray-flags');
const { sucide } = require('sucide');

const PHTML_File =  flags.f;

wallOfFileVerification(PHTML_File);
const PHTML_File_Content = readFile(PHTML_File);
const JSON_Translation = parseJSONFromXML(PHTML_File_Content).content;

console.log(JSON_Translation); //remove


function parseJSONFromXML(xmlContent) {
	const jsonContent = parseSync(xmlContent);
	return { content: jsonContent }
}

function readFile(fileURL) {
  return readFileSync(fileURL, 'utf8');
}

function wallOfFileVerification(fileName) {
	if (fileName == undefined) sucide("No valid .phtml file provided!");
	if (!existsSync(fileName)) sucide("The provided resource does not exist: " + fileName);
	if (!lstatSync(fileName).isFile()) sucide("Not a valid resource: " + fileName);
	if (!fileName.match('.phtml$')) sucide("Not a valid .phtml file: " + fileName);
}

