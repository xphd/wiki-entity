const fs = require("fs")
const csvjson = require("csvjson")

// const ObjectsToCsv = require('objects-to-csv');
// const csv = require('csvtojson')

// const getEntities = require("./getEntities.js")
let map_name_to_object = new Map(); // map name shown in colum to object returned by "wikidata serach"
let map_id_to_entity = new Map(); // map id (begin with "Q") to entity (item wikidata)
let map_property_count = new Map();

// read csv file, get a list of name/item for wiki-search

const csvFilePath = 'imdb_10.csv'
let col_selected = 'title'

// get names for search from the csv file
let col_names = ["The Godfather","Pulp Fiction"];

// let data = fs.readFileSync(csvFilePath, { encoding: 'utf8' })
// let options = {
//     delimiter: ',', // optional
//     quote: '"' // optional
// };
// let objs = csvjson.toObject(data, options);
// objs.forEach(obj => {
//     let col_name = obj[col_selected]
//     col_names.push(col_name)
// })

// console.log(col_names)

let found_entities = []

// search
const search = require("./search.js")

async function f1(){
    console.log("begin")
    await start()
    console.log("end")
}

f1() 
function start(){
    console.log("begin search")
    let chain = Promise.resolve()
    col_names.forEach(name=>{
        chain = chain.then(()=>{
            return search(name)
        })
    })
    // let promise = new Promise((fulfill, reject) => {
    //     chain
    //       .then(() => {
    //         fulfill();
    //       })
    //       .catch(err => {
    //         // console.log("ERR", err);
    //         reject(err);
    //       });
    //   });
    return chain  
}


// grab all infor from wikidata about each item, if 