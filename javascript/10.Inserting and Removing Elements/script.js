// <!-- Must read it from the notes chapter-8 -->


/* fetching the inner html of the selected class or the IDs */
// document.querySelector(".container").innerHTML

/* delete the previous html content and add the text to the selected class */
// document.querySelector(".container").innerHTML = "Hey i am paras kumar"

/* fetching the inner text only of the selected class or the IDs */
// document.querySelector(".container").innerText
// document.querySelector(".box").innerText
// document.querySelector(".box").textContent

/* fetching the inner Html with of class or the IDs itself*/
// document.querySelector(".container").outerHTML
// document.querySelector(".box").outerHTML

/* fetching the tag of the selected class or the Id, tagName is applicable for the tags only where the nodeName is applicable for the any kind of the node(text node, comment node, element node) */
// document.querySelector(".container").tagName
// document.querySelector(".box").nodeName

/* <div hidden>text<div> -> hide the text inside the div, we can do it with the javascript also */
// document.querySelector(".box").hidden /* it will return the false as the class is not initially hidden */
// document.querySelector(".box").hidden = true  /* now with the help of javascript it will hide the content of the box */

/* checking, setting, getting the attribute of the selected class or id */
// document.querySelector("#box").hasAttribute("style") /* check for the style attribute and return the boolean */
// document.querySelector("#box").getAttribute("style") /* if there is style attribute then show the property used */
// document.querySelector("#box").setAttribute("style", "display: block;") /* add or modify the given property */
// document.querySelector("#box").attributes /* give all the attribute */
// document.querySelector("#box").removeAttribute("style") /* remove the given attribute */
// document.querySelector("#box").dataset /* print the data like who create as provided in attribute */
// document.designMode = "on" /* allow you to make any change of the webpage till not refreshed */


/* ----------------------------- INSERTION METHOD -------------------------------------------------- */

let div = document.createElement('div') /* create div element */
div.className = "jsClass"
div.innerHTML = "<span>Hey where Paras Enjoying here </span>"
document.body.append(div)
// document.getElementById("box").replaceWith(div)
/* node.append() -> append at the end of the node 
 node.prepend() -> append at the begning of the node 
 node.before() -> Insert before node 
 node.after() -> Insert after node 
 node.replaceWith() -> replace node with the give node
 node.classList add/remove("class") -> add/remove a class
 node.classList.toggle("class") -> add the class if not exist otherwise remove it
 node.classList.contain("class") -> return boolean
 */

let cons = document.getElementById("box")
cons.insertAdjacentHTML("afterbegin", "<b>Hey what going on I am here  </b>")



