document.body.setAttribute("class", "p-10 bg-[#EDEBFE]");

// Title
const title = document.createElement("h1");
title.textContent = "Student Details";
title.setAttribute("class", "text-2xl font-bold mb-5");
document.body.appendChild(title);

// Table
const table = document.createElement("table");
table.setAttribute(
  "class",
  "table-auto border-collapse border border-gray-300 w-full"
);

// Table Head
const thead = document.createElement("thead");
const headerRow = document.createElement("tr");
["Name", "Roll No", "Email", "DOB", "Gender", "Stream", "Actions"].forEach(
  (text) => {
    const th = document.createElement("th");
    th.textContent = text;
    th.setAttribute("class", "border px-4 py-2");
    headerRow.appendChild(th);
  }
);
thead.appendChild(headerRow);

// Table Body
const tbody = document.createElement("tbody");
tbody.id = "studentsBody";

table.appendChild(thead);
table.appendChild(tbody);
document.body.appendChild(table);

/* ---------------- Load Student ---------------- */
function loadStudents() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  tbody.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.textContent = student.name;
    nameTd.setAttribute("class", "border px-4 py-2");

    const rollTd = document.createElement("td");
    rollTd.textContent = student.rollno;
    rollTd.setAttribute("class", "border px-4 py-2");

    const emailTd = document.createElement("td");
    emailTd.textContent = student.email;
    emailTd.setAttribute("class", "border px-4 py-2");

    const dobTd = document.createElement("td");
    dobTd.textContent = student.dob;
    dobTd.setAttribute("class", "border px-4 py-2");

    const genderTd = document.createElement("td");
    genderTd.textContent = student.gender;
    genderTd.setAttribute("class", "border px-4 py-2");

    const streamTd = document.createElement("td");
    streamTd.textContent = student.stream;
    streamTd.setAttribute("class", "border px-4 py-2");

    const actionsTd = document.createElement("td");
    actionsTd.setAttribute("class", "border px-4 py-2");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.setAttribute("class", "bg-yellow-500 text-white px-2 py-1 rounded");
    editBtn.addEventListener("click", () => editStudent(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute(
      "class",
      "bg-red-500 text-white px-2 py-1 rounded ml-2"
    );
    deleteBtn.addEventListener("click", () => deleteStudent(index));

    actionsTd.appendChild(editBtn);
    actionsTd.appendChild(deleteBtn);

    row.appendChild(nameTd);
    row.appendChild(rollTd);
    row.appendChild(emailTd);
    row.appendChild(dobTd);
    row.appendChild(genderTd);
    row.appendChild(streamTd);
    row.appendChild(actionsTd);

    tbody.appendChild(row);
  });
}

function deleteStudent(index) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  loadStudents();
}

function editStudent(index) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  const student = students[index];

  localStorage.setItem("editIndex", index);
  localStorage.setItem("editStudent", JSON.stringify(student));

  window.location.href = "index.html";
}

// Load students on page load
window.onload = loadStudents;
