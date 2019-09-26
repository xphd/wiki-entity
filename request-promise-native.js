// var request = require('request');

var rp = require('request-promise-native');



let search = "The Shawshank Redemption"
let trimmedList = []

let apiHost = 'www.wikidata.org'
let apiPath = '/w/api.php'

let searchAction = 'wbsearchentities'
let getAction = 'wbgetentities'

let language = "en"

let limit = 7
let type = "item"



var combinedUri = 'https://' + apiHost + apiPath;
combinedUri = combinedUri + '?action=' + searchAction;
combinedUri = combinedUri + '&language=' + language;
combinedUri = combinedUri + '&search=' + encodeURIComponent(search);
combinedUri = combinedUri + '&type=' + type;
combinedUri = combinedUri + '&limit=' + limit;
combinedUri = combinedUri + '&format=json'; //we always want JSON back...


// var combinedUri = 'https://' + apiHost + apiath;
// combinedUri = combinedUri + '?action=' + getAction;
// combinedUri = combinedUri + '&languages=' + language;
// combinedUri = combinedUri + '&redirects=yes';
// combinedUri = combinedUri + '&props=labels&normalize=true';
// combinedUri = combinedUri + '&ids=' + trimmedList.join('|');
// combinedUri = combinedUri + '&format=json'; //we always want JSON back...

// var options = {
//     uri: 'https://api.github.com/user/repos',
//     qs: {
//         access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
//     },
//     headers: {
//         'User-Agent': 'Request-Promise'
//     },
//     json: true // Automatically parses the JSON string in the response
// };

var requestOptions = {
    uri: combinedUri,
    method: 'GET',
    json: true
};




//Send the response

f1();





async function f1() {
    console.log("request begin")
    await rp(requestOptions)
        .then(function (response) {
            console.log(response)
            // console.log('User has %d repos', repos.length);
        })
        .catch(function (err) {
            // API call failed...
        });
        console.log("request end")
}
