let users = JSON.parse(localStorage.getItem("users")) || [];
const tableBody = document.querySelector("#userTable tbody");
const noUsers = document.getElementById("noUsers");

// 🔄 Render user list into the table
function renderUsers() {
  tableBody.innerHTML = "";

  if (users.length === 0) {
    document.getElementById("userTable").style.display = "none";
    noUsers.style.display = "block";
    return;
  }

  document.getElementById("userTable").style.display = "table";
  noUsers.style.display = "none";

  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.fullName}</td>
      <td>${user.phone}</td>
      <td>${user.email}</td>
      <td>${user.message || "بدون پیام"}</td>
      <td>
        <button class="btn btn-danger" onclick="deleteUser(${index})">حذف</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// 🗑 Delete a user request
function deleteUser(index) {
  if (confirm("آیا مطمئن هستید که می‌خواهید این درخواست را حذف کنید؟")) {
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    renderUsers();
  }
}

// Initial render
renderUsers();
