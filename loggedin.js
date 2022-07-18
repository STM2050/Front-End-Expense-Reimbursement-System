let logoutButton = document.querySelector("#logout");
logoutButton.addEventListener("click", logout);

async function logout() {
  let res = await fetch(`http://127.0.0.1:8080/logout`, { method: "POST" });
  if (res.status == 200) {
    window.location.href = "index.html";
  }
}
