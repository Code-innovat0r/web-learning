

/* Creating an array named arr  */
// let arr = [1, 2,3,4,5,6,76]

// console.log(arr)
// console.log(arr.length)

// type of the array is the object

// /* arrays are the mutable  */
// arr[0] = 858; /* changing the value of the array at the index 0  */
// console.log(arr[0])

/* Some methods of the Arrays  */
 
// console.log(arr.toString()) /*Converting the array into the String */ 
// console.log(arr.join(" and ")) /*join the text after the each element of the array */
// console.log(arr.pop()) /* takeout the last element of the array and return it */
// arr.push(23) /* add the digit at the end of the array */ 
// console.log(arr) 

/*delete -> keyword have some spaecial thing that is it delete the element at the given index but left the space occupied by that, means the length of the array does not change after the deletion */
// console.log(arr.length)
// delete arr[3]
// console.log(arr.length)
// console.log(arr[3])

/* Concat method is used for the joining of the arrays  */
// let a1 = [1, 2,3]
// let a2 = [4, 5,6]
// let a3 = [7, 8,9]
// console.log(a1.concat(a2, a3)) /* It return the added array */
// console.log(a1) /* does not alter the existing array */


/* sort method is used to arrange the array acc to alphabet or in the ascending order */
// let a4 = [23, 45,32, 76]
// a4.sort()
// console.log(a4) // It modify the original array

/* Splice is the function that take two argument one is index number and second is length to delete let n, means from the index element it delete to nth element   */
// let a5 = [1,2,3,4,5,6,7,8,9]
// a5.splice(3, 5) /* return deleted element */
// console.log(a5) /* return modified array */

/* now Splice also take no of element but first two means the same and other means add them from where you started deletion operation */
// let a6 = [1,2,3,4,5,6,7,8,9]
// a6.splice(1, 4, 23,545,56)
// console.log(a6)

/* slice take out a piece from an array and create new array.
slice take one or two ageument. one is for start from and second is for stop upto. Do not alter the main array*/
// let a7 = [1,2,3,4,5,6,7,8,9]
// console.log(a7.slice(2)) // from index 2 to end
// console.log(a7.slice(2, 5)) // from index 2 to upto 5, means including 4 not 5.

/* reverse() reverse the source array */



/* For each loop */
// let a8 = [1,2,3,4,5]
// a8.forEach((index, value, array) => {
//     console.log(value, index, array)
// });
    
    
/* For in loop */
// let obj = {
//     a: 1,
//     b:3,
//     c:4
// }
// for (const key in obj) {
//     if (Object.hasOwnProperty.call(obj, key)) {
//         const element = obj[key];
//         console.log(element)
//     }
// }

/* For of loop */
// let a9 = [1,2,3,4,5]
// for (const element of a9) {
//     console.log(element)
// }

/* Map() */
let b1 = [1,2,3,4,5]
let b2 = b1.map(e => {
      return e**2    //Square the element of the b1 and store it in the b2
})
console.log(b2)

/* Creating the filter */
const greaterThanSeven = e => {
    if(e>7){
        return true;
    }
    return false;
}
console.log(b2.filter(greaterThanSeven));

/* creating a reduce function */

const red = (a, b) =>{
    return a*b;
}
console.log(b1.reduce(red));

/* Array.from() convert to array */
let s1 = Array.from("paras")
console.log(s1)
