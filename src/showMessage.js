import $ from "jquery";
const showMessage = (score, messages) => {
  $("form").empty();
  $("form").unbind();
  $("#game").append(`<h3>We are calculating your score!<br/> Please wait</h3>`);
  let perfectScore = 20;
  let percentage = Math.floor((score / perfectScore) * 100);
  let displayMessage = messages.filter(m => {
    return m.minpoints <= percentage && m.maxpoints >= percentage;
  })[0];
  $("#game").replaceWith(
    `<div class="justify-center flex-column">
        <h2>Results: You scored ${percentage}%<br/>${displayMessage.title}
        </h2><br/>
        <h3>${displayMessage.message}
        </h3><br/>
        <img src=${displayMessage.img} alt=${displayMessage.title} >
        <button class="flex-center btn"> Try Again!!</button>
      </div>`
  );
  $('button').click(()=>{
    window.location.reload(true);
  })
};

export { showMessage };
