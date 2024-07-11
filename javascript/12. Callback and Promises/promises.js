//         -   ------------------------- Must Read from the notes about promise api

/* It is like javascript promise you that javascript will do that work for you in another thread and once done will return you the result */


/* the 'then' and 'catch' function in the javascript. If work done then come under 'then' if not then come in 'catch' */
/* this run in new thread */


// let prom1 = new Promise((resolve, reject) => {
//     let f = Math.random();
//     if(f<0.5){
//         reject("server is rejecting your query");
//     }
//     else{
//         setTimeout(()=>{
//             console.log("work done, server respond successfully...")
//             resolve("Downloaded...")
//         }, 3000)
//     }
// })

// prom1.then((a)=>{
//     console.log(a)
// }).catch((err)=>{
//     console.log(err)
// })

/*  using the promise all api .. means if all resolve then return else not */

let prom1 = new Promise((resolve, reject) => {
    let f = Math.random();
    if(f<0.5){
        reject("server is rejecting your query");
    }
    else{
        setTimeout(()=>{
            console.log("work done, server respond successfully...")
            resolve("Downloaded...")
        }, 3000)
    }
})

let prom2 = new Promise((resolve, reject) => {
    let f = Math.random();
    if(f<0.5){
        reject("server is rejecting your query");
    }
    else{
        setTimeout(()=>{
            console.log("work done, server respond successfully...")
            resolve("Downloaded...")
        }, 3000)
    }
})


let p3 = Promise.all([prom1, prom2])
p3.then((a)=>{
    console.log(a)
}).catch((err)=>{
    console.log(err)
})

/* if any one done then return */
// let p3 = Promise.any([prom1, prom2])
// p3.then((a)=>{
//     console.log(a)
// }).catch((err)=>{
//     console.log(err)
// })