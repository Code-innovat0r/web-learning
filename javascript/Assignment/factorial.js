

/* factorial by the for loop method */

// let s = 1;

// for (let i = 1; i <= a; i++) {
//     s = s*i;
// }
// console.log(s)


/* factorial by the reduce method */
let a = 5;
var arr = []
//Creating the array like for five {1,2,3,4,5}
function factorial(number){
    arr = Array.from(Array(number+1).keys()).slice(1) //.slice as it start from 0
}
factorial(a)
const fact = (a,b)=>{
    return a*b;
}
console.log(arr.reduce(fact));