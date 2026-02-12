//------------- Questions-------------
const questions = [
 {q:"Which language runs in the browser?", 
    o:["Python","Java","C","JavaScript"], 
    a:3},
 {q:"HTML stands for?", 
    o:["Hyper Text Markup Language","High Text Machine Language","Hyperlinks Text Mark Language","None"], 
    a:0},
 {q:"CSS is mainly used for?", 
    o:["Logic","Structure","Styling","Storage"], 
    a:2},
 {q:"Which symbol is used for ID in CSS?", 
    o:[".","#","*","@"],
     a:1},
 {q:"JavaScript is a ___ language?",
     o:["Markup","Styling","Programming","Database"], 
     a:2},
 {q:"Which tag creates a hyperlink in HTML?", 
    o:["<link>","<a>","<href>","<url>"], 
    a:1},
 {q:"Which method is used to select an element in JS?", 
    o:["getElementById()","querySelector()","getElementsByClass()","All of these"], 
    a:3},
 {q:"Which company created JavaScript?", 
    o:["Google","Microsoft","Netscape","Apple"],
     a:2},
 {q:"Which CSS property controls text size?", 
    o:["font-style","text-size","font-size","size"], 
    a:2},
 {q:"Which keyword declares a variable in JS?",
     o:["var","let","const","All of these"], 
     a:3}
];
// ---------- GLOBAL VARIABLES ----------
let index, score, time, timer, started;
 // ---------- BIND ELEMENTS ----------
const qEl = document.getElementById("question");
const options = document.querySelectorAll(".option");
const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const resultEl = document.getElementById("result");

//---------- RESTART QUIZ ----------
function resetState(){
  index = 0;
  score = 0;
  time = 20;
  started = false;

  timerEl.innerText = time;
  resultEl.innerText = "";
  qEl.innerText = "Click Start";

  options.forEach(b=>{
    b.disabled = true;
    b.innerText = "";
  });

  startBtn.style.display = "block";
  startBtn.disabled = false;
  restartBtn.style.display = "none";

  clearInterval(timer);

}
// // ---------- START QUIZ ----------
function startQuiz(){
  if(started) return;

  started = true;
  startBtn.style.display = "none";

  loadQuestion();
  startTimer();
}

function startTimer(){
  timer = setInterval(()=>{
    time--;
    timerEl.innerText = time;

    if(time <= 0){
      clearInterval(timer);
      endQuiz();
    }
  },1000);
}



function loadQuestion(){
  qEl.innerText = questions[index].q;

  options.forEach((btn,i)=>{
    btn.innerText = questions[index].o[i];
    btn.disabled = false;
  });
}

options.forEach((btn,i)=>{
  btn.onclick = ()=>{
    if(!started) return;

    if(i === questions[index].a){
      score++;
    }

    index++;

    if(index < questions.length){
      loadQuestion();
    } else {
      endQuiz();
    }
  };
});
function endQuiz(){
  options.forEach(b=>b.disabled=true);

  qEl.innerText = "Quiz Finished!";
  resultEl.innerText = `Score: ${score} / ${questions.length}`;

  restartBtn.style.display = "block";
}

startBtn.onclick = startQuiz;
restartBtn.onclick = resetState;

resetState();


      