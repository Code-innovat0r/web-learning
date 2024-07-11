
function randomName(){
    let a = Math.floor(Math.random()*3)
    let b = Math.floor(Math.random()*3)
    let c = Math.floor(Math.random()*3)
    // console.log(a+"\n"+b+"\n"+c)
    let d = {
        "0": "Crazy",
        "1": "Amazing",
        "2": "Fire"
    }
    let g = d[a];
    let e = {
        "0": "Engine",
        "1": "Foods",
        "2": "Garments"
    }
    let h = e[b];
    let f = {
        "0": "Bros",
        "1": "Limited",
        "2": "Hub"
    }
    let i = f[c];
    console.log(`Would you like this name: ${g} ${h} ${i}`);
}

randomName();