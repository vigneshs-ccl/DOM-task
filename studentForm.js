const urlParams = new URLSearchParams(window.location.search);
const isEditing = urlParams.get("edit");
if (!isEditing) {
  localStorage.removeItem("editIndex");
}

document.body.setAttribute("class", "bg-gradient-to-tr from-gray-100 to-gray-300 min-h-screen");

const root = document.createElement("div");
root.setAttribute("class", "w-full h-full flex justify-center items-center flex-col");


/* ---------------- HEADING ---------------- */
const heading = document.createElement("h1");
heading.setAttribute("class", "font-bold text-gray-800 pt-6 text-2xl tracking-wide");
heading.textContent = "Student Details Form";
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
titleSidebar.setAttribute("class", "text-xl font-semibold text-gray-900 mb-8 tracking-wide");

/* NAVIGATION */
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
const studentDetailPages = ["index.html", "students.html"];
const studentMarkPages = ["MarksTable.html", "studentMarks.html"];

if (studentDetailPages.some((page) => currentPath.endsWith(page))) {
  studentsTable.classList.add("bg-gray-100", "font-semibold", "text-blue-600");
} else if (studentMarkPages.some((page) => currentPath.endsWith(page))) {
  studentsMarkTable.classList.add("bg-gray-100", "font-semibold", "text-blue-600");
}

navigationContainer.append(studentsTable, studentsMarkTable);
sideBarContainer.append(titleSidebar, navigationContainer);


/*---------------------------------------*/
/* ---------------- IMAGE ---------------- */
const imageContainer = document.createElement("div");
imageContainer.setAttribute("class", "flex flex-col items-center space-y-3 relative");

// Label
const imageLabel = document.createElement("label");
imageLabel.innerHTML = `Upload Student Picture<span class="text-red-500">*</span>`;
imageLabel.setAttribute("for", "image");
imageLabel.setAttribute("class", "block text-gray-700 text-lg font-semibold mb-2 text-center");

// Wrapper for image + overlay
const imageWrapper = document.createElement("div");
imageWrapper.setAttribute("class", "relative w-50 h-50");

// Default Profile
const defaultImg = document.createElement("img");
defaultImg.src =
  "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png";
defaultImg.className =
  "w-40 h-40 rounded-full shadow-md border-2 border-gray-300 object-cover cursor-pointer";
defaultImg.id = "profilePreview";

// File input (hidden)
const imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = "image/*";
imageInput.id = "image";
imageInput.name = "image";
imageInput.className = "hidden";

// Overlay (initially with Add icon only)
const overlay = document.createElement("div");
overlay.setAttribute(
  "class",
  "absolute inset-0 bg-black/40 rounded-full flex items-center justify-center gap-4 opacity-0 hover:opacity-100 transition"
);

const addIcon = document.createElement("button");
addIcon.type = "button";
addIcon.innerHTML = `<i class="fa-solid fa-plus text-white text-lg"></i>`;
addIcon.setAttribute("class", "cursor-pointer");

const editIcon = document.createElement("button");
editIcon.type = "button";
editIcon.innerHTML = `<i class="fa-solid fa-pen text-white text-lg"></i>`;
editIcon.setAttribute("class", "cursor-pointer hidden"); // hidden initially

const deleteIcon = document.createElement("button");
deleteIcon.type = "button";
deleteIcon.innerHTML = `<i class="fa-solid fa-trash text-white text-lg"></i>`;
deleteIcon.setAttribute("class", "cursor-pointer hidden"); // hidden initially

overlay.append(addIcon, editIcon, deleteIcon);
imageWrapper.append(defaultImg, overlay);

// Error message
const imageError = document.createElement("p");
imageError.setAttribute("class", "text-red-500 text-sm mt-1");

// Logic: clicking Add/Edit → trigger upload
defaultImg.addEventListener("click", () => imageInput.click());
addIcon.addEventListener("click", () => imageInput.click());
editIcon.addEventListener("click", () => imageInput.click());

// Handle upload
imageInput.addEventListener("change", () => {
  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      defaultImg.src = e.target.result;
      // Switch icons → show edit & delete, hide add
      addIcon.classList.add("hidden");
      editIcon.classList.remove("hidden");
      deleteIcon.classList.remove("hidden");
    };
    reader.readAsDataURL(imageInput.files[0]);
  }
});

// Handle delete → reset back to default
deleteIcon.addEventListener("click", () => {
  defaultImg.src =
    "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png";
  imageInput.value = ""; // clear file input
  // Switch icons → show add, hide edit & delete
  addIcon.classList.remove("hidden");
  editIcon.classList.add("hidden");
  deleteIcon.classList.add("hidden");
});

imageContainer.append(imageLabel, imageWrapper, imageInput, imageError);

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
nameInput.maxLength = "50";
nameInput.minLength = "2";
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
rollInput.max = 100000;
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
genderContainer.innerHTML = `<div><b class='block text-gray-700 text-lg font-bold mb-2'>Gender<span class="text-red-500">*</span></b></div><div id="genderOptions" class="flex space-x-6"></div>`;

function createRadioOption(id, value, labelText) {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("class", "flex items-center justify-center space-x-2");
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
const genderOptions = genderContainer.querySelector("#genderOptions");
genderOptions.append(maleOption, femaleOption, otherOption);
genderContainer.append(genderError);
// single div
const containerThird = document.createElement("div");
dobContainer.classList.add("flex-1");
genderContainer.classList.add("flex-1");
containerThird.setAttribute("class", "flex space-x-5");
containerThird.append(dobContainer,genderContainer);


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
subjectContainer.setAttribute(
  "class",
  "grid grid-cols-2 md:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-lg border mt-3"
);
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

/* ---------------- SUBMIT ---------------- */
const submitButton = document.createElement("button");
submitButton.textContent = "Submit";
submitButton.type = "submit";
submitButton.setAttribute(
  "class",
  "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md text-base shadow-md transition"
);

form.append(
  imageContainer,
  containerFirst,
  containerSecond,
  containerThird,
  groupContainer,
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
  const passwordPattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  if (passwordInput.value.trim().length < 6) {
    isValid = false;
    passwordError.textContent = "Password must be 6 character atleast";
  } else if (!passwordPattern.test(passwordInput.value)) {
    isValid = false;
    passwordError.textContent = "missing uppercase, digit, special char";
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