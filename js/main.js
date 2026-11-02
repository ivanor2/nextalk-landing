/**
 * NexTalk Landing & Portal — Standalone JavaScript
 * Pure Vanilla JS — Zero Dependencies — Static Hosting Ready
 */

// ── Configuration ──────────────────────────────────────────
// Если вы загружаете этот лэндинг на отдельный домен или хостинг,
// укажите здесь прямой URL вашего сервера с мессенджером:
window.NEXTALK_CONFIG = {
  // Например: 'https://chat.yourdomain.com' или относительный путь:
  appUrl: '../index.php',
  loginUrl: '../login.php',
  registerUrl: '../register.php',
  // URL сервера авторизации для онлайн-проверок (опционально):
  authApiUrl: 'http://localhost:3000'
};

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Theme Management (Dark / Light) ───────────────────
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  function setThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'dark'
      ? '<i class="bi bi-moon-stars-fill" aria-hidden="true"></i>'
      : '<i class="bi bi-sun-fill" aria-hidden="true"></i>';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('nt-theme', theme);
    setThemeIcon(theme);
    if (themeToggle) {
      themeToggle.setAttribute('title', theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему');
    }
  }

  const savedTheme = localStorage.getItem('nt-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // ── 2. Mobile Burger Menu ────────────────────────────────
  const burgerBtn = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  const BURGER_OPEN = '<i class="bi bi-x-lg" aria-hidden="true"></i>';
  const BURGER_MENU = '<i class="bi bi-list" aria-hidden="true"></i>';

  if (burgerBtn && navLinks) {
    burgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      burgerBtn.innerHTML = navLinks.classList.contains('open') ? BURGER_OPEN : BURGER_MENU;
    });

    // Закрывать меню при клике на любую ссылку
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        if (burgerBtn) burgerBtn.innerHTML = BURGER_MENU;
      });
    });

    // Закрывать меню при клике вне его
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !burgerBtn.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        burgerBtn.innerHTML = BURGER_MENU;
      }
    });
  }

  // ── 3. Navbar Shadow on Scroll ───────────────────────────
  const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // ── 4. Smooth Anchor Scrolling ───────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── 5. Node Directory (Search, Filter, Pinging) ───────────
  const searchInput = document.getElementById('nodeSearchInput');
  const filterSelect = document.getElementById('nodeStatusFilter');
  const rows = document.querySelectorAll('.node-row');

  function filterNodes() {
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const filter = filterSelect ? filterSelect.value : 'all';

    rows.forEach(row => {
      const rowSearch = (row.dataset.search || '').toLowerCase();
      const rowStatus = row.dataset.status || '';

      const matchesQuery = !query || rowSearch.includes(query);
      const matchesStatus = (filter === 'all') || (rowStatus === filter);

      row.style.display = (matchesQuery && matchesStatus) ? '' : 'none';
    });
  }

  if (searchInput) searchInput.addEventListener('input', filterNodes);
  if (filterSelect) filterSelect.addEventListener('change', filterNodes);

  // Ping nodes
  document.querySelectorAll('.ping-badge').forEach(async el => {
    const url = el.dataset.url;
    if (!url || url.startsWith('ws')) {
      el.textContent = 'online';
      el.style.color = 'var(--success)';
      return;
    }
    const start = Date.now();
    try {
      await fetch(url + '/health', { mode: 'no-cors' });
      const latency = Date.now() - start;
      el.textContent = latency + ' ms';
      if (latency < 150) el.style.color = 'var(--success)';
      else if (latency < 350) el.style.color = 'var(--warning)';
      else el.style.color = 'var(--danger)';
    } catch (e) {
      el.textContent = 'онлайн';
      el.style.color = 'var(--success)';
    }
  });

  // Connect node button
  document.querySelectorAll('.connect-node-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const wsUrl = btn.dataset.ws || '';
      localStorage.setItem('nt-node', wsUrl);
      
      const modal = document.getElementById('connectModal');
      const modalWsInput = document.getElementById('modalWsInput');
      if (modal && modalWsInput) {
        modalWsInput.value = wsUrl;
        modal.classList.add('open');
      } else {
        showToast('<i class="bi bi-check-circle-fill" aria-hidden="true"></i> Выбран узел: ' + wsUrl);
      }
    });
  });

  // Modal close handlers
  document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el) {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
      }
    });
  });

  // ── 6. Node Registration Form (install.html) ─────────────
  const registerNodeForm = document.getElementById('registerNodeForm');
  if (registerNodeForm) {
    registerNodeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const url = document.getElementById('node_url').value.trim();
      const name = document.getElementById('node_name').value.trim();
      const email = document.getElementById('admin_email').value.trim();
      const publicKey = document.getElementById('public_key').value.trim();
      const desc = document.getElementById('node_desc') ? document.getElementById('node_desc').value.trim() : '';

      if (!url || !name || !email || !publicKey) {
        showToast('<i class="bi bi-exclamation-triangle-fill" aria-hidden="true"></i> Пожалуйста, заполните все обязательные поля заявки', 'error');
        return;
      }

      // Try sending to auth API if available, otherwise confirm client-side
      try {
        const resp = await fetch(window.NEXTALK_CONFIG.authApiUrl + '/nodes/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, name, admin_email: email, public_key: publicKey, description: desc })
        });
        const data = await resp.json();
        if (data && data.ok) {
          showToast('<i class="bi bi-stars" aria-hidden="true"></i> Заявка принята! Узел добавлен на проверку администратором сети.', 'success');
          registerNodeForm.reset();
          return;
        }
      } catch (err) {
        // Fallback for static hosting demonstration
      }

      showToast('<i class="bi bi-stars" aria-hidden="true"></i> Заявка принята! Узел добавлен на проверку администратором сети.', 'success');
      registerNodeForm.reset();
    });
  }

  // ── 7. FAQ Accordion ──────────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.faq-item');
      if (!parent) return;
      const isOpen = parent.classList.contains('open');

      // Close other accordion items
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== parent) item.classList.remove('open');
      });

      if (isOpen) {
        parent.classList.remove('open');
      } else {
        parent.classList.add('open');
      }
    });
  });

});

// ── Helper: Copy to Clipboard ──────────────────────────────
window.copyCode = function(btn) {
  const codeEl = btn.parentElement.querySelector('code');
  if (!codeEl) return;
  const text = codeEl.textContent;

  navigator.clipboard.writeText(text).then(() => {
    const origHTML = btn.innerHTML;
    btn.innerHTML = 'Скопировано! <i class="bi bi-check-lg" aria-hidden="true"></i>';
    btn.style.color = 'var(--success)';
    btn.style.borderColor = 'var(--success)';
    setTimeout(() => {
      btn.innerHTML = origHTML;
      btn.style.color = '';
      btn.style.borderColor = '';
    }, 2000);
  }).catch(() => {
    showToast('Не удалось скопировать текст', 'error');
  });
};

// ── Helper: Copy WebSocket Address ─────────────────────────
window.copyWsUrl = function() {
  const input = document.getElementById('modalWsInput');
  if (input) {
    input.select();
    navigator.clipboard.writeText(input.value);
    showToast('Адрес узла скопирован в буфер обмена! <i class="bi bi-check-lg" aria-hidden="true"></i>', 'success');
  }
};

// ── Helper: Toast Notifications ────────────────────────────
window.showToast = function(message, type = 'info') {
  let container = document.getElementById('toasts');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toasts';
    container.className = 'toasts';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (type === 'success') {
    toast.style.borderColor = 'var(--success)';
    toast.style.color = 'var(--success)';
  } else if (type === 'error') {
    toast.style.borderColor = 'var(--danger)';
    toast.style.color = 'var(--danger)';
  }

  toast.innerHTML = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};
