const { existsSync, lstatSync } = require('fs');
const { sucide } = require('sucide');

module.exports = function verifyValidPHTMLFile(fileName) {
  // Verifies that the input file is a valid .phtml file
  if (fileName == undefined) sucide("No valid .phtml file provided!");
  if (!existsSync(fileName)) sucide("The provided resource does not exist: " + fileName);
  if (!lstatSync(fileName).isFile()) sucide("Not a valid resource: " + fileName);
  if (!fileName.match('.phtml$')) sucide("Not a valid .phtml file: " + fileName);
}


