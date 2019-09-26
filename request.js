var request = require('request');

// //The term you're searching for. Needs to be set before sending the search out.
// 'search'                 : '',

//     //The language to search in.
//     'language'               : 'en',

//         //Whether to disable language fallback
//         'strictlanguage'         : true,

//             //Search for this type of entity. Can be 'item' or 'property'.
//             'type'                   : 'item',

//                 //Limit result count. Maximum is 50.
//                 'limit'                  : 7,

//                     //-----You probably don't want to change anything below this-----

//                     //The API action used to search entities
//                     'searchAction'                 : 'wbsearchentities',

//                         //The API action used to get details of entities
//                         'getAction'                    : 'wbgetentities',

//                             //The host of the API. You can change this, but you probably don't want to.
//                             'apiHost'                : 'www.wikidata.org',

//                                 //The path to the API script.
//                                 'apiPath'                : '/w/api.php'

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


// var combinedUri = 'https://' + apiHost + apiPath;
// combinedUri = combinedUri + '?action=' + getAction;
// combinedUri = combinedUri + '&languages=' + language;
// combinedUri = combinedUri + '&redirects=yes';
// combinedUri = combinedUri + '&props=labels&normalize=true';
// combinedUri = combinedUri + '&ids=' + trimmedList.join('|');
// combinedUri = combinedUri + '&format=json'; //we always want JSON back...

var requestOptions = {
    uri: combinedUri,
    method: 'GET'
};

//Send the response
console.log("request begin")
request(requestOptions, function (error, response, wikidataResponse) {

    //Make sure we have no errors.
    if (error){
        console.log(error)
    }
        // return cb({}, error);

    if (response === undefined) {
        // return cb({}, 'Undefined WikiData response');
    } else if (response.statusCode === 200) {
        var result = (typeof wikidataResponse === 'string') ? JSON.parse(wikidataResponse) : wikidataResponse;

        //Make sure we got the results list back.
        if (!result.hasOwnProperty('search')){}
            // return cb({}, wikidataResponse.errors);


        //Now lets trim some uneeded data.
        var trimmedResults = [];
        for (var i = 0, len = result.search.length; i < len; i++) {
            var searchResult = result.search[i];
            var trimmed = {};

            if (searchResult.hasOwnProperty('url'))
                trimmed.url = searchResult.url;
            if (searchResult.hasOwnProperty('id'))
                trimmed.id = searchResult.id;
            if (searchResult.hasOwnProperty('label'))
                trimmed.label = searchResult.label;
            if (searchResult.hasOwnProperty('description'))
                trimmed.description = searchResult.description;


            if (("url" in trimmed) && ("id" in trimmed) && ("label" in trimmed))
                trimmedResults.push(trimmed);

            console.log(trimmed)

        }

        // return cb({ 'results': trimmedResults }, wikidataResponse.errors);
    } else{}
        // return cb({}, 'Request error: ' + (typeof response === 'string' ? response : JSON.stringify(response)));


});

console.log("request end")