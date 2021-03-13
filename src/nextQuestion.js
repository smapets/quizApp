import $ from "jquery";
//empties the form and renders the new question and answers
const nextQuestion = (arr, i) => {
  $("#loading").detach();
  $("form").empty();
  $("form").append(`<h3 id="question">${arr[i].title}</h3>`);
  $("form").append(`<img src=${arr[i].img} alt=${arr[i].title} class="justify-center flex-column"><br/>`);
  let booleanAnswer = arr[i].correct_answer;
  if (arr[i].question_type === "truefalse") {
    for (let i = 0; i < 2; i++) {
      let input = `<input class="choice-prefix" type="radio" name="action" value=${booleanAnswer} id='${booleanAnswer}' required>`;
      let label = `<label for='${booleanAnswer}' class="choice-text">${booleanAnswer}</label>`;
      $("form").append(`<div id="answers" class="choice-container">${input}${label}</div>`);
      booleanAnswer = !booleanAnswer;
    }
  } else {
    arr[i].possible_answers.map(a => {
      let inputType;

      arr[i].question_type === "mutiplechoice-multiple"
        ? (inputType = "checkbox")
        : (inputType = "radio");
      let input = `<input
      class="choice-prefix"
      type="${inputType}"
      name="action"
      value="${a.caption}"
      id='${a.caption}'
      ${inputType === "radio" && "required"}>`;
      let label = `<label for="${a.caption}" class="choice-text">${a.caption}</label>`;
      $("form").append(`<div id="answers" class="choice-container">${input}${label}</div>`);
    });
  }

  $("form").append(`<button class="btn" type="submit">Next question</button>`);
};

export { nextQuestion };
