
// Creating a function named greeting and take parameter name
function greeting(name) {
    console.log("Good morning "+ name +" You are looking great" )
    console.log(name +" you have a nice out fit" )
    console.log(name +" You are also a goood programmer" )
 }

// Calling the function
greeting("paras")

function sum(a, b){
    return (a+b)
}
console.log("The sum of the number is "+ sum(2,7))

// Givin the default value to the function
// c have the default value 3 
function sum3(a, b, c=3){
    return a+b+c;
}
console.log("sum of the three digit is: "+ sum3(2,3,4))
console.log("sum of the three digit is: "+ sum3(4,8))

// Arror function defining, with name func1
const func1 = (x, e) =>{
    console.log("I am an arrow function and the value is: ", x+e)
}
func1(3, 6)
func1(9,12)