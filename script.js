const startBtn = document.getElementById('start-btn')
const nextBtn = document.getElementById('next-btn')
const qContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-btn')

let shuffledQuestion, currentQuestionIndex

startBtn.addEventListener('click', startGamee)
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGamee() {
    console.log("started");
    startBtn.classList.add('hide')
    qContainerElement.classList.remove('hide')
    shuffledQuestion = questions.sort(() => Math.random() -  .5)
    currentQuestionIndex = 0
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestion[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answers => {
        const button = document.createElement('button')
        button.innerText = answers.text
        button.classList.add('btn')
        if (answers.correct) {
            button.dataset.correct = answers.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    });
}

function resetState() {
    clearStatusClass(document.body)
    nextBtn.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    
    const selectedBtn = e.target
    const correct = selectedBtn.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestion.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide')
    } else {
        startBtn.innerText = 'Restart'
        startBtn.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Waht is 2 + 2 ?',
        answers: [
            { text: '4', correct: true},
            { text: '22', correct: false},
            { text: '6', correct: false},
            { text: '1', correct: false}
        ]
    },
    {
        question: 'Waht is 4 * 6 ?',
        answers: [
            { text: '33', correct: false},
            { text: '20', correct: false},
            { text: '24', correct: true},
            { text: '5', correct: false}
        ]
    },
    {
        question: 'Waht is 20 - 9 ?',
        answers: [
            { text: '5', correct: false},
            { text: '11', correct: true},
            { text: '3', correct: false},
            { text: '15', correct: false}
        ]
    },    {
        question: 'Waht is 10 * 20 ?',
        answers: [
            { text: '200', correct: true},
            { text: '350', correct: false},
            { text: '50', correct: false},
            { text: '70', correct: false}
        ]
    }
]