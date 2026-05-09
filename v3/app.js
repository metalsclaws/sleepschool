// SleepSchool V3 — App logic

// Episode data (will be injected by build script or fetched from API)
const EPISODES = [
  { id: 'ep01', title: 'What Happens in Your Brain When You Sleep', category: '🧠 Mind' },
  { id: 'ep02', title: 'How Trees Talk to Each Other', category: '🌿 Nature' },
  { id: 'ep03', title: 'A Day on the Nile, 3000 BC', category: '🏛️ History' },
  { id: 'ep04', title: 'The Deep Ocean at Midnight', category: '🌊 Ocean' },
  { id: 'ep05', title: 'How Stars Are Born', category: '🌌 Space' },
  { id: 'ep06', title: 'The Secret Life of a Beehive', category: '🌿 Nature' },
  { id: 'ep07', title: 'The Library of Alexandria', category: '🏛️ History' },
  { id: 'ep08', title: 'The Northern Lights', category: '🔬 Science' },
  { id: 'ep09', title: 'The Silk Road at Night', category: '🏛️ History' },
  { id: 'ep10', title: 'Japanese Forest Bathing', category: '🌿 Nature' },
  { id: 'ep11', title: 'The Journey of a Monarch Butterfly', category: '🌿 Nature' },
  { id: 'ep12', title: 'How Bread Changed the World', category: '🍵 Food' },
  { id: 'ep13', title: 'Coral Reefs at Dawn', category: '🌊 Ocean' },
  { id: 'ep14', title: 'The Moon', category: '🌌 Space' },
  { id: 'ep15', title: 'Renaissance Florence', category: '🎨 Art' },
  { id: 'ep16', title: 'The History of Tea', category: '🍵 Food' },
  { id: 'ep17', title: 'What Lightning Actually Is', category: '🔬 Science' },
  { id: 'ep18', title: 'The Voyager Golden Record', category: '🌌 Space' },
  { id: 'ep19', title: 'Life Beneath an Antarctic Ice Sheet', category: '🌊 Ocean' },
  { id: 'ep20', title: 'A Year in the Life of an Oak Tree', category: '🌿 Nature' },
];

// Render episodes
function renderEpisodes() {
  const grid = document.querySelector('.episode-grid');
  if (!grid) return;
  grid.innerHTML = EPISODES.map((ep, i) => `
    <a class="episode-card" href="#listen" data-reveal style="transition-delay: ${i * 40}ms">
      <div class="episode-number">${String(i + 1).padStart(2, '0')}</div>
      <div class="episode-title">${ep.title}</div>
      <div class="episode-category">${ep.category}</div>
    </a>
  `).join('');
}

// Scroll reveal (IntersectionObserver — lightweight, GPU-friendly)
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

// Subscribe handler (stub)
function handleSubscribe(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const email = input.value;
  // TODO: Connect to newsletter service
  input.value = '';
  const btn = e.target.querySelector('button');
  btn.textContent = 'Subscribed ✓';
  setTimeout(() => { btn.textContent = 'Subscribe'; }, 2000);
  return false;
}
// Make it global for inline onclick
window.handleSubscribe = handleSubscribe;

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderEpisodes();
  initScrollReveal();
});