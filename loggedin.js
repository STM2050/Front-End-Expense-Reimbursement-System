let logoutButton = document.querySelector("#logout");
logoutButton.addEventListener("click", logout);

var username = sessionStorage.getItem("USERNAME"); //in order to pass it as a parameter in function get_all_reimbursement

let allReimbursementsButton = document.querySelector("#finance_manager button");
allReimbursementsButton.addEventListener("click", get_all_reimbursement);

async function logout() {
  let res = await fetch(`http://127.0.0.1:8080/logout`, { method: "POST" });
  if (res.status == 200) {
    sessionStorage.clear();
    window.location.href = "index.html";
  }
}

async function get_all_reimbursement() {
  let res = await fetch(`http://127.0.0.1:8080/users/${username}`, {
    credentials: "include",
    method: "GET",
  });
  let data = await res.json();
  let data_array = data[`Reimbursement details of ${username}`];

  create_table(data_array);
}

window.addEventListener("load", () => {
  const fullName = sessionStorage.getItem("FULLNAME");
  const role = sessionStorage.getItem("ROLE");
  const username = sessionStorage.getItem("USERNAME");

  if (!username) {
    window.location.href = "/index.html";
  }

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
    employee_create_reimbursement.setAttribute("href", "");
    employee_create_reimbursement.setAttribute(
      "class",
      "button is-danger is-outlined"
    );
    employee_create_reimbursement.innerHTML = "Create Reimbursement";
  }
});

function create_table(data_array) {
  let tableBody = document.querySelector("#t-body");

  // check if the tbody already has any child elements. If any child elements found, don't create a new table
  if (!tableBody.hasChildNodes()) {
    for (let user of data_array) {
      let tableRow = document.createElement("tr");
      tableRow.setAttribute("id", "reimb_row");

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
      if (status.innerHTML == "pending") {
        let status_selection = document.createElement("select");
        status_selection.setAttribute("id", "status_selection");
        let option1 = document.createElement("option");
        option1.setAttribute("value", "4");
        option1.innerHTML = "approve";
        let option2 = document.createElement("option");
        option2.setAttribute("value", "5");
        option2.innerHTML = "deny";
        status_selection.appendChild(option1);
        status_selection.appendChild(option2);
        status.appendChild(status_selection);
      }
      tableRow.appendChild(status);

      let submitted_at = document.createElement("td");
      submitted_at.innerHTML = user["submitted_at"];
      tableRow.appendChild(submitted_at);

      let type_of_expense = document.createElement("td");
      type_of_expense.innerHTML = user["type_of_expense"];
      tableRow.appendChild(type_of_expense);
    }
  } else {
    {
      tableBody.innerHTML = "";
      for (let user of data_array) {
        let tableRow = document.createElement("tr");
        tableRow.setAttribute("id", "reimb_row");

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
        if (status.innerHTML == "pending") {
          let status_selection = document.createElement("select");
          status_selection.setAttribute("id", "status_selection");
          let option1 = document.createElement("option");
          option1.setAttribute("value", "4");
          option1.innerHTML = "approve";
          let option2 = document.createElement("option");
          option2.setAttribute("value", "5");
          option2.innerHTML = "deny";
          status_selection.appendChild(option1);
          status_selection.appendChild(option2);
          status.appendChild(status_selection);
        }
        tableRow.appendChild(status);

        let submitted_at = document.createElement("td");
        submitted_at.innerHTML = user["submitted_at"];
        tableRow.appendChild(submitted_at);

        let type_of_expense = document.createElement("td");
        type_of_expense.innerHTML = user["type_of_expense"];
        tableRow.appendChild(type_of_expense);
      }
    }
  }
}
let selectElement = document.querySelector("#status");

var text = ""; // declared globally in order to use it in the function filter_reimbursement_status
selectElement.addEventListener("change", (e) => {
  text = e.target.value;
  console.log(text);
});

// let select_status_of_reimbursement = document.getElementById("status-select");
// select_status_of_reimbursement.addEventListener("click", select_status);
// var text = ""; // declared globally in order to use it in the function filter_reimbursement_status
// function select_status() {
//   let select = document.getElementById("status");
//   text = select.options[select.selectedIndex].text;
//   console.log(text);
//   //return text;
// }

let filter_status_of_reimbursement = document.getElementById("status-filter");
filter_status_of_reimbursement.addEventListener(
  "click",
  filter_reimbursement_status
);

async function filter_reimbursement_status() {
  let res = await fetch(
    `http://127.0.0.1:8080/users/${username}?status=${text}`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  let data = await res.json();
  let data_array = data[`Reimbursement details of ${username}`];
  console.log("success at query selector");

  create_table(data_array);
}
