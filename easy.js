const questions = [
    {
        question: "Qual é a capital do Brasil?",
        options: ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"],
        answer: 1
    },
    {
        question: "Qual é a cor do céu?",
        options: ["Verde", "Azul", "Vermelho", "Amarelo"],
        answer: 1
    },
    {
        question: "Qual animal é conhecido como o 'rei da selva'?",
        options: ["Tigre", "Leão", "Elefante", "Urso"],
        answer: 1
    },
    {
        question: "Qual é 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: 1
    },
    {
        question: "Quantas patas tem um cachorro?",
        options: ["2", "4", "6", "8"],
        answer: 1
    },
    {
        question: "Qual fruta é conhecida como a 'banana verde'?",
        options: ["Banana", "Maçã", "Laranja", "Pera"],
        answer: 0
    },
    {
        question: "Qual é o som que um gato faz?",
        options: ["Miau", "Au Au", "Rugido", "Cacarejo"],
        answer: 0
    },
    {
        question: "Qual é a estação mais fria do ano?",
        options: ["Verão", "Inverno", "Primavera", "Outono"],
        answer: 1
    },
    {
        question: "Qual é a capital da França?",
        options: ["Londres", "Paris", "Berlim", "Madri"],
        answer: 1
    },
    {
        question: "O que a abelha produz?",
        options: ["Leite", "Mel", "Água", "Vinho"],
        answer: 1
    }
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
