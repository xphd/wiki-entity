// let map = new Map();

// map.set(1,{name:"alex"})

// map.set(2,{name:"bob"})

// let iterator = map.entries()

// for (let entry of map){
//     console.log(entry)
// }


const object1 = {
    a: 'somestring',
    b: 42
  };
  
  for (let  value of Object.values(object1)) {
    console.log( `${value}`);
  }