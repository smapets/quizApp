import $ from "jquery";
import { nextQuestion } from "./nextQuestion.js";
import { getCorrectAnswers } from "./getCorrectAnswers.js";
import { scoreAnswer } from "./scoreAnswer.js";
import { showMessage } from "./showMessage.js";

(async function() {
  //make the AJAX call and fetch quiz data and messages to display at the end

let response;
let messages;
  try {
     response = await fetch("http://proto.io/en/jobs/candidate-questions/quiz.json");
    response = await response.json();
     messages = await fetch("https://proto.io/en/jobs/candidate-questions/result.json");
    messages = await messages.json();
    messages = messages.results;
  } catch (e) {
      console.log("Something went wrong: ",e.name);

  }


  let quizQuestions = response.questions;

  //get all the right answers
  let quizAnswers = [];
  getCorrectAnswers(quizQuestions, quizAnswers);


  //set a title for the quiz and display the first question and possible answers
  $("#root").prepend(`<h1>${response.title}</h1>`);
  let index = 0;
  nextQuestion(quizQuestions, index);

  let score = 0;
  $("form").submit(event => {
    //get the answer(s) that the user has submitted
    let userAnswer = $("form")
      .serializeArray()
      .map(i => {
        return i.value;
      });
    //validate the checkbox input
    if (userAnswer.length === 0) {
      alert("You must fill in at least one answer");
      event.preventDefault();
      return;
    }

    //check the score and validate result
    score = scoreAnswer(userAnswer, quizQuestions, quizAnswers, index, score);
    //show final score message or continue to the next question after 3 seconds
    setTimeout(() => {
      if (index === quizQuestions.length - 1) {
        showMessage(score, messages);
      } else {
        index++;
        nextQuestion(quizQuestions, index);
      }
    }, 3000);

    event.preventDefault();
  });
})();
