var githubInfo = require('./private-key-config');
var request = require('request');
var fs = require('fs');

var GITHUB_USER = githubInfo.user;
var GITHUB_TOKEN = githubInfo.token;

var repoOwner = process.argv[2];
var repoName = process.argv[3];

if (process.argv.length !== 4) {
  console.log("Usage: node download_avatars.js <repo owner> <repo name>");
  process.exit(1);
}


function downloadImageByURL(imageURL, filePath) {
  request.get(imageURL)
         .on('error', function (err) {
           throw err;
         })
         .pipe(fs.createWriteStream(filePath));
}


function cb(err, response, body) {
  var bodyParsed = JSON.parse(body);
  bodyParsed.forEach(function (obj) {
    var filePath = 'avatars/' + obj.login + '.jpg';
    var imageURL = obj.avatar_url;
    downloadImageByURL(imageURL, filePath);
  });
}


console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };
  request.get(options, cb);
}

getRepoContributors(repoOwner, repoName, cb);