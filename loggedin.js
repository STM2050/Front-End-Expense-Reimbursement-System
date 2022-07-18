let logoutButton = document.querySelector("#logout");
logoutButton.addEventListener("click", logout);

async function logout() {
  let res = await fetch(`http://127.0.0.1:8080/logout`, { method: "POST" });
  if (res.status == 200) {
    window.location.href = "index.html";
  }
}

window.addEventListener("load", () => {
  // const params = new URL(document.location).searchParams;
  const fullName = sessionStorage.getItem("FULLNAME");
  const role = sessionStorage.getItem("ROLE");
  const username = sessionStorage.getItem("USERNAME");

  let name = document.querySelector("#name");
  name.innerHTML = fullName;
});
