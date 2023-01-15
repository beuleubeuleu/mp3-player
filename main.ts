const songTitle: HTMLElement = document.querySelector(".card__song-title")
const songAuthor: HTMLElement = document.querySelector(".card__song-album")
const songCover: HTMLElement = document.querySelector(".card__song-image")

const playBtn: HTMLButtonElement = document.querySelector(".card__button--play")
const pauseBtn: HTMLButtonElement = document.querySelector(".card__button--pause")

const prevBtn: HTMLButtonElement = document.querySelector(".card__button--prev")
const nextBtn: HTMLButtonElement = document.querySelector(".card__button--next")
const toggleLoopBtn: HTMLButtonElement = document.querySelector(".card__button--replay-option")

const timeElapsedVisual: HTMLElement = document.querySelector(".time__representation--time-elapsed")
const totalTimeVisual: HTMLElement = document.querySelector(".time__representation--total-time")
const timeElapsedMinutes: HTMLElement = document.querySelector(".minutes-elapsed")
const totalTimeMinutes: HTMLElement = document.querySelector(".total-minutes")

const playlist: HTMLElement = document.querySelector(".card__playlist")

// Create Playlist
window.addEventListener("DOMContentLoaded", () => {
    const allSongs = [
        {
            title: "Flower Dance",
            author: "DJ OKAWARI",
            cover: "images/flower-dance--cover.jpeg",
            src: "/songs/flower-dance-audio.mp3",
        },
        {
            title: "Tu fais briller mes yeux",
            author: "beuleubeuleu",
            cover: "images/TFBMY--cover.jpg",
            src: "/songs/TFBMY.mp3",
        }
    ]

    const audio = new Audio()

    for (let song: number = 0; song < allSongs.length; song++) {
        let track = document.createElement("div")
        track.className = "card__playlist-track flex"

        let trackCover = document.createElement("img")
        trackCover.className = "card__playlist-cover"
        trackCover.src = allSongs[song].cover
        trackCover.alt = `image de couverture du morceau ${allSongs[song].title} par ${allSongs[song].author}`
        track.appendChild(trackCover)

        let trackName = document.createElement("p")
        trackName.className = "card__playlist-name"
        trackName.innerHTML = `${allSongs[song].title} - ${allSongs[song].author}`
        track.appendChild(trackName)
        track.addEventListener("click", () => {
            audioPlay(song)
        })
        allSongs[song]["div"] = track

        playlist.appendChild(track)
    }


//EVENTS

    let current: number = 0
    let audioStart: boolean = false

    const audioPlay = (idx: number, nostart?): void => {
        current = idx
        audioStart = !nostart
        audio.src = allSongs[idx].src
        for (let song: number = 0; song < allSongs.length; song++) {
            song === idx ? allSongs[song]["div"].classList.add("now") : allSongs[song]["div"].classList.remove("now")
        }
        songCover.style.background = `url(${allSongs[idx].cover}) center`
        songCover.style.backgroundSize = "cover"

        songAuthor.innerHTML = allSongs[idx].author
        songTitle.innerHTML = allSongs[idx].title
    }

    audio.addEventListener("canplay", () => {
        if (audioStart) {
            audio.play()
            audioStart = false
        }
    })
    audio.addEventListener("ended", () => {
        current++
        if (current >= allSongs.length) {
            current = 0
        }
        audioPlay(current)
    })
    audioPlay(0, true)

    audio.addEventListener("play", () => {
        playBtn.style.display = "none"
        pauseBtn.style.display = "inline-block"
    });
    audio.addEventListener("pause", () => {
        pauseBtn.style.display = "none"
        playBtn.style.display = "inline-block"
    });

    playBtn.addEventListener("click", () => {
        audio.play()
    })
    pauseBtn.addEventListener("click", () => {
        audio.pause()
    })

    const timeString = (secs: number): string => {
        // HOURS, MINUTES, SECONDS
        let ss: number = Math.floor(secs)
        let hh: number = Math.floor(ss / 3600)
        let mm: number = Math.floor((ss - (hh * 3600)) / 60);
        ss = ss - (hh * 3600) - (mm * 60);

        // RETURN FORMATTED TIME
        let formattedMinutes: string = mm < 10 ? "0" + mm : mm.toString();
        let formattedSeconds: string = ss < 10 ? "0" + ss : ss.toString();
        return hh > 0 ? `${hh}:${formattedMinutes}:${formattedSeconds}` : `${formattedMinutes}:${formattedSeconds}`;
    };

    audio.addEventListener("loadedmetadata", () => {
        timeElapsedMinutes.innerHTML = timeString(0)
        totalTimeMinutes.innerHTML = timeString(audio.duration)
    })
    audio.addEventListener("timeupdate", () => {
        //minutes update
        timeElapsedMinutes.innerHTML = timeString(audio.currentTime)

        //visual bar update
        timeElapsedVisual.style.width = `${(audio.currentTime / audio.duration) * 100}%`
    })

    nextBtn.addEventListener("click", () => {
        audio.currentTime = audio.duration
    })
    prevBtn.addEventListener("click", () => {
        audio.currentTime < 3 ? current === 0 ? audioPlay(allSongs.length - 1) : audioPlay(--current): audio.currentTime = 0
    })


})
