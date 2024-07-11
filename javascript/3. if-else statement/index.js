console.log("I am the Paras Kumar Code")

// let age = prompt("What is your age..")
let age=23;

// using the if else statement 
if(age>18){
    console.log("You can drive")
}
else if (age==18) {
    console.log("you should wait for 19tn..")
}
else{
    console.log("You cannot drive..")
}

// % - gives the remainder
// === -> check the value and the type
// !== -> check value or the type, ya to type equal ho ya to value equal ho
if("3"===3){
    console.log("true")
}
if(234!==3){ //type is equal
    console.log("true")
}
if("234"!==234){ //type is not equal value is equal
    console.log("true")
}


// =============

let a = 6;
let b = 5;
let c = a>b ?(a-b): (a**b);
console.log(c)
/*
translate to:
if(a>b){
    let c = a-b;
    }else{
        let c = a**b;
}
console.log(c)
*/

