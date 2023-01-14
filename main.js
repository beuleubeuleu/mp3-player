const playBtn = document.querySelector(".card__button--play");
const pauseBtn = document.querySelector(".card__button--pause");
const prevBtn = document.querySelector(".card__button--prev");
const nextBtn = document.querySelector(".card__button--next");
const toggleLoopBtn = document.querySelector(".card__button--replay-option");
const timeElapsedVisual = document.querySelector(".time__representation--time-elapsed");
const timeElapsedMinutes = document.querySelector(".minutes-elapsed");
const totalTimeMinutes = document.querySelector(".total-minutes");
const flowerDanceAudio = new Audio("songs/flower-dance-audio.mp3");
flowerDanceAudio.loop = true;
const convertSecondsToMinutes = (timeInSeconds) => {
    return `${Math.floor(timeInSeconds / 60)}:${Math.floor(timeInSeconds % 60)}`;
};
playBtn.addEventListener("click", () => {
    flowerDanceAudio.play();
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline-block";
    totalTimeMinutes.innerHTML = convertSecondsToMinutes(flowerDanceAudio.duration);
});
pauseBtn.addEventListener("click", () => {
    flowerDanceAudio.pause();
    pauseBtn.style.display = "none";
    playBtn.style.display = "inline-block";
});
prevBtn.addEventListener("click", () => {
    flowerDanceAudio.currentTime = 0;
});
nextBtn.addEventListener("click", () => {
    const endOfSong = flowerDanceAudio.duration - 0.5;
    console.log(endOfSong);
    flowerDanceAudio.currentTime = endOfSong;
});
toggleLoopBtn.addEventListener("click", () => {
    if (flowerDanceAudio.loop) {
        toggleLoopBtn.style.filter = "saturate(0%)";
        flowerDanceAudio.loop = false;
    }
    else {
        toggleLoopBtn.style.filter = "saturate(100%)";
        flowerDanceAudio.loop = true;
    }
});
flowerDanceAudio.addEventListener("timeupdate", () => {
    const timeElapsedInPercent = `${(flowerDanceAudio.currentTime / flowerDanceAudio.duration) * 100}%`;
    timeElapsedMinutes.innerHTML = convertSecondsToMinutes(flowerDanceAudio.currentTime);
    console.log(timeElapsedVisual.style.width);
    timeElapsedVisual.style.width = timeElapsedInPercent;
    if (flowerDanceAudio.ended) {
        pauseBtn.style.display = "none";
        playBtn.style.display = "inline-block";
    }
});
