

/* just for the math matic addition some one pass you the string then where shold be an error display but javascript did not show the error so we need to generate a error for the user */

let a = prompt("Enter a first number ")
let b = prompt("Enter a second number ")
if(isNaN(a) || isNaN(b)){
    throw SyntaxError("Sorry this is not allowed")
}
let sum = parseInt(a)+parseInt(b)     //parseInt convert the string containing number only to integer 
console.log("the sum is ", sum)

/* now javascript stop interprating once ran in error as in above case. so we use the the try catch function so the intrpradation do not stop */

try{
    console.log(sum*x)
}catch(error){
    console.log("Bhai x to define kar da ...")
    alert(error.name) //give the name of the error
    alert(error.message) //give the message of the error
    alert(error.stack) //give the stack of the error
}

console.log("I am running when javascript ran in error.  Thanks to the try/catch")


/* try cathch is a synchronus function and if asynchrons functiion given in the try the code fails and catch will not catch the error... */


/* finally keyword speciall used in the function building like you want your code to run even if the statement like return encounter */

function sumUp(a, b) {
    try{
        let sum  = parseInt(a) + parseInt(b)
        return sum
    }catch(error){
        confirm("I am the catch of the function and you have input a string to add...")
        return error.message
    }
    finally{
        console.log("Here is your answer of the question...")
    }
}

sumUp("paras", 45)


