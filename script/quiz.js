const questions = [
    {
        question: "Ce tip de legătură chimică se formează prin transfer complet de electroni de la un atom la altul?",
        answers: [
            { text: "Legătură covalentă", correct: false },
            { text: "Legătură ionică", correct: true },
            { text: "Legătură metalică", correct: false },
            { text: "Legătură de hidrogen", correct: false },
        ]
    },
    {
        question: "Care dintre următoarele substanțe prezintă legături covalente?",
        answers: [
            { text: "NaCl", correct: false },
            { text: "H₂O", correct: true },
            { text: "MgO", correct: false },
            { text: "KBr", correct: false },
        ]
    },
    {
        question: "Care dintre următoarele afirmații despre legătura metalică este adevărată?",
        answers: [
            { text: "Electronii sunt localizați în jurul fiecărui nucleu individual", correct: false },
            { text: "Electronii sunt delocalizați și formează un nor electronic", correct: true },
            { text: "Se formează între un metal și un nemetal", correct: false },
            { text: "Implică partajarea a două perechi de electroni între atomi", correct: false },
        ]
    },
    {
        question: "Ce tip de forțe intermoleculare sunt responsabile pentru solubilitatea apei în alcool?",
        answers: [
            { text: "Forțe de dispersie", correct: false },
            { text: "Forțe ion-dipol", correct: false },
            { text: "Legături de hidrogen", correct: true },
            { text: "Forțe Van der Waals", correct: false },
        ]
    },
    {
        question: "Care dintre următoarele substanțe este solubilă în apă?",
        answers: [
            { text: "NaCl", correct: true },
            { text: "CH₄", correct: false },
            { text: "C₆H₆ (benzen)", correct: false },
            { text: "O₂", correct: false },
        ]
    },
    {
        question: "Ce se întâmplă cu solubilitatea unui gaz în apă atunci când temperatura crește?",
        answers: [
            { text: "Crește", correct: false },
            { text: "Rămâne constantă", correct: false },
            { text: "Scade", correct: true },
            { text: "Nu este influențată", correct: false },
        ]
    },
    {
        question: "Ce tip de legătură chimică este prezentă în molecula de oxigen (O₂)?",
        answers: [
            { text: "Legătură covalentă", correct: true },
            { text: "Legătură ionică", correct: false },
            { text: "Legătură metalică", correct: false },
            { text: "Legătură de hidrogen", correct: false },
        ]
    },
    {
        question: "Care dintre următoarele substanțe nu conduce electricitatea în stare solidă, dar conduce în soluție apoasă?",
        answers: [
            { text: "Cu", correct: false },
            { text: "NaCl", correct: true },
            { text: "C (grafit)", correct: false },
            { text: "S (sulf)", correct: false },
        ]
    },
    {
        question: "De ce uleiul nu se dizolvă în apă?",
        answers: [
            { text: "Pentru că este o substanță polară", correct: false },
            { text: "Pentru că este o substanță ionică", correct: false },
            { text: "Pentru că este o substanță apolară", correct: true },
            { text: "Pentru că are o densitate mai mică decât apa", correct: false },
        ]
    },
    {
        question: "Ce caracterizează o legătură covalentă polară?",
        answers: [
            { text: "Electronii sunt transferați complet de la un atom la altul", correct: false },
            { text: "Electronii sunt distribuiți uniform între atomi", correct: false },
            { text: "Electronii sunt partajați, dar atrași mai puternic de un atom", correct: true },
            { text: "Apare doar între atomi de metal", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();  // Asigură că întrebările anterioare sunt șterse
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = "true";  // Marchez corect fără a crește scorul
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

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;  // Creștem scorul doar la selecția corectă
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showFinal() {
    resetState();
    questionElement.innerHTML = `Scorul tău este ${score} din ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showFinal();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
