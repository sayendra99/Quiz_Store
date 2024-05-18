 const quiz_data = [
    {
        "question": "What does HTML stand for?",
        "options": ["A. Hyperlink Text Markup Language", "B. Hyper Transfer Markup Language", "C. Hypertext Markup Language", "D. High-Level Text Markup Language"],
        "answer": "C"
    },
    {
        "question": "Which programming language is often used for web development?",
        "options": ["A. Python", "B. Java", "C. Ruby", "D. JavaScript"],
        "answer": "D"
    },
    {
        "question": "What is the primary function of CSS in web development?",
        "options": ["A. Data storage", "B. Styling and layout", "C. Server-side scripting", "D. Database management"],
        "answer": "B"
    },
    {
        "question": "What does the acronym SQL stand for?",
        "options": ["A. Structured Query Language", "B. Simple Query Language", "C. Standard Query Language", "D. Sequential Query Language"],
        "answer": "A"
    },
    {
        "question": "Which programming language is often used for data analysis and scientific computing?",
        "options": ["A. JavaScript", "B. Java", "C. Python", "D. C++"],
        "answer": "C"
    },
    {
        "question": "What does API stand for in the context of web development?",
        "options": ["A. Application Programming Interface", "B. Advanced Programming Interface", "C. Automated Program Interaction", "D. All of the above"],
        "answer": "A"
    },
    {
        "question": "In Python, which keyword is used to define a function?",
        "options": ["A. define", "B. func", "C. def", "D. function"],
        "answer": "C"
    },
    {
        "question": "What is the output of the following code: `print(3 * 'Hello ')`?",
        "options": ["A. Hello Hello Hello Hello", "B. 9", "C. Hello Hello Hello", "D. Syntax Error"],
        "answer": "C"
    },
    {
        "question": "In JavaScript, how do you declare a variable?",
        "options": ["A. var", "B. variable", "C. let", "D. declare"],
        "answer": "A"
    },
    {
        "question": "Which data type in Python is used to represent a sequence of characters?",
        "options": ["A. int", "B. float", "C. str", "D. list"],
        "answer": "C"
    },
    {
        "question": "What is the primary purpose of version control systems like Git?",
        "options": ["A. To write code", "B. To run code", "C. To manage and track changes in code", "D. To execute code"],
        "answer": "C"
    },
    {
        "question": "What is the main advantage of object-oriented programming (OOP)?",
        "options": ["A. Simplicity", "B. Reusability", "C. Procedural nature", "D. No need for functions"],
        "answer": "B"
    },
    {
        "question": "What is the HTTP status code for a successful response?",
        "options": ["A. 200 OK", "B. 404 Not Found", "C. 500 Internal Server Error", "D. 302 Found"],
        "answer": "A"
    },
    {
        "question": "In Python, which library is commonly used for data visualization?",
        "options": ["A. NumPy", "B. Pandas", "C. Matplotlib", "D. TensorFlow"],
        "answer": "C"
    },
    {
        "question": "What is the purpose of a constructor method in object-oriented programming?",
        "options": ["A. To create objects", "B. To destroy objects", "C. To update objects", "D. To copy objects"],
        "answer": "A"
    },   
    {
        "question": "Which of the following is not a valid Python data type?",
        "options": ["A. int", "B. double", "C. list", "D. tuple"],
        "answer": "B"
    },
    {
        "question": "What is the result of the following Python code: `3 + '3'`?",
        "options": ["A. 6", "B. '33'", "C. TypeError", "D. '6'"],
        "answer": "C"
    },
    {
        "question": "Which programming language is often used for developing mobile applications?",
        "options": ["A. Java", "B. Python", "C. C#", "D. PHP"],
        "answer": "A"
    },
    {
        "question": "What is the purpose of the `if` statement in programming?",
        "options": ["A. To perform a loop", "B. To declare a function", "C. To make decisions based on conditions", "D. To define a class"],
        "answer": "C"
    }
];

// const questionelement= document.getElementById("questiom");
// const Next_button=document.getElementById("next-button");
// const answer_button=document.getElementById("Answer_Buttons");

let currentQuestionIndex = 0;
let score = 0;
let startTime = Date.now();
let answers = [];
let  timeIn=0;

document.addEventListener('DOMContentLoaded', () => {
    displayQuestion();
    startTimer();
    document.getElementById('next-button').addEventListener('click', nextQuestion);
    document.getElementById('prev-button').addEventListener('click', prevQuestion);
    document.getElementById('submit-button').addEventListener('click', submitQuiz);
    document.getElementById('next-button').disabled = true; // Disable next button initially
});
/*

displayQuestion function is mainly for Showing question  with Multiple choices


*/
function displayQuestion() {
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('Answer_Buttons');
    const currentQuestion = quiz_data[currentQuestionIndex];
    
    questionElement.innerText = currentQuestion.question;
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.className = 'btn';
        optionButton.innerText = option;
        optionButton.addEventListener('click', () => selectOption(optionButton, option));
        optionsContainer.appendChild(optionButton);
        if (answers[currentQuestionIndex] === option) {
            optionButton.style.backgroundColor ="#EE82EE"; // Change to whatever style you prefer
        }

    });

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => btn.disabled = false);

    document.getElementById('prev-button').style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
   
    document.getElementById('submit-button').style.display = currentQuestionIndex === quiz_data.length - 1 ? 'inline-block' : 'none';

    if (!answers[currentQuestionIndex]) {
        document.getElementById('next-button').disabled = true;
    }

    // Update the index of the question ,For that we need to read question index element

    const Ques_index=document.getElementById('question-index');
    const Total_Questn_Count=document.getElementById('total-questions');
    Ques_index.innerText=currentQuestionIndex+1;
    Total_Questn_Count.innerText=quiz_data.length;
    document.getElementById('next-button').style.display = currentQuestionIndex === quiz_data.length - 1 ? 'none' : 'inline-block';



}


function selectOption(button, selectedOption) {
    // const currentQuestion = quiz_data[currentQuestionIndex];
    // const buttons = document.querySelectorAll('.btn');
    // buttons.forEach(btn => btn.disabled = true);

    // if (selectedOption[0] === currentQuestion.answer) {
    //     score++;
    // }
    // answers[currentQuestionIndex] = selectedOption;
    // button.style.backgroundColor = selectedOption[0] === currentQuestion.answer ? 'green' : 'red';

    // document.getElementById('next-button').disabled = false;




     const cq=quiz_data[currentQuestionIndex];
     const buttons=document.querySelectorAll('.btn');
     buttons.forEach(btn=>btn.displayed=true);
     if (selectedOption[0] === cq.answer) {
        score++;
     }
     answers[currentQuestionIndex] = selectedOption;
     button.style.backgroundColor = selectedOption[0] === cq.answer ? 'green' : 'red';
     document.getElementById("next-button").disabled=false;

}

// function nextQuestion() {
//     currentQuestionIndex++;
//     if (currentQuestionIndex < quiz_data.length) {
//         displayQuestion();
//         document.getElementById('next-button').disabled = true;
//         if (currentQuestionIndex === quiz_data.length - 1) {
//             document.getElementById('next-button').style.display = 'none';
//             document.getElementById('submit-button').style.display = 'inline-block';
//         }
//     }
// }

// function prevQuestion() {
//     if (currentQuestionIndex > 0) {
//         currentQuestionIndex--;
//         displayQuestion();
//         document.getElementById('next-button').disabled = false;
//         document.getElementById('submit-button').style.display = 'none';
//         document.getElementById('next-button').style.display = 'inline-block';
//     }
// }

function submitQuiz() {
    // const resultContainer = document.getElementById('result-container');
    // const scoreElement = document.getElementById('score');
    // const quizContainer = document.querySelector('.quiz');

    // scoreElement.innerHTML = `Your Score: ${score} / ${quiz_data.length}`;
    // resultContainer.style.display = 'block';
    // quizContainer.style.display = 'none';

    // // Stop the timer
    // stopTimer();

    const resultContainer = document.getElementById('result-container');
    const scoreElement = document.getElementById('score');
    const quizContainer = document.querySelector('.quiz');

    scoreElement.innerHTML = `Your Score: ${score} / ${quiz_data.length}`;
    resultContainer.style.display = 'block';
    quizContainer.style.display = 'none';

    // Stop the timer
    stopTimer();
}



// StartTimer functionality is basically calculates the time which ellapsed after starting quiz here we used callback function for every 1000ms to calcualte the elapsed time
function startTimer() {
   timeIn= setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        document.getElementById('time').innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}
// Stop time 
function stopTimer() {
    clearInterval(timeIn);
}

//next button 

document.getElementById('next-button').addEventListener('click', () => {
    if (currentQuestionIndex < quiz_data.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
});


//previous button

document.getElementById('prev-button').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
});
// getting  quiz results

document.getElementById('submit-button').addEventListener('click', submitQuiz);
document.getElementById('submit-button').addEventListener('click', stopTimer());

// Start the quiz
document.addEventListener('DOMContentLoaded', () => {
    displayQuestion();
    startTimer();
});

