// SleepSchool V3 — Minimal starfield (atmosphere, not spectacle)
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
let mouseX = 0, mouseY = 0;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStars() {
  stars = [];
  const count = Math.min(300, Math.floor(window.innerWidth * window.innerHeight / 5000));
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
      // Slight warmth variation
      hue: Math.random() > 0.7 ? 30 + Math.random() * 20 : 240 + Math.random() * 30,
    });
  }
}

function draw(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const mx = (mouseX - cx) / cx; // -1 to 1
  const my = (mouseY - cy) / cy;

  for (const star of stars) {
    // Gentle parallax based on star size
    const px = star.x + mx * star.size * 8;
    const py = star.y + my * star.size * 8;

    // Twinkle
    const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
    const alpha = star.opacity * twinkle;

    ctx.beginPath();
    ctx.arc(px, py, star.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${star.hue}, 30%, 85%, ${alpha})`;
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

window.addEventListener('resize', () => { resize(); createStars(); });
window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

resize();
createStars();
requestAnimationFrame(draw);