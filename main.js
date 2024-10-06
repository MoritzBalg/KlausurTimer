const currentTimeUpdateInterval = 1000;
const timerUpdateInterval = 1000;

const config = {
    title: undefined,
    subtitle: undefined,
    aids: undefined,
    time: undefined,
    time_left: undefined,
    showTime: false,
    showDate: false,
    showLogs: false,
    toiletCount: 0
};

let intervalId = undefined;
let currentTimeIntervalId = undefined;
let paused = false;

window.addEventListener('load', () => {
    toggleModal('modal_setup');
    const form = document.getElementById('form_setup');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        config.title = formData.get('in_title');
        config.subtitle = formData.get('in_subtitle');
        config.aids = formData.get('in_aids');
        config.showTime = formData.get('in_show-time') ?? false;
        config.showDate = formData.get('in_show-date') ?? false;
        config.showLogs = formData.get('in_show-logs') ?? false;
        config.toiletCount = parseInt(formData.get('in_toilets') ?? 0);
        if(config.showTime && !currentTimeIntervalId){
            enableCurrentTimeDisplay();
        }
        if(!config.showTime && currentTimeIntervalId){
            disableCurrentTimeDisplay();
        }
        if(config.showDate){
            enableDateDisplay();
        }else{
            disableDateDisplay();
        }
        if(config.showLogs){
            document.getElementById('logs-container').style.display = 'block';
        }else{
            document.getElementById('logs-container').style.display = 'none';
        }
        initializeToilets();
        let seconds = 0;
        seconds += formData.get('in_time').split(':')[0] * 3600;
        seconds += formData.get('in_time').split(':')[1] * 60;
        config.time = seconds;
        toggleModal('modal_setup');
        loadContent();
    });
});

function loadContent() {
    config.time_left = config.time;
    document.getElementById('title').innerText = config.title;
    document.getElementById('subtitle').innerText = config.subtitle;
    document.getElementById('aids').innerText = 'Zugelassene Hilfsmittel: ' + config.aids;
    reset();
}

function updateTime() {
    if (config.time_left > 0) {
        document.getElementById('time').innerHTML = secondsToHms(
            config.time_left--
        );
    } else {
        stop();
        document.getElementById('time').innerText = 'ENDE';
        document.getElementById('message').innerText = 'Die Klausur ist beendet.\nLegen sie ihre Stifte weg.'
    }
}

function updateCurrentTime() {
    console.log('updating current time');
    document.getElementById('current-time').innerText = (new Date).toLocaleTimeString();
}

function secondsToHms(seconds) {
    seconds = Number(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);
    const hDisplay = h < 10 ? '0' + h : h;
    const mDisplay = m < 10 ? '0' + m : m;
    const sDisplay = s < 10 ? '0' + s : s;

    return hDisplay + ':' + mDisplay + ':' + sDisplay;
}

function enableCurrentTimeDisplay(){
    currentTimeIntervalId = setInterval(updateCurrentTime, currentTimeUpdateInterval);
}

function disableCurrentTimeDisplay(){
    clearInterval(currentTimeIntervalId);
    document.getElementById('current-time').innerHTML = '';
    currentTimeIntervalId = undefined;
}

function enableDateDisplay(){
    document.getElementById('date').innerText = `- ${(new Date).toLocaleDateString(undefined, {day: '2-digit', month: '2-digit', year: 'numeric'})} -`;
}

function disableDateDisplay(){
    document.getElementById('date').innerText = '';
}

function initializeToilets(){
    document.getElementById('toilet-wrapper').innerHTML = '';
    for(let i = 0; i < config.toiletCount; i++){
        const toiletDisplay = document.createElement('span');
        toiletDisplay.innerText = 'WC';
        toiletDisplay['data-occupied'] = false;
        toiletDisplay.addEventListener('click', () => toggleToiletOccupation(toiletDisplay));
        document.getElementById('toilet-wrapper').appendChild(toiletDisplay);
    }
}

function toggleToiletOccupation(toiletDisplay){
    if(toiletDisplay['data-occupied']){
        toiletDisplay['data-occupied'] = false;
        toiletDisplay.classList.remove('occupied');
    } else{
        toiletDisplay['data-occupied'] = true;
        toiletDisplay.classList.add('occupied');
    }
}

function logEvent(timeStamp, text){
    const entry = document.createElement('tr');
    const time = document.createElement('td');
    const message = document.createElement('td');
    time.innerText = timeStamp.toLocaleTimeString();
    message.innerText = text;
    entry.appendChild(time);
    entry.appendChild(message);
    document.getElementById('logs').appendChild(entry);
}

function clearLogs(){
    document.getElementById('logs').innerHTML = '';
}

function start() {
    if (!intervalId) {
        updateTime();
        intervalId = setInterval(updateTime, timerUpdateInterval);
        if(paused){
            logEvent(new Date(), 'Klausur fortgesetzt');
        }else{
            logEvent(new Date(), 'Klausur gestartet');
        }
        document.getElementById('message').innerText = '';
    }
}

function stop() {
    if(intervalId) {
        clearInterval(intervalId);
        intervalId = undefined;
        if (config.time_left > 0) {
            logEvent(new Date(), 'Klausur pausiert');
            paused = true;
            document.getElementById('message').innerText = 'Die Klausur wurde pausiert.';
        } else {
            logEvent(new Date(), 'Klausur beendet');
        }
    }
}

function reset() {
    stop();
    document.getElementById('time').innerText = secondsToHms(config.time);
    document.getElementById('message').innerText = 'Die Klausur hat noch nicht begonnen.';
    config.time_left = config.time;
    clearLogs();
}

function toggleModal(id) {
    const modal = document.getElementById(id);
    modal.open ? modal.close() : modal.showModal();
}
