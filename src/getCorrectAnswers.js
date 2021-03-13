
const getCorrectAnswers=(questionsArray,answersArray)=>{
  questionsArray.map(q => {
    let answer = q.correct_answer;
    if (typeof answer === "boolean") {
      answersArray.push(String(answer));
    } else if (typeof answer === "number") {
      //find the answer  with the given a_id and its caption
      let answerCaption = q.possible_answers.find(x => x.a_id === answer).caption;
      answersArray.push(answerCaption);
    } else if (answer instanceof Array) {
      let multAnsw = [];
      answer.map(a => {
        let answerCaption = q.possible_answers.find(x => x.a_id === a).caption;
        multAnsw.push(answerCaption);
      });
      answersArray.push(multAnsw);
    }
  });
}

export {getCorrectAnswers};
