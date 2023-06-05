var timerRunning = false;
var currentStage = 1; // Etapa atual (1 = Pomodoro, 2 = Pequena Pausa, 3 = Longa Pausa)
var remainingTime = 0;
var intervalId;

function reiniciarpomodoro() {
  var pomodoroButton = document.getElementById("pomodoroButton");
  pomodoroButton.classList.toggle("clicked");
}

function startTimer(duration, display) {
  var timer = duration * 60; // Converter para segundos
  var minutes, seconds;

  intervalId = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(intervalId);

      // Verificar qual é a próxima etapa e definir a duração correspondente
      if (currentStage === 1) {
        currentStage = 2;
        timer = 5; // Duração da Pequena Pausa em minutos
      } else if (currentStage === 2) {
        currentStage = 3;
        timer = 15; // Duração da Longa Pausa em minutos
      } else if (currentStage === 3) {
        currentStage = 1;
        timer = 25; // Duração do Pomodoro em minutos
      }
      startTimer(timer, display); // Iniciar o temporizador para a próxima etapa
    }
  }, 1000);
}

function start() {
  var display = document.getElementById("timer");
  var startButton = document.getElementById("startButton");
  var pauseButton = document.getElementById("pauseButton");
  var resumeButton = document.getElementById("resumeButton");

  startButton.style.display = "none";
  pauseButton.style.display = "inline";
  resumeButton.style.display = "none";
  timerRunning = true;

  var initialDuration = getDurationForStage(currentStage);
  startTimer(initialDuration, display);
}

function resume() {
  var display = document.getElementById("timer");
  var resumeButton = document.getElementById("resumeButton");
  var pauseButton = document.getElementById("pauseButton");

  resumeButton.style.display = "none";
  pauseButton.style.display = "inline";
  timerRunning = true;

  if (remainingTime > 0) {
    startTimer(remainingTime, display);
    remainingTime = 0;
  } else {
    // Definir a duração inicial com base na etapa atual
    var initialDuration;
    if (currentStage === 1) {
      initialDuration = 25; // Duração do Pomodoro em minutos
    } else if (currentStage === 2) {
      initialDuration = 5; // Duração da Pequena Pausa em minutos
    } else if (currentStage === 3) {
      initialDuration = 15; // Duração da Longa Pausa em minutos
    }

    startTimer(initialDuration, display);
  }
}

function pause() {
  var display = document.getElementById("timer");
  var resumeButton = document.getElementById("resumeButton");
  var pauseButton = document.getElementById("pauseButton");

  clearInterval(intervalId);
  timerRunning = false;
  pauseButton.style.display = "none";
  resumeButton.style.display = "inline";
  remainingTime = parseInt(display.textContent.split(":")[0]) + parseInt(display.textContent.split(":")[1]) / 60;
}
function reiniciarpomodoro() {
  currentStage = 1;
  resetTimer();
}

function pequenaPausa() {
  currentStage = 2;
  resetTimer();
}

function longaPausa() {
  currentStage = 3;
  resetTimer();
}

function resetTimer() {
  var display = document.getElementById("timer");
  clearInterval(intervalId);
  timerRunning = false;
  document.getElementById("resumeButton").style.display = "none";
  document.getElementById("pauseButton").style.display = "none";
  document.getElementById("startButton").style.display = "inline";
  display.textContent = getTimeStringFromMinutes(getDurationForStage(currentStage));
  remainingTime = 0;
}

function getDurationForStage(stage) {
  if (stage === 1) {
    return 25; // Duração do Pomodoro em minutos
  } else if (stage === 2) {
    return 5; // Duração da Pequena Pausa em minutos
  } else if (stage === 3) {
    return 15; // Duração da Longa Pausa em minutos
  }
}

function getTimeStringFromMinutes(minutes) {
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  return formattedMinutes + ":00";
}
