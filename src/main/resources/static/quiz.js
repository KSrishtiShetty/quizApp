const BASE_URL = "http://localhost:8080";

// CREATE QUIZ
function createQuiz() {
    const category = document.getElementById("category").value;
    const numQ = document.getElementById("numQ").value;
    const title = document.getElementById("title").value;

    fetch(`${BASE_URL}/quiz/create?category=${category}&numQ=${numQ}&title=${title}`, {
        method: "POST"
    })
    .then(res => res.text())
    .then(data => {
        document.getElementById("createMsg").innerText = data;
    });
}

// LOAD QUIZ QUESTIONS
function loadQuiz() {
    const quizId = document.getElementById("quizId").value;

    fetch(`${BASE_URL}/quiz/get/${quizId}`)
    .then(res => res.json())
    .then(data => displayQuiz(data));
}

function displayQuiz(questions) {
    const quizArea = document.getElementById("quizArea");
    quizArea.innerHTML = "";

    questions.forEach((q, index) => {
        quizArea.innerHTML += `
            <div class="question-card">
                <h3>Q${index + 1}. ${q.questionTitle}</h3>

                <div class="option">
                    <input type="radio" name="q${q.id}" value="${q.option1}">
                    ${q.option1}
                </div>

                <div class="option">
                    <input type="radio" name="q${q.id}" value="${q.option2}">
                    ${q.option2}
                </div>

                <div class="option">
                    <input type="radio" name="q${q.id}" value="${q.option3}">
                    ${q.option3}
                </div>

                <div class="option">
                    <input type="radio" name="q${q.id}" value="${q.option4}">
                    ${q.option4}
                </div>
            </div>
        `;
    });
}
