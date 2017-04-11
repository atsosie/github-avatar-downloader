var request = require('request');
var githubInfo = require('./private-key-config');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = githubInfo.user;
var GITHUB_TOKEN = githubInfo.token;

function cb(err, response, body) {
  var bodyParsed = JSON.parse(body); // modified funtion to parse the body
  bodyParsed.forEach(function (obj) {
    console.log(obj.avatar_url);
  });
}

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

// call function with parameters to test
getRepoContributors("jquery", "jquery", cb);