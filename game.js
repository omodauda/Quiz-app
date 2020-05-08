//jshint esversion:6
const question = document.getElementById("Question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Which is the fifth letter of the Alphabets?",
    choice1: "E",
    choice2: "G",
    choice3: "Z",
    choice4: "U",
    answer: 1
  },
  {
    question: "In what year did Nigeria gained independence?",
    choice1: "1963",
    choice2: "1966",
    choice3: "1960",
    choice4: "1961",
    answer: 3
  },
  {
    question: "Best football club in the world?",
    choice1: "Chelsea f.c",
    choice2: "Bayern Munich",
    choice3: "Manchester United",
    choice4: "F.C Barcelona",
    answer: 4
  },
  {
    question: "The greatest rapper?",
    choice1: "Kendrick Lamar",
    choice2: "J.Cole",
    choice3: "Tu Pac",
    choice4: "Speedy Darlington",
    answer: 2
  },
  {
    question: "The best football player?",
    choice1: "Diego Maradona",
    choice2: "Lionel Messi",
    choice3: "Cristiano Ronaldo",
    choice4: "Ahmed Musa",
    answer: 2
  },
  {
    question: "Best social media app?",
    choice1: "Twitter",
    choice2: "Facebook",
    choice3: "Tinder",
    choice4: "Tik Tok",
    answer: 1
  }
];

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 5;

startGame = () =>{
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () =>{

  if(availableQuestions.length ===0 || questionCounter >= MAX_QUESTIONS){
    localStorage.setItem('mostRecentScore', score);

    //go to end page
    return window.location.assign('end.html');
  }
  questionCounter+=1;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach( choice => {
    const number = choice.dataset.number;
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice =>{
  choice.addEventListener("click", e =>{
    if(!acceptingAnswers)return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset.number;

    let classToApply = 'incorrect';
    if(selectedAnswer == currentQuestion.answer){
      classToApply = 'correct';
    }

    if(classToApply === 'correct'){
      incrementSCore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    selectedChoice.style.color = "white";
    setTimeout( () =>{
      selectedChoice.parentElement.classList.remove(classToApply);
      selectedChoice.style.color = "black";
    },1500);
    document.getElementById("next").addEventListener("click", (getNewQuestion));


  });
});

incrementSCore = num =>{
  score +=num;
  scoreText.innerText = score;
};

startGame();
