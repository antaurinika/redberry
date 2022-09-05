const form = document.getElementById("form");
const fName = document.getElementById("fName");
const lName = document.getElementById("lName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const team = document.getElementById("team");
const position = document.getElementById("position");
const sumbitBtn = document.getElementById("blue-btn");
const label = document.getElementById("label");
const geoRegex = /^([\u10D0-\u10F0]+)$/;
const numRegex = /\d/;
const emailRegex = /\S+@\bredberry\b.\bge\b/;
const phoneRegex = /^((\+)995)[5](\d{2})(\d{3})(\d{3})$/;
function getTeamData() {
  fetch("https://pcfy.redberryinternship.ge/api/teams")
    .then((data) => {
      return data.json();
    })

    .then((data) => {
      let displayTeam = data.data.map((value) => {
        return `<option id=${value.id}>${value.name}</option>`;
      });
      displayTeam = displayTeam.join("");
      team.innerHTML += displayTeam;
    });
}

function filterPositionData() {
  team.addEventListener("change", () => {
    let val = team.options[team.selectedIndex].id;
    console.log(typeof val);
    localStorage.setItem("team_id", val);
    fetch("https://pcfy.redberryinternship.ge/api/positions")
      .then((secondData) => {
        return secondData.json();
      })
      .then((secondData) => {
        let displayPositions = secondData.data.map((value) => {
          if (value.team_id == val) {
            return `<option id=${value.id}>${value.name}</option>`;
          }
        });
        displayPositions = displayPositions.join("");
        position.innerHTML = displayPositions;
        const optionLabel = document.createElement("option");
        optionLabel.innerText = "პოზიცია";
        position.insertBefore(optionLabel, position.firstChild);
        optionLabel.selected = "selected";
      });
  });
}
position.addEventListener("change", () => {
  let posId = position.options[position.selectedIndex].id;
  localStorage.setItem("position_id", posId);
});
filterPositionData();
getTeamData();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkFirstName();
  checkDropDownPosition();
  checkDropDownTeam();
  checkLastName();
  checkMail();
  checkPhone();
  validateInputs();
});
fName.value = localStorage.getItem("name");
lName.value = localStorage.getItem("surname");
email.value = localStorage.getItem("email");
phone.value = localStorage.getItem("phone_number");
window.addEventListener("beforeunload", () => {
  checkFirstName();
  checkLastName();
  checkMail();
  checkPhone();
});

function setError(input, msg) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = msg;
  formControl.className = "form-control error";
}
function setSucces(input, msg = "") {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = msg;
  formControl.className = "form-control";
}
function setErrorForDropDown(input) {
  const dropDown = input.parentElement;
  dropDown.children[0].className = "select error";
}
function setSuccesForDropDown(input) {
  const dropDown = input.parentElement;
  dropDown.children[0].className = "select";
}

function checkFirstName() {
  const fNameValue = fName.value.trim();
  localStorage.setItem("name", fNameValue);
  if (fNameValue.length === 0) {
    setError(fName, "სახელი სავალდებულოა");
    return false;
  } else {
    setSucces(fName);
  }
  if (fNameValue.length > 0 && fNameValue.length < 2) {
    setError(fName, "სახელი უნდა იყოს მინიმუმ 2 სიმბოლო");
    return false;
  } else {
    setSucces(fName);
  }
  if (!fNameValue.match(geoRegex)) {
    setError(fName, "სახელი უნდა შედგებოდეს მხოლოდ ქართული სიმბოლოებისგან");
    return false;
  } else {
    setSucces(fName);
  }
  if (fNameValue.match(numRegex)) {
    setError(fName, "სახელი არ უნდა შეიცავდეს რიცხვს");
    return false;
  } else {
    setSucces(fName);
  }
  return true;
}

function checkLastName() {
  const lNameValue = lName.value.trim();
  localStorage.setItem("surname", lNameValue);
  if (lNameValue.length === 0) {
    setError(lName, "გვარი სავალდებულოა");
    return false;
  } else {
    setSucces(lName);
  }
  if (lNameValue.length > 0 && lNameValue.length < 2) {
    setError(lName, "გვარი უნდა იყოს მინიმუმ 2 სიმბოლო");
    return false;
  } else {
    setSucces(lName);
  }
  if (!lNameValue.match(geoRegex) && lNameValue.length > 1) {
    setError(lName, "გვარი უნდა შედგებოდეს მხოლოდ ქართული სიმბოლოებისგან");
    return false;
  } else {
    setSucces(fName);
  }
  if (lNameValue.match(numRegex)) {
    setError(lName, "გვარი არ უნდა შეიცავდეს რიცხვს");
    return false;
  } else {
    setSucces(lName);
  }
  return true;
}

function checkDropDownPosition() {
  const positionValue = position.value.trim();
  if (positionValue === "პოზიცია") {
    setErrorForDropDown(position);
    return false;
  } else {
    setSuccesForDropDown(position);
  }
  return true;
}

function checkDropDownTeam() {
  const teamValue = team.value.trim();
  if (teamValue === "თიმი") {
    setErrorForDropDown(team);
    return false;
  } else {
    setSuccesForDropDown(team);
  }
  return true;
}

function checkMail() {
  const emailValue = email.value.trim();
  localStorage.setItem("email", emailValue);
  if (emailValue.length === 0) {
    setError(email, "მეილი სავალდებულოა");
    return false;
  } else {
    setSucces(email);
  }
  if (!emailValue.toLowerCase().match(emailRegex)) {
    setError(email, "მეილი უნდა მთავრდებოდეს @redberry.ge-ით");
    return false;
  } else {
    setSucces(email);
  }
  return true;
}

function checkPhone() {
  const phoneValue = phone.value.trim();
  localStorage.setItem("phone_number", phoneValue);
  if (!phoneValue.match(phoneRegex)) {
    setError(
      phone,
      "ტელეფონის ნომერი უნდა აკმაყოფილებდეს ქართული მობილურის ფორმატს"
    );
    return false;
  } else {
    setSucces(phone);
  }

  if (phoneValue.length === 0) {
    setError(phone, "ტელეფონის ნომერი სავალდებულოა");
  } else {
    setSucces(phone);
  }
  return true;
}

function validateInputs() {
  if (
    checkFirstName() &&
    checkLastName() &&
    checkDropDownTeam() &&
    checkDropDownPosition() &&
    checkMail() &&
    checkPhone()
  ) {
    window.location.href = "./laptop-specs.html";
  }
}
