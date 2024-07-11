/* IIFE -> Imediately invoke function */

const sleep = async () => {
    return new Promise((resolve, reject)=> {
        setTimeout(() => {
            resolve(65564)
        }, 1000);
    })
}

(async function main() {
    let a = await sleep();
    console.log(a)
    let b = await sleep();
    console.log(b)
})()


/* Destructring */

let [w, r, ...arr] = [1,2,3,4,5,6,7,8,9]
console.log(w) //store 1
console.log(r) //store 2
console.log(arr) //store rest of value as ... denote as it is array

// we can do it with the object also

let obj = {
    a: 1,
    b:2,
    c:4
}

let {a,b} = obj  //fetch value of a,b from obj and create a variable
console.log(a)
console.log(b)


let s = [2,5,23]
console.log(...s) //return sum of the array

const a1 = [1, 4, 99]
const e = {...a1} // create a object like {0:1, 1:4, 2:99} map index value as key



