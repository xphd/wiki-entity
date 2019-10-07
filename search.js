const singleSearch = require("./singleSearch.js");

function search(name) {
  let promise = new Promise((fullfill,reject)=>{
    singleSearch(name,fullfill,reject)
})
return promise
}

module.exports = search;
