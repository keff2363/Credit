/* =========================================
   CREDIT SHIELD GROUP — script.js
========================================= */

/* ===== MENU HAMBURGUESA ===== */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mainNav = document.getElementById('mainNav');
hamburgerBtn.addEventListener('click', () => mainNav.classList.toggle('open'));
document.querySelectorAll('#mainNav a').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

/* ===== FAQ ACORDEÓN ===== */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ===== RESEÑAS con localStorage ===== */
const REVIEW_KEY = 'csg_reviews';
const defaultReviews = [
  { name: 'Marcos R.', rating: 5, text: 'El seguimiento fue constante y siempre supe en qué iba mi caso. Muy profesionales.', date: '12 mayo 2025' },
  { name: 'Diana P.', rating: 5, text: 'Como dealer, el programa de referidos me ayudó a retomar contacto con clientes que ya daba por perdidos.', date: '03 abril 2025' },
  { name: 'Luis F.', rating: 4, text: 'Buena comunicación durante todo el proceso de disputas.', date: '22 marzo 2025' },
  { name: 'Karla V.', rating: 5, text: 'Me explicaron cada paso con claridad antes de empezar. Se sintió transparente.', date: '15 febrero 2025' },
  { name: 'Andrés T.', rating: 5, text: 'Como realtor, recomendarlos me ha ayudado a que más clientes puedan calificar.', date: '02 febrero 2025' }
];

function loadReviews() {
  const stored = localStorage.getItem(REVIEW_KEY);
  return stored ? JSON.parse(stored) : defaultReviews;
}
function saveReviews(reviews) {
  localStorage.setItem(REVIEW_KEY, JSON.stringify(reviews));
}
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  const reviews = loadReviews();
  grid.innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-top">
        <div class="avatar">${escapeHtml(r.name.charAt(0))}</div>
        <div>
          <div class="review-name">${escapeHtml(r.name)}</div>
          <div class="review-date">${escapeHtml(r.date)}</div>
        </div>
      </div>
      <div class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
      <p class="review-text">${escapeHtml(r.text)}</p>
    </div>
  `).join('');
}
renderReviews();

const reviewModal = document.getElementById('reviewModal');
document.getElementById('openReviewModal').addEventListener('click', () => reviewModal.classList.add('show'));
document.getElementById('closeReviewModal').addEventListener('click', () => reviewModal.classList.remove('show'));

document.getElementById('reviewForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('rName').value.trim();
  const rating = parseInt(document.getElementById('rRating').value, 10);
  const text = document.getElementById('rText').value.trim();
  const today = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });

  const reviews = loadReviews();
  reviews.unshift({ name, rating, text, date: today });
  saveReviews(reviews);
  renderReviews();

  this.reset();
  reviewModal.classList.remove('show');
});

/* ===== SELECTOR DE ROL EN CONTACTO ===== */
let selectedRole = 'Cliente';
document.querySelectorAll('.role-option').forEach(opt => {
  opt.addEventListener('click', function () {
    document.querySelectorAll('.role-option').forEach(o => o.classList.remove('selected'));
    this.classList.add('selected');
    selectedRole = this.dataset.role;
  });
});

/* ===== FORMULARIO DE CONTACTO (demo, sin backend) ===== */
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  // Para que este formulario envíe correos reales, conéctalo a un servicio
  // como Formspree o EmailJS (o a tu propio backend).
  document.getElementById('formSuccess').classList.add('show');
  this.reset();
  document.querySelectorAll('.role-option').forEach(o => o.classList.remove('selected'));
  document.querySelector('.role-option[data-role="Cliente"]').classList.add('selected');
  selectedRole = 'Cliente';
});
