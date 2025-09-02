document.body.setAttribute("class", "bg-[#EDEBFE]");

const root = document.createElement("div");
root.setAttribute(
  "class",
  "w-full h-full flex justify-center items-center flex-col"
);
root.innerHTML =
  "<h1 class='font-bold pt-4 text-xl '>Student Details Form</h1>";

const form = document.createElement("form");
form.setAttribute("id", "form");
form.setAttribute(
  "class",
  "w-[50%] bg-[#CABFFD] shadow-md border rounded px-8 pt-6 pb-8 mt-4 flex flex-col space-y-5"
);

/* ---------------- NAME ---------------- */
const nameContainer = document.createElement("div");
const nameLabel = document.createElement("label");
nameLabel.textContent = "Student Name";
nameLabel.setAttribute("for", "name");
nameLabel.setAttribute("class", "block text-gray-700 text-lg font-bold mb-2");
const nameInput = document.createElement("input");
nameInput.type = "text";
nameInput.id = "name";
nameInput.name = "name";
nameInput.setAttribute(
  "class",
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
);
const nameError = document.createElement("p");
nameError.setAttribute("class", "text-red-500 text-sm mt-1");
nameContainer.append(nameLabel, nameInput, nameError);

/* ---------------- ROLL ---------------- */
const rollNumberContainer = document.createElement("div");
const rollNumberLabel = document.createElement("label");
rollNumberLabel.textContent = "Roll Number";
rollNumberLabel.setAttribute("for", "rollno");
rollNumberLabel.setAttribute(
  "class",
  "block text-gray-700 text-lg font-bold mb-2"
);
const rollInput = document.createElement("input");
rollInput.type = "number";
rollInput.id = "rollno";
rollInput.name = "rollno";
rollInput.setAttribute(
  "class",
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
);
const rollNumberError = document.createElement("p");
rollNumberError.setAttribute("class", "text-red-500 text-sm mt-1");
rollNumberContainer.append(rollNumberLabel, rollInput, rollNumberError);

/* ---------------- EMAIL ---------------- */
const emailContainer = document.createElement("div");
const emailLabel = document.createElement("label");
emailLabel.textContent = "Email";
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
const passwordLabel = document.createElement("label");
passwordLabel.textContent = "Password";
passwordLabel.setAttribute("for", "password");
passwordLabel.setAttribute(
  "class",
  "block text-gray-700 text-lg font-bold mb-2"
);
const passwordInput = document.createElement("input");
passwordInput.type = "password";
passwordInput.id = "password";
passwordInput.name = "password";
passwordInput.setAttribute(
  "class",
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
);
const passwordError = document.createElement("p");
passwordError.setAttribute("class", "text-red-500 text-sm mt-1");
passwordContainer.append(passwordLabel, passwordInput, passwordError);

/* ---------------- DOB ---------------- */
const dobContainer = document.createElement("div");
const dobLabel = document.createElement("label");
dobLabel.textContent = "Date of Birth";
dobLabel.setAttribute("for", "dob");
dobLabel.setAttribute("class", "block text-gray-700 text-lg font-bold mb-2");
const dobInput = document.createElement("input");
dobInput.type = "date";
dobInput.id = "dob";
dobInput.name = "dob";
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
genderContainer.innerHTML =
  "<b class='block text-gray-700 text-lg font-bold mb-2'>Gender</b>";

function createRadioOption(id, value, labelText) {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("class", "flex items-center space-x-2");
  const input = document.createElement("input");
  input.type = "radio";
  input.name = "gender";
  input.value = value;
  input.id = id;
  const label = document.createElement("label");
  label.textContent = labelText;
  label.htmlFor = id;
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
groupSelect.textContent = "Select Group";
groupSelect.setAttribute("class", "block text-gray-700 text-lg font-bold mb-2");
groupContainer.appendChild(groupSelect);

const selectTag = document.createElement("select");
selectTag.id = "groupSelect";
selectTag.setAttribute(
  "class",
  "shadow border rounded w-full py-2 px-3 text-gray-700"
);
groupContainer.appendChild(selectTag);

const defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.textContent = "-- select a Group --";
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
  checkbox.type = "checkbox";
  checkbox.value = subject;
  label.append(checkbox, document.createTextNode(" " + subject));
  subjectContainer.appendChild(label);
  subjectCheckboxes[subject] = checkbox;
});
selectTag.addEventListener("change", function () {
  const selectedGroup = this.value;
  Object.keys(subjectCheckboxes).forEach((sub) => {
    subjectCheckboxes[sub].checked =
      selectedGroup && groups[selectedGroup].includes(sub);
  });
});

/* ---------------- IMAGE ---------------- */
const imageContainer = document.createElement("div");
const imageLabel = document.createElement("label");
imageLabel.textContent = "Upload Profile Picture";
imageLabel.setAttribute("for", "image");
imageLabel.setAttribute("class", "block text-gray-700 text-lg font-bold mb-2");
const imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = "image/*";
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
  nameContainer,
  rollNumberContainer,
  emailContainer,
  passwordContainer,
  dobContainer,
  genderContainer,
  groupContainer,
  imageContainer,
  submitButton
);

root.append(form);
document.body.appendChild(root);

/* ---------------- PREFILL DATA ---------------- */
const editIndex = localStorage.getItem("editIndex");
const editStudentData = JSON.parse(localStorage.getItem("editStudent"));
let existingImage = null;

if (editIndex !== null && editStudentData) {
  nameInput.value = editStudentData.name || "";
  rollInput.value = editStudentData.rollno || "";
  emailInput.value = editStudentData.email || "";
  passwordInput.value = editStudentData.password || "";
  dobInput.value = editStudentData.dob || "";
  if (editStudentData.gender) {
    const genderRadio = form.querySelector(
      `input[name="gender"][value="${editStudentData.gender}"]`
    );
    if (genderRadio) genderRadio.checked = true;
  }
  if (editStudentData.group) {
    selectTag.value = editStudentData.group;
    Object.keys(subjectCheckboxes).forEach((sub) => {
      subjectCheckboxes[sub].checked =
        editStudentData.subjects && editStudentData.subjects.includes(sub);
    });
  }
  if (editStudentData.image) existingImage = editStudentData.image;
}

/* ---------------- VALIDATION & SAVE ---------------- */
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let isValid = true;
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

  const selectedGroup = selectTag.value;
  const selectedSubjects = Object.keys(subjectCheckboxes).filter(
    (sub) => subjectCheckboxes[sub].checked
  );
  let students = JSON.parse(localStorage.getItem("students")) || [];

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
    if (editIndex !== null) {
      students[editIndex] = formData;
      localStorage.removeItem("editIndex");
      localStorage.removeItem("editStudent");
    } else {
      students.push(formData);
    }
    localStorage.setItem("students", JSON.stringify(students));
    alert("Form Submitted successfully!");
    form.reset();
    window.location.href = "./students.html";
  }

  if (imageInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = () => saveData(reader.result);
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    saveData(existingImage);
  }
});
