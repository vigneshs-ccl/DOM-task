document.body.setAttribute("class", "w-full h-full bg-gray-600");

const container = document.createElement("div");
container.setAttribute(
  "class",
  "w-full h-full flex justify-start items-center flex-col"
);
container.innerHTML =
  "<h1 class='font-bold pt-4 text-xl text-white'>Student Marks Form</h1>";

const form = document.createElement("form");
form.setAttribute("id", "form");
form.setAttribute(
  "class",
  "w-[75%] bg-gray-400 shadow-md rounded px-8 pt-6 pb-8 mt-4 flex flex-col space-y-5"
);

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

navigationContainer.append(studentsTable, studentsMarkTable);
sideBarContainer.append(titleSidebar, navigationContainer);
/* ===========================================*/

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
  "shadow border rounded w-full py-2 px-3 text-gray-700"
);

const defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.textContent = "-- Select a group --";
selectStudent.appendChild(defaultOption);

students.forEach((student, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = student.name;
  selectStudent.appendChild(option);
});

firstContainer.appendChild(selectStudentLabel);
firstContainer.appendChild(selectStudent);
form.appendChild(firstContainer);

const subjectsContainer = document.createElement("div");

form.appendChild(subjectsContainer);

container.appendChild(form);

// Main container for sidebar and form
const layoutContainer = document.createElement("div");
layoutContainer.setAttribute("class", "flex w-full h-screen");

layoutContainer.appendChild(sideBarContainer);

const mainContent = document.createElement("div");
mainContent.setAttribute(
  "class",
  "flex-1 flex justify-center items-start p-6 overflow-y-auto"
);
mainContent.appendChild(container);

layoutContainer.appendChild(mainContent);
document.body.appendChild(layoutContainer);
/* =======================================*/
const buttonContainer = document.createElement("div");
buttonContainer.setAttribute("class", "w-full mx-auto flex justify-center");
// submit btn
const submitBtn = document.createElement("button");
submitBtn.type = "submit";
submitBtn.textContent = "Submit Marks";
submitBtn.setAttribute(
  "class",
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
);
buttonContainer.appendChild(submitBtn);
form.appendChild(buttonContainer);

// Event listener to show subjects based on selected student

selectStudent.addEventListener("change", () => {
  subjectsContainer.innerHTML = "";
  const selectedIndex = selectStudent.value;
  if (selectedIndex === "") return;

  const student = students[selectedIndex];

  if (!student.subjects) return;

  student.subjects.forEach((subject) => {
    const subjectDiv = document.createElement("div");
    subjectDiv.setAttribute("class", "flex flex-col mb-2");

    const label = document.createElement("label");
    label.textContent = `${subject}`;
    label.setAttribute("class", "text-gray-700 font-medium mb-1");

    const input = document.createElement("input");
    input.type = "number";
    input.min = 0;
    input.max = 100;
    input.setAttribute("class", "border rounded py-1 px-2");
    input.name = subject;

    subjectDiv.appendChild(label);
    subjectDiv.appendChild(input);
    subjectsContainer.appendChild(subjectDiv);
  });
});
// Form submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const selectedIndex = selectStudent.value;
  if (selectedIndex === "") return alert("Please select a student!");

  const student = students[selectedIndex];

  // Collect marks
  const inputs = subjectsContainer.querySelectorAll("input");
  student.marks = {}; // store marks for student
  inputs.forEach((input) => {
    student.marks[input.name] = Number(input.value);
  });

  // Update localStorage
  localStorage.setItem("students", JSON.stringify(students));

  alert(`Marks saved for ${student.name}!`);
  console.log(students);

  // Reset form
  form.reset();

  subjectsContainer.innerHTML = "";
  window.location.href = "./MarksTable.html";
});

// document.body.appendChild(container);

function loadStudents() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  console.log(students);
}

window.onload = () => loadStudents();
