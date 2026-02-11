const BASE_URL = "http://localhost:8080";

/* 1️⃣ GET ALL QUESTIONS */
function getAllQuestions() {
    fetch(`${BASE_URL}/question/allQuestions`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("questionList").innerHTML =
                data.map(q => `<p>${q.questionTitle}</p>`).join("");
        });
}

/* 2️⃣ GET QUESTIONS BY CATEGORY */
function getByCategory() {
    const category = document.getElementById("cat").value;
    fetch(`${BASE_URL}/question/category/${category}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("questionList").innerHTML =
                data.map(q => `<p>${q.questionTitle}</p>`).join("");
        });
}

/* 3️⃣ ADD QUESTION */
function addQuestion() {
    const question = {
        category: "Java",
        difficultylevel: "Easy",
        questionTitle: "What is JVM?",
        option1: "Java Virtual Machine",
        option2: "Java Memory",
        option3: "Just VM",
        option4: "None",
        rightAnswer: "Java Virtual Machine"
    };

    fetch(`${BASE_URL}/question/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(question)
    })
    .then(res => res.text())
    .then(msg => alert(msg));
}

/* 4️⃣ CREATE QUIZ */
function createQuiz() {
    const category = document.getElementById("category").value;
    const numQ = document.getElementById("numQ").value;
    const title = document.getElementById("title").value;

    fetch(`${BASE_URL}/quiz/create?category=${category}&numQ=${numQ}&title=${title}`, {
        method: "POST"
    })
    .then(res => res.text())
    .then(data => document.getElementById("createMsg").innerText = data);
}

/* 5️⃣ GET QUIZ QUESTIONS */
function loadQuiz() {
    const quizId = document.getElementById("quizId").value;

    fetch(`${BASE_URL}/quiz/get/${quizId}`)
        .then(res => res.json())
        .then(data => renderQuestions(data));
}


function renderQuestions(questions) {
    const quizArea = document.getElementById("quizArea");
    quizArea.innerHTML = "";

    questions.forEach((q, index) => {
        quizArea.innerHTML += `
            <div class="question-card" data-id="${q.id}">
                <h3>Q${index + 1}. ${q.questionTitle}</h3>

                <label class="option">
                    <input type="radio" name="q${q.id}" value="${q.option1}">
                    ${q.option1}
                </label>

                <label class="option">
                    <input type="radio" name="q${q.id}" value="${q.option2}">
                    ${q.option2}
                </label>

                <label class="option">
                    <input type="radio" name="q${q.id}" value="${q.option3}">
                    ${q.option3}
                </label>

                <label class="option">
                    <input type="radio" name="q${q.id}" value="${q.option4}">
                    ${q.option4}
                </label>
            </div>
        `;
    });
}



//function displayQuiz(questions) {
//    const quizArea = document.getElementById("quizArea");
 //   quizArea.innerHTML = "";

//    questions.forEach((q, i) => {
//        quizArea.innerHTML += `
//            <div class="question-card" data-id="${q.id}">
//                <h3>Q${i + 1}. ${q.questionTitle}</h3>
//                <label class="option"><input type="radio" name="q${q.id}" value="${q.option1}"> ${q.option1}</label>
//                <label class="option"><input type="radio" name="q${q.id}" value="${q.option2}"> ${q.option2}</label>
//                <label class="option"><input type="radio" name="q${q.id}" value="${q.option3}"> ${q.option3}</label>
//                <label class="option"><input type="radio" name="q${q.id}" value="${q.option4}"> ${q.option4}</label>
//            </div>
//        `;
//    });
//}

/* 6️⃣ SUBMIT QUIZ */
function submitQuiz() {
    const quizId = document.getElementById("quizId").value;
    const responses = [];

    document.querySelectorAll(".question-card").forEach(card => {
        const qid = card.getAttribute("data-id");
        const selected = card.querySelector("input[type=radio]:checked");
        if (selected) {
            responses.push({ id: qid, response: selected.value });
        }
    });

    fetch(`${BASE_URL}/quiz/submit/${quizId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(responses)
    })
    .then(res => res.json())
    .then(score => alert("Your Score: " + score));
}

