const form = document.getElementById("form");
const brand = document.getElementById("brand");
const uploadBtn = document.getElementById("upload-btn");
const brandSelect = document.getElementById("brand-select");
const cpu = document.getElementById("cpu");
const core = document.getElementById("core");
const threads = document.getElementById("threads");
const ram = document.getElementById("ram");
const date = document.getElementById("date");
const price = document.getElementById("price");
const btn = document.getElementById("blue-btn");
const ssd = document.getElementById("ssd");
const hdd = document.getElementById("hdd");
const laptop_hard_drive_type = document.querySelectorAll(
  ".laptop_hard_drive_type"
);
const laptop_state = document.querySelectorAll(".laptop_state");
const neW = document.getElementById("new");
const used = document.getElementById("used");
const photo_container = document.getElementById("photo-container");
const listBtn = document.getElementById("list-btn");
const mainBtn = document.getElementById("main-btn");
const backBtn = document.getElementById("back-btn");
const brandRegex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;
const numRegex = /\d/;
var uploadedImg = "";
localStorage.setItem("token", "8fbc9692d1b41b6b5b6263c8b6c26ec4");

function getBrandData() {
  fetch("https://pcfy.redberryinternship.ge/api/brands")
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      let displayBrand = data.data.map((value) => {
        return `<option id="${value.id}">${value.name}</option>`;
      });
      const optionLabel = document.createElement("option");
      optionLabel.innerText = "ბრენდი";
      brandSelect.appendChild(optionLabel);
      displayBrand = displayBrand.join("");
      brandSelect.innerHTML += displayBrand;
    });
}

brandSelect.addEventListener("change", () => {
  let brandId = brandSelect.options[brandSelect.selectedIndex].id;
  localStorage.setItem("laptop_brand_id", brandId);
});
cpu.addEventListener("change", () => {
  let cpuVal = cpu.options[cpu.selectedIndex].value;
  localStorage.setItem("laptop_cpu", cpuVal);
});

function getCpuData() {
  fetch("https://pcfy.redberryinternship.ge/api/cpus")
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      let displayCpu = data.data.map((value) => {
        return `<option id="${value.id}">${value.name}</option>`;
      });
      const optionLabel = document.createElement("option");
      optionLabel.innerText = "CPU";
      cpu.appendChild(optionLabel);
      displayCpu = displayCpu.join("");
      cpu.innerHTML += displayCpu;
    });
}
getBrandData();
getCpuData();
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkBrandValue();
  checkImage();
  checkBrandSelect();
  checkCondition();
  checkCore();
  checkCpu();
  checkDate();
  checkPrice();
  checkRam();
  checkThreads();
  checkStorage();
  radioValues();
  validateInputs();
  const localData = { ...localStorage };
  const { laptop_image, ...localData1 } = localData;

  const formData = new FormData();
  Object.entries(localData1).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append("laptop_image", file);
  for (var key of formData.entries()) {
    console.log(key[0] + ", " + key[1]);
  }
  if (validateInputs()) {
    sendDataToServer(formData);
  }
});

uploadBtn.addEventListener("change", (e) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploadedImg = reader.result;
    document.querySelector(
      "#photo-container"
    ).style.backgroundImage = `url(${uploadedImg})`;
  });
  reader.readAsDataURL(e.target.files[0]);

  if (e.target.files[0].size > 0) {
    photo_container.className = "photo-container displayNone img-size";
  }
});

// --------convert img to base64------------
let convertedImg;
let file;
uploadBtn.addEventListener("change", (e) => {
  file = e.target.files[0];
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    convertedImg = reader.result;

    localStorage.setItem("laptop_image", convertedImg);
  });
  reader.readAsDataURL(file);
});

function reloadData() {
  brand.value = localStorage.getItem("laptop_name");
  threads.value = localStorage.getItem("laptop_cpu_threads");
  core.value = localStorage.getItem("laptop_cpu_cores");
  ram.value = localStorage.getItem("laptop_ram");
  date.value = localStorage.getItem("laptop_purchase_date");
  price.value = localStorage.getItem("laptop_price");
  if (localStorage.getItem("laptop_hard_drive_type") == "SSD") {
    ssd.setAttribute("checked", "checked");
  } else if (localStorage.getItem("laptop_hard_drive_type") == "HDD") {
    hdd.setAttribute("checked", "checked");
  }
  if (localStorage.getItem("laptop_state") == "new") {
    neW.setAttribute("checked", "checked");
  } else if (localStorage.getItem("laptop_state") == "used") {
    used.setAttribute("checked", "checked");
  }
}
reloadData();
window.addEventListener("beforeunload", () => {
  checkBrandValue();
  checkCore();
  checkDate();
  checkPrice();
  checkRam();
  checkThreads();
  radioValues();
});

// ------------error/success functions-----------

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
function setErrorForUploadFile(input) {
  const photoContainer = input.parentElement;

  photoContainer.className = "photo-container error";
}

function setErrorForDropDown(input) {
  const dropDown = input.parentElement;
  dropDown.children[0].className = "select error";
}
function setSuccesForDropDown(input) {
  const dropDown = input.parentElement;
  dropDown.children[0].className = "select";
}
function setErrorForRadioBtn(input) {
  const radioLabel = input.parentElement.parentElement.children[0];
  radioLabel.className = "radio-label error";
}
function setSuccesForRadioBtn(input) {
  const radioLabel = input.parentElement.parentElement.children[0];
  radioLabel.className = "radio-label";
}
// -----------validations-----------
function checkBrandValue() {
  const brandValue = brand.value.trim();
  localStorage.setItem("laptop_name", brandValue);
  if (brandValue.length === 0) {
    setError(brand, "ლეპტოპის სახელი სავალდებულოა");
    return false;
  } else {
    setSucces(brand);
  }
  if (!brandValue.match(brandRegex)) {
    setError(
      brand,
      "შესაძლებელია შეიცავდეს მხოლოდ ლათინურ სიმბოლოებს, რიცხვებსა და !@#$%^&*()_+="
    );
    return false;
  } else {
    setSucces(brand);
  }
  return true;
}
function checkImage() {
  const uploadBtnValue = uploadBtn.value.trim();
  if (uploadBtnValue == "") {
    setErrorForUploadFile(uploadBtn);
    return false;
  }
  return true;
}
function checkBrandSelect() {
  const brandSelectValue = brandSelect.value.trim();
  if (brandSelectValue === "ბრენდი") {
    setErrorForDropDown(brandSelect);
    return false;
  } else {
    setSuccesForDropDown(brandSelect);
  }
  return true;
}
function checkCpu() {
  const cpuValue = cpu.value.trim();
  if (cpuValue === "CPU") {
    setErrorForDropDown(cpu);
    return false;
  } else {
    setSuccesForDropDown(cpu);
  }
  return true;
}
function checkCore() {
  const coreValue = core.value.trim();
  localStorage.setItem("laptop_cpu_cores", coreValue);
  if (coreValue.length === 0) {
    setError(core, "CPU-ს ბირთვი სავალდებულოა");
    return false;
  } else {
    setSucces(core);
  }
  if (!coreValue.match(numRegex)) {
    setError(core, "მხოლოდ ციფრები");
    return false;
  } else {
    setSucces(core);
  }

  return true;
}
function checkThreads() {
  const threadsValue = threads.value.trim();
  localStorage.setItem("laptop_cpu_threads", threadsValue);
  if (threadsValue.length === 0) {
    setError(threads, "CPU-ს ნაკადი სავალდებულოა");
    return false;
  } else {
    setSucces(threads);
  }
  if (!threadsValue.match(numRegex)) {
    setError(threads, "მხოლოდ ციფრები");
    return false;
  } else {
    setSucces(threads);
  }

  return true;
}
function checkRam() {
  const ramValue = ram.value.trim();
  localStorage.setItem("laptop_ram", ramValue);
  if (ramValue.length === 0) {
    setError(ram, "ლეპტოპის RAM(გიგაბაიტებში - GB) სავალდებულოა");
    return false;
  } else {
    setSucces(ram);
  }
  if (!ramValue.match(numRegex)) {
    setError(ram, "მხოლოდ ციფრები");
    return false;
  } else {
    setSucces(ram);
  }

  return true;
}
function checkStorage() {
  if (!ssd.checked && !hdd.checked) {
    setErrorForRadioBtn(ssd);
    return false;
  } else {
    setSuccesForRadioBtn(ssd);
  }
  return true;
}
function checkCondition() {
  if (!neW.checked && !used.checked) {
    setErrorForRadioBtn(used);
    return false;
  } else {
    setSuccesForRadioBtn(used);
  }
  return true;
}
function checkPrice() {
  const priceValue = price.value.trim();
  localStorage.setItem("laptop_price", priceValue);
  if (priceValue.length === 0) {
    setError(price, "ლეპტოპის ფასი სავალდებულოა");
    return false;
  } else {
    setSucces(price);
  }
  if (!priceValue.match(numRegex)) {
    setError(price, "მხოლოდ ციფრები");
    return false;
  } else {
    setSucces(price);
  }
  return true;
}
function checkDate() {
  const dateValue = date.value.trim();
  localStorage.setItem("laptop_purchase_date", dateValue);
  return true;
}
function radioValues() {
  if (ssd.checked) {
    localStorage.setItem("laptop_hard_drive_type", "SSD");
  } else if (hdd.checked) {
    localStorage.setItem("laptop_hard_drive_type", "HDD");
  }
  if (neW.checked) {
    localStorage.setItem("laptop_state", "new");
  } else if (used.checked) {
    localStorage.setItem("laptop_state", "used");
  }
}

function validateInputs() {
  if (
    localStorage.getItem("name") !== null &&
    localStorage.getItem("surname") !== null &&
    localStorage.getItem("email") !== null &&
    localStorage.getItem("phone_number") !== null &&
    localStorage.getItem("laptop_brand_id") !== null &&
    localStorage.getItem("laptop_cpu") !== null &&
    checkBrandValue() &&
    checkImage() &&
    checkBrandSelect() &&
    checkCondition() &&
    checkCore() &&
    checkCpu() &&
    checkDate() &&
    checkPrice() &&
    checkRam() &&
    checkThreads() &&
    checkStorage()
  ) {
    document.querySelector(".modal").className = "modal active";
    document.querySelector(".modal-bg").className = "modal-bg active";
    return true;
    // console.log("გაეშვა");
  }
}

async function sendDataToServer(e) {
  try {
    const res = await axios.post(
      "https://pcfy.redberryinternship.ge/api/laptop/create",
      e
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

// -------modal no scroll --------

window.addEventListener("scroll", () => {
  const modal = document.querySelector(".modal");
  if (modal.className.includes("active")) {
    window.scrollTo(0, 0);
  }
});

listBtn.addEventListener("click", () => {
  window.location.href = "./list.html";
});
mainBtn.addEventListener("click", () => {
  window.location.href = "./index.html";
});
