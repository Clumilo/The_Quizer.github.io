// string - ""
// list - []
// dictionary - {} A dictionary has key-value pair


const quizData = [
  {
    question: "Who wrote the stories based on Sherlock Holmes?",
    options: ["Sir Arthur Conan Doyle", "Jane Austen", "Ernest Hemingway", "C.S. Lewis"],
    answer: "Sir Arthur Conan Doyle"
  },

  {
    question: "Who is the author of Scarlet And Ivy?",
    options: ["J.K. Rowling", "Lewis Carroll", "Stephen King", "Sophie Cleverly"],
    answer: "Sophie Cleverly"
  },

  {
    question: "Who is the great enchanter in King Authur?",
    options: ["Sir Launcelot", "Merlin", "Sir Percivale", "Sir Hector"],
    answer: "Merlin"
  },

  {
    question: "Which of the following is a ICE type in Pokemon?",
    options: ["Dragonite", "Scatterbug", "Beedrill", "Abomasnow"],
    answer: "Abomasnow"
  },

  {
    question: "Which of the following is a FIRE type in Pokemon?",
    options: ["Aerodactyl", "Diggersby", "Eelektross", "Heatran"],
    answer: "Heatran"
  },

  {
    question: "Which of the following is a WATER type in Pokemon?",
    options: ["Aromatise", "Bewear", "Cursola", "Quagsire"],
    answer: "Quagsire"
  },

  {
    question: "Which of the following is a Mythical Pokemon?",
    options: ["Cottonee", "Kommo-O", "Meloetta", "Gyrados"],
    answer: "Meloetta"
  }
];

const questionElement = document.getElementById("question");
const startButton = document.getElementById("start-btn");
const timerElement = document.getElementById("timer");
const timerText = document.getElementById("countdown");
const progressBar = document.getElementById("progress-bar");
const progressBarContainer = document.getElementById("progress-bar-container");
const optionsElement = document.getElementById("option-container")
const resultElement = document.getElementById("result")


progressBar.style.width = '0%'

let currentQuestion = 0;
let score = 0;
let timer = 0;

startButton.addEventListener('click', startQuiz)

function startQuiz()
{
  startButton.style.display = 'none'; 
  progressBarContainer.style.display = 'block';
  resultElement.textContent = `You scored ${score} points ~(>_<)~`;
  loadQuestion();
}

function loadQuestion()
{
  clearInterval(timer);

  if(currentQuestion < quizData.length)
  {
    // update the progress bar
    progressBar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;

    const currentQuizData = quizData[currentQuestion];
    questionElement.textContent = currentQuizData.question;

    // set initial countdown value
    timerText.textContent = 10;

    // clone 4 option buttons
    optionsElement.innerHTML = ''; // (clearing previous options...)

    currentQuizData.options. forEach((option) => {
      const button = document.createElement('button');
      button.textContent = option;
      button.classList.add('option-btn');
      optionsElement.appendChild(button);

      button.addEventListener('click', () => {
        checkAnswer(option)
      })
    });

    // kick start timer for current question
    timer = setInterval(() => {
      timerText.textContent = parseInt(timerText.textContent) - 1;

      // check if time is up
      if(parseInt(timerText.textContent) === 0 )
      {
        // reset the timer
        clearInterval(timer);

        currentQuestion = currentQuestion + 1;

        loadQuestion();
      } 

    }, 1000);
  } else
  {
    endQuiz();
  }
}

function checkAnswer(option)
{
  const currentQuizData = quizData[currentQuestion];

  if(option === currentQuizData.answer)
  {
    score++;
  }

  resultElement.textContent = `You scored ${score} points ~ (>_<) ~`;
  currentQuestion++;
  loadQuestion();
}

function endQuiz()
{
  progressBarContainer.style.display = 'none'
  questionElement.textContent = "This Quiz Has Ended. Have A Great Day! ~(^_^)~"
  optionsElement.style.display = 'none'
  timerElement.style.display = 'none'
}