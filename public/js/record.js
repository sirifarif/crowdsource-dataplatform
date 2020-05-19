const speakerDetailsKey = "speakerDetails";
const sentencesKey = "sentences";
const currentIndexKey = "currentIndex";
const countKey = "count";
const initialize = () => {
    const sentences = crowdSource.sentences;
    const currentSentenceLbl = document.getElementById("currentSentenceLbl");
    const totalSentencesLbl = document.getElementById("totalSentencesLbl");
    const sentenceLbl = document.getElementById("sentenceLbl");
    const $timeValue = $("#time-value");
    const $startRecordBtn = $("#startRecord");
    const $startRecordRow = $("#startRecordRow");
    const $stopRecordBtn = $("#stopRecord");
    const $reRecordBtn = $("#reRecord");
    const $visualizer = $("#visualizer");
    const $player = $("#player");
    const $nextBtn = $("#nextBtn");
    const $getStarted = $("#get-started");
    const $skipBtn = $("#skipBtn");
    const currentIndexInStorage = Number(localStorage.getItem(currentIndexKey));
    const $recordingSign = $("#recording-sign");
    const $progressBar = $(".progress-bar");
    const progressMessages = [
        "Let’s get started", "",
        "We know you can do more! ", "", "",
        "You are halfway there. Keep going!", "",
        "Just few more steps to go!", "",
        "Nine dead, one more to go!",
        "Yay! Done & Dusted!"
    ]

    function animateCSS(element, animationName, callback) {
        const node = document.querySelector(element)
        node.classList.add('animated', animationName)
        function handleAnimationEnd() {
            node.classList.remove('animated', animationName)
            node.removeEventListener('animationend', handleAnimationEnd)

            if (typeof callback === 'function') callback()
        }
        node.addEventListener('animationend', handleAnimationEnd)
    }
    const setProgressBar = (currentIndex) => {
        $progressBar.width(currentIndex * 10 + "%");
        $progressBar.prop("aria-valuenow", currentIndex);
    }
    const setSentenceText = (index) => {
        sentenceLbl.innerText = sentences[index].sentence
        animateCSS('#sentenceLbl', 'lightSpeedIn');
        currentIndex && setProgressBar(currentIndex)
    };
    const setTimeProgress = (index) => {
        const totalSeconds = (crowdSource.count + index) * 6;
        const remainingSeconds = (30 * 60) - totalSeconds;
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        $timeValue.text(`${minutes}m ${seconds}s`);
        animateCSS('#time-value', 'flash');
    };

    const setCurrentSentenceIndex = (index) => currentSentenceLbl.innerText = index;
    const setTotalSentenceIndex = (index) => totalSentencesLbl.innerText = index;

    let currentIndex = currentIndexInStorage < 0 ? 0 : currentIndexInStorage > 9 ? 9 : currentIndexInStorage;

    const totalItems = sentences.length;
    setSentenceText(currentIndex);
    setCurrentSentenceIndex(currentIndex + 1);
    setTotalSentenceIndex(totalItems);
    setTimeProgress(currentIndex);

    const notyf = new Notyf({
        duration: 3000,
        position: { x: 'right', y: 'top' },
        types: [
            {
                type: 'success',
                className: "fnt-1-5"
            },
            {
                type: 'error',
                className: "fnt-1-5"
            }
        ]
    });
    let gumStream;
    //stream from getUserMedia() 
    let rec;
    //Recorder.js object 
    let input;
    //MediaStreamAudioSourceNode we'll be recording 
    let cleartTimeoutKey;

    $startRecordBtn.add($reRecordBtn).on('click', () => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then((stream) => {
                $getStarted.hide();
                $startRecordRow.addClass('d-none');
                $stopRecordBtn.removeClass('d-none');
                $recordingSign.removeClass('d-none');
                $reRecordBtn.addClass('d-none');
                $nextBtn.addClass('d-none');
                $player.addClass('d-none');
                $player.trigger('pause');
                $visualizer.removeClass("d-none");

                gumStream = stream;
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                const audioContext = new AudioContext;
                const audioAnalyser = audioContext.createAnalyser();
                //new audio context to help us record 
                input = audioContext.createMediaStreamSource(stream);
                input.connect(audioAnalyser);
                visualize(visualizer, audioAnalyser)
                /* Create the Recorder object and configure to record mono sound (1 channel) Recording 2 channels will double the file size */
                rec = new Recorder(input, {
                    numChannels: 2
                })
                //start the recording process 
                rec.record();
                //automatically click stop button after 30 seconds
                cleartTimeoutKey = setTimeout(() => {
                    $stopRecordBtn.click()
                }, 30 * 1000);
            })
            .catch(err => {
                console.log(err)
                notyf.error("Sorry !!! We could not get access to your audio input device. Make sure you have given microphone access permission");
                $startRecordRow.removeClass('d-none');
                $stopRecordBtn.addClass("d-none");
                $nextBtn.addClass('d-none');
                $reRecordBtn.addClass('d-none');
                $recordingSign.addClass('d-none');
                $player.addClass('d-none');
                $player.trigger('pause');
                $visualizer.addClass("d-none");
            })
    });

    $stopRecordBtn.on('click', () => {
        clearTimeout(cleartTimeoutKey);
        $stopRecordBtn.addClass("d-none");
        $nextBtn.removeClass('d-none');
        $reRecordBtn.removeClass('d-none');
        $recordingSign.addClass('d-none');
        $startRecordRow.addClass("d-none");
        $player.removeClass('d-none');
        $visualizer.addClass("d-none");

        rec.stop(); //stop microphone access 
        gumStream.getAudioTracks()[0].stop();
        //create the wav blob and pass it on to createObjectURL 
        rec.exportWAV((blob) => {
            const URL = window.URL || window.webkitURL;
            const bloburl = URL.createObjectURL(blob);
            crowdSource.audioBlob = blob;
            $player.prop("src", bloburl)
        });
        if (currentIndex == totalItems - 1) {
            $getStarted.text(progressMessages[totalItems]).show();
        }
    });

    $nextBtn.add($skipBtn).on('click', (event) => {
        if(event.target.id === "nextBtn")
        {
            uploadToServer();
        }
        setTimeProgress(currentIndex + 1);
        if (currentIndex == totalItems - 1) {
            localStorage.removeItem(sentencesKey);
            localStorage.removeItem(currentIndexKey);
            notyf.success("Congratulations!!! You have completed this batch of sentences");
            setProgressBar(currentIndex);
            setTimeout(() => {
                location.href = "/thank-you";
            }, 2000);
        }
        else if (currentIndex < totalItems - 1) {
            incrementCurrentIndex();
        }

        $player.addClass('d-none');
        $player.trigger('pause');
        $nextBtn.addClass('d-none');
        $reRecordBtn.addClass('d-none');
        $startRecordRow.removeClass('d-none');
        // if (progressMessages[currentIndex] && currentIndex < totalItems - 1) {
        //     $getStarted.text(progressMessages[currentIndex]).show();
        // }
        // else {
        //     $getStarted.hide();
        // }
    });

    function incrementCurrentIndex() {
        currentIndex++;
        setSentenceText(currentIndex);
        setCurrentSentenceIndex(currentIndex + 1);
        $getStarted.text(progressMessages[currentIndex])
        localStorage.setItem(currentIndexKey, currentIndex);
    }

    function uploadToServer() {
        const fd = new FormData();
        fd.append("audio_data", crowdSource.audioBlob);
        fd.append("speakerDetails", localStorage.getItem(speakerDetailsKey));
        fd.append("sentenceId", crowdSource.sentences[currentIndex].sentenceId);
        fetch("/upload", {
            method: "POST",
            body: fd
        })
            .then(res => res.json())
            .then(result => {
            })
            .catch(err => {
                console.log(err)
            })
    }
    function visualize(visualizer, analyser) {
        const canvasCtx = visualizer.getContext("2d");
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        WIDTH = visualizer.width;
        HEIGHT = visualizer.height;
        // TODO do we need to limit the number of time visualize refreshes per second
        // so that it can run on Android processors without causing audio to drop?
        function draw() {
            // this is more efficient than calling with processor.onaudioprocess
            // and sending floatarray with each call...
            requestAnimationFrame(draw);
            analyser.getByteTimeDomainData(dataArray);
            canvasCtx.fillStyle = 'rgb(255, 255, 255, 0.8)';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = 'rgb(0,123,255)';
            canvasCtx.beginPath();
            const sliceWidth = WIDTH * 1.0 / bufferLength;
            let x = 0;
            for (let i = 0; i < bufferLength; i++) {
                let v = dataArray[i] / 128.0; // uint8
                let y = v * HEIGHT / 2; // uint8
                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }
                x += sliceWidth;
            }
            canvasCtx.lineTo(visualizer.width, visualizer.height / 2);
            canvasCtx.stroke();
        }
        draw();
    }
}
$(document).ready(() => {
    window.crowdSource = {};
    const $instructionModal = $('#instructionsModal');
    const $errorModal = $("#errorModal");
    const $loader = $("#loader");
    const $pageContent = $("#page-content");
    const $navUser = $("#nav-user");
    const $navUserName = $navUser.find("#nav-username");
    try {
        const localSpeakerData = localStorage.getItem(speakerDetailsKey);
        const localSpeakerDataParsed = JSON.parse(localSpeakerData);
        const localSentences = localStorage.getItem(sentencesKey);
        const localSentencesParsed = JSON.parse(localSentences);
        const localCount = Number(localStorage.getItem(countKey));

        $instructionModal.on('hidden.bs.modal', function (e) {
            $pageContent.removeClass('d-none');
        })
        $errorModal.on('show.bs.modal', function (e) {
            $instructionModal.modal('hide');
        })
        $errorModal.on('hidden.bs.modal', function (e) {
            location.href = "/";
        })

        if (!localSpeakerDataParsed) {
            location.href = '/';
            return;
        }

        if (localSpeakerDataParsed.userName) {
            $navUser.removeClass('d-none');
            $navUserName.text(localSpeakerDataParsed.userName);
        }

        if (localSentencesParsed && localSentencesParsed.userName === localSpeakerDataParsed.userName) {
            crowdSource.sentences = localSentencesParsed.sentences;
            crowdSource.count = localCount;
            $loader.hide();
            $pageContent.removeClass('d-none');
            initialize();
        }
        else {
            localStorage.removeItem(currentIndexKey);
            fetch('/sentences', {
                method: "POST",
                body: JSON.stringify({ userName: localSpeakerDataParsed.userName }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(data => {
                    if (!data.ok) {
                        throw Error(data.statusText || 'HTTP error');
                    }
                    else {
                        return data.json();
                    }
                })
                .then(sentenceData => {
                    $instructionModal.modal('show');
                    crowdSource.sentences = sentenceData.data;
                    crowdSource.count = Number(sentenceData.count);
                    $loader.hide();
                    initialize();
                    localStorage.setItem(sentencesKey, JSON.stringify({
                        userName: localSpeakerDataParsed.userName,
                        sentences: sentenceData.data
                    }));
                    localStorage.setItem(countKey, sentenceData.count);
                })
                .catch((err) => {
                    console.log(err);
                    $errorModal.modal('show');
                })
                .then(() => {
                    $loader.hide();
                })
        }
    }
    catch (err) {
        console.log(err);
        $errorModal.modal('show');
    }
})
