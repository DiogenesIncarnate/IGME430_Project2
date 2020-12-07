// sends the login form data to the server to login account controller
const handleLogin = (e) => {
  e.preventDefault();

  $("#characterMessage").animate({ width: "hide" }, 350);

  if ($("user").val() == "" || $("pass").val() == "") {
    handleError("RAWR! Username or password is empty.");
    return false;
  }

  console.log($("input[name=_csrf]").val());

  sendAjax(
    "POST",
    $("#loginForm").attr("action"),
    $("#loginForm").serialize(),
    redirect
  );

  return false;
};

// sends signup form account data to be created in the account controller
const handleSignup = (e) => {
  e.preventDefault();

  $("#characterMessage").animate({ width: "hide" }, 350);

  if (
    $("username").val() == "" ||
    $("#pass").val() == "" ||
    $("#pass2").val() == ""
  ) {
    handleError("All fields are required.");
    return false;
  }

  if ($("#pass").val() != $("#pass2").val()) {
    handleError("Passwords do not match.");
    return false;
  }

  sendAjax(
    "POST",
    $("#signupForm").attr("action"),
    $("#signupForm").serialize(),
    redirect
  );

  return false;
};

// format login window react component
const LoginWindow = (props) => {
  return (
    <form
      id="loginForm"
      name="loginForm"
      onSubmit={handleLogin}
      action="/login"
      method="POST"
      className="mainForm"
    >
      <div className="mainForm_Section">
        <label htmlFor="username">Username: </label>
        <input id="user" type="text" name="username" placeholder="Username" />
      </div>
      <div className="mainForm_Section">
        <label htmlFor="pass">Password: </label>
        <input id="pass" type="password" name="pass" placeholder="Password" />
      </div>
      <div className="mainForm_Section">
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="formSubmit" type="submit" value="Sign in" />
      </div>
    </form>
  );
};

// format signup window react component
const SignupWindow = (props) => {
  return (
    <form
      id="signupForm"
      name="signupForm"
      onSubmit={handleSignup}
      action="/signup"
      method="POST"
      className="mainForm"
    >
      <div className="mainForm_Section">
        <label htmlFor="username">Username: </label>
        <input className="mainForm_Value" id="user" type="text" name="username" placeholder="Username" />
      </div>
      <div className="mainForm_Section">
        <label htmlFor="pass">Password: </label>
        <input className="mainForm_Value" id="pass" type="password" name="pass" placeholder="Password" />
      </div>
      <div className="mainForm_Section">
        <label htmlFor="pass2">Confirm Password: </label>
        <input
          className="mainForm_Value" 
          id="pass2"
          type="password"
          name="pass2"
          placeholder="Retype Password"
        />
      </div>
      <div className="mainForm_Section">
        <label htmlFor="isPremium">"Purchase" Premium Account: </label>
        <input className="mainForm_Value" id="isPremium" name="isPremium" type="checkbox" />
      </div>
      <div className="mainForm_Section">
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="formSubmit" type="submit" value="Sign Up" />
      </div>
    </form>
  );
};

const createLoginWindow = (csrf) => {
  ReactDOM.render(
    <LoginWindow csrf={csrf} />,
    document.querySelector("#content")
  );
};

const createSignupWindow = (csrf) => {
  ReactDOM.render(
    <SignupWindow csrf={csrf} />,
    document.querySelector("#content")
  );
};

// assigns default event handlers and react renders
const setup = (csrf) => {
  const loginButton = document.querySelector("#loginButton");
  const signupButton = document.querySelector("#signupButton");

  signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });

  createLoginWindow(csrf); // default view
};

const getToken = () => {
  sendAjax("GET", "/getToken", null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
