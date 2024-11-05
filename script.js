let term = '';
        const updateTerm = () => {
            term = document.getElementById('searchTerm').value;
            if (!term || term === '') {
                alert('Please enter a search term');
            } else {
                const url = https://itunes.apple.com/search?term=${term};
                const songContainer = document.getElementById('songs');
                while (songContainer.firstChild) {
                    songContainer.removeChild(songContainer.firstChild);
                }
                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        const artists = data.results;
                        return artists.map(result => {
                            const article = document.createElement('article'),
                                artist = document.createElement('p'),
                                song = document.createElement('h4'),
                                img = document.createElement('img'),
                                audio = document.createElement('audio'),
                                audioSource = document.createElement('source'),
                                controls = document.createElement('div'),
                                playBtn = document.createElement('button'),
                                pauseBtn = document.createElement('button'),
                                forwardBtn = document.createElement('button'),
                                backwardBtn = document.createElement('button');

                            artist.innerHTML = result.artistName;
                            song.innerHTML = result.trackName;
                            img.src = result.artworkUrl100;
                            audioSource.src = result.previewUrl;
                            audio.controls = false;
                            controls.classList.add('audio-controls');

                            playBtn.innerHTML = 'Play';
                            pauseBtn.innerHTML = 'Pause';
                            forwardBtn.innerHTML = 'Forward';
                            backwardBtn.innerHTML = 'Backward';

                            playBtn.addEventListener('click', () => audio.play());
                            pauseBtn.addEventListener('click', () => audio.pause());
                            forwardBtn.addEventListener('click', () => audio.currentTime += 10);
                            backwardBtn.addEventListener('click', () => audio.currentTime -= 10);

                            article.appendChild(img);
                            article.appendChild(artist);
                            article.appendChild(song);
                            article.appendChild(audio);
                            audio.appendChild(audioSource);
                            controls.appendChild(playBtn);
                            controls.appendChild(pauseBtn);
                            controls.appendChild(forwardBtn);
                            controls.appendChild(backwardBtn);
                            article.appendChild(controls);

                            songContainer.appendChild(article);
                        });
                    })
                    .catch(error => console.log('Request failed:', error));
            }
        }

        const searchBtn = document.getElementById('searchTermBtn');
        searchBtn.addEventListener('click', updateTerm);

        document.addEventListener('play', event => {
            const audio = document.getElementsByTagName('audio');
            for (let i = 0; i < audio.length; i++) {
                if (audio[i] != event.target) {
                    audio[i].pause();
                }
            }
        }, true);

        const setVolume = (volume) => {
            const audioElements = document.getElementsByTagName('audio');
            for (let i = 0; i < audioElements.length; i++) {
                audioElements[i].volume = volume;
            }
        }

        const stereoBtn = document.getElementById('stereoModeBtn');
        stereoBtn.addEventListener('click', () => setVolume(1));

        const ambientBtn = document.getElementById('ambientModeBtn');
        ambientBtn.addEventListener('click', () => setVolume(0.02));