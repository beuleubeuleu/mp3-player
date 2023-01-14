const playBtn: HTMLButtonElement = document.querySelector(".card__button--play")
const pauseBtn: HTMLButtonElement = document.querySelector(".card__button--pause")
const prevBtn: HTMLButtonElement = document.querySelector(".card__button--prev")
const nextBtn: HTMLButtonElement = document.querySelector(".card__button--next")
const toggleLoopBtn: HTMLButtonElement = document.querySelector(".card__button--replay-option")

const timeElapsedVisual: HTMLElement = document.querySelector(".time__representation--time-elapsed")
const timeElapsedMinutes: HTMLElement = document.querySelector(".minutes-elapsed")
const totalTimeMinutes: HTMLElement = document.querySelector(".total-minutes")

const flowerDanceAudio: HTMLAudioElement = new Audio("songs/flower-dance-audio.mp3")
flowerDanceAudio.loop = true

const convertSecondsToMinutes = (timeInSeconds: number): string => {
    return `${Math.floor(timeInSeconds / 60)}:${Math.floor(timeInSeconds % 60)}`
}


playBtn.addEventListener("click", (): void => {
    flowerDanceAudio.play()
    playBtn.style.display = "none"
    pauseBtn.style.display = "inline-block"
    totalTimeMinutes.innerHTML = convertSecondsToMinutes(flowerDanceAudio.duration)
})
pauseBtn.addEventListener("click", (): void => {
    flowerDanceAudio.pause()
    pauseBtn.style.display = "none"
    playBtn.style.display = "inline-block"
})
prevBtn.addEventListener("click", (): void => {
    flowerDanceAudio.currentTime = 0
})
nextBtn.addEventListener("click", (): void => {
    const endOfSong: number = flowerDanceAudio.duration - 0.5
    console.log(endOfSong)
    flowerDanceAudio.currentTime = endOfSong
})

flowerDanceAudio.addEventListener("timeupdate", (): void => {
    const timeElapsedInPercent: string = `${(flowerDanceAudio.currentTime / flowerDanceAudio.duration) * 100}%`

    timeElapsedMinutes.innerHTML = convertSecondsToMinutes(flowerDanceAudio.currentTime)
    console.log(timeElapsedVisual.style.width)
    timeElapsedVisual.style.width = timeElapsedInPercent
})

