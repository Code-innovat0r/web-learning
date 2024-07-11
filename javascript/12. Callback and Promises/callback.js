
/* example for the Asynchronous nature of the javascript */

console.log("Hey I am the begning of the javascript")

setTimeout(() => {
    console.log("Hey I am the body of the javascript")
}, 3000); // even if the time is 0ms it will not wait

console.log("I am the end of the javascript..")

/* callback function are the function that is passed to another function as an argument.. */

// const callback = (e) =>{
//     // alert("NEW jAVASCRIPT IS LOADED SUCCESSFULLY....Loaded by "+e)
//     console.log("script loaded successfully.. Loaded by "+e)
// }

// const loadscript = (url, callback, name)=>{
//     let cons = document.createElement("script")
//     cons.src = url;
//     cons.onload = callback(name);
//     document.body.append(cons)
// }

// loadscript('https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-actionscript.min.js',callback, "Paras")

/* one example for the callback function is .. let we have two function 1 and 2. Now suppose 1 have some time taking code like downloading or settimeout..so javascript will execute the 2 first, but we need that 1 should run first and 2 as second function so here we use the callback function */


function one(re){     //pass the function two as parameter, you can pass function name or any variable also "re is variable"
    setTimeout(() => {
        console.log("I am function 1")
        re();                           // accessing it as function is allowed in the javascript
    }, 3000);
}

function two(){             // now this is the callback function
    console.log("I am function 2")
}
one(two);


/* now suppose you are calling the callback function inside the callback , like box inside the box and so on..
then the code become difficult that is called the 'pyramid of doom'. so in the case we want that javascript should run it in the another thread not on the main thread and return the result once done. So javascript give you a promise that it will do(resolve) or if not done then (reject) that  */