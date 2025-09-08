document.body.setAttribute("class", "bg-gray-100 font-sans");

// Container
const container = document.createElement("div");
container.setAttribute("class", "max-w-7xl mx-auto");

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

// === MAIN LAYOUT ===
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

// ---------------- HEADER ----------------
const headerDiv = document.createElement("div");
headerDiv.setAttribute("class", "flex justify-between items-center mb-8");

const title = document.createElement("h1");
title.textContent = "📑 Students Mark Details";
title.setAttribute("class", "text-3xl font-extrabold text-gray-800");
headerDiv.appendChild(title);

const addBtn = document.createElement("button");
addBtn.textContent = "+ Add Student Marks";
addBtn.setAttribute(
  "class",
  "bg-blue-600 text-white px-5 py-2 rounded-full shadow hover:bg-blue-700 transition font-semibold"
);
addBtn.addEventListener("click", () => {
  window.location.href = "./studentMarksform.html";
});

headerDiv.appendChild(addBtn);
container.appendChild(headerDiv);

// ---------------- EXPORT SECTION ----------------
const exportDiv = document.createElement("div");
exportDiv.setAttribute(
  "class",
  "flex gap-4 mb-6 bg-white p-4 rounded-xl shadow-md border"
);

const exportPdfBtn = document.createElement("button");
exportPdfBtn.textContent = "📄 Export as PDF";
exportPdfBtn.className =
  "flex items-center gap-2 bg-red-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-700 transition";

const exportExcelBtn = document.createElement("button");
exportExcelBtn.textContent = "📊 Export as Excel";
exportExcelBtn.className =
  "flex items-center gap-2 bg-green-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-green-700 transition";

exportDiv.append(exportPdfBtn, exportExcelBtn);
container.appendChild(exportDiv);

// ---------------- STUDENTS DATA ----------------
const students = JSON.parse(localStorage.getItem("students")) || [];

if (students.length === 0) {
  exportDiv.style.display = "none";
  const noData = document.createElement("h1");
  noData.textContent = "- - Add new students to add Marks - -";
  noData.setAttribute(
    "class",
    "text-center text-yellow-500 mt-10 text-xl font-semibold"
  );
  container.appendChild(noData);
} else if (!students.some((student) => student.marks)) {
  const noMarks = document.createElement("h1");
  noMarks.textContent = "⚠ No marks data available.";
  exportDiv.style.display = "none"
  noMarks.setAttribute(
    "class",
    "text-center text-red-500 mt-10 text-xl font-semibold"
  );
  container.appendChild(noMarks);
} else {
  // Collect all unique subjects
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
    "min-w-full border-collapse bg-white shadow-lg rounded-xl overflow-hidden"
  );

  // Thead
  const thead = document.createElement("thead");
  const headTr = document.createElement("tr");
  headTr.setAttribute(
    "class",
    "bg-blue-600 text-white text-sm uppercase tracking-wide"
  );

  const thName = document.createElement("th");
  thName.setAttribute("class", "py-3 px-4 text-left");
  thName.textContent = "Name";
  headTr.appendChild(thName);

  const thRoll = document.createElement("th");
  thRoll.setAttribute("class", "py-3 px-4 text-left");
  thRoll.textContent = "Roll No";
  headTr.appendChild(thRoll);

  subjectsArray.forEach((sub) => {
    const th = document.createElement("th");
    th.setAttribute("class", "py-3 px-4 text-center");
    th.textContent = sub;
    headTr.appendChild(th);
  });

  const thAction = document.createElement("th");
  thAction.setAttribute("class", "py-3 px-4 text-center");
  thAction.textContent = "Actions";
  headTr.appendChild(thAction);

  thead.appendChild(headTr);
  table.appendChild(thead);

  // Tbody
  const tbody = document.createElement("tbody");
  students.forEach((student, idx) => {
    if (student.marks) {
      const tr = document.createElement("tr");
      tr.setAttribute("class", idx % 2 === 0 ? "bg-gray-50" : "bg-gray-100");

      const tdName = document.createElement("td");
      tdName.setAttribute("class", "py-2 px-4 font-medium text-gray-800");
      tdName.textContent = student.name;
      tr.appendChild(tdName);

      const tdRoll = document.createElement("td");
      tdRoll.setAttribute("class", "py-2 px-4 text-gray-700");
      tdRoll.textContent = student.rollno;
      tr.appendChild(tdRoll);

      subjectsArray.forEach((sub) => {
        const td = document.createElement("td");
        td.setAttribute("class", "py-2 px-4 text-center text-gray-600");
        td.textContent =
          student.marks && student.marks[sub] !== undefined
            ? student.marks[sub]
            : "-";
        tr.appendChild(td);
      });

      const actionsTd = document.createElement("td");
      actionsTd.setAttribute("class", "py-2 px-4 text-center");

      const btnGroup = document.createElement("div");
      btnGroup.setAttribute("class", "flex justify-center gap-2");

      const pdfBtn = document.createElement("button");
      pdfBtn.textContent = "PDF";
      pdfBtn.className =
        "bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm font-semibold";
      pdfBtn.addEventListener("click", function () {
        exportStudentPDF(student);
      });

      const excelBtn = document.createElement("button");
      excelBtn.textContent = "Excel";
      excelBtn.className =
        "bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 text-sm font-semibold";
      excelBtn.addEventListener("click", function () {
        exportStudentExcel(student);
      });

      btnGroup.append(pdfBtn, excelBtn);
      actionsTd.appendChild(btnGroup);
      tr.appendChild(actionsTd);
      tbody.appendChild(tr);
    }
  });

  table.appendChild(tbody);
  container.appendChild(table);
}
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

/* ---------------- Export Single Student (Marks Only) ---------------- */
function exportStudentPDF(student) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Header
  doc.setFillColor(41, 128, 185); // blue
  doc.setTextColor(255, 255, 255);
  doc.rect(0, 0, 210, 20, "F");
  doc.setFontSize(16);
  doc.text(`Marks - ${student.name} (${student.rollno})`, 105, 13, {
    align: "center",
  });

  // Reset text color
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);

  let y = 35;

  if (student.marks) {
    Object.entries(student.marks).forEach(([subject, mark]) => {
      doc.text(`${subject}: ${mark}`, 20, y);
      y += 10;
    });
  } else {
    doc.text("No marks available.", 20, y);
  }

  const pdfBlob = doc.output("blob");
  triggerDownload(pdfBlob, `${student.rollno}_marks.pdf`);
}

function exportStudentExcel(student) {
  let row = { Name: student.name, "Roll No": student.rollno };

  if (student.marks) {
    Object.entries(student.marks).forEach(([subject, mark]) => {
      row[subject] = mark;
    });
  }

  const ws = XLSX.utils.json_to_sheet([row]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Marks");

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const excelBlob = new Blob([wbout], { type: "application/octet-stream" });
  triggerDownload(excelBlob, `${student.rollno}_marks.xlsx`);
}

/* ---------------- Export All Students (Marks Only) ---------------- */
function exportAllPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Header
  doc.setFillColor(41, 128, 185);
  doc.setTextColor(255, 255, 255);
  doc.rect(0, 0, 210, 20, "F");
  doc.setFontSize(16);
  doc.text("All Students’ Marks", 105, 13, { align: "center" });

  // Reset text color
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);

  const students = JSON.parse(localStorage.getItem("students")) || [];
  let y = 35;

  students.forEach((student, idx) => {
    doc.setFont(undefined, "bold");
    doc.text(`${idx + 1}. ${student.name} (${student.rollno})`, 20, y);
    doc.setFont(undefined, "normal");
    y += 8;

    if (student.marks) {
      Object.entries(student.marks).forEach(([subject, mark]) => {
        doc.text(`${subject}: ${mark}`, 30, y);
        y += 8;
      });
    } else {
      doc.text("No marks available.", 30, y);
      y += 8;
    }

    y += 5;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  const pdfBlob = doc.output("blob");
  triggerDownload(pdfBlob, "All_Students_Marks.pdf");
}

function exportAllExcel() {
  const students = JSON.parse(localStorage.getItem("students")) || [];

  // Collect all unique subjects
  const allSubjects = new Set();
  students.forEach((s) => {
    if (s.marks) {
      Object.keys(s.marks).forEach((sub) => allSubjects.add(sub));
    }
  });
  const subjectsArray = Array.from(allSubjects);

  // Build rows
  const rows = students.map((s) => {
    let row = { Name: s.name, "Roll No": s.rollno };
    subjectsArray.forEach((sub) => {
      row[sub] = s.marks && s.marks[sub] !== undefined ? s.marks[sub] : "-";
    });
    return row;
  });

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Marks");

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const excelBlob = new Blob([wbout], { type: "application/octet-stream" });
  triggerDownload(excelBlob, "All_Students_Marks.xlsx");
}

/* ---------------- Attach Events ---------------- */
exportPdfBtn.addEventListener("click", exportAllPDF);
exportExcelBtn.addEventListener("click", exportAllExcel);