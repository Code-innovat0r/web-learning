console.log("This is about the javascript loops functions")
console.log("There are the 5 type of the loop in the javascript")

// 1. Simple for loop
for (let i = 1; i <= 100; i++) {
    console.log(i);
}

// for in loop
let obj = {
    name: "Paras",
    class : "B.Tech",
    year: 1,
    skill: "Javascript"
}
for(const key in obj){
    const element = obj[key]
    console.log(key, element)
}

// While loop
let a = 34;
while (a>0) {
    console.log(a);
    a--;
}

// do while loop - it run once without cheking condition
let age = 32;
do {
    console.log(age)
    age--;
} while (age>30);

// There are 'for of' and 'for each' loop but they work with the iteration 
 