document.body.setAttribute("class", "p-10 bg-[#EDEBFE]");

// Container
const container = document.createElement("div");
container.setAttribute("class", "max-w-6xl mx-auto");
document.body.appendChild(container);

// Title & Add Button
const headerDiv = document.createElement("div");
headerDiv.setAttribute("class", "flex justify-between items-center mb-5");

const title = document.createElement("h1");
title.textContent = "Student Details";
title.setAttribute("class", "text-2xl font-bold");
headerDiv.appendChild(title);

const addBtn = document.createElement("button");
addBtn.textContent = "Add Student";
addBtn.setAttribute(
  "class",
  "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
);
addBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});
headerDiv.appendChild(addBtn);
container.appendChild(headerDiv);

/* ---------------- Search Bar ---------------- */
const searchDiv = document.createElement("div");
searchDiv.setAttribute("class", "flex items-center gap-3 mb-5");

const searchInput = document.createElement("input");
searchInput.setAttribute("type", "text");
searchInput.setAttribute(
  "class",
  "border px-3 py-2 rounded w-1/3 outline-none"
);
searchInput.setAttribute("placeholder", "Search...");

const searchSelect = document.createElement("select");
searchSelect.setAttribute("class", "border px-2 py-2 rounded");
["Name", "Roll No", "Group"].forEach((optionText) => {
  const option = document.createElement("option");
  option.value = optionText.toLowerCase().replace(" ", "");
  option.textContent = optionText;
  searchSelect.appendChild(option);
});

searchDiv.append(searchInput, searchSelect);
container.appendChild(searchDiv);

// Table
const table = document.createElement("table");
table.setAttribute(
  "class",
  "min-w-full border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden"
);

// Table Head
const thead = document.createElement("thead");
thead.setAttribute("class", "bg-gray-200");
const headerRow = document.createElement("tr");
let currentSort = { key: null, asc: true };

function sortStudents(key) {
  const students = JSON.parse(localStorage.getItem("students")) || [];

  students.sort((a, b) => {
    const valA = a[key] ? String(a[key]).toLowerCase() : "";
    const valB = b[key] ? String(b[key]).toLowerCase() : "";

    if (valA < valB) return currentSort.asc ? -1 : 1;
    if (valA > valB) return currentSort.asc ? 1 : -1;
    return 0;
  });

  if (currentSort.key === key) currentSort.asc = !currentSort.asc;
  else currentSort = { key, asc: true };

  loadStudents(students);
}

["Name", "Roll No", "Email", "DOB", "Gender", "Group", "Subjects", "Actions"].forEach(
  (text) => {
    const th = document.createElement("th");
    th.textContent = text;
    th.setAttribute(
      "class",
      "border px-4 py-2 text-left font-medium text-gray-700 cursor-pointer"
    );

    if (text !== "Actions") {
      th.addEventListener("click", () => {
        const key = text.toLowerCase().replace(" ", "");
        sortStudents(key);
      });
    }

    headerRow.appendChild(th);
  }
);
thead.appendChild(headerRow);
table.appendChild(thead);

// Table Body
const tbody = document.createElement("tbody");
tbody.id = "studentsBody";
table.appendChild(tbody);
container.appendChild(table);

/* ---------------- Load Students ---------------- */
function loadStudents(filteredStudents = null) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const displayList = filteredStudents || students;
  tbody.innerHTML = "";

  displayList.forEach((student, displayIndex) => {
    const actualIndex = students.findIndex((s) => s.rollno === student.rollno);

    const row = document.createElement("tr");
    row.className = displayIndex % 2 === 0 ? "bg-gray-50" : "bg-white";

    const createTd = (text) => {
      const td = document.createElement("td");
      td.textContent = text;
      td.setAttribute("class", "border px-4 py-2 text-gray-700");
      return td;
    };

    row.appendChild(createTd(student.name));
    row.appendChild(createTd(student.rollno));
    row.appendChild(createTd(student.email));
    row.appendChild(createTd(student.dob));
    row.appendChild(createTd(student.gender));
    row.appendChild(createTd(student.group));
    row.appendChild(createTd(student.subjects ? student.subjects.join(", ") : ""));

    const actionsTd = document.createElement("td");
    actionsTd.setAttribute("class", "border px-4 py-2");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className =
      "bg-yellow-500 text-white px-7 mb-2 py-1 rounded hover:bg-yellow-600";
    editBtn.addEventListener("click", () => editStudent(actualIndex));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className =
      "bg-red-500 text-white px-5 py-1 rounded hover:bg-red-600";
    deleteBtn.addEventListener("click", () => deleteStudent(actualIndex));

    actionsTd.append(editBtn, deleteBtn);
    row.appendChild(actionsTd);
    tbody.appendChild(row);
  });
}

/* ---------------- Delete Student ---------------- */
function deleteStudent(index) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  loadStudents();
}

/* ---------------- Edit Student ---------------- */
function editStudent(index) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const student = students[index];
  localStorage.setItem("editIndex", index);
  localStorage.setItem("editStudent", JSON.stringify(student));
  window.location.href = "index.html";
}

/* ---------------- Search Function ---------------- */
function searchStudents() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const query = searchInput.value.toLowerCase().trim();
  let filterBy = searchSelect.value || "name"; // default to name if nothing selected

  if (!query) {
    loadStudents(); // show all students when search is empty
    return;
  }

  const filtered = students.filter((student) => {
    const value = student[filterBy] ? String(student[filterBy]).toLowerCase() : "";
    return value.includes(query);
  });

  loadStudents(filtered);
}

searchInput.addEventListener("input", searchStudents);
searchSelect.addEventListener("change", searchStudents);

// Load students on page load
window.onload = () => loadStudents();