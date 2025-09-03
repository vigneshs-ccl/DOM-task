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

const currentPath = window.location.pathname; 
console.log(currentPath);

[studentsTable, studentsMarkTable].forEach((link) => {
  const hrefFile = link.getAttribute("href").replace("./", ""); 
  if (currentPath.endsWith(hrefFile)) {
    link.classList.add("bg-gray-200", "font-bold", "text-blue-600");
  } else {
    link.classList.remove("bg-gray-200", "font-bold", "text-blue-600");
  }
});

navigationContainer.append(
  studentsTable,
  studentsMarkTable
);
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
  let headRow = `
    <tr class="bg-gray-700 text-white">
      <th class="py-2 px-4 border">Name</th>
      <th class="py-2 px-4 border">Roll No</th>
  `;
  subjectsArray.forEach((sub) => {
    headRow += `<th class="py-2 px-4 border">${sub}</th>`;
  });
  headRow += "</tr>";
  thead.innerHTML = headRow;
  table.appendChild(thead);

  // Tbody
  const tbody = document.createElement("tbody");
  students.forEach((student) => {
    let row = `
      <tr class="text-white hover:bg-white hover:text-gray-700">
        <td class="py-2 px-4 border">${student.name}</td>
        <td class="py-2 px-4 border">${student.rollno}</td>
    `;

    subjectsArray.forEach((sub) => {
      const mark =
        student.marks && student.marks[sub] !== undefined
          ? student.marks[sub]
          : "-";
      row += `<td class="py-2 px-4 border text-center">${mark}</td>`;
    });

    row += "</tr>";
    tbody.innerHTML += row;
  });

  table.appendChild(tbody);
  container.appendChild(table);
}
