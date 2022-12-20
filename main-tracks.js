const API_KEY = '2b8980ed887d86bafdfa74d28151b73b';
const API_URL_TRACKS = 'https://api.jamendo.com/v3.0/albums/tracks/?client_id=e1ba0143&format=jsonpretty&limit=1&name=';
const API_URL_ALBUM = 'https://api.jamendo.com/v3.0/albums/?client_id=e1ba0143&format=jsonpretty&artist_name=';
const API_URL_ARTISTS = 'https://api.jamendo.com/v3.0/artists/?client_id=e1ba0143&format=jsonpretty&name=';

const API_URL_TRACKS_CHECK = 'https://api.jamendo.com/v3.0/albums/tracks/?client_id=e1ba0143&format=jsonpretty&limit=1&artist_name=we+are+fm';



// playList = playListMain;

const prevBtn = document.querySelector('.play-prev'),
    playBtn = document.querySelector('.play'),
    nextBtn = document.querySelector('.play-next'),
    pauseBtn = document.querySelector('.pause'),

    bandTitleContent = document.querySelector('.band-title-block__el'),
    bandContentBcg = document.querySelector('.band-title-block__bcg'),

    contentBlock = document.querySelector('.content'),

    // audioList = document.querySelector('.play-list'),
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

getArtists(API_URL_ARTISTS);

async function getArtists(url) {
    const respArt = await fetch(url);
    const respDataArt = await respArt.json(); // БД в формате json

    console.log(respDataArt.results);

    renderArtists(respDataArt.results);
    // renderBandTitleContent(respDataArt.results[0]);
}

function renderArtists(infoArtists) {
    contentBlock.innerHTML = ``;
    const allArtistsBlock = document.createElement('div');
    allArtistsBlock.classList.add('artists-block-all');

    contentBlock.appendChild(allArtistsBlock);
    infoArtists.forEach((artist) => {
        allArtistsBlock.innerHTML += `
            <div class="artist-block-cart ${artist.name}" id="${artist.name}">
            ${artist.image ? `<img class="artist-block-cart__img" width="100px" src="${artist.image}" alt="">` : `<img class="artist-block-cart__img" width="100px" src="assets/imgs/no-img-artist.jpg" alt=""> `}
               
               <div class="artist-block-cart__name">Исполнитель: ${artist.name}</div>
            
            </div>`;
    });
    const artistsBlock = contentBlock.querySelectorAll('.artist-block-cart');
    artistsBlock
        .forEach(i => i.addEventListener('click', () =>
            // console.log(i.id)
            getAlbums(i.id, API_URL_ALBUM)
        ));
}

// getAlbum(artist_name, API_URL_ALBUM);

async function getAlbums(artist_name, url) {
    const respAlb = await fetch(url + artist_name);
    const respDataAlb = await respAlb.json(); // БД в формате json

    console.log(respDataAlb.results);
    renderAlbums(respDataAlb.results);
    // console.log(artist_name);
    // renderTracks(respData.results[0].tracks, respData.results[0]);
    // renderBandTitleContent(respData.results[0]);
}

function renderAlbums(infoAlbums) {
    contentBlock.innerHTML = ``;
    const allAlbumsBlock = document.createElement('div');
    allAlbumsBlock.classList.add('albums-block-all');

    contentBlock.appendChild(allAlbumsBlock);
    infoAlbums.forEach((album) => {
        // console.log(album);
        allAlbumsBlock.innerHTML += `
            <div class="album-block-cart ${album.artist_name}" id="${album.name}">
                <img class="album-block-cart__img" width="100px" src="${album.image}" alt="">
                <div class="play-list__title album-block-cart__artist-name">Исполнитель: ${album.artist_name}</div>
                <div class="play-list__title album-block-cart__name">Альбом: ${album.name}</div>
            </div>`;
    });
    const albumsBlock = contentBlock.querySelectorAll('.album-block-cart');
    albumsBlock
        .forEach(i => i.addEventListener('click', () =>
            // console.log(i.id)
            getMusic(i.id, API_URL_TRACKS)
        ));
}

// getMusic(API_URL_TRACKS);
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

async function getMusic(album_name, url) {
    const resp = await fetch(url + album_name);
    respData = await resp.json(); // БД в формате json

    console.log(respData);

    renderTracks(respData.results[0].tracks, respData.results[0]);
    renderBandTitleContent(respData.results[0]);
}

function renderTracks(tracks, infoAlbum) {
    contentBlock.innerHTML = ``;
    const audioList = document.createElement('div');
    audioList.classList.add('play-list');
    contentBlock.appendChild(audioList);

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
    const bandTitleContentBlock = document.createElement('div');
    bandTitleContentBlock.classList.add('band-title-block');
    contentBlock.prepend(bandTitleContentBlock);

    const bandContentBcg = document.createElement('div');
    bandContentBcg.classList.add('band-title-block__bcg');
    bandTitleContentBlock.appendChild(bandContentBcg);

    const bandTitleContent = document.createElement('div');
    bandTitleContent.classList.add('band-title-block__el');
    bandTitleContentBlock.appendChild(bandTitleContent);



    bandTitleContent.innerHTML = `
        <div class="band-title-block__el__img">
            <img class="band-title-block__el__img-el" src="${infoAlbum.image}"  alt="">
        </div>
        <div class="band-title-block__el__album-title">${infoAlbum.name}</div>
        <div class="band-title-block__el__album-artist-name">Исполнитель: ${infoAlbum.artist_name}</div>
        <div class="band-title-block__el__album-relise-date">${infoAlbum.releasedate}</div>
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

    const audioList = document.querySelector('.play-list');
    const audioListElements = audioList.querySelectorAll('.play-list__el');
    audioListElements.forEach(el => el.classList.remove('active-song'));

    audioList.children[position - 1].classList.add('active-song');
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
    const audioList = document.querySelector('.play-list');
    const childrenArray = Array.from(audioList.children);
    const currentSongElement = childrenArray.find(el => el.classList.contains('active-song'));

    let positionNumber = currentSongElement.getAttribute('position');


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
    const audioList = document.querySelector('.play-list');
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