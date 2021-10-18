
//console.log(variables);
//console.log(html_unreferenced);
//convert2J2HFormat(JSON_Translation);
//console.log(JSON_Translation); //remove
//console.log(convert2J2HFormat(JSON_Translation));
//console.log(convert2J2HFormat(JSON_Translation)['html'][1]['html'][0]);
//console.log(convert2J2HFormat(JSON_Translation)['html'][1]['html'][1]['html'][0]['html'][1]['html'][0]['html'][0]);
//console.log(convert2HTML(convert2J2HFormat(JSON_Translation))); // reads phtml perfectly
//console.log(JSON.stringify(convert2J2HFormat(JSON_Translation), null, 2));
//console.log(JSON.stringify(CONTENT.inJson2HTMLFormat, null, 2));

//console.log(variable_references);
//console.log(variables);
//console.log(html_unreferenced);

//console.log(parsePHTMLVariables(html_unreferenced));
//writeHTMLFile(PHTML_File, parsedPHTMLVariables(html_unreferenced, variables, project));

--------------------------

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



