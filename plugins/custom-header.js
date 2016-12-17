// Filter is a base class for all broccoli plugins
var Filter = require('broccoli-filter');

function CustomHeaderPlugin(inputNode) {
  Filter.call(this, inputNode);
}

CustomHeaderPlugin.prototype = Object.create(Filter.prototype);

function header(path) {
  return '/** \n * ' + path + ' \n * \n * author 🍔🍇🍈🍉🍊 ' + 
    '\n * generated at: ' + new Date().toISOString() + '\n */\n';
};

// given the contents of a file as a string, returns a new string
CustomHeaderPlugin.prototype.processString = function(fileContentsString, relativePath) {
  return header(relativePath) + fileContentsString;
}

// types (extensions) of files on which plugin will act on
CustomHeaderPlugin.prototype.extensions = ['js'];

// single type for the output file
CustomHeaderPlugin.prototype.targetExtensions = 'js';

module.exports = CustomHeaderPlugin;