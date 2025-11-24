// --- Плавная прокрутка ---
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href');
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// --- Подсветка активного пункта ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav__link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = window.scrollY;
    const offset = section.offsetTop - 150;
    const height = section.offsetHeight;
    if (top >= offset && top < offset + height) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// --- Валидация формы ---
const form = document.querySelector('.contact__form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = form.querySelector('input[type="text"]');
  const email = form.querySelector('input[type="email"]');
  const message = form.querySelector('textarea');

  let errors = [];

  if (name.value.trim() === '') errors.push('Введите имя');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) errors.push('Введите корректный email');
  if (message.value.trim().length < 10) errors.push('Сообщение должно быть не короче 10 символов');

  if (errors.length > 0) {
    alert('Ошибки:\n' + errors.join('\n'));
  } else {
    alert('Сообщение успешно отправлено!');
    form.reset();
  }
});


// --- Часы и обратный отсчёт ---
function updateClock() {
  const now = new Date();
  document.getElementById('timeNow').textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

function updateCountdown() {
  const now = new Date();
  const newYear = new Date(now.getFullYear() + 1, 0, 1);
  const diff = newYear - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  document.getElementById('countdown').textContent =
    `${days}д ${hours}ч ${mins}м ${secs}с`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// ---------- Тема ----------
const toggle = document.getElementById("themeToggle");
const root = document.documentElement;

// Проверяем системную тему
const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Берём тему из localStorage или систему
let savedTheme = localStorage.getItem("theme") || (systemIsDark ? "dark" : "light");

// Применяем тему при загрузке
setTheme(savedTheme);

function setTheme(theme) {
  root.classList.remove("light-theme", "dark-theme");
  root.classList.add(theme + "-theme");
  localStorage.setItem("theme", theme);
}

// Переключение темы по кнопке
toggle.addEventListener("click", () => {
  const newTheme = root.classList.contains("dark-theme") ? "light" : "dark";
  setTheme(newTheme);
});

// ===== Бургер =====
const burger = document.getElementById("burgerBtn");
const nav = document.querySelector(".nav__list");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  nav.classList.toggle("open");
});

// Закрытие меню при клике на пункт
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    nav.classList.remove("open");
  });
});
