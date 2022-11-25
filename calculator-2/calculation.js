let screen = document.querySelector("#display_window");

let all_buttons = Array.from(document.querySelectorAll(".button"));

// adding event listener to each button!

let simple = true;

let calculate2 = function (first, oper, second) {
  switch (oper) {
    case "X":
      screen.innerText = first * second;
      break;
    case "+":
      screen.innerText = first + second;
      break;
    case "-":
      screen.innerText = first - second;
      break;
    case "/":
      screen.innerText = first / second;
      break;
    default:
      screen.innerText = "not valid";
  }
};

let history = "";
let all_history = [];

all_buttons.map((button) => {
  button.addEventListener("click", (e) => {
    console.log(e.target);
    event_handler(e);
  });
});
let user_input = [];
// -------------------------------------------------------------------------
let event_handler = function (e) {
  // info alert works only when screen is empty!!!
  if (e.target.getAttribute("id") == "info" && screen.innerText == "") {
    alert(
      "my name is nadav lieberman\nthis is a calculator that evolves with the user\nit dosnt wait till you press ="
    );
  }
  if (e.target.getAttribute("id") == "back") {
    //updates arrey to remove last digit from calculation!
    screen.innerText = screen.innerText.slice(0, -1);
    user_input[user_input.length - 1] = user_input[user_input.length - 1].slice(
      0,
      -1
    );
  }

  if (e.target.getAttribute("id") == "equal") {
    calculate2(+user_input[0], user_input[1], +user_input[2]);
    for (i = 0; i < user_input.length; i++) {
      history += user_input[i];
    }
    history += "=" + screen.innerText;
    all_history.push(history);
    document.getElementById("print_hist").innerText += all_history
      .join("  ")
      .split("  ");

    history = "  ";
    all_history = [];
    user_input = [];
  }

  // cleans screen and update array to empty
  if (e.target.getAttribute("id") == "delete") {
    screen.innerText = "";
    user_input = [];
    history = "";
    all_history = [];
    document.getElementById("print_hist").innerText = "history";
  }

  if (e.target.getAttribute("id") == "number") {
    if (user_input.length == 0) {
      screen.innerText = e.target.innerText;
      user_input.push(e.target.innerText);

      return;
    }
    if (user_input.length == 1) {
      screen.innerText += e.target.innerText;
      user_input[0] += e.target.innerText;

      return;
    }
    if (user_input.length == 2) {
      user_input.push(e.target.innerText);
      screen.innerText = e.target.innerText;

      return;
    }
    if (user_input.length == 3) {
      user_input[2] += e.target.innerText;
      screen.innerText += e.target.innerText;

      return;
    }
  }
  if (e.target.getAttribute("id") == "operator") {
    if (user_input.length == 1) {
      user_input.push(e.target.innerText);
    } else {
      calculate2(+user_input[0], user_input[1], +user_input[2]);
      user_input.pop();
      user_input.pop();
      user_input[0] = screen.innerText;
      user_input[1] = e.target.innerText;
      //change array
    }
  }

  if (e.target.getAttribute("id") == "light") {
    console.log("zona!");
    document.getElementById("light").classList.toggle("hidden");
    screen.classList.toggle("hidden2");
  }

  if (e.target.getAttribute("id") == "history") {
    document.getElementById("print_hist").classList.toggle("hiding_history");
  }
};
