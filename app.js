const { readFileSync, writeFileSync, existsSync, lstatSync } = require('fs');
const { resolve } = require('path'); 
const XmlReader = require('xml-reader');
const flags = require('ray-flags');
const { sucide } = require('sucide');
const json2html = require('node-json2html');

const PHTML_File =  flags.f;
const config = readFileSync('monsterHTML.config', 'utf8');
const project = JSON.parse(config);
console.log(project);

wallOfFileVerification(PHTML_File);
const PHTML_File_Content = readFile(PHTML_File);
const JSON_Translation = parseJSONFromXML(PHTML_File_Content);
const inJson2HTMLFormat = convert2J2HFormat(JSON_Translation);



//convert2J2HFormat(JSON_Translation);
//console.log(JSON_Translation); //remove
//console.log(convert2J2HFormat(JSON_Translation));
//console.log(convert2J2HFormat(JSON_Translation)['html'][1]['html'][0]);
//console.log(convert2J2HFormat(JSON_Translation)['html'][1]['html'][1]['html'][0]['html'][1]['html'][0]['html'][0]);
//console.log(convert2HTML(convert2J2HFormat(JSON_Translation))); // reads phtml perfectly
//console.log(JSON.stringify(convert2J2HFormat(JSON_Translation), null, 2));
//console.log(JSON.stringify(inJson2HTMLFormat, null, 2));

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


function parseJSONFromXML(xmlContent) {
	xmlContentLines = xmlContent.split('\n');
	const validXmlLines = xmlContentLines.filter(checkForInvalidXMLLines);
	const phtmlContentAsXml = validXmlLines.join('\n'); 
	const jsonContent = XmlReader.parseSync(phtmlContentAsXml);
	return jsonContent;
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

