const playlistBtn = document.querySelector(".card__button--check-playlist");
const playlistTracks = document.querySelector(".card__playlist");
playlistBtn.addEventListener("click", () => {
    playlistTracks.classList.toggle("open-playlist");
});
