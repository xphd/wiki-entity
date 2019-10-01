const singleSearch = require("./singleSearch.js");

function search(items) {
  // let items = ["The Godfather","Pulp Fiction"];

  let chain = Promise.resolve();

  items.forEach(item => {
    chain = chain.then(() => {
      singleSearch(item);
    });
  });

  // let promise = new Promise((fullfill, reject) => {

  //   chain
  //     .then(() => {
  //       fullfill();
  //     })
  //     .catch(err => {
  //       // console.log("ERR", err);
  //       reject(err);
  //     });
  // });
  return chain;
}

module.exports = search;
