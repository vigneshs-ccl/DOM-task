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
form.setAttribute("action", "/submit-data");
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
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
);

const nameError = document.createElement("p");
nameError.setAttribute("class", "text-red-500 text-sm mt-1");

nameContainer.appendChild(nameLabel);
nameContainer.appendChild(nameInput);
nameContainer.appendChild(nameError);

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
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
);

const rollNumberError = document.createElement("p");
rollNumberError.setAttribute("class", "text-red-500 text-sm mt-1");

rollNumberContainer.appendChild(rollNumberLabel);
rollNumberContainer.appendChild(rollInput);
rollNumberContainer.appendChild(rollNumberError);

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
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
);

const emailError = document.createElement("p");
emailError.setAttribute("class", "text-red-500 text-sm mt-1");

emailContainer.appendChild(emailLabel);
emailContainer.appendChild(emailInput);
emailContainer.appendChild(emailError);

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
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
);

const passwordError = document.createElement("p");
passwordError.setAttribute("class", "text-red-500 text-sm mt-1");

passwordContainer.appendChild(passwordLabel);
passwordContainer.appendChild(passwordInput);
passwordContainer.appendChild(passwordError);

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
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
);

const dobError = document.createElement("p");
dobError.setAttribute("class", "text-red-500 text-sm mt-1");

dobContainer.appendChild(dobLabel);
dobContainer.appendChild(dobInput);
dobContainer.appendChild(dobError);

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
  input.setAttribute("class", "text-blue-600 focus:ring-blue-500");

  const label = document.createElement("label");
  label.textContent = labelText;
  label.htmlFor = id;
  label.setAttribute("class", "text-gray-700");

  wrapper.appendChild(input);
  wrapper.appendChild(label);

  return wrapper;
}

const maleOption = createRadioOption("male", "Male", "Male");
const femaleOption = createRadioOption("female", "Female", "Female");
const otherOption = createRadioOption("other", "Other", "Other");

const genderError = document.createElement("p");
genderError.setAttribute("class", "text-red-500 text-sm mt-1");

genderContainer.appendChild(maleOption);
genderContainer.appendChild(femaleOption);
genderContainer.appendChild(otherOption);
genderContainer.appendChild(genderError);

/* ---------------- STREAM ---------------- */
const streamContainer = document.createElement("div");

const streamLabel = document.createElement("label");
streamLabel.textContent = "Stream";
streamLabel.setAttribute("for", "stream");
streamLabel.setAttribute("class", "block text-gray-700 text-lg font-bold mb-2");

const selectStream = document.createElement("select");
selectStream.id = "stream";
selectStream.name = "stream";
selectStream.setAttribute(
  "class",
  "shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
);

const streamError = document.createElement("p");
streamError.setAttribute("class", "text-red-500 text-sm mt-1");

["", "science", "commerce", "arts"].forEach((stream) => {
  const option = document.createElement("option");
  option.value = stream;
  option.textContent = stream === "" ? "-- Select --" : stream;
  selectStream.appendChild(option);
});

streamContainer.appendChild(streamLabel);
streamContainer.appendChild(selectStream);
streamContainer.appendChild(streamError);

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
  "border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
);

const imageError = document.createElement("p");
imageError.setAttribute("class", "text-red-500 text-sm mt-1");

imageContainer.appendChild(imageLabel);
imageContainer.appendChild(imageInput);
imageContainer.appendChild(imageError);

/* ---------------- SUBMIT ---------------- */
const submitButton = document.createElement("button");
submitButton.textContent = "Submit";
submitButton.type = "submit";
submitButton.setAttribute(
  "class",
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
);

form.appendChild(nameContainer);
form.appendChild(rollNumberContainer);
form.appendChild(emailContainer);
form.appendChild(passwordContainer);
form.appendChild(dobContainer);
form.appendChild(genderContainer);
form.appendChild(streamContainer);
form.appendChild(imageContainer);
form.appendChild(submitButton);

root.append(form);
document.body.appendChild(root);

/* ---------------- VALIDATION ---------------- */
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let isValid = true;

  // reset errors
  [
    [nameInput, nameError],
    [rollInput, rollNumberError],
    [emailInput, emailError],
    [passwordInput, passwordError],
    [dobInput, dobError],
    [selectStream, streamError],
    [imageInput, imageError],
  ].forEach(([input, error]) => {
    error.textContent = "";
    input.classList.remove("border-red-500");
  });
  genderError.textContent = "";

  // Name
  if (nameInput.value.trim() === "") {
    isValid = false;
    nameError.textContent = "Name is required.";
    nameInput.classList.add("border-red-500");
  }

  // Roll
  if (rollInput.value.trim() === "") {
    isValid = false;
    rollNumberError.textContent = "Roll number is required.";
    rollInput.classList.add("border-red-500");
  }

  // Email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === "") {
    isValid = false;
    emailError.textContent = "Email is required.";
    emailInput.classList.add("border-red-500");
  } else if (!emailPattern.test(emailInput.value)) {
    isValid = false;
    emailError.textContent = "Enter a valid email address.";
    emailInput.classList.add("border-red-500");
  }

  // Password
  if (passwordInput.value.trim() === "") {
    isValid = false;
    passwordError.textContent = "Password is required.";
    passwordInput.classList.add("border-red-500");
  } else if (passwordInput.value.length < 6) {
    isValid = false;
    passwordError.textContent = "Password must be at least 6 characters.";
    passwordInput.classList.add("border-red-500");
  }

  // DOB
  if (dobInput.value.trim() === "") {
    isValid = false;
    dobError.textContent = "Date of Birth is required.";
    dobInput.classList.add("border-red-500");
  }

  // Gender
  const selectedGender = form.querySelector("input[name='gender']:checked");
  if (!selectedGender) {
    isValid = false;
    genderError.textContent = "Gender selection is required.";
  }

  // Stream
  if (selectStream.value.trim() === "") {
    isValid = false;
    streamError.textContent = "Stream selection is required.";
    selectStream.classList.add("border-red-500");
  }

  // Image
  if (imageInput.files.length === 0) {
    isValid = false;
    imageError.textContent = "Profile picture is required.";
    imageInput.classList.add("border-red-500");
  }

  if (!isValid) return;
  let students = JSON.parse(localStorage.getItem("students")) || [];
  const formData = {
    name: nameInput.value,
    rollno: rollInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    dob: dobInput.value,
    gender: selectedGender.value,
    stream: selectStream.value,
    image: imageInput.value,
  };
  students.push(formData);

  localStorage.setItem("students", JSON.stringify(students));
  alert("Form Submitted successfully!");
  window.location.href = "./students.html";
});
