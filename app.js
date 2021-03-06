// imported modules
const { readFileSync, writeFileSync, existsSync, lstatSync } = require('fs');
const { resolve, basename } = require('path'); 
const XmlReader = require('xml-reader');
const flags = require('ray-flags');
const { sucide } = require('sucide');
const json2html = require('node-json2html');

// software modules
const verifyValidPHTMLFile = require('./modules/file-verification.js'); 
const { writeHTMLFile, prettifyXML, convert2HTML, convert2J2HFormat, getInnerHTML } = require('./modules/fringe-modules.js');
const { parseJSONFromXML/*, checkForInvalidXMLLines*/, parsedPHTMLVariables, getRequiredVariables } = require('./modules/syntax.js');

const PHTML_File =  flags.f;
const config = readFileSync('monsterHTML.config', 'utf8');
const project = JSON.parse(config);

verifyValidPHTMLFile(PHTML_File);
const PHTML_File_Content = readFileSync(PHTML_File, 'utf8');
/* CONTENT object has all our PHTML file info */
const CONTENT = parseJSONFromXML(PHTML_File_Content);
CONTENT.inJSON2HTMLFormat = convert2J2HFormat(CONTENT.json);

console.log(CONTENT);

//writeFileSync("ContentJSON.json", JSON.stringify(CONTENT.json));
writeFileSync("ContentInJSON2HTMLFormat.json", JSON.stringify(CONTENT.inJSON2HTMLFormat, null, 2));

const SYNTAX_FILE = __dirname + "/elements.json";
const ELEMENTS_SYNTAX_FILE_CONTENT = readFileSync(SYNTAX_FILE, 'utf8');
const syntax = JSON.parse(ELEMENTS_SYNTAX_FILE_CONTENT);


