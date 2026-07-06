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

/* ===== RESEÑAS con localStorage + carrusel infinito ===== */
const REVIEW_KEY = 'csg_reviews';
const defaultReviews = [
  { name: 'Marcos R.', rating: 5, text: 'El seguimiento fue constante y siempre supe en qué iba mi caso. Muy profesionales.', date: '12 mayo 2025' },
  { name: 'Diana P.', rating: 5, text: 'Desde la primera llamada sentí que hablaba con gente seria, no con vendedores de humo.', date: '03 abril 2025' },
  { name: 'Luis F.', rating: 4, text: 'Buena comunicación durante todo el proceso de disputas.', date: '22 marzo 2025' },
  { name: 'Karla V.', rating: 5, text: 'Me explicaron cada paso con claridad antes de empezar. Se sintió transparente.', date: '15 febrero 2025' },
  { name: 'Andrés T.', rating: 5, text: 'Gracias a su acompañamiento pude entender por fin qué estaba pasando con mi crédito.', date: '02 febrero 2025' },
  { name: 'Priscila M.', rating: 5, text: 'Los reportes de avance me dieron mucha tranquilidad durante todo el proceso.', date: '18 enero 2025' }
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
function reviewCardHtml(r) {
  return `
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
  `;
}
function renderReviews() {
  const track = document.getElementById('reviewsTrack');
  const reviews = loadReviews();
  // Duplicamos la lista para que el scroll infinito no se note el corte
  const html = reviews.map(reviewCardHtml).join('') + reviews.map(reviewCardHtml).join('');
  track.innerHTML = html;
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

/* ===== FORMULARIO DE CONTACTO (demo, sin backend) ===== */
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  // Para que este formulario envíe correos reales, conéctalo a un servicio
  // como Formspree o EmailJS (o a tu propio backend).
  document.getElementById('formSuccess').classList.add('show');
  this.reset();
});
