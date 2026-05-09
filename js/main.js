// js/main.js
import { initNavbar } from './modules/navbar.js';
import { initHome } from './pages/home.js';
import { initTutorsPage } from './pages/tutors.js';
import { initSubjectsPage } from './pages/subjects.js';
import { initProfilePage } from './pages/profile.js';

document.addEventListener('DOMContentLoaded', async () => {
  initNavbar();

  const path = window.location.pathname.toLowerCase();

  if (path.includes('tutors.html')) {
    await initTutorsPage();
  } else if (path.includes('subjects.html')) {
    initSubjectsPage();
  } else if (path.includes('profile.html')) {
    await initProfilePage();
  } else {
    initHome();
  }
});
// === Функция цитаты дня ===
async function loadQuoteOfTheDay() {
  const quoteElement = document.getElementById('quoteOfTheDay');
  if (!quoteElement) return;

  try {
    const response = await fetch('https://api.quotable.io/random');
    if (!response.ok) throw new Error('Network error');

    const quote = await response.json();
    quoteElement.innerHTML = `
            <blockquote>"${quote.content}"</blockquote>
            <cite>— ${quote.author}</cite>
        `;
  } catch (error) {
    console.error('Quote error:', error);
    quoteElement.innerHTML = `
            <p>Цитата дня: "Образование — это оружие, самое мощное, которым вы можете изменить мир." — Нельсон Мандела</p>
        `;
  }
}

// === Инициализация главной страницы ===
function initHome() {
  loadQuoteOfTheDay();
  console.log('Главная страница инициализирована');
}

// Заглушки для остальных страниц (чтобы не падало)
function initNavbar() {
  console.log('Navbar ready');
}
function initTutorsPage() {
  console.log('Tutors page');
  return Promise.resolve();
}
function initSubjectsPage() {
  console.log('Subjects page');
}
function initProfilePage() {
  console.log('Profile page');
  return Promise.resolve();
}
