// Timer
let time = 600;

let timer = setInterval(function () {

    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("timer").innerText = minutes + ":" + seconds;

    if (time <= 0) {
        clearInterval(timer);
        alert("Time is up! Test submitted");
        showResult();
    }

    time--;

}, 1000);


// Questions
let questions = [
{
question: "A shopkeeper buys a book for ₹200 and sells it for ₹250. What is the profit percentage?",
answers: ["20%","25%","30%","35%"],
correct: "25%"
},
{
question: "A can complete a work in 10 days and B in 15 days. How many days will they take together?",
answers: ["5days","6days","7days","8days"],
correct: "6days"
},
{
question: "Find the simple interest on ₹1000 at 5% per annum for 2 years.",
answers: ["$50","$200","$150","$100"],
correct: "$100"
},
{
question: "If the ratio of boys to girls is 3:2 and total students are 50, how many girls are there",
answers: ["25","30","20","35"],
correct: "20"
},
{
question: "The average of 5 numbers is 20. what is their total sum?",
answers: ["80","90","100","120"],
correct: "100"
},
{
question: "A car travels 60km in 1 hour. How far it will travel in 3 hours",
answers: ["110km","150km","200km","180km"],
correct: "180km"
},
{
question: "What is 20% of 150?",
answers: ["20","25","30","35"],
correct: "30"
},
{
question: "Find the missing number 2, 4, 8, 16 ?",
answers: ["20","24","32","18"],
correct: "32"
},
{
question: "What is 25 × 4 ÷ 5?",
answers: ["20","25","15","10"],
correct: "20"
},
{
question: "If a train runs at 50 km/hr, how much distance will it cover in 2.5 hours?",
answers: ["250km","125km","110km","100km"],
correct: "30"
}
];

let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(questions.length).fill(null);
let visitedQuestions = new Array(questions.length).fill(false);


// Go to specific question
function goToQuestion(index){
    currentQuestion = index;
    loadQuestion();
}


// Load question
function loadQuestion(){

visitedQuestions[currentQuestion] = true;

let q = questions[currentQuestion];

let progressPercent = ((currentQuestion + 1) / questions.length) * 100;

document.getElementById("progress-fill").style.width = progressPercent + "%";

document.getElementById("progress").innerText =
"Question " + (currentQuestion + 1) + " of " + questions.length;

document.getElementById("question").innerText = q.question;

let answersHTML = "";

q.answers.forEach(answer => {

let checked = userAnswers[currentQuestion] === answer ? "checked" : "";

answersHTML += `
<label>
<input type="radio" name="answer" value="${answer}" ${checked}>
${answer}
</label><br>
`;

});

document.getElementById("answers").innerHTML = answersHTML;


// Change button text
let button = document.getElementById("nextBtn");

if(currentQuestion === questions.length - 1){
button.innerText = "Submit Test";
}else{
button.innerText = "Next Question";
}

createNavigation();

}


// Next question
function nextQuestion(){

let selected = document.querySelector('input[name="answer"]:checked');

if(selected){
userAnswers[currentQuestion] = selected.value;
}

if(currentQuestion < questions.length - 1){
currentQuestion++;
loadQuestion();
}else{
showResult();
}

}


// Show result
function showResult(){

clearInterval(timer);

document.getElementById("quiz").style.display = "none";
document.getElementById("result").style.display = "block";

score = 0;

userAnswers.forEach((ans,index)=>{
if(ans === questions[index].correct){
score++;
}
});

let total = questions.length;

let percent = ((score/total)*100).toFixed(0);

document.getElementById("score").innerText =
"Score: " + score + " / " + total;

document.getElementById("percentage").innerText =
"Percentage: " + percent + "%";

if(percent >= 50){
document.getElementById("status").innerText = "Status: PASS";
}else{
document.getElementById("status").innerText = "Status: FAIL";
}
//review
let reviewHTML = "<h3>Answer Review</h3>";

questions.forEach((q,index)=>{

let userAns = userAnswers[index] ? userAnswers[index] : "Not Answered";

let correctAns = q.correct;

let status = userAns === correctAns ? "Correct ✅" : "Wrong ❌";

reviewHTML += `
<div style="margin-bottom:15px;">
<b>Question ${index+1}:</b> ${q.question}<br>
Your Answer: ${userAns}<br>
Correct Answer: ${correctAns}<br>
Status: ${status}
</div>
`;

});

document.getElementById("review").innerHTML = reviewHTML;

}


// Navigation buttons
function createNavigation(){

let navHTML = "";

questions.forEach((q,index)=>{

let className = "nav-btn";

if(index === currentQuestion){
className += " current";
}
else if(userAnswers[index] !== null){
className += " answered";
}
else if(visitedQuestions[index]){
className += " visited";
}

navHTML += `<button class="${className}" onclick="goToQuestion(${index})">${index+1}</button>`;

});

document.getElementById("navigation").innerHTML = navHTML;

}
//shuffling of questions
function shuffleQuestions(){
    for(let i = questions.length -1; i > 0; i--){
        let j = Math.floor(Math.random() * (i+1));
        let temp = questions[i];
        questions[i] = questions[j];
        questions[j] = temp;
    }
}

// Initial load
shuffleQuestions();
createNavigation();
loadQuestion();
//restart the test after result
function restartTest(){
    currentQuestion=0;
    score=0;
    userAnswers=new Array(questions.length).fill(null);
    
    time = 60;

    document.getElementById("quiz").style.display = "block";
    document.getElementById("result").style.display = "none";

    timer =  setInterval(function(){

        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        seconds=seconds < 10 ? "0" + seconds : seconds;
         
        document.getElementById("timer").innerText = minutes + ":" + seconds;

        if (time<=0){
            clearInterval(timer);
            alert("Time is up! Test Submitted");
        }
        time--;

    },1000)
shuffleQuestions();
loadQuestion();

}