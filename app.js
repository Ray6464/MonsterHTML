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

//console.log(CONTENT);

const SYNTAX_FILE = __dirname + "/elements.json";
const ELEMENTS_SYNTAX_FILE_CONTENT = readFileSync(SYNTAX_FILE, 'utf8');
const syntax = JSON.parse(ELEMENTS_SYNTAX_FILE_CONTENT);

console.log("Raw code: ", CONTENT.inJSON2HTMLFormat);
const COMPILED_CODE = compile(CONTENT.inJSON2HTMLFormat, syntax);
console.log("Compiled code:", JSON.stringify(COMPILED_CODE, null, 2));

//console.log(convert2HTML(CONTENT.inJSON2HTMLFormat));

//writeFileSync("ContentJSON.json", JSON.stringify(CONTENT.json));
//writeFileSync("ContentInJSON2HTMLFormat.json", JSON.stringify(CONTENT.inJSON2HTMLFormat, null, 2));

function compile(PHTMLObject, syntaxDataset) {
  const compiledHTML = swapPHTMLElementsWithHTML(PHTMLObject, syntaxDataset);
  return compiledHTML;
}

function swapPHTMLElementsWithHTML(PHTMLElement, syntaxArrangement){

  let elements = PHTMLElement;
  if (!Array.isArray(PHTMLElement)) elements = [elements];
  elements = elements.map(element => parseHTML(element, syntaxArrangement));
  return elements;
}

function parseHTML(PHTMLElement, syntaxDataset){
  const element = {...PHTMLElement};
  /* dealing with innerHTML through the following conditional*/
  if (typeof(element["html"]) == "string") element["html"] = parsePHTMLVariables(element["html"]);
  else element["html"] = swapPHTMLElementsWithHTML(PHTMLElement["html"], syntaxDataset); //innerHTML
  return element; //here
}


function parsePHTMLVariables(string){
  const variableReferenceRegex = /\{\{( )*?project.[a-zA-Z]+( )*\}\}/g;
  const variableReferences = string.match(variableReferenceRegex) || [];
  const variables = variableReferences.map(reference => {
    const variableData = {
      namespace: reference.replace(/\{\{( *)?project./, '').replace(/( *)?\}\}/,''),
      reference: reference
    }
      variableData.value = project[variableData.namespace];
      return variableData;
  });

  let parsedString = string;
  for (let variable of variables) {
    parsedString = parsedString.replace(variable.reference, variable.value);
  }
  return parsedString;
}

