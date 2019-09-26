'use strict';

let map = new Map();
map.set("a",[1,2,3])
map.set("b",[2,4,5])
for (let  [key, value] of map.entries()) {
  console.log(key, value);
}