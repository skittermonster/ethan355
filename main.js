
// Minimal JS for UX polish: mobile nav toggle + footer year + active link hint
(function(){
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (navToggle && nav){
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();


// === Minimal Audio Player ===
(function(){
  const audio = document.getElementById('ap-audio');
  if (!audio) return;

  const title = document.getElementById('ap-title');
  const toggle = document.getElementById('ap-toggle');
  const prev = document.getElementById('ap-prev');
  const next = document.getElementById('ap-next');
  const seek = document.getElementById('ap-seek');
  const tracks = Array.from(document.querySelectorAll('.ap-track'));
  let index = tracks.findIndex(t => t.classList.contains('is-active'));
  if (index < 0) index = 0;

  function load(i){
    index = (i + tracks.length) % tracks.length;
    tracks.forEach(t => t.classList.remove('is-active'));
    const li = tracks[index];
    li.classList.add('is-active');
    const src = li.getAttribute('data-src');
    audio.src = src;
    title.textContent = li.textContent.trim();
  }

  function playPause(){
    if (audio.paused) { audio.play(); toggle.textContent = '⏸'; }
    else { audio.pause(); toggle.textContent = '▶'; }
  }

  function toPercent(current, total){ return total ? Math.min(100, (current/total)*100) : 0; }

  toggle.addEventListener('click', playPause);
  prev.addEventListener('click', () => { load(index - 1); audio.play(); toggle.textContent='⏸'; });
  next.addEventListener('click', () => { load(index + 1); audio.play(); toggle.textContent='⏸'; });

  tracks.forEach((li, i) => {
    li.addEventListener('click', () => { load(i); audio.play(); toggle.textContent='⏸'; });
  });

  audio.addEventListener('loadedmetadata', () => { seek.value = 0; });
  audio.addEventListener('timeupdate', () => { seek.value = toPercent(audio.currentTime, audio.duration); });
  audio.addEventListener('ended', () => { next.click(); });
  seek.addEventListener('input', () => {
    if (!isNaN(audio.duration)) audio.currentTime = (seek.value/100) * audio.duration;
  });

  // initial
  load(index);
})();

