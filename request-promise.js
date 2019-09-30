const rp = require('request-promise')

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
