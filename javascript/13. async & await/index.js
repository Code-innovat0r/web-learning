/* 'await' predefine used for to wait for the execution or return either resolve or reject. 'await' must be wraped in the async function */

/* let put a time consuming function in between the simple addition and define it as 'async' that ask to run it in new thread not in main thread */

let a = 23;
let b = 7;
let c = a+b;


async function downlaodScript(){
    /*'fetch' is predefine use for the accessing data from internet or somewhere*/
    let result = await (await fetch("https://jsonplaceholder.typicode.com/posts")).json()
    // console.log(await result.json()); /*properly display as the json file and await is given to wait for conversion*/
    console.log(result)
}

downlaodScript();

console.log(c)


/* Doing the above code with the promise concept */

// let result = null
// let p = new Promise((resolve, reject)=> {
//     result = fetch("https://jsonplaceholder.typicode.com/posts")
//     console.log(typeof(TypeError))
//     if(result!=null){
//         resolve(result)
//     }
//     else{
//         reject("Rejected");
//     }
// })
// p.then((e)=>e.json())  //{} make it undefine
// .then((obj)=>{console.log(obj)}).catch((err)=>console.log(err))

