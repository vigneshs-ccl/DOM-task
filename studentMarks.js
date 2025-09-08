/* ---------------- PAGE SETUP ---------------- */
document.body.setAttribute(
  "class",
  "bg-gradient-to-tr from-gray-100 to-gray-300 min-h-screen"
);

const root = document.createElement("div");
root.setAttribute(
  "class",
  "w-full h-full flex justify-center items-center flex-col"
);

/* ---------------- HEADING ---------------- */
const heading = document.createElement("h1");
heading.setAttribute(
  "class",
  "font-bold text-gray-800 pt-6 text-2xl tracking-wide"
);
heading.textContent = "Student Marks Form";
root.appendChild(heading);

/* ---------------- FORM ---------------- */
const form = document.createElement("form");
form.setAttribute("id", "form");
form.setAttribute(
  "class",
  "w-[75%] bg-white/90 backdrop-blur-md shadow-lg rounded-xl px-10 pt-8 pb-10 mt-6 flex flex-col space-y-6"
);

/* ---------------- SIDEBAR ---------------- */
const sideBarContainer = document.createElement("div");
sideBarContainer.setAttribute(
  "class",
  "w-64 bg-white shadow-xl rounded-r-xl p-6 flex flex-col"
);

const titleSidebar = document.createElement("h1");
titleSidebar.textContent = "Students Mark list Management";
titleSidebar.setAttribute(
  "class",
  "text-xl font-semibold text-gray-900 mb-8 tracking-wide"
);

// NAVIGATION
const navigationContainer = document.createElement("nav");
navigationContainer.setAttribute("class", "flex flex-col space-y-3");

const studentsTable = document.createElement("a");
studentsTable.textContent = "Students detail Table";
studentsTable.setAttribute(
  "class",
  "flex items-center px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition"
);
studentsTable.href = "./students.html";

const studentsMarkTable = document.createElement("a");
studentsMarkTable.textContent = "Students Mark Table";
studentsMarkTable.setAttribute(
  "class",
  "flex items-center px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition"
);
studentsMarkTable.href = "./MarksTable.html";

/* Active state logic */
const currentPath = window.location.pathname;
const studentDetailPages = ["students.html", "studentForm.html"];
const studentMarkPages = ["MarksTable.html", "studentMarksform.html"];

if (studentDetailPages.some((page) => currentPath.endsWith(page))) {
  studentsTable.classList.add("bg-gray-100", "font-semibold", "text-blue-600");
} else if (studentMarkPages.some((page) => currentPath.endsWith(page))) {
  studentsMarkTable.classList.add("bg-gray-100", "font-semibold", "text-blue-600");
}

navigationContainer.append(studentsTable, studentsMarkTable);
sideBarContainer.append(titleSidebar, navigationContainer);

/* ---------------- SELECT STUDENT ---------------- */
const firstContainer = document.createElement("div");

const selectStudentLabel = document.createElement("label");
selectStudentLabel.textContent = "Select Student";
selectStudentLabel.setAttribute(
  "class",
  "block text-gray-700 text-lg font-bold mb-2"
);

const students = JSON.parse(localStorage.getItem("students")) || [];

const selectStudent = document.createElement("select");
selectStudent.setAttribute(
  "class",
  "shadow border rounded w-full py-2 px-3 text-gray-700 cursor-pointer"
);

const defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.textContent = "-- Select a student --";
selectStudent.appendChild(defaultOption);

students.forEach((student, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = student.name;
  selectStudent.appendChild(option);
});

const selectError = document.createElement("p");
selectError.setAttribute("class", "text-red-500 text-sm mt-1");

firstContainer.append(selectStudentLabel, selectStudent, selectError);
form.appendChild(firstContainer);

/* ---------------- SUBJECTS ---------------- */
const subjectsContainer = document.createElement("div");
form.appendChild(subjectsContainer);

/* ---------------- SUBMIT BUTTON ---------------- */
const buttonContainer = document.createElement("div");
buttonContainer.setAttribute("class", "w-full mx-auto flex justify-center");

const submitBtn = document.createElement("button");
submitBtn.type = "submit";
submitBtn.textContent = "Submit Marks";
submitBtn.setAttribute(
  "class",
  "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md text-base shadow-md transition"
);
buttonContainer.appendChild(submitBtn);
form.appendChild(buttonContainer);

/* ---------------- LAYOUT ---------------- */
root.appendChild(form);

const layoutContainer = document.createElement("div");
layoutContainer.setAttribute("class", "flex w-full min-h-screen");

layoutContainer.appendChild(sideBarContainer);

const mainContent = document.createElement("div");
mainContent.setAttribute(
  "class",
  "flex-1 flex justify-center items-start p-6 overflow-y-auto"
);
mainContent.appendChild(root);

layoutContainer.appendChild(mainContent);
document.body.appendChild(layoutContainer);

/* ---------------- LOGIC ---------------- */
// Show subjects dynamically
selectStudent.addEventListener("change", () => {
  subjectsContainer.innerHTML = "";
  const selectedIndex = selectStudent.value;
  if (selectedIndex === "") return;

  const student = students[selectedIndex];
  if (!student.subjects) return;

  student.subjects.forEach((subject) => {
    const subjectDiv = document.createElement("div");
    subjectDiv.setAttribute("class", "flex flex-col mb-3");

    const label = document.createElement("label");
    label.textContent = subject;
    label.setAttribute("class", "text-gray-700 font-medium mb-1");

    const input = document.createElement("input");
    input.type = "number";
    input.min = 0;
    input.max = 100;
    input.setAttribute("class", "border rounded py-2 px-3 shadow-sm");
    input.name = subject;

    const inputError = document.createElement("p");
    inputError.setAttribute("class", "text-red-500 text-sm mt-1");

    subjectDiv.append(label, input, inputError);
    subjectsContainer.appendChild(subjectDiv);
  });
});

// Submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;
  selectError.textContent = "";

  const selectedIndex = selectStudent.value;
  if (selectedIndex === "") {
    selectError.textContent = "Please select a student.";
    return;
  }

  const student = students[selectedIndex];
  const inputs = subjectsContainer.querySelectorAll("input");

  student.marks = {};
  inputs.forEach((input) => {
    const errorEl = input.nextElementSibling;
    if (!input.value.trim()) {
      errorEl.textContent = `${input.name} mark is required!`;
      isValid = false;
    } else {
      errorEl.textContent = "";
      student.marks[input.name] = Number(input.value);
    }
  });

  if (!isValid) return;

  localStorage.setItem("students", JSON.stringify(students));

  // Success modal
  const overlay = document.createElement("div");
  overlay.setAttribute(
    "class",
    "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  );

  const modal = document.createElement("div");
  modal.setAttribute(
    "class",
    "bg-white rounded-xl shadow-lg p-8 w-96 text-center"
  );

  const title = document.createElement("h2");
  title.textContent = "Marks Saved Successfully!";
  title.setAttribute("class", "text-xl font-bold text-gray-800 mb-4");

  const message = document.createElement("p");
  message.textContent = `Marks recorded for ${student.name}`;
  message.setAttribute("class", "text-gray-600 mb-6");

  const btnDiv = document.createElement("div");
  btnDiv.setAttribute("class", "flex justify-center");

  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "Okay!";
  confirmBtn.setAttribute(
    "class",
    "bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
  );
  confirmBtn.addEventListener("click", () => {
    form.reset();
    subjectsContainer.innerHTML = "";
    window.location.href = "./MarksTable.html";
  });

  btnDiv.append(confirmBtn);
  modal.append(title, message, btnDiv);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
});