import $ from "jquery";
const scoreAnswer = (
  userAnswer,
  questionsArray,
  answersArray,
  index,
  score
) => {
//disable the input once and hover action once the user has submitted an answer
  $('input').prop('disabled',true).parent().addClass('noHover')
  $('button').addClass('noHover');

  if (answersArray[index] instanceof Array) {
    answersArray[index].map(a => {
      $(`input[value='${a}']`).parent().addClass("incorrect");
    });
    // make a set of all unique answers among the user's answers and the right answers
    let setOfUniqueAnswers = new Set([...userAnswer, ...answersArray[index]]);
    //if the user gave even one wrong answer then the size of the set will be greater than the length of the array with the correct answers
    // if the user gave right answers but not all of them then the length of the array with the correct answers will be greater than the array with the user's answers
    //score points only if none of the above conditions are met
    if (
      setOfUniqueAnswers.size === answersArray[index].length &&
      answersArray[index].length === userAnswer.length
    ) {
      score = score + questionsArray[index].points;
      userAnswer.map(a => {
        $(`input[value="${a}"]`)
          .parent()
          .removeClass("incorrect")
          .addClass("correct");
      });
    }
  } else {
    $(`input[value='${answersArray[index]}']`).parent().addClass("incorrect");
    if (userAnswer[0] === answersArray[index]) {
      score = score + questionsArray[index].points;
      $(`input[value="${answersArray[index]}"]`)
        .parent()
        .removeClass("incorrect")
        .addClass("correct");
    }
  }

  return score;
};

export { scoreAnswer };
