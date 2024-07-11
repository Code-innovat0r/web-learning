function random(num) {
    return Math.ceil(Math.random() * num);
}

//    function ms1(){
//     return new Promise((resolve,reject)=>{
//       setTimeout(() => {
//         resolve("Initialing Hacking")
//       }, random(7)*1000);
//     })
//   }

const ms1 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Initialing Hacking")
        }, random(7) * 1000);
    })
}

const ms2 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Reading your files")
        }, random(7) * 1000);
    })
}

const ms3 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Password obtained")
        }, random(7) * 1000);
    })
}

const ms4 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Sending all personal info to server")
        }, random(7) * 1000);
    })
}

const ms5 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Cleaning up")
        }, random(7) * 1000);
    })
}

const ms6 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Hacking done!")
        }, random(7) * 1000);
    })
}

let p1 = document.querySelector("#p1");
let Interval;


const main = async () => {
    {
        let d1 = await ms1();
        console.log(d1);
        p1.innerHTML = p1.innerHTML + `<br>${d1}`;
        Interval = setInterval(() => {
            console.log("working")
            if (p1.innerHTML.endsWith("....")) {
                p1.innerHTML = p1.innerHTML.slice(0, p1.innerHTML.length - 4);
            }
            else {
                p1.innerHTML = p1.innerHTML + ".";

            }
        }, 1000);
    }
    let d2 = await ms2();
    console.log(d2);
    p1.innerHTML = p1.innerHTML + `<br>${d2}`;
    let d3 = await ms3();
    console.log(d3);
    p1.innerHTML = p1.innerHTML + `<br>${d3}`;
    let d4 = await ms4();
    console.log(d4);
    p1.innerHTML = p1.innerHTML + `<br>${d4}`;
    let d5 = await ms5();
    console.log(d5);
    p1.innerHTML = p1.innerHTML + `<br>${d5}`;
    {
        let d6 = await ms6();
        console.log(d6);
        p1.innerHTML = p1.innerHTML + `<br>${d6}`;
        clearInterval(Interval);
    }
}
main();