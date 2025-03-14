// JavaScript Document
 const musicList = [
            { title: "É assim que nasce o Atum em lata crianças!", file: "musicas/E-assim-que-nasce-o-atum.mpeg", cover: "musicas/capas/E-assim-que-nasce-o-atum.jfif" },
            { title: "Pum Pas Tras", file: "musicas/Pum-pas-tras.mp3", cover: "musicas/capas/pum-pas-tras.jpeg" },
            { title: "História de Encantar Moderna", file: "musicas/historia-de-encantar-moderna.mp3", cover: "musicas/capas/historia-de-encantar.webp" },
            { title: "Abacaxi Homicida", file: "musicas/abacaxi-homicida.mp3", cover: "musicas/capas/abacaxi-homicida.webp" },
            { title: "Telmo o Viquingue", file: "musicas/Telmo-viquingue.mp3", cover: "musicas/capas/Telmo.jpeg" },
            { title: "De manhã Carlos à noite Clarisse", file: "musicas/De-manha-Carlos-a-noite-Clarisse.mp3", cover: "musicas/capas/Clarisse.jfif" },
            { title: "Pinguim Maroto", file: "musicas/Pinguim.mp3", cover: "musicas/capas/Pinguim.jfif" },
            { title: "Hora da Pilha", file: "musicas/Hora-da-pilha.mp3", cover: "musicas/capas/Pilhas-duracell.jfif" }
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
            highlightPlaying(index);
        }

        function highlightPlaying(index) {
            const items = document.querySelectorAll(".music-list div");
            items.forEach((item, i) => {
                if (i === index) {
                    item.classList.add("playing");
                } else {
                    item.classList.remove("playing");
                }
            });
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
