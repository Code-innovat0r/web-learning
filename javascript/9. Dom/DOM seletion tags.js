console.log("Hello world")
//access the body of the html
document.body
// get the child of the body textnode is the space and line break
document.body.childNodes
//selecting the node at the inedex 0
document.body.childNodes[0] 
//print the further child of this nodes
document.body.childNodes[0].childNodes
// printing the first child of document.body.childNodes[0]
document.body.childNodes[0].firstChild
// printing the last child of document.body.childNodes[0]
document.body.childNodes[0].lastChild
// printing the first element child (ignoring the text child) of document.body.childNodes[0]
document.body.childNodes[0].firstElementChild
// printing the last element child (ignoring the text child) of document.body.childNodes[0]
document.body.childNodes[0].lastElementChild
//try to insert css in the selected node,, let insert in last Element Child   -> insert inline css
document.body.childNodes[0].lastElementChild.style.color = "red"
  
//get all the node under the document.body.childNodes[0] including comment,text and element nodes
document.body.childNodes[0].childNodes
//get only the element node under the document.body.childNodes[0]
document.body.childNodes[0].children

//get the just next element of document.body.childNodes[0]
document.body.childNodes[0].nextSibling   // you can use the nextElementSibling to get element only
//get the just previous element of document.body.childNodes[0]
document.body.childNodes[0].previousSibling // you can use the previousElementSibling to get element only