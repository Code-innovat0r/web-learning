console.log("Generate the box of the random color")


let arr = document.getElementsByClassName("box")

function generateRandomColorCode(){
    let a = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    let c = Math.floor(Math.random()*256);
    return `rgb(${a}, ${b}, ${c})`
}
for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    element.style.backgroundColor = generateRandomColorCode()
    element.style.color = generateRandomColorCode()
}


