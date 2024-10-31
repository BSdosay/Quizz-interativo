const questions = {
    easy: [
        // Adicione suas perguntas fáceis aqui
        {
            question: "Qual é a capital do Brasil?",
            options: ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"],
            answer: 1
        },
        // ... mais perguntas
    ],
    medium: [
        // Adicione suas perguntas médias aqui
        {
            question: "Qual é o maior planeta do sistema solar?",
            options: ["Terra", "Júpiter", "Marte", "Saturno"],
            answer: 1
        },
        // ... mais perguntas
    ],
    hard: [
        // Adicione suas perguntas difíceis aqui
        {
            question: "Qual é a fórmula química do metano?",
            options: ["CH4", "C2H6", "CO2", "H2O"],
            answer: 0
        },
        // ... mais perguntas
    ]
};

let currentQuestionIndex = 0; // Índice da pergunta atual
let score = 0; // Pontuação do jogador
let totalQuestions = 0; // Total de perguntas a serem respondidas
let selectedDifficulty = ''; // Dificuldade selecionada

// Detecta a dificuldade a partir da URL
const path = window.location.pathname;
if (path.includes("easy")) {
    selectedDifficulty = "easy";
    totalQuestions = questions.easy.length;
} else if (path.includes("medium")) {
    selectedDifficulty = "medium";
    totalQuestions = questions.medium.length;
} else if (path.includes("hard")) {
    selectedDifficulty = "hard";
    totalQuestions = questions.hard.length;
}

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

// Inicializa o quiz
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    toggleVisibility(elements.scoreContainer, false);
    toggleVisibility(elements.quizContainer, true);
    showQuestions();
}

// Mostra a pergunta atual e suas opções
function showQuestions() {
    const questionSet = questions[selectedDifficulty];
    
    if (currentQuestionIndex < questionSet.length) {
        const currentQuestion = questionSet[currentQuestionIndex];
        elements.questionElement.textContent = currentQuestion.question;
        renderOptions(currentQuestion.options);
    } else {
        showScore();
    }
}

// Renderiza as opções de resposta
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

// Lida com a seleção de uma opção de resposta
function selectOption(index) {
    const questionSet = questions[selectedDifficulty];
    const currentQuestion = questionSet[currentQuestionIndex];
    
    const isCorrect = index === currentQuestion.answer;
    score += isCorrect ? 1 : 0;
    elements.feedbackElement.textContent = isCorrect 
        ? "Correto!" 
        : `Incorreto. A resposta certa é: ${currentQuestion.options[currentQuestion.answer]}.`;

    toggleVisibility(elements.feedbackElement, true);
    toggleVisibility(elements.nextButton, true);
}

// Lida com o clique do botão de próximo
elements.nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    toggleVisibility(elements.nextButton, false);
    toggleVisibility(elements.feedbackElement, false);
    showQuestions();
});

// Mostra a pontuação final
function showScore() {
    toggleVisibility(elements.quizContainer, false);
    elements.scoreElement.textContent = `${score} de ${totalQuestions}`;
    elements.averageFeedbackElement.textContent = score >= totalQuestions / 2 
        ? "Parabéns! Você ficou acima da média!" 
        : "Você ficou abaixo da média.";
    toggleVisibility(elements.scoreContainer, true);
}

// Reinicia o quiz
elements.restartButton.addEventListener("click", () => {
    initQuiz();
});

// Função para alternar a visibilidade de elementos
function toggleVisibility(element, isVisible) {
    element.classList.toggle("hidden", !isVisible);
}

// Inicializa o quiz ao carregar a página
initQuiz();
