const playListMain = [
    {
        img: 'assets/imgs/muse-drones.jpg',
        album: 'Drones',
        band: 'Muse',
        title: 'Dead Inside',
        src: 'assets/music/muse/drones/1.Dead-Inside.mp3',
        duration: '4:24',
        durationNum: 264,
        id: 1
    },
    {
        img: 'assets/imgs/muse-drones.jpg',
        album: 'Drones',
        band: 'Muse',
        title: 'Psycho',
        src: 'assets/music/muse/drones/2.Psycho.mp3',
        duration: '5:28',
        durationNum: 328,
        id: 2
    },
    {
        img: 'assets/imgs/muse-drones.jpg',
        album: 'Drones',
        band: 'Muse',
        title: 'Mercy',
        src: 'assets/music/muse/drones/3.Mercy.mp3',
        duration: '3:52',
        durationNum: 232,
        id: 3
    },
    {
        img: 'assets/imgs/muse-drones.jpg',
        album: 'Drones',
        band: 'Muse',
        title: 'Reapers',
        src: 'assets/music/muse/drones/4.Reapers.MP3',
        duration: '5:59',
        durationNum: 359,
        id: 4
    },
    {
        img: 'assets/imgs/muse-drones.jpg',
        album: 'Drones',
        band: 'Muse',
        title: 'The Handler',
        src: 'assets/music/muse/drones/5.The-Handler.MP3',
        duration: '4:33',
        durationNum: 273,
        id: 5
    },
    {
        img: 'assets/imgs/muse-drones.jpg',
        album: 'Drones',
        band: 'Muse',
        title: 'Defector',
        src: 'assets/music/muse/drones/6.Defector.mp3',
        duration: '4:33',
        durationNum: 273,
        id: 6
    },
    {
        img: 'assets/imgs/muse-drones.jpg',
        album: 'Drones',
        band: 'Muse',
        title: 'Revolt',
        src: 'assets/music/muse/drones/7.Revolt.mp3',
        duration: '4:05',
        durationNum: 245,
        id: 7
    },
    {
        img: 'assets/imgs/muse-drones.jpg',
        album: 'Drones',
        band: 'Muse',
        title: 'Aftermath',
        src: 'assets/music/muse/drones/8.Aftermath.mp3',
        duration: '5:48',
        durationNum: 348,
        id: 8
    },
    {
        img: 'assets/imgs/muse-drones.jpg',
        album: 'Drones',
        band: 'Muse',
        title: 'The Globalist',
        src: 'assets/music/muse/drones/9.The-Globalist.mp3',
        duration: '10:07',
        durationNum: 607,
        id: 9
    },
    {
        img: 'assets/imgs/muse-drones.jpg',
        album: 'Drones',
        band: 'Muse',
        title: 'Drones',
        src: 'assets/music/muse/drones/10.Drones.mp3',
        duration: '2:51',
        durationNum: 171,
        id: 10
    }
];
let playList = [];
playList = playListMain;

// if (location.pathname === '/meditation.html') {
//     playList = playListMeditation
// }
// else {
//     
// }

const prevBtn = document.querySelector('.play-prev'),
    playBtn = document.querySelector('.play'),
    nextBtn = document.querySelector('.play-next'),
    pauseBtn = document.querySelector('.pause'),
    audioList = document.querySelector('.play-list'),
    pleerDiv = document.querySelector('.player'),
    muteButton = document.querySelector('.mute'),
    imgTitlePlayer = document.querySelector('.bottom-player__img-title'),
    bottomPlayer = document.querySelector('.bottom-player'),

    bandTitleContent = document.querySelector('.band-title'),
    bandContentBcg = document.querySelector('.band-title-bcg'),

    playListDuration = document.querySelector('.play-list__duration'),
    currentTimeEl = document.querySelector('.currentTime'),
    playSlider = document.querySelector('.play__range-el'),
    volumeSlider = document.querySelector('.volume-controls__range');

const pauseMusicListen = pauseBtn.addEventListener('click', pauseMusic);
const nextMusicListen = nextBtn.addEventListener('click', nextSong);
const prevMusicListen = prevBtn.addEventListener('click', prevSong);

let audio = new Audio(playList[0].src);
audio.defaultMuted = false;
audio.volume = 0.2;
playBtn.addEventListener('click', () => audio.play());

bandTitleContent.innerHTML = `
    <div class="band-title__img"><img class="band-title__img-el" src="${playList[0].img}" alt=""></div>
        <div class="band-title__album-title">${playList[0].album}</div>
    `;

bandContentBcg.style = `
background-image: url(${playList[0].img});
    background-position: center;
    background-size: cover;
    filter: blur(40px);
    height: 100%;
`;

playList.forEach((sound) => {
    audioList
        .innerHTML += `
    <div class="play-list__el" id="${sound.id}">
        <div class="play-list__title">${sound.id}. ${sound.title}</div>
        <div class="play-list__band">${sound.band}</div>
        <div class="play-list__album">${sound.album}</div>
        <div class="play-list__duration">${sound.duration}</div>
    </div>`;
});

let items = audioList.querySelectorAll('.play-list__el')
items.forEach(i => i.addEventListener('click', () => onSongClick(i.id)))

function onSongClick(id) {
    bottomPlayer.style = `
    visibility: visible;
    `;

    let song = playList.find((el) => el.id == id)
    Array.from(audioList.children).forEach((li) => li.classList.remove('active-song'));
    audio.pause();
    audioList.children[id - 1].classList.add('active-song')
    audio = new Audio(song.src);
    audio.volume = volumeSlider.value;
    volumizer();
    audio.play();

    // console.log(playList[id - 1].img);
    // console.log(playList[id - 1].title);

    imgTitlePlayer.innerHTML = `
    <div class="play-list__img"><img class="play-list__img-el" src="${playList[id - 1].img}" alt=""></div>
        <div class="play-list__title">${playList[id - 1].title}</div>
    `;

    playListDuration.innerHTML = `
    <div class="play-list__duration">${playList[id - 1].duration}</div>
    `;

    //тоже можно использовать song вместо id


    // let currentTimeElNum = Math.trunc(audio.currentTime);
    audio.addEventListener('timeupdate', () => {
        let currentTimeElNum = Math.trunc(audio.currentTime);
        currentTimeEl.innerHTML = `
            <div class="play__range-timing">
                <span class="currentTime">
                ${Math.trunc(currentTimeElNum / 60)}:${currentTimeElNum % 60}
                </span>
            </div>
            `;

        playSlider.value = audio.currentTime / audio.duration * 100;

        // console.log(Math.trunc(audio.currentTime));
        // console.log(song.durationNum);

        if (Math.trunc(audio.currentTime) == song.durationNum) {
            nextSong();
        }
    });




    // if (Math.trunc(audio.currentTime) == song.durationNum) {
    //     nextSong();
    // }

}

function pauseMusic() {
    audio.pause();
}

function nextSong() {
    const childrenArray = Array.from(audioList.children);
    const currentSongElement = childrenArray.find(el => el.classList.contains('active-song'));

    // let song = playList.find((el) => el.id == id)

    audio.pause();
    // if (!currentSongElement) {
    //     // audio = new Audio(playList[0].src);
    //     // audio.volume = volumeSlider.value;
    //     // childrenArray[0].classList.add('active-song');
    // } else {
    childrenArray.forEach((li) => li.classList.remove('active-song'));
    let currentId = currentSongElement.id;
    let songIndex = playList.findIndex((s) => s.id == Number.parseInt(currentId));
    if (songIndex < 0) {
        songIndex = 0;
    } else if (songIndex >= playList.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    audio = new Audio(playList[songIndex].src);
    audio.volume = volumeSlider.value;
    childrenArray[songIndex].classList.add('active-song');
    // }

    audio.play();
    volumizer();

    // console.log(songIndex);

    imgTitlePlayer.innerHTML = `
    <div class="play-list__img"><img class="play-list__img-el" src="${playList[songIndex].img}" alt=""></div>
        <div class="play-list__title">${playList[songIndex].title}</div>
    `;

    playListDuration.innerHTML = `
    <div class="play-list__duration">${playList[songIndex].duration}</div>
    `;

    audio.addEventListener('timeupdate', () => {
        let currentTimeElNum = Math.trunc(audio.currentTime);
        currentTimeEl.innerHTML = `
            <div class="play__range-timing">
                <span class="currentTime">
                ${Math.trunc(currentTimeElNum / 60)}:${currentTimeElNum % 60}
                </span>
            </div>
            `;

        playSlider.value = currentTimeElNum / audio.duration * 100;

        console.log(Math.trunc(audio.currentTime));
        console.log(playList[songIndex].durationNum);

        if (Math.trunc(audio.currentTime) == playList[songIndex].durationNum) {
            nextSong();
        }
    });
}

function prevSong() {
    const childrenArray = Array.from(audioList.children);
    const currentSongElement = childrenArray.find(el => el.classList.contains('active-song'));

    audio.pause();
    // if (!currentSongElement) {
    //     // audio = new Audio(playList[playList.length - 1].src);
    //     // audio.volume = volumeSlider.value;
    //     // childrenArray[playList.length - 1].classList.add('active-song');
    // } else {
    childrenArray.forEach((li) => li.classList.remove('active-song'));
    let currentId = currentSongElement.id;
    let songIndex = playList.findIndex((s) => s.id == Number.parseInt(currentId));
    if (songIndex < 0) {
        songIndex = playList.length - 1;
    } else if (songIndex == 0) {
        songIndex = playList.length - 1;
    } else {
        songIndex--;
    }
    audio = new Audio(playList[songIndex].src);
    audio.volume = volumeSlider.value;
    childrenArray[songIndex].classList.add('active-song');
    // }
    audio.play();
    volumizer();
    // console.log(songIndex);

    imgTitlePlayer.innerHTML = `
    <div class="play-list__img"><img class="play-list__img-el" src="${playList[songIndex].img}" alt=""></div>
        <div class="play-list__title">${playList[songIndex].title}</div>
    `;

    playListDuration.innerHTML = `
    <div class="play-list__duration">${playList[songIndex].duration}</div>
    `;

    audio.addEventListener('timeupdate', () => {
        let currentTimeElNum = Math.trunc(audio.currentTime);
        currentTimeEl.innerHTML = `
            <div class="play__range-timing">
                <span class="currentTime">
                ${Math.trunc(currentTimeElNum / 60)}:${currentTimeElNum % 60}
                </span>
            </div>
            `;

        playSlider.value = currentTimeElNum / audio.duration * 100;

        console.log(Math.trunc(audio.currentTime));
        console.log(playList[songIndex].durationNum);

        if (Math.trunc(audio.currentTime) == playList[songIndex].durationNum) {
            nextSong();
        }
    });
}

muteButton.addEventListener('click', muter);
function muter() {
    if (audio.volume == 0) {
        muteButton.style.backgroundImage = 'url(https://img.icons8.com/sf-black-filled/35/FFFFFF/high-volume.png)';
        audio.volume = volumeSlider.value;

    } else {
        audio.volume = 0;
        muteButton.style.backgroundImage = 'url(https://img.icons8.com/metro/35/FFFFFF/no-audio.png)';
    }
}

function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

setAttributes(volumeSlider, { "type": "range", "min": "0", "max": "1", "step": "any", "value": "0.2" });
volumeSlider.addEventListener("input", function () { audio.volume = volumeSlider.value; });

audio.addEventListener('volumechange', volumizer);
function volumizer() {
    if (audio.volume == 0) {

        muteButton.style.backgroundImage = 'url(https://img.icons8.com/metro/35/FFFFFF/no-audio.png)'
    }
    else {

        muteButton.style.backgroundImage = 'url(https://img.icons8.com/sf-black-filled/35/FFFFFF/high-volume.png)'
    }
}


playSlider.addEventListener('input', () => {
    audio.currentTime = playSlider.value / 100 * audio.duration;
});

audio.addEventListener('timeupdate', () => {
    let currentTimeElNum = Math.trunc(audio.currentTime);
    currentTimeEl.innerHTML = `
        <div class="play__range-timing">
            <span class="currentTime">
            ${Math.trunc(currentTimeElNum / 60)}:${currentTimeElNum % 60}
            </span>
        </div>
        `;

    playSlider.value = currentTimeElNum / audio.duration * 100;

    console.log(Math.trunc(audio.currentTime));
    console.log(playList[songIndex].durationNum);

    if (Math.trunc(audio.currentTime) == currentSongElement.durationNum) {
        nextSong();
    }
});

// if (Math.trunc(audio.currentTime) == Math.trunc(audio.durationNum)) {

// }

