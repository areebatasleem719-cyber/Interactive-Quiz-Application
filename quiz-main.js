document.addEventListener("DOMContentLoaded", () => {
    
    // Updated data object with perfectly safe plain-text questions and answers
    const quizData = {
        html: [
            { q: "HTML stands for?", a: ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Tabular Markup Language", "Hyper Tech Markup Language"], correct: 0 },
            { q: "Which HTML element is used to define the largest heading?", a: ["Heading One Tag", "Main Header Element", "H1 Heading Element", "Top Category Title"], correct: 2 },
            { q: "What is the correct HTML element for inserting a line break?", a: ["The LB Element", "The BR Element", "The Break Element", "The Line Element"], correct: 1 },
            { q: "Which character is used to indicate an end tag?", a: ["The Asterisk Sign", "The Forward Slash", "The Less Than Symbol", "The Caret Accent"], correct: 1 },
            { q: "How can you make a numbered list in HTML?", a: ["Unordered List Tag", "List Item Element", "Definition List Tag", "Ordered List Tag"], correct: 3 },
            { q: "How can you make a bulleted list in HTML?", a: ["Ordered List Tag", "Unordered List Tag", "Simple List Box", "Detailed Data List"], correct: 1 },
            { q: "Which HTML element is used to define important text?", a: ["Strong Text Tag", "Important Alert Tag", "Italic Font Tag", "Bold Text Accent"], correct: 0 },
            { q: "Which attribute is used to provide an image source link?", a: ["The Link Attribute", "The Href Field", "The Src Attribute", "The Alt Description"], correct: 2 },
            { q: "What is the correct type value for creating a checkbox?", a: ["Type set to Check", "Type set to Checkbox", "Type set to Box", "Type set to Input"], correct: 1 },
            { q: "Which HTML element defines navigation links?", a: ["The Navigate Tag", "The Nav Element", "The Navbar Block", "The Link Anchor Box"], correct: 1 }
        ],
        css: [
            { q: "What does CSS stand for?", a: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], correct: 1 },
            { q: "Which property is used to change background color?", a: ["color", "background-color", "bgcolor", "back-color"], correct: 1 },
            { q: "Which CSS property controls the text size?", a: ["font-style", "text-style", "font-size", "text-size"], correct: 2 },
            { q: "What is the default value of the position property?", a: ["relative", "absolute", "fixed", "static"], correct: 3 },
            { q: "How do you select an element with id 'demo' in CSS?", a: [".demo", "#demo", "*demo", "demo"], correct: 1 },
            { q: "How do you select elements with class name 'test' in CSS?", a: ["#test", "test", ".test", "*test"], correct: 2 },
            { q: "Which property is used to change the font of an element?", a: ["font-family", "font-weight", "font-style", "font-type"], correct: 0 },
            { q: "How do you make the text bold in CSS?", a: ["font-style: bold;", "font-weight: bold;", "text-decoration: bold;", "font: bold;"], correct: 1 },
            { q: "Which property is used to create space inside an element's border?", a: ["margin", "padding", "spacing", "border-width"], correct: 1 },
            { q: "How do you display a border like this: Top 10px, Bottom 5px, Left 20px, Right 1px?", a: ["border-width: 10px 5px 20px 1px;", "border-width: 10px 20px 5px 1px;", "border-width: 10px 1px 5px 20px;", "border-width: 5px 20px 10px 1px;"], correct: 2 }
        ],
        js: [
            { q: "Which keyword is used to declare a constant variable?", a: ["var", "let", "const", "constant"], correct: 2 },
            { q: "How do you write 'Hello World' in an alert box?", a: ["msg('Hello World')", "alert('Hello World')", "alertBox('Hello World')", "console.log('Hello World')"], correct: 1 },
            { q: "How do you create a function in JavaScript?", a: ["function myFunction()", "function:myFunction()", "function = myFunction()", "new function()"], correct: 0 },
            { q: "How do you call a function named 'myFunction'?", a: ["call myFunction()", "myFunction()", "call function myFunction()", "execute myFunction()"], correct: 1 },
            { q: "How to write an IF statement in JavaScript?", a: ["if i = 5 then", "if (i == 5)", "if i == 5 then", "if i = 5"], correct: 1 },
            { q: "Which operator is used to compare both value and type?", a: ["==", "=", "===", "!=="], correct: 2 },
            { q: "How does a FOR loop start?", a: ["for (i <= 5; i++)", "for (let i = 0; i <= 5; i++)", "for i = 1 to 5", "for (let i = 0; i <= 5)"], correct: 1 },
            { q: "Which syntax is used for a single-line comment in JavaScript?", a: ["Using a Single Quote", "Using HTML Comment Tags", "Using Double Forward Slashes", "Using Asterisks Around Text"], correct: 2 },
            { q: "What is the correct way to write a JavaScript array?", a: ["let colors = ['red', 'green', 'blue']", "let colors = (1:'red', 2:'green', 3:'blue')", "let colors = 'red', 'green', 'blue'", "let colors = {red, green, blue}"], correct: 0 },
            { q: "Which built-in method rounds a number to the nearest integer?", a: ["Math.rnd()", "Math.ceil()", "Math.floor()", "Math.round()"], correct: 3 }
        ]
    };

    let currentCategory = "";
    let shuffledQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let correctCount = 0;
    let timerInterval;
    const TIME_LIMIT = 600; 
    let timeLeft = TIME_LIMIT;

    const categoryScreen = document.getElementById('category-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const questionText = document.getElementById('question-text');
    const answerButtons = document.getElementById('answer-buttons');
    const timeSec = document.getElementById('timer');
    const highScoreDisplay = document.getElementById('high-score-display');

    let savedHighScore = localStorage.getItem('quiz_high_score') || 0;
    if(highScoreDisplay) highScoreDisplay.innerText = savedHighScore;

    document.querySelectorAll('.cat-btn').forEach(button => {
        button.addEventListener('click', function() {
            currentCategory = this.getAttribute('data-category');
            startQuiz();
        });
    });

    function startQuiz() {
        categoryScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');
        
        currentQuestionIndex = 0;
        score = 0;
        correctCount = 0;
        
        document.getElementById('current-category').innerText = currentCategory.toUpperCase();
        shuffledQuestions = [...quizData[currentCategory]].sort(() => Math.random() - 0.5);
        
        showQuestion();
    }

    function showQuestion() {
        resetState();
        let currentQuestion = shuffledQuestions[currentQuestionIndex];
        
        questionText.textContent = currentQuestion.q;
        
        document.getElementById('question-number').innerText = currentQuestionIndex + 1;
        let progressPercent = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progressPercent}%`;

        const badges = ["A", "B", "C", "D"];
        answerButtons.innerHTML = "";

        currentQuestion.a.forEach((answer, index) => {
            const button = document.createElement('button');
            button.classList.add('option-btn');
            button.type = "button";
            
            button.innerHTML = `
                <div class="option-left">
                    <div class="option-badge">${badges[index]}</div>
                    <span class="option-text-span"></span>
                </div>
                <div class="status-box-icon"></div>
            `;
            
            // Safe plain text insertion
            button.querySelector('.option-text-span').textContent = answer;
            
            button.addEventListener('click', () => selectAnswer(index));
            answerButtons.appendChild(button);
        });
        
        startTimer();
    }

    function startTimer() {
        timeLeft = TIME_LIMIT;
        updateTimerDisplay();
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                goToNextQuestionDirectly();
            }
        }, 1000);
    }

    function playBeep() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.type = 'sawtooth'; 
            oscillator.frequency.setValueAtTime(180, audioCtx.currentTime); 
            
            gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime); 
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.3);
        } catch (e) {
            console.log("Audio play blocked.");
        }
    }

    function updateTimerDisplay() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timeSec.innerText = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} min`;
    }

    function resetState() {
        clearInterval(timerInterval);
        answerButtons.innerHTML = "";
    }

    function selectAnswer(selectedIndex) {
        clearInterval(timerInterval);
        let currentQuestion = shuffledQuestions[currentQuestionIndex];
        const buttons = answerButtons.querySelectorAll('.option-btn');
        
        buttons.forEach((btn, index) => {
            btn.disabled = true;
            if (index === currentQuestion.correct) {
                btn.classList.add('reveal-correct');
                btn.querySelector('.status-box-icon').innerHTML = `<i class="fa-solid fa-check" style="font-size:16px; color:white;"></i>`;
            }
        });

        if (selectedIndex === currentQuestion.correct) {
            score += 10;
            correctCount++;
            buttons[selectedIndex].classList.add('selected-correct');
        } else {
            playBeep();
            buttons[selectedIndex].classList.add('selected-incorrect');
            buttons[selectedIndex].querySelector('.status-box-icon').innerHTML = `<i class="fa-solid fa-xmark" style="font-size:16px; color:white;"></i>`;
        }
        
        setTimeout(() => {
            goToNextQuestionDirectly();
        }, 1500);
    }

    function goToNextQuestionDirectly() {
        currentQuestionIndex++;
        if (currentQuestionIndex < shuffledQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');
        
        let totalQuestions = shuffledQuestions.length;
        let percentage = (correctCount / totalQuestions) * 100;
        
        document.getElementById('percentage-score').innerText = `${percentage}% Score`;
        document.getElementById('total-attempted').innerText = totalQuestions;
        document.getElementById('correct-count').innerText = correctCount;
        
        let currentHighScore = localStorage.getItem('quiz_high_score') || 0;
        if (score > currentHighScore) {
            localStorage.setItem('quiz_high_score', score);
            if(highScoreDisplay) highScoreDisplay.innerText = score;
        }
    }

    document.getElementById('quit-btn').addEventListener('click', returnToHome);
    document.getElementById('result-close-btn').addEventListener('click', returnToHome);
    document.getElementById('retry-btn').addEventListener('click', startQuiz);

    function returnToHome() {
        resultScreen.classList.add('hide');
        quizScreen.classList.add('hide');
        categoryScreen.classList.remove('hide');
    }
});