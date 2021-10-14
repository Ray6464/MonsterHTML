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
}

