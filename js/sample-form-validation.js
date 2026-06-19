// Form validation and submission handling for patient registration form

// อัปเดต display ของ range slider
const ageInput = document.getElementById("age");
const ageDisplay = document.getElementById("ageDisplay");

ageInput.addEventListener("input", function () {
  ageDisplay.textContent = this.value;
});

// Validation สำหรับเบอร์โทรศัพท์
const phoneInput = document.getElementById("phone");
const phoneInvalid = document.getElementById("phoneInvalid");

phoneInput.addEventListener("input", function () {
  // ตัดอักขระที่ไม่ใช่ตัวเลข
  this.value = this.value.replace(/[^0-9]/g, "");

  // จำกัดความยาวไม่เกิน 10 ตัวอักษร
  if (this.value.length > 10) {
    this.value = this.value.slice(0, 10);
  }

  // ลบ is-invalid class เมื่อ user แก้ไข
  if (this.value) {
    this.classList.remove("is-invalid");
    phoneInvalid.style.display = "none";
  }
});

// การจัดการการส่ง Form
const patientForm = document.getElementById("patientForm");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const urgencySelect = document.getElementById("urgency");

// ลบ is-invalid class เมื่อ user แก้ไข
[firstNameInput, lastNameInput, urgencySelect].forEach((field) => {
  field.addEventListener("change", function () {
    this.classList.remove("is-invalid");
  });
});

patientForm.addEventListener("submit", function (e) {
  e.preventDefault();
  e.stopPropagation();

  // ตรวจสอบ validity ของทุก field
  let isValid = patientForm.checkValidity() === false;

  // ตรวจสอบเบอร์โทรศัพท์แยกต่างหาก
  const phone = phoneInput.value;
  // ต้องเริ่มต้นด้วย 0 และมีความยาวไม่เกิน 10 ตัวอักษร (0 + 0-9 ตัวเลข)
  const isPhoneValid = /^0\d{0,9}$/.test(phone);

  if (phone && !isPhoneValid) {
    phoneInput.classList.add("is-invalid");
    phoneInvalid.style.display = "block";
    isValid = true;
  } else {
    phoneInput.classList.remove("is-invalid");
    phoneInvalid.style.display = "none";
  }

  // เพิ่ม class is-invalid ให้ field ที่ fail validation
  const inputs = patientForm.querySelectorAll(".form-control, .form-select");
  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      input.classList.add("is-invalid");
    } else {
      input.classList.remove("is-invalid");
    }
  });

  if (isValid) {
    return;
  }

  // แสดงข้อมูลที่บันทึก
  const formData = {
    ชื่อ: document.getElementById("firstName").value,
    นามสกุล: document.getElementById("lastName").value,
    อายุ: document.getElementById("age").value,
    เบอร์โทรศัพท์: phoneInput.value,
    ความเร่งด่วน: document.getElementById("urgency").value,
  };

  console.log("ข้อมูลผู้ป่วย:", formData);
  alert(
    "✅ บันทึกข้อมูลเรียบร้อย\n\n" +
      `ชื่อ: ${formData["ชื่อ"]}\n` +
      `นามสกุล: ${formData["นามสกุล"]}\n` +
      `อายุ: ${formData["อายุ"]} ปี\n` +
      `เบอร์โทรศัพท์: ${formData["เบอร์โทรศัพท์"]}\n` +
      `ความเร่งด่วน: ${formData["ความเร่งด่วน"]}`,
  );

  // สามารถส่งไปยัง server หรือทำการอื่นๆต่อได้
  // this.submit();
});
