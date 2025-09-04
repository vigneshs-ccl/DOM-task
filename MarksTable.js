document.body.setAttribute("class", "bg-gray-600");

// Container
const container = document.createElement("div");
container.setAttribute("class", "max-w-6xl mx-auto");

/* ---------------- SIDEBAR ---------------- */
const sideBarContainer = document.createElement("div");
sideBarContainer.setAttribute(
  "class",
  "w-64 bg-white shadow-lg p-5 flex flex-col"
);

const titleSidebar = document.createElement("h1");
titleSidebar.textContent = "Students Mark list Management";
titleSidebar.setAttribute("class", "text-2xl font-bold text-gray-800 mb-6");

// navigation container
const navigationContainer = document.createElement("nav");
navigationContainer.setAttribute("class", "flex flex-col space-y-4");

// students table
const studentsTable = document.createElement("a");
studentsTable.textContent = "Students detail Table";
studentsTable.setAttribute(
  "class",
  "flex items-center px-3 py-2 rounded-lg hover:bg-gray-200 text-gray-700"
);
studentsTable.href = "./students.html";

// students mark table
const studentsMarkTable = document.createElement("a");
studentsMarkTable.textContent = "Students Mark Table";
studentsMarkTable.setAttribute(
  "class",
  "flex items-center px-3 py-2 rounded-lg hover:bg-gray-200 text-gray-700"
);
studentsMarkTable.href = "./MarksTable.html";

// ---------------- Active Logic ----------------
const currentPath = window.location.pathname;
console.log("Current path:", currentPath);

// group related pages
const studentDetailPages = ["students.html", "studentForm.html"];
const studentMarkPages = ["MarksTable.html", "studentMarks.html"];

// check active link
if (studentDetailPages.some(page => currentPath.endsWith(page))) {
  studentsTable.classList.add("bg-gray-200", "font-bold", "text-blue-600");
} else if (studentMarkPages.some(page => currentPath.endsWith(page))) {
  studentsMarkTable.classList.add("bg-gray-200", "font-bold", "text-blue-600");
}

navigationContainer.append(studentsTable, studentsMarkTable);
sideBarContainer.append(titleSidebar, navigationContainer);
/* =============================================*/

// === MAIN LAYOUT ===
const layoutContainer = document.createElement("div");
layoutContainer.setAttribute("class", "flex w-full h-screen");

// Sidebar (already built above)
layoutContainer.appendChild(sideBarContainer);

const mainContent = document.createElement("div");
mainContent.setAttribute("class", "flex-1 p-6 pt-20 overflow-y-auto");
mainContent.appendChild(container);
// Add both to layout
layoutContainer.appendChild(mainContent);
document.body.appendChild(layoutContainer);
/*=============================================*/
// Title & Add Button
const headerDiv = document.createElement("div");
headerDiv.setAttribute("class", "flex justify-between items-center mb-5");

const title = document.createElement("h1");
title.textContent = "Students Mark Details";
title.setAttribute("class", "text-2xl text-white font-bold");
headerDiv.appendChild(title);

const addBtn = document.createElement("button");
addBtn.textContent = "Add Student Marks";
addBtn.setAttribute(
  "class",
  "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
);

addBtn.addEventListener("click", () => {
  window.location.href = "./studentMarksform.html";
});

headerDiv.appendChild(addBtn);
container.appendChild(headerDiv);

// Load students
const students = JSON.parse(localStorage.getItem("students")) || [];

// If no students
if (students.length === 0) {
  const noData = document.createElement("h1");
  noData.textContent = "- - Add new students to add Marks - -";
  noData.setAttribute("class", "text-center text-yellow-300 mt-10 text-xl");
  container.appendChild(noData);
} else if (!students.some((student) => student.marks)) {
  const noMarks = document.createElement("h1");
  noMarks.textContent = "No marks data available.";
  noMarks.setAttribute("class", "text-center text-red-400 mt-10 text-xl");
  container.appendChild(noMarks);
} else {
  // Collect all unique subjects from students
  const allSubjects = new Set();
  students.forEach((student) => {
    if (student.marks) {
      Object.keys(student.marks).forEach((sub) => allSubjects.add(sub));
    }
  });

  const subjectsArray = Array.from(allSubjects);

  // Table
  const table = document.createElement("table");
  table.setAttribute(
    "class",
    "min-w-full border border-white bg-gray-600 shadow-md rounded-lg overflow-hidden text-lg"
  );

  // Thead
  const thead = document.createElement("thead");
  const headTr = document.createElement("tr");
  headTr.setAttribute("class", "bg-gray-700 text-white");

  const thName = document.createElement("th");
  thName.setAttribute("class", "py-2 px-4 border");
  thName.textContent = "Name";
  headTr.appendChild(thName);

  const thRoll = document.createElement("th");
  thRoll.setAttribute("class", "py-2 px-4 border");
  thRoll.textContent = "Roll No";
  headTr.appendChild(thRoll);

  subjectsArray.forEach((sub) => {
    const th = document.createElement("th");
    th.setAttribute("class", "py-2 px-4 border");
    th.textContent = sub;
    headTr.appendChild(th);
  });

  thead.appendChild(headTr);
  table.appendChild(thead);

  // Tbody
  const tbody = document.createElement("tbody");
  students.forEach((student) => {
    if (student.marks) {
      const tr = document.createElement("tr");
      tr.setAttribute("class", "text-white bg-gray-400");

      const tdName = document.createElement("td");
      tdName.setAttribute("class", "py-2 px-4 border");
      tdName.textContent = student.name;
      tr.appendChild(tdName);

      const tdRoll = document.createElement("td");
      tdRoll.setAttribute("class", "py-2 px-4 border");
      tdRoll.textContent = student.rollno;
      tr.appendChild(tdRoll);

      subjectsArray.forEach((sub) => {
        const td = document.createElement("td");
        td.setAttribute("class", "py-2 px-4 border text-center");
        td.textContent =
          student.marks && student.marks[sub] !== undefined
            ? student.marks[sub]
            : "-";
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    }
  });

  table.appendChild(tbody);
  container.appendChild(table);
}
