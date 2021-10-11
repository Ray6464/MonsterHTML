const { readFileSync, writeFileSync, existsSync, lstatSync } = require('fs');
const { resolve } = require('path'); 
const XmlReader = require('xml-reader');
const flags = require('ray-flags');
const { sucide } = require('sucide');

const PHTML_File =  flags.f;

wallOfFileVerification(PHTML_File);
const PHTML_File_Content = readFile(PHTML_File);
const JSON_Translation = parseJSONFromXML(PHTML_File_Content);

console.log(JSON_Translation); //remove


function parseJSONFromXML(xmlContent) {
	xmlContentLines = xmlContent.split('\n');
	const validXmlLines = xmlContentLines.filter(checkForInvalidXMLLines);
	const phtmlContentAsXml = validXmlLines.join('\n'); 
	const jsonContent = XmlReader.parseSync(phtmlContentAsXml);
	return { content: jsonContent }
}

function checkForInvalidXMLLines(line) {
  // Keeping every line
  // To remove a like use `if (line.includes(STRING)) return false;`
  if (line.includes("DOCTYPE")) return false;
  if (line.includes("meta")) return false;
  return true;
}

function readFile(fileURL) {
  return readFileSync(fileURL, 'utf8');
}

function wallOfFileVerification(fileName) {
	// Verifies that the input file is a valid .phtml file
	if (fileName == undefined) sucide("No valid .phtml file provided!");
	if (!existsSync(fileName)) sucide("The provided resource does not exist: " + fileName);
	if (!lstatSync(fileName).isFile()) sucide("Not a valid resource: " + fileName);
	if (!fileName.match('.phtml$')) sucide("Not a valid .phtml file: " + fileName);
}

