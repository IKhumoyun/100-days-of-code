export const videoPlayerInit = (someWord) => {
    const videoPlayer = document.querySelector(".video-player");
    const videoButtonPlay = document.querySelector(".video-button__play");
    const videoButtonStop = document.querySelector(".video-button__stop");
    const videoTimePassed = document.querySelector(".video-time__passed");
    const videoProgress = document.querySelector(".video-progress");
    const videoTimeTotal = document.querySelector(".video-time__total");
    const videoVolume = document.querySelector(".video-volume");
    const videoVolumeIcon = document.querySelector(".video-volume-icon");

    const toggleIcon = () => {
        if(videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    };

    const togglePlay = () => {
        if(videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }

        toggleIcon();
    }

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    const addZero = (n) => n < 10 ? '0' + n : n; 

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('volumechange', () => {
        let videoVolumePercent = videoPlayer.volume * 100;
        console.log(videoVolumePercent);
        if(videoVolumePercent == 0) {
            videoVolumeIcon.classList.add("fa-volume-off");
            videoVolumeIcon.classList.remove("fa-volume-down");
            videoVolumeIcon.classList.remove("fa-volume-up");
        } else if (videoVolumePercent >= 50) {
            videoVolumeIcon.classList.remove("fa-volume-off");
            videoVolumeIcon.classList.remove("fa-volume-down");
            videoVolumeIcon.classList.add("fa-volume-up");
        } else if (videoVolumePercent > 0) {
            videoVolumeIcon.classList.remove("fa-volume-off");
            videoVolumeIcon.classList.add("fa-volume-down");
            videoVolumeIcon.classList.remove("fa-volume-up");
        } 
    });

    videoVolume.addEventListener('change', () => {
        videoPlayer.volume = videoVolume.value / 100;
    });

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime/duration) * 100;

        let minutePassed = Math.floor(currentTime / 60 );
        let secondsPassed = Math.floor(currentTime % 60 );

        let minutesTotal = Math.floor(duration / 60 );
        let secondsTotal = Math.floor(duration % 60 );

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    });

    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;

    });
}