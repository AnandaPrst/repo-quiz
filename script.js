const questions = [
  {
    question: "Where do the animals below come from?",
    answers: [
      { text: "Japan", correct: false },
      { text: "China", correct: true },
      { text: "Indonesia", correct: false },
      { text: "American", correct: false },
    ],

    image: "foto/panda-removebg.png",
  },
  {
    question: "What is the animal food below?",
    answers: [
      { text: "Meat", correct: false },
      { text: "Rock", correct: false },
      { text: "Stone", correct: false },
      { text: "Grass", correct: true },
    ],

    image: "foto/cow-removebg.png",
  },
  {
    question: "Which animal has venom?",
    answers: [
      { text: "Snake", correct: true },
      { text: "Penguin", correct: false },
      { text: "Turtle", correct: false },
      { text: "Chicken", correct: false },
    ],

    image: "foto/aqz-removebg.png",
  },
  {
    question: "What is the name of the animal below? ",
    answers: [{ text: "", correct: true, correctAnswer: "Crocodile" }],
    image: "foto/croc-removebg.png",
    input: true,
  },
  {
    question: "What is the name of the animal below? ",
    answers: [{ text: "", correct: true, correctAnswer: "Lion" }],

    image: "foto/lion-removebg.png",
    input: true,
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");
const continueStudyButton = document.getElementById("continue-study-btn");
const appQuizElement = document.getElementById("app-quiz");

let currentQuestionIndex = 0;
let score = 0;

continueStudyButton.addEventListener("click", continueStudy);

function continueStudy() {
  document.getElementById("animal-quiz").style.display = "none";
  appQuizElement.style.display = "block";
  showQuestion();
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
  nextButton.removeEventListener("click", startQuiz);
  nextButton.addEventListener("click", handleNextButton);
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  const imgElement = document.getElementById("questionImage");
  imgElement.src = currentQuestion.image;

  if (currentQuestion.input) {
    const inputField = document.createElement("input");
    inputField.setAttribute("type", "text");
    inputField.setAttribute("placeholder", "Type your answer...");
    inputField.classList.add("btn");
    answerButtons.appendChild(inputField);

    nextButton.style.display = "block";
    nextButton.addEventListener("click", handleNextButton);
  } else {
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);

      if (answer.correct) {
        button.dataset.correct = answer.correct;
        button.dataset.correctAnswer = answer.correctAnswer; // Store the correct answer
      }
      button.addEventListener("click", selectAnswer);
    });
  }
}

function resetState() {
  nextButton.style.display = "none";

  // Hide the image for input questions
  const imgElement = document.getElementById("questionImage");
  imgElement.src = "";

  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");

    if (questions[currentQuestionIndex].input) {
      const inputField = answerButtons.querySelector("input");
      const userAnswer = inputField.value.trim().toLowerCase();
      const correctAnswer = selectedBtn.dataset.correctAnswer.toLowerCase();

      if (userAnswer === correctAnswer) {
        score++;
      }
    } else {
      score++;
    }
  } else {
    selectedBtn.classList.add("Incorrect");
  }

  if (questions[currentQuestionIndex].input) {
    const inputField = answerButtons.querySelector("input");
    inputField.disabled = true;
    nextButton.style.display = "block"; // Show the next button for input questions
  } else {
    Array.from(answerButtons.children).forEach((button) => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block"; // Show the next button for multiple-choice questions
  }
}

function showScore() {
  resetState();
  let maxScore = (score / questions.length) * 100;
  questionElement.innerHTML = `You Scored ${maxScore}%  ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  if (questions[currentQuestionIndex].input) {
    const inputField = answerButtons.querySelector("input");
    const userAnswer = inputField.value.trim().toLowerCase();
    const correctAnswer =
      questions[currentQuestionIndex].answers[0].correctAnswer.toLowerCase();

    if (userAnswer === correctAnswer) {
      score++;
    }
    inputField.disabled = true;
  }

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    showScore();
    nextButton.removeEventListener("click", handleNextButton);
    nextButton.addEventListener("click", startQuiz);
    nextButton.innerHTML = "Play Again";
  }
}

startQuiz();
