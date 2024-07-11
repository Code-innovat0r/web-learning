console.log("Paras")

let boxes = document.getElementsByClassName("box")
console.log(boxes) //print all the element that inherit box class

boxes[1].style.backgroundColor = "red" // select the first index element and add this css

//selecting by the ids
document.getElementById("greenbox").style.backgroundColor = "lightgreen"

// using the query selector
// it will select the first element inheriting that id or class
document.querySelector(".box").style.backgroundColor = "aquamarine"
// it will select the all element inheriting that id or class, we need to use the forEach loop because querySelector(".box") return an html array that doesn't have style property
// document.querySelectorAll(".box").forEach(e = =>{
//     e.style.backgroundColor = "purple"
// })

