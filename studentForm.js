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
// name field
const nameContainer = document.createElement("div");
const nameLabel = document.createElement("label");
nameLabel.setAttribute("id", "name");
nameLabel.setAttribute("for", "name");
nameLabel.textContent = "Student Name";
nameLabel.setAttribute("class", "block text-gray-700 text-lg font-bold mb-2");

const nameInput = document.createElement("input");
nameInput.setAttribute("type", "text");
nameInput.setAttribute("id", "name");
nameInput.setAttribute("name", "name");
nameInput.setAttribute(
  "class",
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
);
console.log(nameInput.value);

nameContainer.appendChild(nameLabel);
nameLabel.appendChild(nameInput);

nameContainer.setAttribute("class", "mb-2");
// nameInput.setAttribute("required", "");

// Roll number field
const rollNumberContainer = document.createElement("div");
const rollNumberLabel = document.createElement("label");
rollNumberLabel.setAttribute("id", "rollno");
rollNumberLabel.setAttribute("for", "rollno");
rollNumberLabel.textContent = "Roll Number";
rollNumberLabel.setAttribute(
  "class",
  "block text-gray-700 text-lg font-bold mb-2"
);

const rollInput = document.createElement("input");
rollInput.setAttribute("type", "number");
rollInput.setAttribute("id", "rollno");
rollInput.setAttribute("name", "rollno");
rollInput.setAttribute(
  "class",
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
);

rollNumberContainer.appendChild(rollNumberLabel);
rollNumberContainer.appendChild(rollInput);

// email field
const emailContainer = document.createElement("div");
const emailLabel = document.createElement("label");
emailLabel.setAttribute("id", "email");
emailLabel.setAttribute("for", "email");
emailLabel.textContent = "Email";
emailLabel.setAttribute("class", "block text-gray-700 text-lg font-bold mb-2");

const emailInput = document.createElement("input");
emailInput.setAttribute("type", "email");
emailInput.setAttribute("id", "email");
emailInput.setAttribute("name", "email");
emailInput.setAttribute(
  "class",
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
);

emailContainer.appendChild(emailLabel);
emailContainer.appendChild(emailInput);

// password field
const passwordContainer = document.createElement("div");
const passwordLabel = document.createElement("label");
passwordLabel.setAttribute("id", "password");
passwordLabel.setAttribute("for", "password");
passwordLabel.textContent = "Password";
passwordLabel.setAttribute(
  "class",
  "block text-gray-700 text-lg font-bold mb-2"
);

const passwordInput = document.createElement("input");
passwordInput.setAttribute("type", "password");
passwordInput.setAttribute("id", "password");
passwordInput.setAttribute("name", "password");
passwordInput.setAttribute(
  "class",
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
);

passwordContainer.appendChild(passwordLabel);
passwordContainer.appendChild(passwordInput);

// DOB field
const dobContainer = document.createElement("div");
const dobLabel = document.createElement("label");
dobLabel.setAttribute("id", "dob");
dobLabel.setAttribute("for", "dob");
dobLabel.textContent = "dob";
dobLabel.setAttribute("class", "block text-gray-700 text-lg font-bold mb-2");

const dobInput = document.createElement("input");
dobInput.setAttribute("type", "date");
dobInput.setAttribute("id", "dob");
dobInput.setAttribute("name", "dob");
dobInput.setAttribute(
  "class",
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
);

dobContainer.appendChild(dobLabel);
dobContainer.appendChild(dobInput);

// gender field
// gender field
const genderContainer = document.createElement("div");
genderContainer.setAttribute("class", "flex flex-col space-y-2");
genderContainer.innerHTML =
  "<b class='block text-gray-700 text-lg font-bold mb-2'>Gender</b>";

// helper function for radio option
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

// create options
const maleOption = createRadioOption("male", "Male", "Male");
const femaleOption = createRadioOption("female", "Female", "Female");
const otherOption = createRadioOption("other", "Other", "Other");

// append to container
genderContainer.appendChild(maleOption);
genderContainer.appendChild(femaleOption);
genderContainer.appendChild(otherOption);

// select stream field
const streamContainer = document.createElement("div");

const streamLabel = document.createElement("label");
streamLabel.setAttribute("id", "stream");
streamLabel.setAttribute("for", "stream");
streamLabel.textContent = "Stream";
streamLabel.setAttribute("class", "block text-gray-700 text-lg font-bold mb-2");

const selectStream = document.createElement("select");
selectStream.id = "streams";
selectStream.name = "streams";
selectStream.setAttribute(
  "class",
  "shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
);

streamContainer.setAttribute("class", "flex flex-col space-y-2");

streamContainer.appendChild(streamLabel);

const streams = [
  { value: "science", text: "science" },
  { value: "commerce", text: "commerce" },
  { value: "arts", text: "arts" },
];

streams.forEach((stream) => {
  const option = document.createElement("option");
  option.value = stream.value;
  option.textContent = stream.text;
  selectStream.appendChild(option);
});

streamContainer.appendChild(selectStream);

// image field
const imageContainer = document.createElement("div");
imageContainer.setAttribute("class", "flex flex-col space-y-2");

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

imageContainer.appendChild(imageLabel);
imageContainer.appendChild(imageInput);

// submit button field
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

// form submitting handler

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;
  let messages = [];

  if (nameInput.value.trim() === "") {
    isValid = false;
    messages.push("Name is required");
  }

  if (rollInput.value.trim() === "") {
    isValid = false;
    messages.push("Roll number is required");
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === "") {
    isValid = false;
    messages.push("Email is required!");
  } else if (!emailPattern.test(emailInput.value)) {
    isValid = false;
    messages.push("Enter a valid email address.");
  }

  // Password validation
  if (passwordInput.value.trim() === "") {
    isValid = false;
    messages.push("Password is required.");
  } else if (passwordInput.value.length < 6) {
    isValid = false;
    messages.push("Password must be at least 6 characters long.");
  }

  // DOB validation
  if (dobInput.value.trim() === "") {
    isValid = false;
    messages.push("Date of Birth is required.");
  }

  const selectedGender = form.querySelector("input[name='gender']:checked");
  if (!selectedGender) {
    isValid = false;
    messages.push("Gender selection is required.");
  }

  // Stream validation
  if (selectStream.value.trim() === "") {
    isValid = false;
    messages.push("Stream selection is required.");
  }

  // Image validation
  if (imageInput.files.length === 0) {
    isValid = false;
    messages.push("Profile picture upload is required.");
  }

  // If validation fails
  if (!isValid) {
    alert(messages.join("\n"));
    return;
  }
  const formData = {
    name: nameInput.value,
    rollno: rollInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    dob: dobInput.value,
    gender: selectedGender ? selectedGender.value : "",
    stream: selectStream.value,
    image: imageInput.value,
  };
  const jsonData = JSON.stringify(formData);
  localStorage.setItem("studentFormData", jsonData);
  console.log(jsonData);
});
