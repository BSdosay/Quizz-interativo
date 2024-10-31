const questions = [
    {
        question: "Qual é o maior planeta do sistema solar?",
        options: ["Terra", "Júpiter", "Marte", "Saturno"],
        answer: 1
    },
    {
        question: "Qual é o continente mais populoso?",
        options: ["África", "Ásia", "América", "Europa"],
        answer: 1
    },
    {
        question: "Qual é a capital da Itália?",
        options: ["Milão", "Roma", "Veneza", "Florença"],
        answer: 1
    },
    {
        question: "Qual é a moeda do Japão?",
        options: ["Yuan", "Dólar", "Iene", "Won"],
        answer: 2
    },
    {
        question: "Quem escreveu 'Dom Casmurro'?",
        options: ["Machado de Assis", "José de Alencar", "Jorge Amado", "Clarice Lispector"],
        answer: 0
    },
    {
        question: "Qual é a capital da Austrália?",
        options: ["Sydney", "Canberra", "Melbourne", "Brisbane"],
        answer: 1
    },
    {
        question: "Em que ano começou a Segunda Guerra Mundial?",
        options: ["1939", "1941", "1945", "1935"],
        answer: 0
    },
    {
        question: "Qual é o menor país do mundo?",
        options: ["Mônaco", "Vaticano", "Nauru", "San Marino"],
        answer: 1
    },
    {
        question: "Qual é a fórmula da água?",
        options: ["H2O", "CO2", "O2", "H2O2"],
        answer: 0
    },
    {
        question: "Qual é o elemento químico com o símbolo 'O'?",
        options: ["Oxigênio", "Ouro", "Osmônio", "Ósmio"],
        answer: 0
    },
    // Adicione mais 10 perguntas...
];

let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = questions.length;

const elements = {
    quizContainer: document.getElementById("quiz-container"),
    questionElement: document.getElementById("question"),
    optionsContainer: document.getElementById("options"),
    nextButton: document.getElementById("next-button"),
    scoreContainer: document.getElementById("score-container"),
    scoreElement: document.getElementById("score"),
    restartButton: document.getElementById("restart-button"),
    feedbackElement: document.getElementById("feedback"),
    averageFeedbackElement: document.getElementById("average-feedback")
};

function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    toggleVisibility(elements.scoreContainer, false);
    toggleVisibility(elements.quizContainer, true);
    showQuestions();
}

function showQuestions() {
    if (currentQuestionIndex < totalQuestions) {
        const currentQuestion = questions[currentQuestionIndex];
        elements.questionElement.textContent = currentQuestion.question;
        renderOptions(currentQuestion.options);
    } else {
        showScore();
    }
}

function renderOptions(options) {
    elements.optionsContainer.innerHTML = "";
    options.forEach((option, index) => {
        const button = document.createElement("div");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", () => selectOption(index));
        elements.optionsContainer.appendChild(button);
    });
}

function selectOption(index) {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = index === currentQuestion.answer;
    score += isCorrect ? 1 : 0;
    elements.feedbackElement.textContent = isCorrect 
        ? "Correto!" 
        : `Incorreto. A resposta certa é: ${currentQuestion.options[currentQuestion.answer]}.`;

    toggleVisibility(elements.feedbackElement, true);
    toggleVisibility(elements.nextButton, true);
}

elements.nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    toggleVisibility(elements.nextButton, false);
    toggleVisibility(elements.feedbackElement, false);
    showQuestions();
});

function showScore() {
    toggleVisibility(elements.quizContainer, false);
    elements.scoreElement.textContent = `${score} de ${totalQuestions}`;
    elements.averageFeedbackElement.textContent = score >= totalQuestions / 2 
        ? "Parabéns! Você ficou acima da média!" 
        : "Você ficou abaixo da média.";
    toggleVisibility(elements.scoreContainer, true);
}

elements.restartButton.addEventListener("click", () => {
    initQuiz();
});

function toggleVisibility(element, isVisible) {
    element.classList.toggle("hidden", !isVisible);
}

initQuiz();
