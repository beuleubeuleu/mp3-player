const playBtn = document.querySelector(".card__button--play");
const pauseBtn = document.querySelector(".card__button--pause");
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
flowerDanceAudio.addEventListener("timeupdate", () => {
    const timeElapsedInPercent = `${(flowerDanceAudio.currentTime / flowerDanceAudio.duration) * 100}%`;
    timeElapsedMinutes.innerHTML = convertSecondsToMinutes(flowerDanceAudio.currentTime);
    console.log(timeElapsedVisual.style.width);
    timeElapsedVisual.style.width = timeElapsedInPercent;
});
