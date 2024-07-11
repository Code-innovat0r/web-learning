console.log("This is a variable and datatype javascript");

var a =23;
var b = 45;
console.log("The sum is "+ a+b);
var _a= 34;
console.log(a+_a);
// var 9a = 34; is not valid in the javascript variable decelaration
var f = "paras";
console.log(typeof a, typeof b, typeof f);


// const a1  = 3; can't modify the const variables
// a1 = a1+1;
// not allowed in the javascript

// Var doest make any difference in the global and local variable, {} -> is the block
var s = 22; 
{
    var s = 99;
    console.log(s);
}
console.log(s);

// let make difference in the global and local variable
let p = "paras";
{
    let p = "kumar";
    console.log(p);
}
console.log(p);



// ----------------------------- Data Types ---------------------------------------

let x = "I am good";
let y = 22;
let z = 3.55;
const k = true;
let q = undefined
let r = null;

console.log(x, y, z, k, q, r);
console.log(typeof x, typeof y, typeof z, typeof k, typeof q, typeof r);

// think why the type of the null is object

// ------------------------ Creating the object in the javascript -----------------------------------

let i = {
    name: "Paras",
    "job code" : 5600 
}
console.log(i);

i.salary = "100crores";  //add this to the object i
console.log(i);
i.salary = "900crores";  //also you can update values
console.log(i);
