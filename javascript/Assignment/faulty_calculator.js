// alert("Welcome to the Faulty Calculator..")

// function FaultyCalculator(a, b){
//     let q = prompt("1. sum \n2. multiply \n3. Substraction \n4. Divide")
//     let s = Math.floor(Math.random()*101)
//     if(s<11){
//         if(q==1){
//             console.log("On the sum of the number is: "+(a-b))
//         }
//         else if(q==2){
//             console.log("On the multiplying the number we get: "+(a+b))
//         }
//         else if(q==3){
//             console.log("On the substrcting the number is: "+(a/b))
//         }
//         else if(q==4){
//             console.log("On the division of the number we get: "+(a**b))
//         }
//         else{
//             console.log("Selection is out of the Range..")
//         }
//     }
//     else if(s>11 && s<101){
//             if(q==1){
//                 console.log("On the sum of the number is: "+(a+b));
//             }
//             else if(q==2){
//                 console.log("On the multiplying the number we get: "+(a*b))
//             }
//             else if(q==3){
//                 console.log("On the substrcting the number is: "+(a-b))
//             }
//             else if(q==4){
//                 console.log("On the division of the number we get: "+(a/b))
//             }
//             else{
//                 console.log("Selection is out of the Range..")
//             }
                
//     }
// }

// var input1 = prompt("Enter the First Digit: ")
// var input2 = prompt("Enter the second Digit: ")
// FaultyCalculator(parseInt(input1), parseInt(input2))

// =------------------------------------------
 
// Second Method

let random = 5
let a = prompt("Enter the digit one: ")
let b = prompt("Enter the digit two: ")
let c = prompt("Enter the operation: ")

let obj = {
    "+": "-",
    "*": "+",
    "-": "/",
    "/": "**",
}
console.log(random)

if(random > 11){
    alert(`The answer is: ${eval(`${a} ${c} ${b}`)}`)
}
else{
    alert(`The answer is: ${eval(`${a} ${obj[c]} ${b}`)}`)
}