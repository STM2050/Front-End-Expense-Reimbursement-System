let usernameInput = document.querySelector("#username");
let passwordInput = document.querySelector("#password");
let logInButton = document.querySelector("#login");
logInButton.addEventListener("click", login);

async function login() {
  try {
    let res = await fetch(`http://127.0.0.1:8080/login`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameInput.value,
        password: passwordInput.value,
      }),
    });
    if (res.status == 200) {
      let data = await res.json();
      let first_name = data.first_name;
      let last_name = data.last_name;
      let fullName = first_name + " " + last_name;
      let role = data.role;
      let username = data.username;
      sessionStorage.setItem("FULLNAME", fullName);
      sessionStorage.setItem("ROLE", role);
      sessionStorage.setItem("USERNAME", username);
      console.log(fullName, role, username);
      window.location.href = "/loggedin.html";
    }

    if (res.status == 401) {
      data = await res.json();
      console.log("401 status gopu");
      usernameInput.value = "";
      passwordInput.value = "";
      console.log("401 status gopu2");
      let para = document.querySelector("#error-message p");
      console.log(`para = ${para}`);
      para.style.color = "red";
      para.innerHTML = data.message;
    }
  } catch (err) {
    console.log(err);
  }
}
