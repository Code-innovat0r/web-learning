
function inserthtml(text){
    let cons = document.querySelector(".container")
    cons.insertAdjacentHTML("afterbegin", `<div><b> ${text} ... </b></div>`)
}

inserthtml("Intializing hacking")
inserthtml("pam lala is hackerd")
inserthtml("your account get 200000000000cr")
