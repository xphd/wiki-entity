function f1() {
  let chain = Promise.resolve();
  let items = ["A","B"]
  items.forEach(item => {
    chain = chain.then(() => {
      return f2(item);
    });
  });
  let promise = new Promise((fulfill, reject) => {
    chain
      .then(() => {
        fulfill();
      })
      .catch(err => {
        // console.log("ERR", err);
        reject(err);
      });
  });
  return promise;
}

function f2(item) {
    let promise = new Promise((fullfill,reject)=>{
        singleSearch(item,fullfill)
    })
    return promise
}

// function f3(item,fullfill){
//     let promise = Promise.resolve()
//     promise.then(()=>{
//         fullfill()
//         console.log(item)
//     })
// }

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

function singleSearch(item, fullfill) {
  combinedUri = combinedUri + "&search=" + encodeURIComponent(item);

  let requestOptions = {
    uri: combinedUri,
    method: "GET",
    json: true
  };

  rp(requestOptions)
    .then(function(response) {
      console.log(response["search"][0]["id"]);
      fullfill();
    })
    .catch(function(err) {
      // API call failed...
      reject(err);
    });
    
}




f1().then(()=>{
    console.log("end")
})
