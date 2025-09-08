document.body.setAttribute("class", "bg-gray-100 font-sans");

/* ---------------- Container ---------------- */
const container = document.createElement("div");
container.setAttribute("class", "max-w-7xl mx-auto");

/* ---------------- Title & Add Button ---------------- */
const headerDiv = document.createElement("div");
headerDiv.setAttribute("class", "flex justify-between items-center mb-6");

const title = document.createElement("h1");
title.textContent = "Student Details";
title.setAttribute(
  "class",
  "text-3xl text-gray-900 font-extrabold tracking-wide"
);
headerDiv.appendChild(title);

const addBtn = document.createElement("button");
addBtn.innerHTML = `<i class="fa-solid fa-plus mr-2"></i> Add Student`;
addBtn.setAttribute(
  "class",
  "bg-[#152340] text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition flex items-center"
);
addBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});
headerDiv.appendChild(addBtn);
container.appendChild(headerDiv);

/* ---------------- SIDEBAR ---------------- */
const sideBarContainer = document.createElement("div");
sideBarContainer.setAttribute(
  "class",
  "w-64 bg-gray-900 text-white shadow-lg p-6 flex flex-col"
);

const titleSidebar = document.createElement("h1");
titleSidebar.textContent = "Students Mark List Management";
titleSidebar.setAttribute(
  "class",
  "text-lg font-semibold mb-6 tracking-wide border-b border-gray-700 pb-3"
);

// navigation container
const navigationContainer = document.createElement("nav");
navigationContainer.setAttribute("class", "flex flex-col space-y-3");

// students table
const studentsTable = document.createElement("a");
studentsTable.textContent = "Students Detail Table";
studentsTable.setAttribute(
  "class",
  "px-3 py-2 rounded-lg hover:bg-gray-800 transition text-gray-300"
);
studentsTable.href = "./students.html";

// students mark table
const studentsMarkTable = document.createElement("a");
studentsMarkTable.textContent = "Students Mark Table";
studentsMarkTable.setAttribute(
  "class",
  "px-3 py-2 rounded-lg hover:bg-gray-800 transition text-gray-300"
);
studentsMarkTable.href = "./MarksTable.html";

// ---------------- Active Logic ----------------
const currentPath = window.location.pathname;
const studentDetailPages = ["students.html", "studentForm.html"];
const studentMarkPages = ["MarksTable.html", "studentMarks.html"];

if (studentDetailPages.some((page) => currentPath.endsWith(page))) {
  studentsTable.classList.add(
    "border-l-4",
    "border-blue-500",
    "bg-gray-800",
    "text-white"
  );
} else if (studentMarkPages.some((page) => currentPath.endsWith(page))) {
  studentsMarkTable.classList.add(
    "border-l-4",
    "border-blue-500",
    "bg-gray-800",
    "text-white"
  );
}

navigationContainer.append(studentsTable, studentsMarkTable);
sideBarContainer.append(titleSidebar, navigationContainer);

/* ---------------- Layout ---------------- */
const layoutContainer = document.createElement("div");
layoutContainer.setAttribute("class", "flex w-full h-screen");

// Sidebar
layoutContainer.appendChild(sideBarContainer);

// Main content wrapper
const mainContent = document.createElement("div");
mainContent.setAttribute("class", "flex-1 p-8 overflow-y-auto bg-gray-50");
mainContent.appendChild(container);

// Add both to layout
layoutContainer.appendChild(mainContent);
document.body.appendChild(layoutContainer);

/* ---------------- Search Bar ---------------- */
const searchDiv = document.createElement("div");
searchDiv.setAttribute(
  "class",
  "flex items-center gap-3 mb-6 bg-white p-4 rounded-lg shadow"
);

const searchInput = document.createElement("input");
searchInput.setAttribute("type", "text");
searchInput.setAttribute(
  "class",
  "border px-4 py-2 rounded-lg w-1/3 outline-none focus:ring-2 focus:ring-blue-500"
);
searchInput.setAttribute("placeholder", "Search...");

const searchSelect = document.createElement("select");
searchSelect.setAttribute(
  "class",
  "border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
);
["Name", "Roll No", "Group"].forEach((optionText) => {
  const option = document.createElement("option");
  option.value = optionText.toLowerCase().replace(" ", "");
  option.textContent = optionText;
  searchSelect.appendChild(option);
});

searchDiv.append(searchInput, searchSelect);
container.appendChild(searchDiv);

/* ---------------- Export Section ---------------- */
const exportDiv = document.createElement("div");
exportDiv.setAttribute(
  "class",
  "flex gap-4 mb-6 bg-white p-4 rounded-lg shadow"
);

const exportPdfBtn = document.createElement("button");
exportPdfBtn.innerHTML = `<i class="fa-solid fa-file-pdf"></i> Export as PDF`;
exportPdfBtn.className =
  "flex items-center gap-2 bg-red-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-700 transition";

const exportExcelBtn = document.createElement("button");
exportExcelBtn.innerHTML = `<i class="fa-solid fa-file-excel"></i> Export as Excel`;
exportExcelBtn.className =
  "flex items-center gap-2 bg-green-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-green-700 transition";

exportDiv.append(exportPdfBtn, exportExcelBtn);
container.appendChild(exportDiv);

/* ---------------- Table ---------------- */
const table = document.createElement("table");
table.setAttribute(
  "class",
  "min-w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden"
);

// Table Head
const thead = document.createElement("thead");
thead.setAttribute("class", "bg-blue-600");
const headerRow = document.createElement("tr");
headerRow.className = "text-white text-left text-sm uppercase";
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

[
  "Name",
  "Roll No",
  "Email",
  "DOB",
  "Gender",
  "Group",
  "Subjects",
  "Actions",
].forEach((text) => {
  const th = document.createElement("th");
  th.textContent = text;
  th.setAttribute(
    "class",
    "px-4 py-3 text-left font-medium text-white cursor-pointer select-none"
  );

  if (text !== "Actions") {
    th.addEventListener("click", () => {
      const key = text.toLowerCase().replace(" ", "");
      sortStudents(key);
    });
  }

  headerRow.appendChild(th);
});
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

  const existingNoData = container.querySelector(".no-data-message");
  if (existingNoData) existingNoData.remove();

  searchDiv.style.display = "flex";
  exportDiv.style.display = "flex";

  if (displayList.length === 0) {
    table.style.display = "none";
    exportDiv.style.display = "none";

    const noData = document.createElement("h1");
    noData.textContent = "- - No students Data available - -";
    noData.setAttribute(
      "class",
      "text-center text-yellow-600 mt-10 text-xl no-data-message"
    );
    container.appendChild(noData);
  } else {
    table.style.display = "table";
    thead.style.display = "table-header-group";
    tbody.innerHTML = "";

    displayList.forEach((student) => {
      const actualIndex = students.findIndex(
        (s) => s.rollno === student.rollno
      );

      const row = document.createElement("tr");
      row.className =
        "odd:bg-gray-50 even:bg-gray-100 hover:bg-blue-50 transition";

      const createTd = (text) => {
        const td = document.createElement("td");
        td.textContent = text;
        td.setAttribute(
          "class",
          "border px-4 py-2 text-gray-700 text-sm font-medium"
        );
        return td;
      };

      row.appendChild(createTd(student.name));
      row.appendChild(createTd(student.rollno));
      row.appendChild(createTd(student.email));
      row.appendChild(createTd(student.dob));
      row.appendChild(createTd(student.gender));
      row.appendChild(createTd(student.group));
      row.appendChild(
        createTd(student.subjects ? student.subjects.join(", ") : "")
      );

      const actionsTd = document.createElement("td");
      actionsTd.setAttribute("class", "border px-2 py-4");

      const editBtn = document.createElement("button");
      editBtn.innerHTML = `<i class="fa-solid fa-pen"></i> Edit`;
      editBtn.className =
        "flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-md shadow hover:bg-yellow-600 transition";
      editBtn.addEventListener("click", () => editStudent(actualIndex));

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i> Delete`;
      deleteBtn.className =
        "flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-md shadow hover:bg-red-600 transition";
      deleteBtn.addEventListener("click", () => deleteStudent(actualIndex));

      const pdfBtn = document.createElement("button");
      pdfBtn.innerHTML = `<i class="fa-solid fa-file-pdf"></i> Pdf`;
      pdfBtn.className =
        "flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md shadow hover:bg-blue-600 transition";
      pdfBtn.addEventListener("click", function () {
        exportStudentPDF(student);
      });

      const excelBtn = document.createElement("button");
      excelBtn.innerHTML = `<i class="fa-solid fa-file-excel"></i> Excel`;
      excelBtn.className =
        "flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-md shadow hover:bg-green-600 transition";
      excelBtn.addEventListener("click", function () {
        exportStudentExcel(student);
      });

      const btnGroup = document.createElement("div");
      btnGroup.setAttribute("class", "flex justify-center gap-2 flex-wrap");
      btnGroup.append(editBtn, deleteBtn, pdfBtn, excelBtn);

      actionsTd.appendChild(btnGroup);
      row.appendChild(actionsTd);
      tbody.appendChild(row);
    });
  }
}

/* ---------------- Delete Student ---------------- */
function deleteStudent(index) {
  const overlay = document.createElement("div");
  overlay.setAttribute(
    "class",
    "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  );

  const modal = document.createElement("div");
  modal.setAttribute(
    "class",
    "bg-white rounded-xl shadow-2xl p-6 w-96 text-center animate-fadeIn"
  );

  const title = document.createElement("h2");
  title.textContent = "Are you sure?";
  title.setAttribute("class", "text-xl font-bold text-gray-900 mb-4");

  const message = document.createElement("p");
  message.textContent =
    "This action will permanently delete the student record.";
  message.setAttribute("class", "text-gray-600 mb-6");

  const btnDiv = document.createElement("div");
  btnDiv.setAttribute("class", "flex justify-center gap-4");

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.setAttribute(
    "class",
    "bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
  );
  cancelBtn.addEventListener("click", () => {
    document.body.removeChild(overlay);
  });

  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "Delete";
  confirmBtn.setAttribute(
    "class",
    "bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
  );
  confirmBtn.addEventListener("click", () => {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
    document.body.removeChild(overlay);
  });

  btnDiv.append(cancelBtn, confirmBtn);
  modal.append(title, message, btnDiv);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

/* ---------------- Edit Student ---------------- */
function editStudent(index) {
  localStorage.setItem("editIndex", index);
  window.location.href = "index.html?edit=true";
}

/* ---------------- Search Function ---------------- */
function searchStudents() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const query = searchInput.value.toLowerCase().trim();
  let filterBy = searchSelect.value || "name";

  if (!query) {
    loadStudents();
    return;
  }

  const filtered = students.filter((student) => {
    const value = student[filterBy]
      ? String(student[filterBy]).toLowerCase()
      : "";
    return value.includes(query);
  });

  loadStudents(filtered);
}

searchInput.addEventListener("input", searchStudents);
searchSelect.addEventListener("change", searchStudents);

window.onload = () => loadStudents();


/* ---------------- Safe Download ---------------- */
function triggerDownload(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ---------------- Export Single Student ---------------- */
function exportStudentPDF(student) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Professional header
  doc.setFillColor(41, 128, 185); // Blue
  doc.setTextColor(255, 255, 255);
  doc.rect(0, 0, 210, 20, "F");
  doc.setFontSize(16);
  doc.text("Student Detail", 105, 13, { align: "center" });

  // Reset text color
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);

  let y = 30;
  const fields = {
    Name: student.name,
    "Roll No": student.rollno,
    Email: student.email,
    Gender: student.gender,
    Group: student.group,
    Subjects: (student.subjects || []).join(", "),
  };

  for (const [key, value] of Object.entries(fields)) {
    doc.text(`${key}: ${value}`, 20, y);
    y += 10;
  }

  const pdfBlob = doc.output("blob");
  triggerDownload(pdfBlob, `${student.rollno}_details.pdf`);
}

function exportStudentExcel(student) {
  const flatStudent = {
    Name: student.name,
    "Roll No": student.rollno,
    Email: student.email,
    Gender: student.gender,
    Group: student.group,
    Subjects: (student.subjects || []).join(", "),
  };

  const ws = XLSX.utils.json_to_sheet([flatStudent]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Student");

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const excelBlob = new Blob([wbout], { type: "application/octet-stream" });
  triggerDownload(excelBlob, `${student.rollno}_details.xlsx`);
}

/* ---------------- Export Whole Table ---------------- */
function exportAllPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Professional header
  doc.setFillColor(41, 128, 185); // Blue
  doc.setTextColor(255, 255, 255);
  doc.rect(0, 0, 210, 20, "F");
  doc.setFontSize(16);
  doc.text("All Students detail", 105, 13, { align: "center" });

  // Reset text color
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);

  const students = JSON.parse(localStorage.getItem("students")) || [];
  let y = 30;

  students.forEach((student, idx) => {
    const fields = {
      Name: student.name,
      "Roll No": student.rollno,
      Email: student.email,
      Gender: student.gender,
      Group: student.group,
      Subjects: (student.subjects || []).join(", "),
    };

    doc.text(`${idx + 1}. Student Record`, 20, y);
    y += 8;

    for (const [key, value] of Object.entries(fields)) {
      doc.text(`${key}: ${value}`, 30, y);
      y += 8;
    }

    y += 5;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  const pdfBlob = doc.output("blob");
  triggerDownload(pdfBlob, "All_Students.pdf");
}

function exportAllExcel() {
  let students = JSON.parse(localStorage.getItem("students")) || [];

  const flatStudents = students.map((s) => ({
    Name: s.name,
    "Roll No": s.rollno,
    Email: s.email,
    Gender: s.gender,
    Group: s.group,
    Subjects: (s.subjects || []).join(", "),
  }));

  const ws = XLSX.utils.json_to_sheet(flatStudents);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Students");

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const excelBlob = new Blob([wbout], { type: "application/octet-stream" });
  triggerDownload(excelBlob, "All_Students.xlsx");
}

/* ---------------- Attach Events ---------------- */
exportPdfBtn.addEventListener("click", exportAllPDF);
exportExcelBtn.addEventListener("click", exportAllExcel);