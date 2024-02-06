const question = [
    {
      question: "Which is Largest animal in the world?",
      answer: [
        { text: "Shark", correct: false },
        { text: "Blue Whale", correct: true },
        { text: "Elephant", correct: false },
        { text: "Giraffe", correct: false },
      ],
    },
    {
      question: "Which is the smartest animal in the world?",
      answer: [
        { text: "Spider", correct: false },
        { text: "Hamster", correct: false },
        { text: "Orangutan", correct: true },
        { text: "Rabbit", correct: false },
      ],
    },
    {
      question: "Which one is a carnivorous animal?",
      answer: [
        { text: "Hyena", correct: true },
        { text: "Chicken", correct: false },
        { text: "Elephant", correct: false },
        { text: "Giraffe", correct: false },
      ],
    },
    {
      question: "Which is the fastest animal in the world?",
      answer: [
        { text: "Cheetah", correct: true },
        { text: "Cow", correct: false },
        { text: "Lion", correct: false },
        { text: "Tiger", correct: false },
      ],
    },
    {
      question: "Which animal is venomous?",
      answer: [
        { text: "Monkey", correct: false },
        { text: "Horse", correct: false },
        { text: "Donkey", correct: false },
        { text: "Snake", correct: true },
      ],
    }
  ];
  
  const questionElement = document.getElementById("quiz");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
  }
  
  function showQuestions(){
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  
    currentQuestion.answer.forEach((answer) => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if(answer.correct){
         button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  function selectAnswer(e){
      const selectedBtn = e.target;
      const isCorrect = selectedBtn.dataset.correct == "true"; 
      if(isCorrect){
          selectedBtn.classList.add("correct");
          score++;
      } else {
          selectedBtn.classList.add("incorrect");
      }
      Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
          button.disabled = true;
      });
      nextButton.style.display = "block";
  }
  
  function showScore(){
      resetState();
      let maxScore = (score/question.length) * 100; 
      questionElement.innerHTML = `You Scored ${maxScore}% ${score} out of ${question.length}!`;
      nextButton.innerHTML = "Play Again";
      nextButton.style.display = "block";
  }
  
  function handleNextButton(){
      currentQuestionIndex++;
      if(currentQuestionIndex < question.length){
          showQuestions();
      }else{
          showScore();
      }
  }
  
  nextButton.addEventListener("click", () => {
      if(currentQuestionIndex < question.length){
          handleNextButton();
      } else {
          startQuiz();
      }
  });
  
  startQuiz();
  