const ObjectsToCsv = require("objects-to-csv");

import { getEntities } from "wiki-entity";

let ids = [
  "P269",
  "p268"
  // "Q172241",
  // "Q47703",
  // "Q202326",
  // "Q163872",
  // "Q104123"
];

let property_values = new Map();

console.log("before f1");
f1();
console.log("after f1");

async function f1() {
  console.log("Begin");
  await getEntities({ language: "en", ids }).then(entities => {
    entities.forEach(entity => {
      // console.log(entity)
      console.log("entity");
    });
  });
  console.log("End");
}

function extract(entities, property_values) {
  // note: property_values can be null
  let objs = [];
  entities.forEach(entity => {
    let obj = {};
    let id = entity["id"];
    let label = entity["label"];
    obj["id"] = id;
    obj["label"] = label;
    let claims = entity["claims"];
    for (let claim of Object.values(claims)) {
      let property_id = claim["id"];
      let raw_values = claim["values"];
      let datatype = raw_values[0]["datatype"];
      let values = [];
      if (datatype == "wikibase-item") {
        raw_values.forEach(raw_value => {
          values.push(raw_value["value"]);
        });
        obj[property_id] = values;

        // note: property_values can be null
        if (property_values) {
          if (property_values.has(property_id)) {
            let values_set = property_values.get(property_id);
            values.forEach(v => {
              values_set.add(v);
            });
          } else {
            let values_set = new Set();
            values.forEach(v => {
              values_set.add(v);
            });
            property_values.set(property_id, values_set);
          }
        }

        //
      } else if (datatype == "quantity") {
      }
    }
    objs.push(obj);
  });
  return objs;
}
// console.log("The End!")
