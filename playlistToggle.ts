const playlistBtn: HTMLButtonElement = document.querySelector(".card__button--check-playlist")
const playlistTracks: HTMLElement = document.querySelector(".card__playlist")

playlistBtn.addEventListener("click", () => {
    playlistTracks.classList.toggle("open-playlist")
})
