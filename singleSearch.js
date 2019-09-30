const rp = require("request-promise");

let apiHost = "www.wikidata.org";
let apiPath = "/w/api.php";

let searchAction = "wbsearchentities";
let language = "en";
let limit = 7;
let type = "item";
let combinedUri = "https://" + apiHost + apiPath;
combinedUri = combinedUri + "?action=" + searchAction;
combinedUri = combinedUri + "&language=" + language;
combinedUri = combinedUri + "&type=" + type;
combinedUri = combinedUri + "&limit=" + limit;
combinedUri = combinedUri + "&format=json"; //we always want JSON back...

function singleSearch(item) {
  combinedUri = combinedUri + "&search=" + encodeURIComponent(item);

  let requestOptions = {
    uri: combinedUri,
    method: "GET",
    json: true
  };

  return rp(requestOptions)
  // .then(function(response) {
  //   console.log(response["search"][0]["id"]);
    
  // })
  // .catch(function(err) {
  //   // API call failed...
    
  // });
}

module.exports = singleSearch;
