/*jshint -W079 */
var Promise = require('bluebird'),
    _ = require('lodash'),
    fs = require('fs'),
    readFileAsync = Promise.promisify(fs.readFile, fs);

var analyse = require('./analyse');

/**
 * Promise of a report on a single file
 *
 * @param {String} 'fileRef'    The file's path
 * @param {Object} 'fileStats'  The informations about current file
 * @returns {Promise}           The promise shall always be fulfilled
 */

module.exports = function report (fileRef) {

  return readFileAsync(fileRef, 'utf8')

    .then(analyse(fileRef))

    .then(function(result){

      return {
        success : true,
        result : result
      };

    })

    .caught(function(err){

      return {
        success : false,
        error : err
      };

    });

};
