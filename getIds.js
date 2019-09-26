const WikidataSearch = require('wikidata-search').WikidataSearch;
const wikidataSearch = new WikidataSearch();

const csv = require('csvtojson')
const csvFilePath = './imdb_10.csv'


let col_names = []

let col_selected = "title"
let target_property = "instance of"
let target_value = "film"

csv().fromFile(csvFilePath)
    .then(objs => {
        objs.forEach(obj => {
            let col_name = obj[col_selected]
            col_names.push(col_name)
        })
        let filtered_ids = getIds(col_names, target_property, target_value)
        console.log(filtered_ids)
    })

function getIds(col_names, target_property, target_value) {
    let filtered_ids = []
    col_names.forEach(name => {
        wikidataSearch.set('search', name)
        wikidataSearch.search((response, error) => {
            if (error) {
                console.log(error)
                return
            }
            let unfiltered_ids = [] // ids returns by searching "name"
            let results = response.results
            results.forEach(function (result) {
                let id = result["id"]
                unfiltered_ids.push(id);
            })
            wikidataSearch.getEntities(unfiltered_ids, true, function (response, error) {
                if (error) {
                    console.log("getEntities error:", error)
                    return;
                }
                let entities = response.entities;
                let isEntityFound = false
                for (let i = 0; i < entities.length; i++) {
                    let id = unfiltered_ids[i];
                    let entity = entities[i];
                    let claims = entity["claims"]
                    for (let j = 0; j < claims.length; j++) {
                        let claim = claims[j]
                        let property = claim["property"]
                        let value = claim["value"]
                        if (property == target_property) {
                            if (value == target_value) {
                                // entity                                
                                isEntityFound = true;
                                filtered_ids.push(id)
                                // console.log(entity)
                                if (isEntityFound) {
                                    break;
                                }
                            }
                        }
                    }
                    if (isEntityFound) {
                        break;
                    }
                }
                // console.log("length of found entities", filtered_ids.length)
                return filtered_ids;
            })
        })
    })
}