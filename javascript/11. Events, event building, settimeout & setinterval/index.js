/* link for all the events of the js 
https://developer.mozilla.org/en-US/docs/Web/Events
 */

let cons = document.getElementById("btn")

/* toggling the event listner "click"
take two argument one is the action done and second is what to do */
cons.addEventListener("click", ()=>{
    document.querySelector(".box").innerHTML = "<b> Hey you clicked the button..</b> Now Enjoy"
})

/* menu right clicked on the selected query */
document.querySelector(".box").addEventListener("contextmenu", ()=>{
    alert("What you want hmmmm.......")
})

/* you can also remove the event listener */
// document.querySelector(".box").removeEventListener("contextmenu", ()=>{
//     alert("What you want hmmmm.......")
// })

/* printing the keybord input in the console, here e is the object listener store the input value */
document.body.addEventListener("keydown", (e)=>{
    console.log(e, e.keyCode);            /* keyCode give you the button code, but now depreciated */
})