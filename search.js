const singleSearch = require("./singleSearch.js");

function search(items) {
  // let items = ["The Godfather","Pulp Fiction"];

  let chain = Promise.resolve();
  items.forEach(item => {
    chain = chain.then(() => {
      return singleSearch(item);
    });
  });

  
  return chain;
}

module.exports = search;
