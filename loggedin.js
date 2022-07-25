let logoutButton = document.querySelector("#logout");
logoutButton.addEventListener("click", logout);

var username = sessionStorage.getItem("USERNAME"); //in order to pass it as a parameter in function get_all_reimbursement
var role = sessionStorage.getItem("ROLE");

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
    employee_create_reimbursement.setAttribute(
      "class",
      "button is-danger is-outlined"
    );
    employee_create_reimbursement.innerHTML = "Create Reimbursement"; // edit from here for reimbursement form
    employee_create_reimbursement.addEventListener("click", () => {
      console.log("Create Reimbursement");
      let table_display = document.querySelector("#table_reimbursement");
      table_display.style.display = "none"; // hide the table while creating a new reimbursement
      let reimb_form = document.querySelector("#reimbursement_form");
      reimb_form.reset();
      console.log(reimb_form.hidden);
      reimb_form.removeAttribute("hidden");
      console.log(reimb_form.hidden);
      // handling form elements
      let typeOfExpense = document.querySelector("#typeOfExpense");
      let type_of_expense = "";
      typeOfExpense.addEventListener("change", (e) => {
        type_of_expense = e.target.value;
      });

      let submit_btn = document.querySelector("#expenseCreateBtn");
      submit_btn.addEventListener("click", async () => {
        let reimbursement_amount = parseInt(
          document.querySelector("#reimbursementAmt").value
        );
        console.log(typeof reimbursement_amount);

        let description = document.querySelector("#description").value;
        console.log(type_of_expense);
        console.log(description);

        let res = await fetch(`http://127.0.0.1:8080/users/${username}`, {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reimbursement_amount: reimbursement_amount,
            type_of_expense: type_of_expense,
            description: description,
          }),
        });
        if (res.status == 201) {
          console.log("New Reimbursement created");
          reimb_form.reset();
          let reimb_success = document.querySelector("#reimb_success");
          reimb_success.removeAttribute("hidden");
          if (!reimb_form.hidden) {
            reimb_form.setAttribute("hidden", true);
          }
        }
      });
    });
  }
});

function create_table(data_array) {
  let table_head = document.querySelector("#table_head");
  table_head.removeAttribute("hidden");
  let tableBody = document.querySelector("#t-body");
  // check if the tbody already has any child elements. If any child elements found, don't create a new table
  if (!tableBody.hasChildNodes()) {
    let table_display = document.querySelector("#table_reimbursement");
    table_display.style.display = ""; //it resets the element's display property to the default by blanking out the inline "display: none" which was set while creating a new reimbursement form
    let reimb_form = document.querySelector("#reimbursement_form");
    if (!reimb_form.hidden) {
      reimb_form.setAttribute("hidden", true);
    }
    let reimb_success = document.querySelector("#reimb_success");
    if (!reimb_success.hidden) {
      reimb_success.setAttribute("hidden", true);
    }
    for (let user of data_array) {
      let tableRow = document.createElement("tr");
      tableRow.setAttribute("id", user["reimb_id"]); // old id was "reimb_row"
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

      let approve_deny = document.createElement("td");
      let approve_btn = document.createElement("button");
      approve_btn.setAttribute("type", "button");
      approve_btn.setAttribute("name", user["reimb_id"]);
      approve_btn.setAttribute("value", "approved");
      approve_btn.setAttribute("id", "status-approve");
      approve_btn.setAttribute("class", "button is-success is-focused");
      approve_btn.textContent = "Approve";
      let deny_btn = document.createElement("button");
      deny_btn.setAttribute("type", "button");
      deny_btn.setAttribute("name", user["reimb_id"]);
      deny_btn.setAttribute("value", "denied");
      deny_btn.setAttribute("class", "button is-danger is-active");
      deny_btn.textContent = "Deny";
      if (status.innerHTML == "pending" && role == "finance_manager") {
        approve_deny.appendChild(approve_btn);
        approve_deny.appendChild(deny_btn);
        tableRow.appendChild(approve_deny);
        if (role == "finance_manager") {
          // approve button event listener
          approve_btn.addEventListener("click", async () => {
            console.log(approve_btn.name);
            let reimb_id = approve_btn.name;
            let status = approve_btn.value;
            let reimb_author = user["reimb_author"];
            console.log(reimb_author);
            let res = await fetch(`http://127.0.0.1:8080/users/${username}`, {
              credentials: "include",
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                reimb_id: reimb_id,
                reimb_author: reimb_author,
                status: status,
              }),
            });
            if (res.status == 200) {
              console.log("success");
              document.getElementById(reimb_id).style.display = "none"; // hide an element, set the style display property to “none”
            }
          }); //############
          // deny button event listener
          deny_btn.addEventListener("click", async () => {
            console.log(deny_btn.name);
            let reimb_id = deny_btn.name;
            let status = deny_btn.value;
            let reimb_author = user["reimb_author"];
            console.log(reimb_author);
            let res = await fetch(`http://127.0.0.1:8080/users/${username}`, {
              credentials: "include",
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                reimb_id: reimb_id,
                reimb_author: reimb_author,
                status: status,
              }),
            });
            if (res.status == 200) {
              console.log("success");
              document.getElementById(reimb_id).style.display = "none"; // hide an element, set the style display property to “none”
            }
          });
        } //********* */
      }
    }
  } else {
    {
      tableBody.innerHTML = "";
      let table_display = document.querySelector("#table_reimbursement");

      table_display.style.display = ""; //it resets the element's display property to the default by blanking out the inline "display: none" which was set while creating a new reimbursement form
      let reimb_form = document.querySelector("#reimbursement_form");
      if (!reimb_form.hidden) {
        reimb_form.setAttribute("hidden", true);
      }
      let reimb_success = document.querySelector("#reimb_success");
      if (!reimb_success.hidden) {
        reimb_success.setAttribute("hidden", true);
      }

      for (let user of data_array) {
        let tableRow = document.createElement("tr");
        tableRow.setAttribute("id", user["reimb_id"]); // old id was "reimb_row"
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

        let approve_deny = document.createElement("td");
        let approve_btn = document.createElement("button");
        approve_btn.setAttribute("type", "button");
        approve_btn.setAttribute("name", user["reimb_id"]);
        approve_btn.setAttribute("value", "approved");
        approve_btn.setAttribute("id", "status-approve");
        approve_btn.setAttribute("class", "button is-success is-focused");
        approve_btn.textContent = "Approve";
        let deny_btn = document.createElement("button");
        deny_btn.setAttribute("type", "button");
        deny_btn.setAttribute("name", user["reimb_id"]);
        deny_btn.setAttribute("value", "denied");
        deny_btn.setAttribute("class", "button is-danger is-active");
        deny_btn.textContent = "Deny";
        if (status.innerHTML == "pending" && role == "finance_manager") {
          approve_deny.appendChild(approve_btn);
          approve_deny.appendChild(deny_btn);
          tableRow.appendChild(approve_deny);
          if (role == "finance_manager") {
            // approve button event listener
            approve_btn.addEventListener("click", async () => {
              console.log(approve_btn.name);
              let reimb_id = approve_btn.name;
              let status = approve_btn.value;
              let reimb_author = user["reimb_author"];
              console.log(reimb_author);
              let res = await fetch(`http://127.0.0.1:8080/users/${username}`, {
                credentials: "include",
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  reimb_id: reimb_id,
                  reimb_author: reimb_author,
                  status: status,
                }),
              });
              if (res.status == 200) {
                console.log("success");
                document.getElementById(reimb_id).style.display = "none"; // hide an element, set the style display property to “none”
              }
            }); //############
            // deny button event listener
            deny_btn.addEventListener("click", async () => {
              console.log(deny_btn.name);
              let reimb_id = deny_btn.name;
              let status = deny_btn.value;
              let reimb_author = user["reimb_author"];
              console.log(reimb_author);
              let res = await fetch(`http://127.0.0.1:8080/users/${username}`, {
                credentials: "include",
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  reimb_id: reimb_id,
                  reimb_author: reimb_author,
                  status: status,
                }),
              });
              if (res.status == 200) {
                console.log("success");
                document.getElementById(reimb_id).style.display = "none"; // hide an element, set the style display property to “none”
              }
            });
          } //********* */
        }
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

selectElement.addEventListener("change", filter_reimbursement_status);

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

// Helper function to set multiple attributes of an element
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach((attr) => {
    element.setAttribute(attr, attributes[attr]);
  });
}

// Handling new reimbursement form element
