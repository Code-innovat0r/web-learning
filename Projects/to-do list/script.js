const inputbox = document.getElementById("input-box")
const listcontainer = document.getElementById("list-container")

function addTask(){
    if(inputbox.value===''){
        alert("You must write Something!!")
    }else{
        let li = document.createElement("li")
        li.innerHTML = inputbox.value
        listcontainer.appendChild(li)  //listcontainer.append(li)
        let span = document.createElement("span")
        span.innerHTML = ("\u00d7")
        li.appendChild(span)  // the above li created in that add this span tag
    }
    inputbox.value = ""
    saveData();
}

listcontainer.addEventListener("click", (e)=>{
    if(e.target.tagName == "LI"){
        e.target.classList.toggle("checked")
        saveData();
    }
    else if(e.target.tagName == "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
})

function saveData(){
    localStorage.setItem("data", listcontainer.innerHTML) /* variable name for the data, data */
}
function showTask(){
    listcontainer.innerHTML = localStorage.getItem("data") /* variable name for the data, data */
}
showTask();
