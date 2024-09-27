const config = {
    title: undefined,
    aids: undefined,
    date: undefined,
    time: undefined,
    time_left: undefined,
};

let intervalId = undefined;

window.addEventListener('load', () => {
    document.getElementById('in_date').valueAsDate = new Date();
    toggleModal('modal_setup');
    const form = document.getElementById('form_setup');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        config.title = formData.get('in_title');
        config.date = new Date(formData.get('in_date'));
        config.aids = formData.get('in_aids');
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
    document.getElementById('title').innerHTML = config.title;
    document.getElementById('date').innerHTML = '- ' + config.date.toLocaleDateString(undefined, {day: '2-digit', month: '2-digit', year: 'numeric'}) + ' -';
    document.getElementById('aids').innerHTML = 'Hilfsmittel: ' + config.aids;
    document.getElementById('time').innerHTML = secondsToHms(config.time);
}

function updateTime() {
    if (config.time_left > 0) {
        document.getElementById('time').innerHTML = secondsToHms(
            config.time_left--
        );
    } else {
        stop();
        document.getElementById('time').innerHTML = 'ENDE';
    }
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

function start() {
    if (!intervalId) {
        updateTime();
        intervalId = setInterval(updateTime, 1000);
    }
}

function stop() {
    clearInterval(intervalId);
    intervalId = undefined;
}

function reset() {
    stop();
    document.getElementById('time').innerHTML = secondsToHms(config.time);
    config.time_left = config.time;
}

function toggleModal(id) {
    const modal = document.getElementById(id);
    modal.open ? modal.close() : modal.showModal();
}
