
const nextBtn = document.getElementById("next-btn")
nextBtn.addEventListener("click", goToNextQuestion)


const prevBtn = document.getElementById("prev-btn")
prevBtn.addEventListener("click", goToPrevQuestion)

const finishBtn = document.getElementById("finish-btn")
finishBtn.addEventListener("click", finalizeQuiz)
// const answerImgs = document.querySelectorAll(".answer-img")
// for(var i=0; i<answerImgs.length; i++) {
//     answerImgs[i].addEventListener("click", goToNextQuestion)
// }
document.querySelectorAll(".answer-img").forEach(function(el){
    el.addEventListener("click", saveAnswer)
})


const retryBtn = document.getElementById("retry-btn")
retryBtn.addEventListener("click", tryAgain)

function goToNextQuestion () {
    const currentQuestion = window.currentQuestion || 1
    const nextQuestion = currentQuestion + 1
    goToQuestion(nextQuestion)
}


function goToPrevQuestion () {
    const currentQuestion = window.currentQuestion || 1
    const prevQuestion = currentQuestion - 1
    goToQuestion(prevQuestion)
}

function saveAnswer(){
    const answer = this.getAttribute("data-char")
    const currentQuestion = window.currentQuestion || 1
    const allAnswers = window.allAnswers || {}
    allAnswers[currentQuestion] = answer
    window.allAnswers = allAnswers
    goToNextQuestion()
}

function goToQuestion(number){

    if(number > 35 || number < 1){

        alert("WRONG INPUT NUMBER")

    }else {

        // UPDATE MAIN IMG
        const mainQuestion = document.getElementById("main-question")
        mainQuestion.setAttribute("src", `img/q${number}.png`)

        // UPDATE data-current-question ATTRIBUTE
        window.currentQuestion = number

        // UPDATE ANSWER IMAGES
        const answerImages = document.querySelectorAll(".answer-img")

        const chars = ['a', 'b', 'c', 'd', 'e', 'f'];
        for(var i=0; i < answerImages.length; i++){
            answerImages[i].setAttribute("src", `img/q${number}${chars[i]}.png`)
        }

    }

    // if(number > 0 && number <= 35){
    //     const mainQuestion = document.getElementById("main-question")
    //     mainQuestion.setAttribute("src", "img/q" + number + ".png")
    // }else {
    //     alert("WRONG INPUT NUMBER")
    // }
}


function finalizeQuiz() {

    // HIDE AND SHOW AREAS
    const mainArea = document.querySelector(".main-area")
    const navArea = document.querySelector(".nav-area")
    const resultArea = document.querySelector(".result-area")

    mainArea.style.display = 'none'
    navArea.style.display = 'none'
    resultArea.style.display = 'block'


    // CALCULATE CORRECT, WRONG & BLANK ANSWERS
    var corrects = 0
    var wrongs = 0
    var blanks = 0
    const correctAnswers = {1:'a', 2:'e', 3:'f', 4:'f', 5:'d', 6:'e', 7:'e', 8:'c', 9:'d', 10:'d', 11:'a', 12:'a', 13:'b', 14:'a', 15:'f', 16:'b', 17:'d', 18:'c', 19:'a', 20:'a', 21:'b', 22:'e', 23:'e', 24:'f', 25:'e', 26:'f', 27:'a', 28:'a', 29:'c', 30:'e', 31:'d', 32:'a', 33:'e', 34:'a', 35:'d'}
    const allAnswers = window.allAnswers || {}

    for(var i=1; i<=35; i++){
        const userAnswer = allAnswers[i]
        const correctAnswer = correctAnswers[i]
        if(userAnswer){
            if(userAnswer == correctAnswer){
                corrects++
            }else {
                wrongs++
            }
        }else {
            blanks++
        }
    }


    // UPDATE DOM WITH CORRECT, WRONG & BLANK VALUES
    document.getElementById("result-corrects").innerHTML = corrects
    document.getElementById("result-wrongs").innerHTML = wrongs
    document.getElementById("result-blanks").innerHTML = blanks


    // CALCULATE IQ & UPDATE DOM
    const iq = 85 + Math.round((corrects*60)/35);
    document.getElementById("result-iq").innerHTML = iq

}


function tryAgain(){
    window.location.reload()
}

