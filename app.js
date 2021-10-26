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
const { parseJSONFromXML, parsePHTMLVariables } = require('./modules/syntax.js');

const PHTML_File =  flags.f;
//const config = readFileSync('monsterHTML.config', 'utf8');
//const project = JSON.parse(config);

verifyValidPHTMLFile(PHTML_File);
const PHTML_File_Content = readFileSync(PHTML_File, 'utf8');
/* CONTENT object has all our PHTML file info */
const CONTENT = parseJSONFromXML(PHTML_File_Content);
CONTENT.inJSON2HTMLFormat = convert2J2HFormat(CONTENT.json);

//console.log(CONTENT);

const syntax = require('./modules/elements.js');

console.log("Raw code: ", CONTENT.inJSON2HTMLFormat);
const COMPILED_CODE = compile(CONTENT.inJSON2HTMLFormat, syntax);
console.log("Compiled code:", JSON.stringify(COMPILED_CODE, null, 2));

//console.log(convert2HTML(CONTENT.inJSON2HTMLFormat));

//writeFileSync("ContentJSON.json", JSON.stringify(CONTENT.json));
//writeFileSync("ContentInJSON2HTMLFormat.json", JSON.stringify(CONTENT.inJSON2HTMLFormat, null, 2));

function compile(PHTMLObject, syntaxDataset) {
  const compiledHTML = swapPHTMLElementsWithHTML(PHTMLObject, {}, syntaxDataset);
  return compiledHTML;
}

function swapPHTMLElementsWithHTML(PHTMLElement, PARENT, syntaxArrangement){
  let elements = PHTMLElement;
  if (!Array.isArray(PHTMLElement)) elements = [elements];
  //elements = elements.map(element => parseHTML(element, syntaxArrangement));
  elements = elements.map(element => parseElement(element, PARENT, syntaxArrangement));
  return elements;
}

function parseInnerHTML(PHTMLElement, syntaxDataset){
  const element = {...PHTMLElement};
  const {html, ...dryElement} = element;
  let innerHTML = "";
  /* dealing with innerHTML through the following conditional*/
  if (typeof(element["html"]) == "string") innerHTML = parsePHTMLVariables(element["html"]);
  else innerHTML = swapPHTMLElementsWithHTML(PHTMLElement["html"], dryElement, syntaxDataset); //innerHTML
  element["html"] = innerHTML;

  return element; //here add a machanism for inheritance
}

function parseElement(PHTML_ELEMENT, INHERITANCE, SYNTAX){
  let parsedELEMENT = parseInnerHTML(PHTML_ELEMENT, SYNTAX);
  console.log({"parseElement": parsedELEMENT,
	  "parseElementInheritance": INHERITANCE}); 
  for (let element of Object.keys(SYNTAX)){/*
    if (PHTML_ELEMENT["<>"] == element) { // if element is a valid PHTML element
      parsedELEMENT = SYNTAX[element].html.map(ele => {
        ele. // here: parse elements arrording to elements.js syntax, preserve the syntax of the syntax file languagge
      });
    }*/
  }

  return parsedELEMENT;
}

