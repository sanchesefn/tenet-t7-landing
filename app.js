const hero = document.getElementById("top");
const car = document.getElementById("heroCar");
const hint = document.getElementById("scrollHint");

function driveFromScroll() {
  if (!hero || !car) return;
  const total = hero.offsetHeight - window.innerHeight;
  const passed = Math.min(Math.max(-hero.getBoundingClientRect().top, 0), Math.max(total, 1));
  const p = passed / Math.max(total, 1);
  const ease = 1 - Math.pow(1 - p, 2.15);
  car.style.transform = "translate3d(" + ((1 - ease) * 115) + "%, 0, 0)";
  if (hint) hint.style.opacity = String(1 - Math.min(p * 2.4, 1));
}

window.addEventListener("scroll", driveFromScroll, { passive: true });
window.addEventListener("resize", driveFromScroll);
driveFromScroll();

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("is-active"));
    document.querySelectorAll(".panel").forEach((p) => p.classList.remove("is-active"));
    tab.classList.add("is-active");
    document.getElementById("form-" + tab.dataset.tab).classList.add("is-active");
  });
});

function annuity(price, down, months, yearly) {
  const principal = Math.max(price - down, 0);
  const r = yearly / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function updateCredit() {
  const price = Number(document.getElementById("creditTrim").value);
  const down = Number(document.getElementById("creditDown").value || 0);
  const term = Number(document.getElementById("creditTerm").value);
  const rate = Number(document.getElementById("creditRate").value);
  const pay = annuity(price, down, term, rate);
  document.querySelector("#creditResult strong").textContent =
    Math.round(pay).toLocaleString("ru-RU") + " ₽";
}

["creditTrim", "creditDown", "creditTerm", "creditRate"].forEach((id) => {
  document.getElementById(id).addEventListener("input", updateCredit);
  document.getElementById(id).addEventListener("change", updateCredit);
});
updateCredit();

const toast = document.getElementById("toast");
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    toast.hidden = false;
    form.reset();
    updateCredit();
    setTimeout(() => { toast.hidden = true; }, 4200);
  });
});
