const forms = document.querySelector('.contact__form');
const fields = forms.querySelectorAll('input, textarea');
const header = document.querySelector('.header');
const breadcrumbs = header.querySelector(".breadcrumbs");
const menuBtn = header.querySelector(".header__menu");
const links = document.querySelectorAll('.breadcrumbs__item .breadcrumbs__link');
const body = document.body;

function initNavigation() {

    function handleBreadcrumbClick(e) {
        e.preventDefault();

        links.forEach(item => item.classList.remove('active'));

        this.classList.add('active');

        const target = document.querySelector(this.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth' });
    }

    function toggleMenu(e) {
        e.stopPropagation();
        breadcrumbs.classList.toggle('active');
    }

    function closeMenuOnOutsideClick(e) {
        if (!breadcrumbs.contains(e.target) && !menuBtn.contains(e.target)) {
            breadcrumbs.classList.remove('active');
        }
    }

    links.forEach(link => link.addEventListener('click', handleBreadcrumbClick));
    menuBtn.addEventListener('click', toggleMenu);
    document.addEventListener('click', closeMenuOnOutsideClick);
}

function formValidation() {
    const fields = forms.querySelectorAll('input, textarea');

    fields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => validateField(field));
    });

    forms.addEventListener('submit', (e) => {
        e.preventDefault();

        let allValid = true;

        fields.forEach(field => {
            validateField(field);
            if (field.parentNode.querySelector('.error-message')) allValid = false;
        });

        if (allValid) {
            showSuccessMessage(forms);
            forms.reset();
        }
    });
}


function showSuccessMessage(form) {
    let msg = form.querySelector('.success-message');
    if (!msg) {
        msg = document.createElement('div');
        msg.className = 'success-message';
        form.appendChild(msg);
    }
    msg.textContent = 'Ваша форма успешно отправлена!';
    msg.style.display = 'block';
    msg.style.color = 'white';
    setTimeout(() => msg.style.display = 'none', 3000);
}

function showFieldError(field, message) {

    if (field.parentNode.querySelector('.error-message')) {
        return false;
    }

    let errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

function clearAllFields(field) {
    field.parentNode.querySelectorAll('.error-message').forEach(
        error => error.remove()
    );
}

function validateField(field) {
    const errors = [];

    clearAllFields(field);

    if (field.hasAttribute('required') && field.value.trim().length === 0) {
        errors.push('Required field');
    }

    if (field.value.length > 32) {
        errors.push('Max length 32 characters long');
    }

    if (field.type === 'email' && field.value.length > 0) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(field.value)) {
            errors.push('Invalid email address');
        }
    }

    if (errors.length > 0) {
        showFieldError(field, errors[0]);
    }
}

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
}

document.getElementById('theme-toggle').onclick = () => {
    body.classList.toggle('dark');

    localStorage.setItem(
        'theme',
        body.classList.contains('dark') ? 'dark' : 'light'
    );
};

function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = new Date(`January 1, ${currentYear + 1} 00:00:00`);

    const diff = nextYear - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();


document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    formValidation();
});