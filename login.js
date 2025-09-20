const wrapper = document.querySelector(".wrapper");
const signupBtn = document.querySelector(".signup-btn");
const loginBtn = document.querySelector(".login-btn");
signupBtn.addEventListener("click", () => {
  wrapper.classList.add("active");
});
loginBtn.addEventListener("click", () => {
  wrapper.classList.remove("active");
});
