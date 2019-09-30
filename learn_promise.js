var promise = new Promise(function (resolve, reject) {
    var a = 3
    if (a === 1) {
        resolve(a)
    } else {
        reject(a)
    }
})
promise.then(function (value) {
    console.log(value++)
    // return value
}).catch(function (error) {
    console.log("catch")
    console.log(error)
})
.then(function (value) {
    console.log(value)
})