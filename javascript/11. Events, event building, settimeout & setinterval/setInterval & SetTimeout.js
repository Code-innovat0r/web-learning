/* setinterval and settimeout is used for the osme thing that you want to repeate continuesly after some interval. settimeout is used for the stop that function after some condition satisfied */


function randomColorCode(){
    let a = Math.floor(Math.random()*256)
    let b = Math.floor(Math.random()*256)
    let c = Math.floor(Math.random()*256)
    return `rgb(${a}, ${b}, ${c})`
}

// setInterval(() => {
//    document.querySelector(".container").style.background = randomColorCode()
// }, 2000);          // time in the milisecond



let s = setInterval(() => {
   document.querySelector("#container").style.background = randomColorCode()
}, 2000);          // time in the milisecond

/* now it store a digit code in the s and that can be use with the function clearInterval to stop the function */
console.log(s)
// clearInterval(s)


/* settimeout is same as the setinterval but it run for the one time only after the given interval. you can also stop it using the clearTimeout function as similar in setinterval. one of it usecase is. suppose some one visit your website and didn't subscribe to your page so you want to ask him to subsciribe after 2s on your page, but if he subscride before then you need to stop the reminder there the settimeout function is usefull..*/

setTimeout(() => {
    document.getElementById("container").innerHTML = "<b> I am the settimeout function</b>"
}, 3000);

