// Gestion des thèmes
const themeToggle = document.getElementById('themeToggle');
let isDark = false;

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Gestion des tabs
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// Horloge
function updateClock() {
    const now = new Date();
    const timeDisplay = document.querySelector('#clock .time');
    const dateDisplay = document.querySelector('#clock .date');
    
    timeDisplay.textContent = now.toLocaleTimeString();
    dateDisplay.textContent = now.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

setInterval(updateClock, 1000);
updateClock();

// Minuteur
let timerInterval;
const timerDisplay = document.querySelector('#timer .time');
const timerStartBtn = document.getElementById('timer-start');
const timerResetBtn = document.getElementById('timer-reset');

timerStartBtn.addEventListener('click', () => {
    if (timerStartBtn.textContent === 'Démarrer') {
        startTimer();
    } else {
        pauseTimer();
    }
});

timerResetBtn.addEventListener('click', resetTimer);

function startTimer() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;
    
    if (totalSeconds <= 0) return;
    
    timerStartBtn.textContent = 'Pause';
    
    timerInterval = setInterval(() => {
        totalSeconds--;
        updateTimerDisplay(totalSeconds);
        
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            alert('Minuteur terminé !');
            resetTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerStartBtn.textContent = 'Démarrer';
}

function resetTimer() {
    clearInterval(timerInterval);
    timerStartBtn.textContent = 'Démarrer';
    document.getElementById('hours').value = 0;
    document.getElementById('minutes').value = 0;
    document.getElementById('seconds').value = 0;
    timerDisplay.textContent = '00:00:00';
}

function updateTimerDisplay(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Chronomètre
let stopwatchInterval;
let stopwatchTime = 0;
const stopwatchDisplay = document.querySelector('#stopwatch .time');
const stopwatchStartBtn = document.getElementById('stopwatch-start');
const stopwatchLapBtn = document.getElementById('stopwatch-lap');
const stopwatchResetBtn = document.getElementById('stopwatch-reset');
const lapsContainer = document.querySelector('.laps');

stopwatchStartBtn.addEventListener('click', toggleStopwatch);
stopwatchLapBtn.addEventListener('click', addLap);
stopwatchResetBtn.addEventListener('click', resetStopwatch);

function toggleStopwatch() {
    if (stopwatchStartBtn.textContent === 'Démarrer') {
        startStopwatch();
    } else {
        pauseStopwatch();
    }
}

function startStopwatch() {
    stopwatchStartBtn.textContent = 'Pause';
    stopwatchInterval = setInterval(() => {
        stopwatchTime++;
        updateStopwatchDisplay();
    }, 10);
}

function pauseStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchStartBtn.textContent = 'Démarrer';
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    updateStopwatchDisplay();
    stopwatchStartBtn.textContent = 'Démarrer';
    lapsContainer.innerHTML = '';
}

function updateStopwatchDisplay() {
    const minutes = Math.floor(stopwatchTime / 6000);
    const seconds = Math.floor((stopwatchTime % 6000) / 100);
    const centiseconds = stopwatchTime % 100;
    
    stopwatchDisplay.textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;
}

function addLap() {
    const lap = document.createElement('div');
    lap.className = 'lap';
    lap.textContent = stopwatchDisplay.textContent;
    lapsContainer.insertBefore(lap, lapsContainer.firstChild);
}

// Pomodoro
let pomodoroInterval;
let pomodoroTime = 1500; // 25 minutes
const pomodoroDisplay = document.querySelector('#pomodoro .time');
const pomodoroStartBtn = document.getElementById('pomodoro-start');
const pomodoroResetBtn = document.getElementById('pomodoro-reset');
const modeDisplay = document.querySelector('#pomodoro .mode');

pomodoroStartBtn.addEventListener('click', togglePomodoro);
pomodoroResetBtn.addEventListener('click', resetPomodoro);

function togglePomodoro() {
    if (pomodoroStartBtn.textContent === 'Démarrer') {
        startPomodoro();
    } else {
        pausePomodoro();
    }
}

function startPomodoro() {
    pomodoroStartBtn.textContent = 'Pause';
    pomodoroInterval = setInterval(() => {
        pomodoroTime--;
        updatePomodoroDisplay();
        
        if (pomodoroTime <= 0) {
            clearInterval(pomodoroInterval);
            alert('Session terminée !');
            switchPomodoroMode();
        }
    }, 1000);
}

function pausePomodoro() {
    clearInterval(pomodoroInterval);
    pomodoroStartBtn.textContent = 'Démarrer';
}

function resetPomodoro() {
    clearInterval(pomodoroInterval);
    pomodoroTime = 1500;
    updatePomodoroDisplay();
    pomodoroStartBtn.textContent = 'Démarrer';
    modeDisplay.textContent = 'Travail';
}

function updatePomodoroDisplay() {
    const minutes = Math.floor(pomodoroTime / 60);
    const seconds = pomodoroTime % 60;
    pomodoroDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function switchPomodoroMode() {
    if (modeDisplay.textContent === 'Travail') {
        pomodoroTime = 300; // 5 minutes pause
        modeDisplay.textContent = 'Pause';
    } else {
        pomodoroTime = 1500; // 25 minutes travail
        modeDisplay.textContent = 'Travail';
    }
    updatePomodoroDisplay();
}
