const urlParams = new URLSearchParams(window.location.search);
const isEditing = urlParams.get("edit");
if (!isEditing) {
  localStorage.removeItem("editIndex");
}

document.body.setAttribute("class", "bg-gray-600");

const root = document.createElement("div");
root.setAttribute(
  "class",
  "w-full h-full flex justify-center items-center flex-col"
);

const heading = document.createElement("h1");
heading.setAttribute("class", "font-bold text-white pt-4 text-xl");
heading.textContent = "Student Details Form";
root.appendChild(heading);

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

// ---------------- Active Logic ----------------
const currentPath = window.location.pathname;
console.log("Current path:", currentPath);

// group related pages
const studentDetailPages = ["index.html", "students.html"];
const studentMarkPages = ["MarksTable.html", "studentMarks.html"];

// check active link
if (studentDetailPages.some((page) => currentPath.endsWith(page))) {
  studentsTable.classList.add("bg-gray-200", "font-bold", "text-blue-600");
} else if (studentMarkPages.some((page) => currentPath.endsWith(page))) {
  studentsMarkTable.classList.add("bg-gray-200", "font-bold", "text-blue-600");
}

navigationContainer.append(studentsTable, studentsMarkTable);
sideBarContainer.append(titleSidebar, navigationContainer);
/* ---------------- NAME ---------------- */
const nameContainer = document.createElement("div");
const nameLabel = document.createElement("label");
nameLabel.innerHTML = `Student Name<span class="text-red-500">*</span>`;
nameLabel.setAttribute("for", "name");
nameLabel.setAttribute("class", "block text-gray-700 text-lg font-bold mb-2");
const nameInput = document.createElement("input");
nameInput.type = "text";
nameInput.id = "name";
nameInput.name = "name";
nameInput.setAttribute(
  "class",
  "shadow appearance-none border w-full rounded py-2 px-3 text-gray-700"
);
const nameError = document.createElement("p");
nameError.setAttribute("class", "text-red-500 text-sm mt-1");
nameContainer.append(nameLabel, nameInput, nameError);

/* ---------------- ROLL ---------------- */
const rollNumberContainer = document.createElement("div");

const rollNumberLabel = document.createElement("label");
rollNumberLabel.innerHTML = `Roll Number<span class="text-red-500">*</span>`;
rollNumberLabel.setAttribute("for", "rollno");
rollNumberLabel.setAttribute(
  "class",
  "block text-gray-700 text-lg font-bold mb-2"
);

const rollInput = document.createElement("input");
rollInput.type = "number";
rollInput.id = "rollno";
rollInput.name = "rollno";
rollInput.min = 0;
rollInput.setAttribute(
  "class",
  "shadow appearance-none border w-full rounded py-2 px-3 text-gray-700"
);
// optional: better mobile keyboard
rollInput.setAttribute("inputmode", "numeric");

//  Hide spinners
(function hideNumberSpinners(input) {
  // mark this input so our CSS can target it
  input.setAttribute("data-no-spinners", "true");

  // add the style once
  const STYLE_ID = "no-spinner-style";
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      /* Chrome/Edge/Safari (WebKit/Blink) */
      [data-no-spinners="true"]::-webkit-outer-spin-button,
      [data-no-spinners="true"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      /* Firefox */
      [data-no-spinners="true"] {
        -moz-appearance: textfield;
        appearance: textfield;
      }
    `;
    document.head.appendChild(style);
  }
})(rollInput);

const rollNumberError = document.createElement("p");
rollNumberError.setAttribute("class", "text-red-500 text-sm mt-1");

rollNumberContainer.append(rollNumberLabel, rollInput, rollNumberError);

// single div
nameContainer.classList.add("flex-1");
rollNumberContainer.classList.add("flex-1");
const containerFirst = document.createElement("div");
containerFirst.setAttribute("class", "flex w-full justify-evenly space-x-5");
containerFirst.append(nameContainer, rollNumberContainer);
form.appendChild(containerFirst);
/* ---------------- EMAIL ---------------- */
const emailContainer = document.createElement("div");
const emailLabel = document.createElement("label");
emailLabel.innerHTML = `Email<span class="text-red-500">*</span>`;
emailLabel.setAttribute("for", "email");
emailLabel.setAttribute("class", "block text-gray-700 text-lg font-bold mb-2");
const emailInput = document.createElement("input");
emailInput.type = "email";
emailInput.id = "email";
emailInput.name = "email";
emailInput.setAttribute(
  "class",
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
);
const emailError = document.createElement("p");
emailError.setAttribute("class", "text-red-500 text-sm mt-1");
emailContainer.append(emailLabel, emailInput, emailError);

/* ---------------- PASSWORD ---------------- */
const passwordContainer = document.createElement("div");

// Label
const passwordLabel = document.createElement("label");
passwordLabel.innerHTML = `Password<span class="text-red-500">*</span>`;
passwordLabel.setAttribute("for", "password");
passwordLabel.setAttribute(
  "class",
  "block text-gray-700 text-lg font-bold mb-2"
);

// Input wrapper
const inputWrapper = document.createElement("div");
inputWrapper.setAttribute("class", "relative w-full");

// Password input
const passwordInput = document.createElement("input");
passwordInput.type = "password";
passwordInput.id = "password";
passwordInput.name = "password";
passwordInput.setAttribute(
  "class",
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 pr-10"
);

// Password error message
const passwordError = document.createElement("p");
passwordError.setAttribute("class", "text-red-500 text-sm mt-1");

// Eye icon (Font Awesome)
const eyeIcon = document.createElement("span");
eyeIcon.setAttribute(
  "class",
  "absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
);
eyeIcon.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`; // Eye open icon

// Toggle password visibility
eyeIcon.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.innerHTML = `<i class="fa-solid fa-eye"></i>`;
  } else {
    passwordInput.type = "password";
    eyeIcon.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`;
  }
});

// Append input and eye icon to wrapper
inputWrapper.append(passwordInput, eyeIcon);

// Append everything to container
passwordContainer.append(passwordLabel, inputWrapper, passwordError);

// single div
const containerSecond = document.createElement("div");
emailContainer.classList.add("flex-1");
passwordContainer.classList.add("flex-1");
containerSecond.setAttribute("class", "flex space-x-5");
containerSecond.append(emailContainer, passwordContainer);
form.appendChild(containerSecond);

/* ---------------- DOB ---------------- */
const dobContainer = document.createElement("div");
const dobLabel = document.createElement("label");
dobLabel.innerHTML = `Date of birth<span class="text-red-500">*</span>`;
dobLabel.setAttribute("for", "dob");
dobLabel.setAttribute("class", "block text-gray-700 text-lg font-bold mb-2");
const dobInput = document.createElement("input");
dobInput.type = "date";
dobInput.id = "dob";
dobInput.name = "dob";
dobInput.style.cursor = "pointer";
dobInput.addEventListener("click", () => {
  dobInput.showPicker();
});
dobInput.setAttribute(
  "class",
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
);
const dobError = document.createElement("p");
dobError.setAttribute("class", "text-red-500 text-sm mt-1");
dobContainer.append(dobLabel, dobInput, dobError);

/* ---------------- GENDER ---------------- */
const genderContainer = document.createElement("div");
genderContainer.setAttribute("class", "flex flex-col space-y-2");
genderContainer.innerHTML = `<b class='block text-gray-700 text-lg font-bold mb-2'>Gender<span class="text-red-500">*</span></b>`;

function createRadioOption(id, value, labelText) {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("class", "flex items-center space-x-2");
  const input = document.createElement("input");
  input.type = "radio";
  input.name = "gender";
  input.style.cursor = "pointer";
  input.value = value;
  input.id = id;
  const label = document.createElement("label");
  label.textContent = labelText;
  label.htmlFor = id;
  label.style.cursor = "pointer";
  wrapper.append(input, label);
  return wrapper;
}
const maleOption = createRadioOption("male", "Male", "Male");
const femaleOption = createRadioOption("female", "Female", "Female");
const otherOption = createRadioOption("other", "Other", "Other");
const genderError = document.createElement("p");
genderError.setAttribute("class", "text-red-500 text-sm mt-1");
genderContainer.append(maleOption, femaleOption, otherOption, genderError);

/* ---------------- groups & subjects ---------------- */
const groups = {
  biomaths: [
    "Tamil",
    "English",
    "Physics",
    "Chemistry",
    "Biology",
    "Mathematics",
  ],
  computerScience: [
    "Tamil",
    "English",
    "Physics",
    "Chemistry",
    "Computer-Science",
    "Mathematics",
  ],
  commerce: [
    "Tamil",
    "English",
    "Accountancy",
    "Economics",
    "Business Studies",
  ],
};
const allSubjects = Array.from(new Set([].concat(...Object.values(groups))));

const groupContainer = document.createElement("div");
const groupSelect = document.createElement("label");
groupSelect.innerHTML = `Select group<span class="text-red-500">*</span>`;
groupSelect.setAttribute("class", "block text-gray-700 text-lg font-bold mb-2");
groupContainer.appendChild(groupSelect);

const selectTag = document.createElement("select");
selectTag.id = "groupSelect";
selectTag.style.cursor = "pointer";
selectTag.setAttribute(
  "class",
  "shadow border rounded w-full py-2 px-3 text-gray-700"
);
groupContainer.appendChild(selectTag);

const defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.textContent = "-- Select a group --";
selectTag.appendChild(defaultOption);

Object.keys(groups).forEach((group) => {
  const option = document.createElement("option");
  option.value = group;
  option.textContent = group;
  selectTag.appendChild(option);
});
const selectGroupError = document.createElement("p");
selectGroupError.setAttribute("class", "text-red-500 text-sm mt-1");
groupContainer.appendChild(selectGroupError);

const subjectContainer = document.createElement("div");
subjectContainer.setAttribute("class", "m-4");
groupContainer.appendChild(subjectContainer);
const subjectCheckboxes = {};
allSubjects.forEach((subject) => {
  const label = document.createElement("label");
  label.style.display = "block";
  const checkbox = document.createElement("input");
  checkbox.setAttribute("disabled", "true");
  checkbox.type = "checkbox";
  checkbox.value = subject;
  label.append(checkbox, document.createTextNode(" " + subject));
  subjectContainer.appendChild(label);
  subjectCheckboxes[subject] = checkbox;
});
selectTag.addEventListener("change", function () {
  const selectedGroup = this.value;
  console.log(subjectCheckboxes);

  Object.keys(subjectCheckboxes).forEach((sub) => {
    subjectCheckboxes[sub].checked =
      selectedGroup && groups[selectedGroup].includes(sub);
  });
});

/* ---------------- IMAGE ---------------- */
const imageContainer = document.createElement("div");
const imageLabel = document.createElement("label");
imageLabel.innerHTML = `Upload student picture<span class="text-red-500">*</span>`;
imageLabel.setAttribute("for", "image");
imageLabel.setAttribute("class", "block text-gray-700 text-lg font-bold mb-2");
const imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = "image/*";
imageInput.style.cursor = "pointer";
imageInput.id = "image";
imageInput.name = "image";
imageInput.setAttribute(
  "class",
  "border rounded px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500"
);
const imageError = document.createElement("p");
imageError.setAttribute("class", "text-red-500 text-sm mt-1");
imageContainer.append(imageLabel, imageInput, imageError);

/* ---------------- SUBMIT ---------------- */
const submitButton = document.createElement("button");
submitButton.textContent = "Submit";
submitButton.type = "submit";
submitButton.setAttribute(
  "class",
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
);

form.append(
  dobContainer,
  genderContainer,
  groupContainer,
  imageContainer,
  submitButton
);

root.append(form);
document.body.appendChild(root);

// Main container for sidebar and form
const layoutContainer = document.createElement("div");
layoutContainer.setAttribute("class", "flex w-full ");

layoutContainer.appendChild(sideBarContainer);

const mainContent = document.createElement("div");
mainContent.setAttribute("class", "flex-1 flex justify-center items-start");
mainContent.appendChild(root);

layoutContainer.appendChild(mainContent);
document.body.appendChild(layoutContainer);

/* ---------------- PREFILL DATA ---------------- */
const editIndex = localStorage.getItem("editIndex");
let editStudentData = null;
let existingImage = null;

if (editIndex !== null) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  editStudentData = students[editIndex]; // Get student data from array

  if (editStudentData) {
    nameInput.value = editStudentData.name || "";
    rollInput.value = editStudentData.rollno || "";
    emailInput.value = editStudentData.email || "";
    passwordInput.value = editStudentData.password || "";
    dobInput.value = editStudentData.dob || "";
  }

  if (editStudentData && editStudentData.gender) {
    const genderRadio = form.querySelector(
      `input[name="gender"][value="${editStudentData.gender}"]`
    );
    if (genderRadio) genderRadio.checked = true;
  }
  if (editStudentData && editStudentData.group) {
    selectTag.value = editStudentData.group;
    Object.keys(subjectCheckboxes).forEach((sub) => {
      subjectCheckboxes[sub].checked =
        editStudentData.subjects && editStudentData.subjects.includes(sub);
    });
  }
  if (editStudentData && editStudentData.image)
    existingImage = editStudentData.image;
}

/* ---------------- VALIDATION & SAVE ---------------- */
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let isValid = true;

  // Reset all error messages
  [
    [nameInput, nameError],
    [rollInput, rollNumberError],
    [emailInput, emailError],
    [passwordInput, passwordError],
    [dobInput, dobError],
  ].forEach(([input, error]) => {
    error.textContent = "";
    input.classList.remove("border-red-500");
  });
  genderError.textContent = "";
  selectGroupError.textContent = "";
  imageError.textContent = "";

  // Basic validation
  if (nameInput.value.trim() === "") {
    isValid = false;
    nameError.textContent = "Name is required.";
  }
  if (rollInput.value.trim() === "") {
    isValid = false;
    rollNumberError.textContent = "Roll number is required.";
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === "" || !emailPattern.test(emailInput.value)) {
    isValid = false;
    emailError.textContent = "Valid email required.";
  }
  if (passwordInput.value.trim().length < 6) {
    isValid = false;
    passwordError.textContent = "Password must be at least 6 characters.";
  }
  if (dobInput.value.trim() === "") {
    isValid = false;
    dobError.textContent = "Date of Birth is required.";
  }
  const selectedGender = form.querySelector("input[name='gender']:checked");
  if (!selectedGender) {
    isValid = false;
    genderError.textContent = "Gender selection is required.";
  }
  if (selectTag.value === "") {
    isValid = false;
    selectGroupError.textContent = "Group selection is required.";
  }
  if (!editStudentData && imageInput.files.length === 0) {
    isValid = false;
    imageError.textContent = "Profile picture is required.";
  }

  if (!isValid) return;

  // Selected subjects and group
  const selectedSubjects = Object.keys(subjectCheckboxes).filter(
    (sub) => subjectCheckboxes[sub].checked
  );
  const selectedGroup = selectTag.value;
  let students = JSON.parse(localStorage.getItem("students")) || [];

  // Convert editIndex to number for proper comparison
  const editIdxNum = editIndex !== null ? parseInt(editIndex) : -1;

  // Check uniqueness
  const rollNumberExists = students.some(
    (student, i) => i !== editIdxNum && student.rollno === rollInput.value
  );
  const emailExists = students.some(
    (student, i) => i !== editIdxNum && student.email === emailInput.value
  );

  if (rollNumberExists) {
    isValid = false;
    rollNumberError.textContent = "Roll number already exists.";
  }

  if (emailExists) {
    isValid = false;
    emailError.textContent = "Email already exists.";
  }

  if (!isValid) return;

  // Save function
  function saveData(imageBase64) {
    const formData = {
      name: nameInput.value,
      rollno: rollInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      dob: dobInput.value,
      gender: selectedGender.value,
      group: selectedGroup,
      subjects: selectedSubjects,
      image: imageBase64 || existingImage,
    };

    if (editIdxNum !== -1) {
      students[editIdxNum] = formData;
      localStorage.removeItem("editIndex"); // Clear editIndex after saving
    } else {
      students.push(formData);
    }

    localStorage.setItem("students", JSON.stringify(students));

    // Overlay & Modal
    const overlay = document.createElement("div");
    overlay.setAttribute(
      "class",
      "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
    );

    const modal = document.createElement("div");
    modal.setAttribute(
      "class",
      "bg-white rounded-xl shadow-lg p-6 w-96 text-center"
    );

    const title = document.createElement("h2");
    title.textContent = "Form Submitted Successfully!";
    title.setAttribute("class", "text-xl font-bold text-gray-800 mb-4");

    const btnDiv = document.createElement("div");
    btnDiv.setAttribute("class", "flex justify-center gap-4");

    const confirmBtn = document.createElement("button");
    confirmBtn.textContent = "Okay!";
    confirmBtn.setAttribute(
      "class",
      "bg-gray-700 text-white px-5 py-2 rounded hover:bg-gray-400"
    );

    confirmBtn.addEventListener("click", () => {
      form.reset();
      window.location.href = "./students.html";
      document.body.removeChild(overlay);
    });

    btnDiv.append(confirmBtn);
    modal.append(title, btnDiv);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }

  // Handle image upload
  if (imageInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = () => saveData(reader.result);
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    saveData(existingImage);
  }
});
