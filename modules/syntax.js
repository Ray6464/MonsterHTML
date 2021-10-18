// imported modules
//const { readFileSync, writeFileSync, existsSync, lstatSync } = require('fs');
//const { resolve, basename } = require('path'); 
const XmlReader = require('xml-reader');
//const flags = require('ray-flags');
//const { sucide } = require('sucide');
//const json2html = require('node-json2html');

// software modules
//const verifyValidPHTMLFile = require('./modules/file-verification.js'); 
//const { writeHTMLFile } = require('./modules/fringe-modules.js');

//const PHTML_File =  flags.f;
//const config = readFileSync('monsterHTML.config', 'utf8');
//const project = JSON.parse(config);
//console.log(project);

function checkForInvalidXMLLines(line) {
  // Keeping every line
  // To remove a line just add it to the illegalLines array;
  const illegalLines = [
    "DOCTYPE",
    "meta"
  ]; 
  for (let keyword of illegalLines) {
    if (line.includes(keyword)) return false;
  }
  return true;
}


module.exports = {
  parseJSONFromXML: function(xmlContent) {
    xmlContentLines = xmlContent.split('\n');
    const validXmlLines = xmlContentLines.filter(checkForInvalidXMLLines);
    const invalidXmlLines = xmlContentLines.filter(x => !checkForInvalidXMLLines(x));
    const phtmlContentAsXml = validXmlLines.join('\n'); 
    const jsonContent = XmlReader.parseSync(phtmlContentAsXml);
    return { json: jsonContent, invalidLines: invalidXmlLines };
  },
  checkForInvalidXMLLines: checkForInvalidXMLLines,
  parsedPHTMLVariables: function(unreferencedHTML, variables_present, project_data) {
    let outputHTML = unreferencedHTML;
    for (let variable of variables_present) {
      outputHTML = outputHTML.replace(variable.reference, project_data[variable.namespace]);
    }
    return outputHTML;
  },
  getRequiredVariables: function(references) {
    const required_variables = references.map(reference => {
      return {
        namespace: reference.replace(/\{\{( *)?project./, '').replace(/( *)?\}\}/,''),
        reference: reference
      }
    });
    return required_variables;
  }
 }

