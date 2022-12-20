const API_KEY = '2b8980ed887d86bafdfa74d28151b73b';
const API_URL_TRACKS = 'https://api.jamendo.com/v3.0/albums/tracks/?client_id=e1ba0143&format=jsonpretty&limit=1&artist_name=we+are+fm';

const API_URL_TRACKS_CHECK = 'https://api.jamendo.com/v3.0/albums/tracks/?client_id=e1ba0143&format=jsonpretty&limit=1&artist_name=we+are+fm';

// playList = playListMain;

const prevBtn = document.querySelector('.play-prev'),
    playBtn = document.querySelector('.play'),
    nextBtn = document.querySelector('.play-next'),
    pauseBtn = document.querySelector('.pause'),

    bandTitleContent = document.querySelector('.band-title-block__el'),
    bandContentBcg = document.querySelector('.band-title-block__bcg'),



    audioList = document.querySelector('.play-list'),
    pleerDiv = document.querySelector('.player'),

    muteButton = document.querySelector('.mute'),
    imgTitlePlayer = document.querySelector('.bottom-player__img-title'),
    bottomPlayer = document.querySelector('.bottom-player'),


    playListDuration = document.querySelector('.play-list__duration'),
    currentTimeEl = document.querySelector('.currentTime'),
    playSlider = document.querySelector('.play__range-el'),
    volumeSlider = document.querySelector('.volume-controls__range');

const playMusicListen = playBtn.addEventListener('click', playMusic);
const pauseMusicListen = pauseBtn.addEventListener('click', pauseMusic);
const nextMusicListen = nextBtn.addEventListener('click', nextSong);
const prevMusicListen = prevBtn.addEventListener('click', prevSong);
getMusic(API_URL_TRACKS);

audioPlay = new Audio();

function pauseMusic() {
    audioPlay.pause();
}
function playMusic() {
    audioPlay.play();
}

volumeSlider
    .addEventListener('input', function () {
        audioPlay.volume = volumeSlider.value;
    });

playSlider.addEventListener('input', () => {
    audioPlay.currentTime = playSlider.value / 100 * audioPlay.duration;
});

function timeUpdateFoOnSong() {
    audioPlay.addEventListener('timeupdate', () => {
        const currentTimeElNum = Math.trunc(audioPlay.currentTime);

        currentTimeEl.innerHTML = `
                <span class="currentTime">
                ${Math.trunc(currentTimeElNum / 60)}:${currentTimeElNum % 60}
                </span>
            `;

        playSlider.value = audioPlay.currentTime / audioPlay.duration * 100;
        // console.log(audioPlay.duration);
        if (Math.trunc(audioPlay.currentTime) == Math
            .trunc(audioPlay.duration)) {
            nextSong();
        }
    });
}

async function getMusic(url) {
    const resp = await fetch(url);
    respData = await resp.json(); // БД в формате json

    renderTracks(respData.results[0].tracks, respData.results[0]);
    renderBandTitleContent(respData.results[0]);
}

function renderTracks(tracks, infoAlbum) {
    audioList.innerHTML = ``;

    tracks.sort((x, y) => x.position - y.position);

    tracks.forEach((track) => {
        // const playListEl = document.createElement('div');
        // playListEl.classList.add('play-list__el');
        // playListEl.setAttribute('position', `${track.position}`);

        audioList.innerHTML += `
        <div class="play-list__el" position="${track.position}">
            <div class="play-list__title">${track.position}. ${track.name}</div>
            <div class="play-list__duration">${Math.trunc(track.duration / 60)}:${track.duration % 60}</div>
            </div>`;

        // audioList.appendChild(playListEl);
    });


    let audioListElements = audioList.querySelectorAll('.play-list__el');
    audioListElements
        .forEach(i => i.addEventListener('click', () => onSongClick(i.getAttribute('position'), tracks, infoAlbum)));
}

function renderBandTitleContent(infoAlbum) {
    bandTitleContent.innerHTML = `
        <div class="band-title-block__el__img">
            <img class="band-title-block__el__img-el" src="${infoAlbum.image}"  alt="">
        </div>
        <div class="band-title-block__el__album-title">${infoAlbum.name}</div>
        <div class="band-title-block__el__album-artist-name"> ${infoAlbum.artist_name}</div>
        <div class="band-title-block__el__album-relise-date"> ${infoAlbum.releasedate}</div>
        `;

    bandContentBcg.style = `
        background-image: url(${infoAlbum.image});
        background-position: center;
        background-size: cover;
        filter: blur(40px);
        height: 100%;
        `;
}

function onSongClick(position, tracks, infoAlbum) {
    bottomPlayer.style = `
    visibility: visible;
    `;

    // console.log(position, tracks, infoAlbum);
    const curentSong = tracks.find((el) => el.position === position);

    pauseMusic();

    const audioListElements = audioList.querySelectorAll('.play-list__el');
    audioListElements.forEach(el => el.classList.remove('active-song'));

    audioList.children[position - 1].classList.add('active-song');
    // console.log(curentSong);
    audioPlay = new Audio(curentSong.audio);
    playMusic();
    audioPlay.volume = volumeSlider.value;
    // volumizer();

    imgTitlePlayer.innerHTML = `
    <div class="play-list__img"><img class="play-list__img-el" src="
    ${infoAlbum.image}" alt=""></div>
        <div class="play-list__title">${curentSong.name}</div>
    `;

    playListDuration.innerHTML = `
    <div class="play-list__duration">${Math.trunc(curentSong.duration / 60)}:${curentSong.duration % 60}</div>
    `;
    // console.log(audioPlay.currentTime);

    // function timeUpdateFoOnSong() {
    //     audioPlay.addEventListener('timeupdate', () => {
    //         const currentTimeElNum = Math.trunc(audioPlay.currentTime);

    //         currentTimeEl.innerHTML = `
    //                 <span class="currentTime">
    //                 ${Math.trunc(currentTimeElNum / 60)}:${currentTimeElNum % 60}
    //                 </span>
    //             `;

    //         playSlider.value = audioPlay.currentTime / audioPlay.duration * 100;
    //         // console.log(audioPlay.duration);
    //         if (Math.trunc(audioPlay.currentTime) == Math
    //             .trunc(audioPlay.duration)) {
    //             nextSong();
    //         }
    //     });
    // }
    timeUpdateFoOnSong();
}

function nextSong() {
    pauseMusic();
    const childrenArray = Array.from(audioList.children);
    const currentSongElement = childrenArray.find(el => el.classList.contains('active-song'));

    let positionNumber = currentSongElement.getAttribute('position');
    // console.log(respData.results[0].tracks);

    const audioListElements = audioList.querySelectorAll('.play-list__el');
    audioListElements.forEach(el => el.classList.remove('active-song'));

    if (positionNumber < 0) {
        positionNumber = 1;
    } else if (positionNumber >= respData.results[0].tracks.length) {
        positionNumber = 1;
    } else {
        positionNumber++;
    }

    const curentSong = respData.results[0].tracks
        .find((el) => el.position === `${+positionNumber}`);


    audioList.children[positionNumber - 1].classList.add('active-song');

    console.log(curentSong);
    audioPlay = new Audio(curentSong.audio);
    audioPlay.play();

    audioPlay.volume = volumeSlider.value;

    imgTitlePlayer.innerHTML = `
    <div class="play-list__img"><img class="play-list__img-el" src="
    ${respData.results[0].image}" alt=""></div>
        <div class="play-list__title">${curentSong.name}</div>
    `;

    playListDuration.innerHTML = `
    <div class="play-list__duration">${Math.trunc(curentSong.duration / 60)}:${curentSong.duration % 60}</div>
    `;

    timeUpdateFoOnSong();
}

function prevSong() {
    pauseMusic();

    const childrenArray = Array.from(audioList.children);
    const currentSongElement = childrenArray.find(el => el.classList.contains('active-song'));

    let positionNumber = currentSongElement.getAttribute('position');

    const audioListElements = audioList.querySelectorAll('.play-list__el');
    audioListElements.forEach(el => el.classList.remove('active-song'));

    if (positionNumber < 1) {
        positionNumber = respData.results[0].tracks.length;
    } else if (positionNumber == 1) {
        positionNumber = respData.results[0].tracks.length;
    } else {
        positionNumber--;
    }

    const curentSong = respData.results[0].tracks
        .find((el) => el.position === `${+positionNumber}`);

    audioList.children[positionNumber - 1].classList.add('active-song');

    console.log(curentSong);
    audioPlay = new Audio(curentSong.audio);
    audioPlay.play();

    audioPlay.volume = volumeSlider.value;

    imgTitlePlayer.innerHTML = `
    <div class="play-list__img"><img class="play-list__img-el" src="
    ${respData.results[0].image}" alt=""></div>
        <div class="play-list__title">${curentSong.name}</div>
    `;

    playListDuration.innerHTML = `
    <div class="play-list__duration">${Math.trunc(curentSong.duration / 60)}:${curentSong.duration % 60}</div>
    `;

    timeUpdateFoOnSong();
}

// muteButton.addEventListener('click', muter);
// function muter() {
//     if (audio.volume == 0) {
//         muteButton.style.backgroundImage = 'url(https://img.icons8.com/sf-black-filled/35/FFFFFF/high-volume.png)';
//         audio.volume = volumeSlider.value;

//     } else {
//         audio.volume = 0;
//         muteButton.style.backgroundImage = 'url(https://img.icons8.com/metro/35/FFFFFF/no-audio.png)';
//     }
// }

// audio.addEventListener('volumechange', volumizer);
// function volumizer() {
//     if (audio.volume == 0) {
//         muteButton.style.backgroundImage = 'url(https://img.icons8.com/metro/35/FFFFFF/no-audio.png)';
//     }
//     else {
//         muteButton.style.backgroundImage = 'url(https://img.icons8.com/sf-black-filled/35/FFFFFF/high-volume.png)';
//     }
// }