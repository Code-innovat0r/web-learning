console.log("Let's write the javascript")

/* now we need to create something that play one song at a time it is parallely playing the song. so we are going to make a object of the audio class and on every click on the new song we update the source link of the audio with the help of the playing() function Audio() is a pre-define class in the javascript  */
let obj = new Audio();

let data = []

async function getsong(folder) {
    let html = await fetch(`http://127.0.0.1:5500/song-folder/${folder}`);
    let response = await html.text();
    let element = document.createElement("div");
    element.innerHTML = response;
    let data = element.getElementsByTagName("a")
    let song = []
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (element.href.endsWith(".mp3")) {
            song.push(element.href);
        }
    }
    return song;
}

function playing(value, folder, boolean=false) {
    if(boolean){
        obj.src = value;
    }else{
        obj.src = `/song-folder/${folder}/` + value;
    }
    obj.play();
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    
    // Add leading zero if seconds or remainingSeconds are less than 10
    let formattedMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    let formattedSeconds = (remainingSeconds < 10) ? `0${remainingSeconds}` : remainingSeconds;
    
    return `${formattedMinutes}:${formattedSeconds}`;
}

async function song(folder) {
    // get the list of the song
    data = await getsong(folder)

    let songUl = document.querySelector(".song-list").getElementsByTagName("ul")[0]
    songUl.innerHTML = "";
    for (const element of data) {
        songUl.innerHTML = songUl.innerHTML + `<li>
                            <img class="invert" src="img/music.svg" alt="">
                            <div class="info">
                                <div>${element.split(`/song-folder/${folder}/`)[1].replaceAll("%20", " ")}</div>
                                <div>Code-Demon</div>
                            </div>
                            <div><img id="play" src="img/play.svg" class="invert" alt="play"></div>
                        </li>`

    }
    //Attach an event listener to each song
    let arr = []
    arr = Array.from(document.querySelector(".song-list").getElementsByTagName("li"))
    arr.forEach(element => {
        element.addEventListener("click", () => {
            playing(element.querySelector(".info").firstElementChild.innerHTML.trim(), folder)
            document.querySelector(".songinfo").innerHTML = `<span> ${element.querySelector(".info").firstElementChild.innerHTML.slice(0, element.querySelector(".info").firstElementChild.innerHTML.length - 4)} </span>`
            document.getElementById("play-btn").src = "img/pause.svg" // change the play symbol initial
        })
    })

    //Attach an event listener to play button
    let cons = document.getElementById("play-btn")
    cons.addEventListener("click", () => {
        if(obj.paused){
            obj.play()
            cons.src = "img/pause.svg"
        }
        else{
            obj.pause()
            cons.src = "img/play.svg"
        }
    })

    // setting up the time of the playing songs
    obj.addEventListener("timeupdate", ()=>{
        document.querySelector(".songtime").innerHTML = `${formatTime(obj.currentTime)}/${formatTime(obj.duration)}`
        // updating the seek bar with the time
        document.querySelector(".circle").style.left = `${(obj.currentTime/obj.duration)*100}%`;
    })
    
    //adding the event listener to the seekbar
    document.querySelector(".seekbar").addEventListener("click", e=>{
        // offsetX give current position in the x, getBoundingClientRect give the total width of the parent element
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left = percent + "%";
        obj.currentTime = (percent/100)*obj.duration
    })

    // adding the event listener to the hamberger and close button
    let ham = document.getElementById("hamberger")
    ham.addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "0px"
    })
    
    let close = document.getElementById("close")
    close.addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "-400px"
    })

    // adding the event listener to the previous and next button
    let cons1 = document.getElementById("next")
    cons1.addEventListener("click", ()=>{
        let index = data.indexOf(obj.currentSrc) //get the index of the current song in the data array
        if((index+1)< data.length){   //checking it for the last index or not if not then play next one
            playing(data[index+1],"", true) //passing the link to play and true that it is complete link
            // updating the name of the song
            document.querySelector(".songinfo").firstElementChild.innerHTML = data[index+1].split(`/song-folder/${folder}/`)[1].slice(0, -4).replaceAll("%20", " ")
        }
    })

    let cons2 = document.getElementById("previous")
    cons2.addEventListener("click", ()=>{
        let index = data.indexOf(obj.currentSrc) //get the index of the current song in the data array
        if((index-1)>= 0){   //checking it for the last index or not if not then play next one
            playing(data[index-1],"", true) //passing the link to play and true that it is complete link
            // updating the name of the song
            document.querySelector(".songinfo").firstElementChild.innerHTML = data[index-1].split(`/song-folder/${folder}/`)[1].slice(0, -4).replaceAll("%20", " ")
        }
    })

    // adding the event listener to the volume 
    let cons3 = document.querySelector(".range").firstElementChild
    cons3.addEventListener("change", (e)=>{
        // console.log(e.target.value) return the value of the range which is an int and between 0 to 100
        //but the volume function of the Audio take between 0-1 so we need to divide by 100
        obj.volume = e.target.value/100
    })

}


