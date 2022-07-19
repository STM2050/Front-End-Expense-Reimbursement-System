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

export { create_table };
