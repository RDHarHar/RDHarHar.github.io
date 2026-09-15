(() => {
  'use strict';
  const themes = { graphite: 'Graphite', ocean: 'Ocean', violet: 'Violet', paper: 'Paper' };
  const storageKey = 'ryan-harwick-theme';
  const isTheme = value => Object.hasOwn(themes, value);
  let current = 'graphite';
  try {
    const saved = localStorage.getItem(storageKey);
    if (isTheme(saved)) current = saved;
  } catch { /* Theme switching still works when storage is unavailable. */ }
  // Restore the selected palette before the stylesheet and first paint.
  document.documentElement.dataset.theme = current;
  document.addEventListener('DOMContentLoaded', () => {
    const status = document.querySelector('#theme-status');
    const radios = [...document.querySelectorAll('input[name="theme"]')];
    function applyTheme(theme, persist = true) {
      current = isTheme(theme) ? theme : 'graphite';
      document.documentElement.dataset.theme = current;
      radios.forEach(radio => { radio.checked = radio.value === current; });
      let saved = false;
      if (persist) {
        try { localStorage.setItem(storageKey, current); saved = true; } catch { /* Keep the in-session choice. */ }
      }
      if (status) status.textContent = `${themes[current]} selected.${persist ? (saved ? ' Saved for your next visit.' : ' Browser storage is unavailable; applied for this visit.') : ''}`;
    }
    radios.forEach(radio => radio.addEventListener('change', () => applyTheme(radio.value)));
    document.querySelector('#reset-theme')?.addEventListener('click', () => applyTheme('graphite'));
    document.querySelector('#theme-form')?.addEventListener('submit', event => event.preventDefault());
    applyTheme(current, false);
    const tabs = [...document.querySelectorAll('[role="tab"]')];
    function showTab(id, focus = false) {
      tabs.forEach(tab => {
        const active = tab.id === `${id}-tab`;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
        if (active && focus) tab.focus();
      });
      const selected = tabs.find(tab => tab.id === `${id}-tab`);
      if (selected) document.title = `Ryan Harwick — ${selected.textContent.trim()}`;
    }
    function selectTab(tab) {
      const id = tab.id.replace('-tab', '');
      if (location.hash !== `#${id}`) location.hash = id;
      showTab(id, true);
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectTab(tab));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) { event.preventDefault(); selectTab(tabs[next]); }
      });
    });
    const restoreTab = () => {
      if (!tabs.length) return;
      const id = location.hash.slice(1);
      if (id === 'main') return; // A skip link must not change the open section.
      showTab(tabs.some(tab => tab.id === `${id}-tab`) ? id : 'home');
    };
    window.addEventListener('hashchange', restoreTab);
    window.addEventListener('storage', event => {
      if (event.key === storageKey || event.key === null) applyTheme(isTheme(event.newValue) ? event.newValue : 'graphite', false);
    });
    restoreTab();
  });
})();
