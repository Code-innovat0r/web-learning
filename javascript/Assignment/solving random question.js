// 2. The Double Trouble: You are tasked with writing a function that doubles each element in an array. However, there's a catch: if the array contains consecutive duplicate elements, only double one of them.

// sol
const random = (a)=>{
    return Math.floor(a + (Math.random()*(2)))
}

let arr = [2,3,4,5,5,6,3,3,5,8,9]
let sqrarr = []
for (let i = 0; i < arr.length; i++) {
    if(typeof(arr.length==(i+1))){
        if(arr[i]==arr[i+1]){
            let r = random(i)
            if(i!=r){
                sqrarr.push(arr[i])
                sqrarr.push(arr[i+1]**2)
            }
            else{
                sqrarr.push(arr[i]**2)
                sqrarr.push(arr[i+1])
            }
            i++
        }
        else{
            sqrarr.push(arr[i]**2)
        }
    }
}
console.log(sqrarr)

// 3.The Mirror Mirror: Imagine you have a string, and you need to create a new string that is a mirror image of the original. Write a function that appends the reversed version of the original string to itself.
//sol

let s = "I am Paras"
let s1 = Array.from(s)
let s2 = s1.reverse();
let s3 = s2.toString();
let s4 = s3.replaceAll(',', '')
console.log(s.concat(s4))

// 4.The Password Validator: You are building a password validation feature. Create a function that checks if a given password meets the following criteria: at least 8 characters long, contains both uppercase and lowercase letters, and includes at least one digit.
// sol
let pass = "45Paras123"
function password(string){
    let uppercase = false
    let lowercase = false
    let i = 0;
    let err = 0;
    while(i<string.length){
        let char = string.charAt(i)
        if(isNaN(char)){
            if(char==char.toUpperCase()){
                uppercase = true
            }
            else if(char == char.toLowerCase()){
                lowercase = true
            }
        }
        i++
    }
    if(string.length <8){
        return "password must be off 8 or more character"
        err +=1;
    }
    if(!uppercase){
        return ("Your password must contain atleast one uppercase character")
        err += 1
    }
    if(!lowercase){
        return ("Your password must contain atleast one lowercase character")
        err += 1
    }
    if(err == 0){
        return "Password is succesfully set.."
    }
}
console.log(password(pass))

// 5. The Sum Selector: You are working on a function that should sum all numbers in an array until it encounters a negative number. Write a function that performs this summation.
// sol

let z = [2,5,2,3,-4,9,6]
//Reduce method is not that help full
// const red = (a, b) =>{
//     console.log("paras")
//     if(b>0 && a>0){
//         return a+b;
//     }
//     else{
//         return a
        
//     }
// }
// console.log(z.reduce(red));

let sum = 0;
for (const element of z) {
    if(element>0){
        sum += element
    }else{
        break
    }
}
console.log("The sum of digits is: "+sum)

// 6. The Vowel Counter: You need to create a function that counts the number of vowels in a given string. Consider both uppercase and lowercase vowels.
// sol
let str = "HEY, Where are you..?, I am good"
let a = 0;
const vowelReader = (str) =>{
    let str1 = str.toLowerCase()
    let vowel = ["a", "e","i","o","u"]
    for (let i = 0; i < str1.length; i++) {
        let index = vowel.indexOf(str1[i])
        if(index != -1){
            a += 1;
        }
    }
    console.log("The number of the vowel is: "+a)
}
vowelReader(str)


// 7. Async Array Mapping: Write an asynchronous function that takes an array of numbers and returns a new array of Promises where each number is multiplied by 2 after a delay of 500 milliseconds.

let b1 = [1,2,3,4,5,6]
const delay = () =>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 2000);
    })
}

// this return you promises only as it is a synchronous function...
// let b2 = b1.map(async e => {
//     await delay()
//     return e*2;
// })
// console.log(b2)

const multiply = async (arr) =>{
    let b2 = []
    for (let i = 0; i < arr.length; i++) {
        await delay();
        b2.push(arr[i]*2)
    }
    console.log(b2)
}
multiply(b1)

// 8. The Asynchronous Shopper: Imagine you are building an online shopping application. Write an asynchronous function called placeOrder that simulates placing an order and returns a promise. The promise should resolve with an order confirmation message after a random delay.
// sol

let d = new Promise((resolve, reject)=>{
    let random = Math.floor(Math.random()*8)
    setTimeout(() => {
        resolve("Order Placed Successfully..")
    }, random*1000);
})

d.then((a)=>{
    console.log(a)
}).catch((err)=>{
    console.log(err)
})

// 9. The Coffee Machine: In your coffee shop application, you need to simulate the process of brewing coffee asynchronously. Write an async function named brewCoffee that takes the type of coffee and returns a promise. The promise should resolve with a message indicating that the coffee is ready after a random delay.
// sol

const wait = () => {
    return new Promise((resolve, reject) =>{
        let ran = parseInt(4 + Math.random()*6)
        setTimeout(() => {
            resolve("The coffee is ready")
        }, ran*1000);
    })
}

wait().then((e)=>{
    console.log(e)
})


