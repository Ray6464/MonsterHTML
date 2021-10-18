// imported modules
const { readFileSync, writeFileSync, existsSync, lstatSync } = require('fs');
const { resolve, basename } = require('path'); 
const XmlReader = require('xml-reader');
const flags = require('ray-flags');
const { sucide } = require('sucide');
const json2html = require('node-json2html');

// software modules
const verifyValidPHTMLFile = require('./modules/file-verification.js'); 
const { writeHTMLFile, prettifyXML, convert2HTML } = require('./modules/fringe-modules.js');
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


/*
// Uncomment if needed later

// Our PHTML file in JSON
// convert to html without variable placement from monsterHTML.config
const html_unreferenced = convert2HTML(CONTENT.inJSON2HTMLFormat);
// variable names used in the provided phtml file
const variable_references = html_unreferenced.match(/\{\{( *)?project.[a-zA-Z]*( *)?\}\}/g);
// variable object
const variables = getRequiredVariables(variable_references);

console.log(prettifyXML(parsedPHTMLVariables(html_unreferenced, variables, project)));
writeHTMLFile(PHTML_File, prettifyXML(parsedPHTMLVariables(html_unreferenced, variables, project)));
*/


const SYNTAX_FILE = __dirname + "/elements.json";
const ELEMENTS_SYNTAX_FILE_CONTENT = readFileSync(SYNTAX_FILE, 'utf8');
const syntax = JSON.parse(ELEMENTS_SYNTAX_FILE_CONTENT);


function convert2J2HFormat(PHTMLJSONNode) {
  const template = {
    "<>": PHTMLJSONNode['name'],
    "value": PHTMLJSONNode['value'],
    ...PHTMLJSONNode['attributes']
  };

  template.html = getInnerHTML(PHTMLJSONNode.children);

  //console.log(template);
  return template;
}


function getInnerHTML(children) {
  let innerHTML = [];
  for (let child of children) {
    let elementNode = convert2J2HFormat(child || '');
    if (elementNode["<>"] !== '') innerHTML.push(elementNode);
    else {
      innerHTML = elementNode.value;
      break;
    }
    //innerHTML.push(convert2J2HFormat(child || ''));
  }
  return innerHTML;
}

