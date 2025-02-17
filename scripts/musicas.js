// JavaScript Document
 const musicList = [
            { title: "Música 1", file: "musicas/De-manha-Carlos-a-noite-Clarisse.mp3", cover: "musicas/capas/Pinguim.webp" },
            { title: "Música 2", file: "musicas/pinguim.mp3", cover: "capa2.jpg" },
            { title: "Música 3", file: "musica3.mp3", cover: "capa3.jpg" }
        ];

        const audio = document.getElementById("audioPlayer");
        const cover = document.getElementById("cover");
        const musicTitle = document.getElementById("musicTitle");
        let currentMusicIndex = 0;

        function loadMusic(index) {
            const music = musicList[index];
            audio.src = music.file;
            cover.src = music.cover;
            musicTitle.innerText = music.title;
            audio.play();
        }

        function playPause() {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        }

        function stopMusic() {
            audio.pause();
            audio.currentTime = 0;
        }

        function setVolume(value) {
            audio.volume = value;
        }

        function nextMusic() {
            currentMusicIndex = (currentMusicIndex + 1) % musicList.length;
            loadMusic(currentMusicIndex);
        }

        function generateMusicList() {
            const listContainer = document.getElementById("musicList");
            listContainer.innerHTML = "";
            musicList.forEach((music, index) => {
                const musicItem = document.createElement("div");
                musicItem.innerText = music.title;
                musicItem.onclick = () => loadMusic(index);
                listContainer.appendChild(musicItem);
            });
        }

        generateMusicList();