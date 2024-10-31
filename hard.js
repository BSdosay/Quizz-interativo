const questions = [
    {
        question: "Qual é a fórmula química do metano?",
        options: ["CH4", "C2H6", "CO2", "H2O"],
        answer: 0
    },
    {
        question: "Quem foi o primeiro homem a pisar na Lua?",
        options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"],
        answer: 1
    },
    {
        question: "Qual é a teoria que explica a origem do universo?",
        options: ["Teoria da Relatividade", "Teoria do Big Bang", "Teoria da Evolução", "Teoria Quântica"],
        answer: 1
    },
    {
        question: "Qual é a capital da Islândia?",
        options: ["Reykjavik", "Oslo", "Copenhague", "Estocolmo"],
        answer: 0
    },
    {
        question: "Quem pintou a 'Mona Lisa'?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        answer: 2
    },
    {
        question: "Qual é o maior deserto do mundo?",
        options: ["Sahara", "Gobi", "Ártico", "Antártico"],
        answer: 3
    },
    {
        question: "Qual é a principal fonte de energia da Terra?",
        options: ["Vento", "Sol", "Água", "Carvão"],
        answer: 1
    },
    {
        question: "Qual é a velocidade da luz?",
        options: ["300.000 km/s", "150.000 km/s", "600.000 km/s", "1.000.000 km/s"],
        answer: 0
    },
    {
        question: "Qual foi a primeira civilização a usar a escrita?",
        options: ["Sumérios", "Egípcios", "Babilônios", "Minoicos"],
        answer: 0
    },
    {
        question: "Qual é o elemento mais abundante no universo?",
        options: ["Oxigênio", "Carbono", "Hidrogênio", "Nitrogênio"],
        answer: 2
    },
    // Adicione mais 20 perguntas...
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
