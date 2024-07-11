

/* suppose you have given surtein event to the container, childcontainer, child and you trigger it when clicked on it. Then if you click on the child then the container and childcontainer also chicked as the child reside in it, also if the childcontainer clicked then also the container trigger because it reside in it.. 

This is called the bubbling in the javascript

It is must like you live in the delhi, then you automatically live in the India and then in asia and in the world.. Example is as follows*/


// document.querySelector(".container").addEventListener("click", ()=>{
//     alert("You have clicked on the container box")
// })

// document.querySelector(".childcontainer").addEventListener("click", ()=>{
//     alert("You have clicked on the childcontainer box")
// })

// document.querySelector(".child").addEventListener("click", ()=>{
//     alert("You have clicked on the child box")
// })



/* We us the event propagation function of the javascript to stop this kind of the propagation, with the help of the object listener */

document.querySelector(".container").addEventListener("click", ()=>{
    alert("You have clicked on the container box")
})

document.querySelector(".childcontainer").addEventListener("click", (e)=>{
    e.stopPropagation();
    alert("You have clicked on the childcontainer box")
})

document.querySelector(".child").addEventListener("click", (e)=>{
    e.stopPropagation();
    alert("You have clicked on the child box")
})