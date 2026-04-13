
  // Custom Cursor
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; });
  function animRing() { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animRing); }
  animRing();
  document.querySelectorAll('a, button, .skill-cat, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 80); }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => obs.observe(el));

  // Skill bars
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  const skillSection = document.getElementById('skillBars');
  if (skillSection) barObs.observe(skillSection.closest('.reveal') || skillSection);

  // Nav scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) nav.style.padding = '0.8rem 4rem';
    else nav.style.padding = '1.2rem 4rem';
  });

  // Mobile nav
  function toggleMobile() {
    document.getElementById('mobileNav').classList.toggle('open');
  }
  function closeMobile() {
    document.getElementById('mobileNav').classList.remove('open');
  }

  // Form submit
  function submitForm() {
    const success = document.getElementById('formSuccess');
    success.style.display = 'flex';
    setTimeout(() => success.style.display = 'none', 4000);
  }

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id'); });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
    });
  });
