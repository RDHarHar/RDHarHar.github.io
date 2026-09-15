const concepts = {
  editorial: { name: 'Editorial', description: 'Warm paper, olive accents, and generous serif type. A thoughtful home for projects and future writing.' },
  workbench: { name: 'Workbench', description: 'The selected direction, refined: compact spacing, a streamlined project row, and four color themes in Settings.' },
  playground: { name: 'Playground', description: 'Cobalt blue, citrus, and oversized lettering. A lively, expressive home with a playful project shelf.' }
};
let preview = document.querySelector('#preview');
const frame = document.querySelector('#browser-frame');
function render() {
  const params = new URLSearchParams(location.search);
  const requestedStyle = params.get('style');
  const style = Object.hasOwn(concepts, requestedStyle) ? requestedStyle : 'editorial';
  const mobile = params.get('size') === 'mobile';
  const concept = concepts[style];
  if (preview.getAttribute('src') !== `${style}.html`) {
    // A fresh frame avoids adding a second history entry for the embedded page.
    const replacement = preview.cloneNode(false);
    replacement.src = `${style}.html`;
    preview.replaceWith(replacement);
    preview = replacement;
  }
  preview.title = `${concept.name} homepage concept`;
  document.querySelector('#description').textContent = concept.description;
  document.querySelector('#preview-label').textContent = `ryan / ${style}`;
  document.querySelector('#open-concept').href = `${style}.html`;
  frame.classList.toggle('mobile', mobile);
  document.querySelectorAll('[data-style]').forEach(link => {
    if (link.dataset.style === style) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
    link.href = `?style=${link.dataset.style}${mobile ? '&size=mobile' : ''}`;
  });
  document.querySelectorAll('[data-size]').forEach(button => {
    button.setAttribute('aria-pressed', String((button.dataset.size === 'mobile') === mobile));
  });
}
document.querySelectorAll('[data-style]').forEach(link => link.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
  event.preventDefault();
  history.pushState(null, '', link.href);
  render();
}));
document.querySelectorAll('[data-size]').forEach(button => button.addEventListener('click', () => {
  const url = new URL(location.href);
  url.searchParams.set('size', button.dataset.size);
  history.pushState(null, '', url);
  render();
}));
window.addEventListener('popstate', render);
render();
