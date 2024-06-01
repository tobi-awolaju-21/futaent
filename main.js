let currentQuestion = 0;

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

async function loadQuestions() {
  try {
    const response = await fetch('question.json');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const myJson = await response.json();
    displayQuestion(currentQuestion, myJson);

    nextBtn.addEventListener("click", () => {
      currentQuestion++;
      displayQuestion(currentQuestion, myJson);
    });

    prevBtn.addEventListener("click", () => {
      currentQuestion--;
      displayQuestion(currentQuestion, myJson);
    });
  } catch (error) {
    console.error('Failed to load questions:', error);
  }
}

function displayQuestion(index, data) {
  const question = Object.values(data)[index].q;
  const answer = Object.values(data)[index].a;
  var questionNumber = index;
  questionEl.textContent = index+". "+question;
  answerEl.textContent = answer;
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === Object.keys(data).length - 1;
}

loadQuestions(); // Fetch and display the first question
