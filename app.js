// imported modules
const { readFileSync, writeFileSync, existsSync, lstatSync } = require('fs');
const { resolve, basename } = require('path'); 
const XmlReader = require('xml-reader');
const flags = require('ray-flags');
const { sucide } = require('sucide');
const json2html = require('node-json2html');

// software modules
const verifyValidPHTMLFile = require('./modules/file-verification.js'); 
const { writeHTMLFile, preetifyXML } = require('./modules/fringe-modules.js');
const { parseJSONFromXML/*, checkForInvalidXMLLines*/, parsedPHTMLVariables } = require('./modules/syntax.js');

const PHTML_File =  flags.f;
const config = readFileSync('monsterHTML.config', 'utf8');
const project = JSON.parse(config);
//console.log(project);

verifyValidPHTMLFile(PHTML_File);
const PHTML_File_Content = readFileSync(PHTML_File, 'utf8');
const parsedContent = parseJSONFromXML(PHTML_File_Content);
const JSON_Translation = parsedContent.json;
console.log(parsedContent.invalidLines);
const inJson2HTMLFormat = convert2J2HFormat(JSON_Translation);
const html_unreferenced = convert2HTML(inJson2HTMLFormat);
const variable_references = html_unreferenced.match(/\{\{( *)?project.[a-zA-Z]*( *)?\}\}/g);

const variables = getRequiredVariables(variable_references);

//console.log(variables);
//console.log(html_unreferenced);
//convert2J2HFormat(JSON_Translation);
//console.log(JSON_Translation); //remove
//console.log(convert2J2HFormat(JSON_Translation));
//console.log(convert2J2HFormat(JSON_Translation)['html'][1]['html'][0]);
//console.log(convert2J2HFormat(JSON_Translation)['html'][1]['html'][1]['html'][0]['html'][1]['html'][0]['html'][0]);
//console.log(convert2HTML(convert2J2HFormat(JSON_Translation))); // reads phtml perfectly
//console.log(JSON.stringify(convert2J2HFormat(JSON_Translation), null, 2));
//console.log(JSON.stringify(inJson2HTMLFormat, null, 2));

//console.log(variable_references);
//console.log(variables);
//console.log(html_unreferenced);

//console.log(parsePHTMLVariables(html_unreferenced));
//writeHTMLFile(PHTML_File, parsedPHTMLVariables(html_unreferenced, variables, project));
writeHTMLFile(PHTML_File, preetifyXML(parsedPHTMLVariables(html_unreferenced, variables, project)));

function getRequiredVariables(references) {
  const required_variables = references.map(reference => {
    return {
      namespace: reference.replace(/\{\{( *)?project./, '').replace(/( *)?\}\}/,''),
      reference: reference
    }
  });
  return required_variables;
}

function convert2HTML(json2HTMLObj) {
  const html = json2html.render({}, json2HTMLObj);
  return html;
}

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

