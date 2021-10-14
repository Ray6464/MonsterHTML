// imported modules
const { readFileSync, writeFileSync, existsSync, lstatSync } = require('fs');
const { resolve, basename } = require('path'); 
//const XmlReader = require('xml-reader');
//const flags = require('ray-flags');
//const { sucide } = require('sucide');
//const json2html = require('node-json2html');

// software modules
//const verifyValidPHTMLFile = require('./modules/file-verification.js'); 

//const PHTML_File =  flags.f;
//const config = readFileSync('monsterHTML.config', 'utf8');
//const project = JSON.parse(config);
//console.log(project);

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
}

