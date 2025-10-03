$(document).ready(function () {
  $.validator.addMethod(
    "alphanumeric",
    function (value, element) {
      return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
    },
    "Username must contain only letters and numbers (no spaces or special characters)"
  );

  $.validator.addMethod(
    "strongPassword",
    function (value, element) {
      return this.optional(element) || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
    },
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  );

  $("#register").validate({
    rules: {
      fullname: {
        required: true,
      },
      username: {
        required: true,
        alphanumeric: true,
        minlength: 5,
        maxlength: 20,
      },
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        strongPassword: true,
        minlength: 8,
      },
      confirmpassword: {
  required: true,
        strongPassword: true,
        minlength: 8,
      }
    },
    messages: {
  fullname: {
    required: "Full name is required",
  },
  username: {
    required: "Username is required",
    minlength: "Username must have at least 5 characters",
    maxlength: "Username cannot be longer than 20 characters",
  },
  email: {
    required: "Email address is required",
    email: "Enter a valid email address (e.g., user@example.com)",
  },
  password: {
    required: "Password is required",
    minlength: "Password must be 8 characters or more",
  },
  confirmpassword: {
    required: "Please re-enter your password",
    equalTo: "Passwords do not match",
}

    },
    errorClass: "text-danger",
    errorElement: "small",
    submitHandler: function (form) {
      const fullname = $("#fullname").val();
      const username = $("#username").val();
      const email = $("#email").val();
      const password = $("#password").val();


      const userData = {
        fullname: fullname,
        username: username,
        email: email,
        password: password,
      };

      localStorage.setItem("currentUser", JSON.stringify(userData));

      alert("Registration successful! Welcome " + username + "!");
      window.location.href = "./../index.html";
    },
  });
});

$(document).ready(function () {
  $.validator.addMethod(
    "alphanumeric",
    function (value, element) {
      return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
    },
    "Username must contain only letters and numbers (no spaces or special characters)"
  );

  $("#login").validate({
    rules: {
      username: {
        required: true,
        minlength: 5,
      },
      password: {
        required: true,
        minlength: 8,
      },
    },
    messages: {
  username: {
    required: "Please enter a username",
    minlength: "Username must be at least 5 characters",
    maxlength: "Username must not exceed 20 characters",
  },
  password: {
    required: "Please enter a password",
    minlength: "Password must be at least 8 characters",
    maxlength: "Password must not exceed 20 characters",
}

    },
    errorClass: "text-danger",
    errorElement: "small",
    submitHandler: function (form) {
      const username = $("#username").val();
      const password = $("#password").val();

      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

      if (currentUser.username === username) {
        localStorage.setItem("loggedInUser", username);

        alert("Login successful! Welcome back, " + currentUser.fullname + "!");
        window.location.href = "./../html/dashboard.html";
      } else {
        alert("User not registered or invalid username or password!");
      }
    },
  });
});

$(document).ready(function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  $("#welcomeMessage").text("Welcome, " + (currentUser.username || "Guest") + "!");
  $("#displayUsername").text(currentUser.username || "N/A");
  $("#displayEmail").text(currentUser.email || "N/A");

  $("#logoutBtn2").click(function () {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("currentUser");
    window.location.href = "./../index.html";
  });
});