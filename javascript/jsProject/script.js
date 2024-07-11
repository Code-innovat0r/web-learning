// let cons = document.getElementsByClassName("container")
// let div = document.createElement('div') /* create div element */
// div.className = "jsClass"
// div.innerHTML = "<span>Hey where Paras Enjoying here </span>"
// document.body.append(div)

function addRow(title, duration, channel_name, views, monthold) {
    let view = (parseInt(views)/1000) + "k views";
    let month = monthold +" months old";
    let cons = document.getElementById("container")
    let text = 
    `<div class="line">
        <div id="image">
            <img src="https://i.ytimg.com/vi/tVzUXW6siu0/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLB0alxLSXCSEPITzWr-XXUiv1oglQ" alt=""></img>
            <div id="duration">${duration}</div>
        </div>
        <div id="text">
            <div class="heading"><a href="/">${title}</a></div>
            <div class="detail_text"><a href="/" id="cname" >${channel_name}</a><a href="/" id="views" >${view}</a><a href="/">${month}</a></div>
        </div>
    </div>`
    cons.insertAdjacentHTML("beforeend", text)
}

addRow("Exercise 4 - Multi Color Website | Sigma Web Development Course - Tutorial #33", "2:32", "Code with Ram", "10000", "4")
addRow("More on CSS Selectors | Sigma Web Development Course - Tutorial #35", "2:30:32", "Code with shyamlal", "450000", "6")