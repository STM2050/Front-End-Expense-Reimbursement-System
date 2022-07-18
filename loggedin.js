let logoutButton = document.querySelector("#logout");
logoutButton.addEventListener("click", logout);

async function logout() {
  let res = await fetch(`http://127.0.0.1:8080/logout`, { method: "POST" });
  if (res.status == 200) {
    sessionStorage.clear();
    window.location.href = "index.html";
  }
}

window.addEventListener("load", () => {
  // const params = new URL(document.location).searchParams;
  const fullName = sessionStorage.getItem("FULLNAME");
  const role = sessionStorage.getItem("ROLE");
  const username = sessionStorage.getItem("USERNAME");

  let name = document.querySelector("#name");
  let role1 = document.querySelector("#role");
  let username1 = document.querySelector("#username");
  name.innerHTML = fullName;
  role1.innerHTML = role;
  username1.innerHTML = username;

  if (role == "finance_manager") {
    let finance_manager = document.querySelector("#finance_manager button");
    finance_manager.setAttribute("type", "button");
    finance_manager.innerHTML = "Reimbursements";
  } else {
    let employee_details = document.querySelector(
      "#employee_all_reimbursement a"
    );
    employee_details.setAttribute("href", "/index.html");
    employee_details.innerHTML = "My Reimbursements";

    let employee_create_reimbursement = document.querySelector(
      "#employee_create_reimbursement a"
    );
    employee_create_reimbursement.setAttribute("href", "/index.html");
    employee_create_reimbursement.innerHTML = "Create Reimbursement";
  }
});
