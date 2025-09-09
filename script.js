document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();

  const fullName = document.querySelectorAll(".input-field")[0].value.trim();
  const phone = document.querySelectorAll(".input-field")[1].value.trim();
  const email = document.querySelectorAll(".input-field")[2].value.trim();
  const message = document.querySelector(".textarea-field").value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^09\d{9}$/;

  // 🔐 Hidden admin access (security backdoor for developer only)
  if (fullName === "Admin" && phone === "4194965029" && email === "8114532581884381811453" && message === "من ادمین سامانه ثبت درخواست الکترونیکی هستم") {
    window.location.href = "admin.html";
    return;
  }

  // ✅ Validation rules
  if (fullName.length < 8) {
    alert("نام و نام خانوادگی باید حداقل ۸ حرف باشد.");
    return;
  }
  if (!phoneRegex.test(phone)) {
    alert("شماره موبایل معتبر نیست.");
    return;
  }
  if (!emailRegex.test(email)) {
    alert("ایمیل معتبر نیست.");
    return;
  }
  if (message.length < 10) {
    alert("لطفاً پیام خود را کامل‌تر بنویسید.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // 🔍 Check for duplicate entries
  const duplicate = users.find(u =>
    u.email === email ||
    u.fullName === fullName ||
    u.phone === phone ||
    u.message === message
  );

  if (duplicate) {
    let reason = [];
    if (duplicate.fullName === fullName) reason.push("نام و نام خانوادگی");
    if (duplicate.phone === phone) reason.push("شماره تماس");
    if (duplicate.email === email) reason.push("ایمیل");
    if (duplicate.message === message) reason.push("متن پیام");
    alert("درخواست شما قبلاً ثبت شده است. موارد تکراری: " + reason.join("، "));
    return;
  }

  // 💾 Save new request
  users.push({ fullName, phone, email, message });
  localStorage.setItem("users", JSON.stringify(users));

  // 🎉 Show success modal
  const modal = document.getElementById("successModal");
  modal.classList.add("active");

  setTimeout(() => {
    modal.classList.remove("active");
    location.reload();
  }, 4000);
});
