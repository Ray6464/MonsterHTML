// imported modules
const { readFileSync, writeFileSync, existsSync, lstatSync } = require('fs');
const { resolve, basename } = require('path'); 
//const XmlReader = require('xml-reader');
//const flags = require('ray-flags');
//const { sucide } = require('sucide');
const json2html = require('node-json2html');

// software modules
//const verifyValidPHTMLFile = require('./modules/file-verification.js'); 

//const PHTML_File =  flags.f;
//const config = readFileSync('monsterHTML.config', 'utf8');
//const project = JSON.parse(config);
//console.log(project);

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

module.exports = {
  writeHTMLFile: function(PHTMLFileName, HTML) {
    const outFileName = `${basename(PHTMLFileName, '.phtml')}.html`;
    writeFileSync(outFileName, HTML);
  },
  prettifyXML: function(XML) {
    let indentation = -1;
    let output = ["<!--  preetifyXML package module applied  -->"];
    for (let line of XML.split('>')){
      if (!(/\w/.test(line))) continue;
      else if (/\<[a-zA-Z]+/.test(line)) indentation++;
      else if (/\<\/[a-zA-Z]+/.test(line)) {
	prepend = '\n';
        indentation--;
      }
      output.push(`${'  '.repeat(indentation)}${line}>`);
    }
    return output.join('\n');
  },
  convert2HTML: function(json2HTMLObj) {
    const html = json2html.render({}, json2HTMLObj);
    return html;
  },
  convert2J2HFormat: convert2J2HFormat,
  getInnerHTML: getInnerHTML 
}

