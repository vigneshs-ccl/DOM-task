document.body.setAttribute("class", "p-10 bg-[#EDEBFE]");

// Container
const container = document.createElement("div");
container.setAttribute("class", "max-w-6xl mx-auto");
document.body.appendChild(container);

// Title & Add Button
const headerDiv = document.createElement("div");
headerDiv.setAttribute("class", "flex justify-between items-center mb-5");

const title = document.createElement("h1");
title.textContent = "Students Mark Details";
title.setAttribute("class", "text-2xl font-bold");
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

// Table
const table = document.createElement("table");
table.setAttribute(
  "class",
  "min-w-full border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden"
);

const thead = document.createElement("thead");
thead.innerHTML = `
  <tr class="bg-gray-200">
    <th class="py-2 px-4 border">Name</th>
    <th class="py-2 px-4 border">Roll No</th>
    <th class="py-2 px-4 border">Subjects & Marks</th>
  </tr>
`;
table.appendChild(thead);

const tbody = document.createElement("tbody");

// Load students from localStorage
const students = JSON.parse(localStorage.getItem("students")) || [];

students.forEach((student) => {
  const tr = document.createElement("tr");
  tr.setAttribute("class", "hover:bg-gray-100");

  // Name
  const nameTd = document.createElement("td");
  nameTd.setAttribute("class", "py-2 px-4 border");
  nameTd.textContent = student.name;
  tr.appendChild(nameTd);

  // Roll No
  const rollTd = document.createElement("td");
  rollTd.setAttribute("class", "py-2 px-4 border");
  rollTd.textContent = student.rollno;
  tr.appendChild(rollTd);

  // Subjects & Marks
  const marksTd = document.createElement("td");
  marksTd.setAttribute("class", "py-2 px-4 border");

  if (student.marks && Object.keys(student.marks).length > 0) {
    // Show each subject: mark
    const marksList = document.createElement("ul");
    Object.entries(student.marks).forEach(([subject, mark]) => {
      const li = document.createElement("li");
      li.textContent = `${subject}: ${mark}`;
      marksList.appendChild(li);
    });
    marksTd.appendChild(marksList);
  } else {
    marksTd.textContent = "No marks available";
  }

  tr.appendChild(marksTd);
  tbody.appendChild(tr);
});

table.appendChild(tbody);
container.appendChild(table);
