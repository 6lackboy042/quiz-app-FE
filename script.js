const questions = [
  {
    question: "What is the capital of Nigeria?",
    answers: [
      { text: "Lagos", correct: false },
      { text: "Abuja", correct: true },
      { text: "Kano", correct: false },
      { text: "Port Harcourt", correct: false }
    ]
  },
  {
    question: "Which food is a popular Nigerian swallow?",
    answers: [
      { text: "Jollof Rice", correct: false },
      { text: "Pounded Yam", correct: true },
      { text: "Fried Rice", correct: false },
      { text: "Spaghetti", correct: false }
    ]
  },
  {
    question: "What does 'How far?' mean in Nigerian slang?",
    answers: [
      { text: "How distant?", correct: false },
      { text: "What's up?", correct: true },
      { text: "Go away", correct: false },
      { text: "Be careful", correct: false }
    ]
  },
  {
    question: "Which Nigerian artist sang 'Essence'?",
    answers: [
      { text: "Davido", correct: false },
      { text: "Wizkid", correct: true },
      { text: "Burna Boy", correct: false },
      { text: "Olamide", correct: false }
    ]
  },
  {
    question: "Which language is used to style web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "JavaScript", correct: false },
      { text: "Python", correct: false }
    ]
  },
  {
    question: "Inside which HTML tag do we write JavaScript?",
    answers: [
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<script>", correct: true },
      { text: "<code>", correct: false }
    ]
  },
  {
    question: "Which one is NOT a Nigerian city?",
    answers: [
      { text: "Ibadan", correct: false },
      { text: "Enugu", correct: false },
      { text: "Accra", correct: true },
      { text: "Kaduna", correct: false }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Style System", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Colorful Style Syntax", correct: false }
    ]
  },
  {
    question: "Which Nigerian dish is famous worldwide?",
    answers: [
      { text: "Jollof Rice", correct: true },
      { text: "Pizza", correct: false },
      { text: "Burger", correct: false },
      { text: "Sushi", correct: false }
    ]
  },
  {
    question: "What is the correct way to declare a variable in JavaScript?",
    answers: [
      { text: "var myVar;", correct: true },
      { text: "variable myVar;", correct: false },
      { text: "v myVar;", correct: false },
      { text: "declare myVar;", correct: false }
    ]
  },
  {
    question: "Which Nigerian currency is used?",
    answers: [
      { text: "Dollar", correct: false },
      { text: "Naira", correct: true },
      { text: "Pounds", correct: false },
      { text: "Euro", correct: false }
    ]
  },
  {
    question: "What will 'typeof 123' return in JavaScript?",
    answers: [
      { text: "string", correct: false },
      { text: "number", correct: true },
      { text: "integer", correct: false },
      { text: "object", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const progressEl = document.getElementById("progress");

// create timer display
const timerEl = document.createElement("div");
timerEl.style.marginTop = "10px";
document.querySelector(".quiz-container").appendChild(timerEl);

// restart button
const restartBtn = document.createElement("button");
restartBtn.innerText = "Restart Quiz";
restartBtn.style.display = "none";
restartBtn.style.background = "orange";
document.querySelector(".quiz-container").appendChild(restartBtn);

function startTimer() {
  timeLeft = 10;
  timerEl.innerText = `Time left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = `Time left: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timer);
      disableAnswers();
      nextBtn.style.display = "block";
    }
  }, 1000);
}

function showQuestion() {
  resetState();
  startTimer();

  const currentQuestion = questions[currentQuestionIndex];
  progressEl.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionEl.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;

    button.addEventListener("click", () => selectAnswer(button, answer));
    answersEl.appendChild(button);
  });
}

function resetState() {
  clearInterval(timer);
  nextBtn.style.display = "none";
  answersEl.innerHTML = "";
}

function selectAnswer(button, answer) {
  clearInterval(timer);

  if (answer.correct) {
    score++;
    button.style.background = "green";
  } else {
    button.style.background = "red";
  }

  // highlight correct answer
  Array.from(answersEl.children).forEach(btn => {
    const ans = questions[currentQuestionIndex].answers.find(a => a.text === btn.innerText);
    if (ans.correct) {
      btn.style.background = "green";
    }
    btn.disabled = true;
  });

  nextBtn.style.display = "block";
}

function disableAnswers() {
  Array.from(answersEl.children).forEach(btn => {
    btn.disabled = true;
  });
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  questionEl.innerText = `You scored ${score} out of ${questions.length}! 🇳🇬`;
  answersEl.innerHTML = "";
  nextBtn.style.display = "none";
  progressEl.innerText = "Quiz Completed";
  timerEl.innerText = "";

  restartBtn.style.display = "block";
}

restartBtn.addEventListener("click", restartQuiz);

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  restartBtn.style.display = "none";
  showQuestion();
}

// start quiz
showQuestion();