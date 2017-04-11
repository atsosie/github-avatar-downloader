var request = require('request');
var githubInfo = require('./private-key-config');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = githubInfo.user;
var GITHUB_TOKEN = githubInfo.token;

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
  // ...
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});