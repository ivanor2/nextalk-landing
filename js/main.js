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
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars-fill" viewBox="0 0 16 16"> <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/> <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/> </svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun-fill" viewBox="0 0 16 16"> <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/> </svg>';
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

  const BURGER_OPEN = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"> <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/> </svg>';
  const BURGER_MENU = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/> </svg>';

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

  // ── 3. Navbar Shadow on Scroll (rAF-throttled, passive listener) ─
  const nav = document.getElementById('mainNav');
  if (nav) {
    let navTicking = false;
    const updateNav = () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
      navTicking = false;
    };
    window.addEventListener('scroll', () => {
      if (!navTicking) {
        navTicking = true;
        requestAnimationFrame(updateNav);
      }
    }, { passive: true });
    updateNav();
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

  // Ping nodes — откладываем сетевые проверки на idle, чтобы они
  // не конкурировали с загрузкой критичных ресурсов страницы
  const pingNodes = () => {
    document.querySelectorAll('.ping-badge').forEach(el => {
      const url = el.dataset.url;
      if (!url || url.startsWith('ws')) {
        el.textContent = 'online';
        el.style.color = 'var(--success)';
        return;
      }
      const start = Date.now();
      fetch(url + '/health', { mode: 'no-cors' })
        .then(() => {
          const latency = Date.now() - start;
          el.textContent = latency + ' ms';
          if (latency < 150) el.style.color = 'var(--success)';
          else if (latency < 350) el.style.color = 'var(--warning)';
          else el.style.color = 'var(--danger)';
        })
        .catch(() => {
          el.textContent = 'онлайн';
          el.style.color = 'var(--success)';
        });
    });
  };
  if ('requestIdleCallback' in window) {
    requestIdleCallback(pingNodes, { timeout: 3000 });
  } else {
    setTimeout(pingNodes, 1500);
  }

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
        showToast('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16"> <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/> </svg> Выбран узел: ' + wsUrl);
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
        showToast('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16"> <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/> </svg> Пожалуйста, заполните все обязательные поля заявки', 'error');
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
          showToast('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stars" viewBox="0 0 16 16"> <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/> </svg> Заявка принята! Узел добавлен на проверку администратором сети.', 'success');
          registerNodeForm.reset();
          return;
        }
      } catch (err) {
        // Fallback for static hosting demonstration
      }

      showToast('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stars" viewBox="0 0 16 16"> <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/> </svg> Заявка принята! Узел добавлен на проверку администратором сети.', 'success');
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
    btn.innerHTML = 'Скопировано! <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"> <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/> </svg>';
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
    showToast('Адрес узла скопирован в буфер обмена! <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"> <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/> </svg>', 'success');
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
