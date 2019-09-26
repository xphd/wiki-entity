let set = new Set();

let a = ["a","b"]
let b = ["b","c"]

a.forEach(e=>{
    set.add(e)
})

b.forEach(e=>{
    set.add(e)
})
console.log(set)
// console.log(Array.from(set))