let logoutButton = document.querySelector("#logout");
logoutButton.addEventListener("click", logout);

var username = sessionStorage.getItem("USERNAME");

let allReimbursementsButton = document.querySelector("#finance_manager button");
allReimbursementsButton.addEventListener(
  "click",
  finance_manager_get_all_reimbursement
);

async function logout() {
  let res = await fetch(`http://127.0.0.1:8080/logout`, { method: "POST" });
  if (res.status == 200) {
    sessionStorage.clear();
    window.location.href = "index.html";
  }
}

async function finance_manager_get_all_reimbursement() {
  let res = await fetch(`http://127.0.0.1:8080/users/${username}`, {
    credentials: "include",
    method: "GET",
  });
  let data = await res.json();
  let data_array = data[`Reimbursement details of ${username}`];
  console.log(data_array);
  for (let user of data_array) {
    let tableBody = document.querySelector("#t-body");
    let tableRow = document.createElement("tr");
    tableBody.appendChild(tableRow);

    let description = document.createElement("td");
    description.innerHTML = user["description"];
    tableRow.appendChild(description);

    let receipt_img = document.createElement("td");
    let img = document.createElement("img");
    img.setAttribute("src", user["receipt_img"]);
    receipt_img.appendChild(img);
    tableRow.appendChild(receipt_img);

    let reimb_author = document.createElement("td");
    reimb_author.innerHTML = user["reimb_author"];
    tableRow.appendChild(reimb_author);

    let reimb_id = document.createElement("td");
    reimb_id.innerHTML = user["reimb_id"];
    tableRow.appendChild(reimb_id);

    let reimb_resolver = document.createElement("td");
    reimb_resolver.innerHTML = user["reimb_resolver"];
    tableRow.appendChild(reimb_resolver);

    let reimbursement_amount = document.createElement("td");
    reimbursement_amount.innerHTML = user["reimbursement_amount"];
    tableRow.appendChild(reimbursement_amount);

    let resolved_at = document.createElement("td");
    resolved_at.innerHTML = user["resolved_at"];
    tableRow.appendChild(resolved_at);

    let status = document.createElement("td");
    status.innerHTML = user["status"];
    tableRow.appendChild(status);

    let submitted_at = document.createElement("td");
    submitted_at.innerHTML = user["submitted_at"];
    tableRow.appendChild(submitted_at);

    let type_of_expense = document.createElement("td");
    type_of_expense.innerHTML = user["type_of_expense"];
    tableRow.appendChild(type_of_expense);
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

  if (role != "finance_manager") {
    let employee_create_reimbursement = document.querySelector(
      "#employee_create_reimbursement a"
    );
    employee_create_reimbursement.setAttribute("href", "/index.html");
    employee_create_reimbursement.innerHTML = "Create Reimbursement";
  }
});

// function create_reimbursement_table() {
//   let tableBody = document.querySelector("#t-body");
//   let tableRow = document.createElement("tr");

//   let description = document.createElement("td");
//   // description.innerHTML =
//   // data[`Reimbursement details of ${username}`][0]["description"];

//   let receipt_img = document.createElement("td");
//   let img = document.createElement("img");
//   // img.setAttribute(
//   //   "src",
//   //   data[`Reimbursement details of ${username}`][0]["receipt_img"]
//   // );
//   receipt_img.appendChild(img);

//   let reimb_author = document.createElement("td");
//   // reimb_author.innerHTML =
//   //   data[`Reimbursement details of ${username}`][0]["reimb_author"];

//   let reimb_id = document.createElement("td");
//   // reimb_id.innerHTML =
//   //   data[`Reimbursement details of ${username}`][0]["reimb_id"];

//   let reimb_resolver = document.createElement("td");
//   // reimb_resolver.innerHTML =
//   //   data[`Reimbursement details of ${username}`][0]["reimb_resolver"];

//   let reimbursement_amount = document.createElement("td");
//   // reimbursement_amount.innerHTML =
//   //   data[`Reimbursement details of ${username}`][0]["reimbursement_amount"];

//   let resolved_at = document.createElement("td");
//   // resolved_at.innerHTML =
//   //   data[`Reimbursement details of ${username}`][0]["resolved_at"];

//   let status = document.createElement("td");
//   // status.innerHTML = data[`Reimbursement details of ${username}`][0]["status"];

//   let submitted_at = document.createElement("td");
//   // submitted_at.innerHTML =
//   //   data[`Reimbursement details of ${username}`][0]["submitted_at"];

//   let type_of_expense = document.createElement("td");
//   // type_of_expense.innerHTML =
//   //   data[`Reimbursement details of ${username}`][0]["type_of_expense"];
// }

//
