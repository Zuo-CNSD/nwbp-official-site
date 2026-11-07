const previews = {
  search: {
    image: 'assets/search-current.png',
    alt: 'NWBP 正式版音乐搜索界面截图',
    count: '01 — 02',
    description: '完整窗口实图：搜索网易云音乐中的曲目，直接建立播放队列。',
    theme: 'dark',
  },
  settings: {
    image: 'assets/settings-current.png',
    alt: 'NWBP 正式版浅色外观设置界面截图',
    count: '02 — 02',
    description: '完整窗口实图：浅色与深色、显示方式与背景细节，在同一个地方轻松调整。',
    theme: 'light',
  },
};

const tabs = [...document.querySelectorAll('.preview-tab')];
const panel = document.querySelector('#preview-panel');
const image = document.querySelector('#preview-image');
const counter = document.querySelector('#preview-counter');
const description = document.querySelector('#preview-description');
const fullImageLink = document.querySelector('#preview-full');
let previewTimer;

function selectPreview(name, focus = false) {
  const next = previews[name];
  if (!next) return;
  clearTimeout(previewTimer);
  image.classList.add('is-changing');
  previewTimer = setTimeout(() => {
    image.src = next.image;
    image.alt = next.alt;
    panel.dataset.theme = next.theme;
    counter.textContent = next.count;
    description.textContent = next.description;
    fullImageLink.href = next.image;
    panel.setAttribute('aria-labelledby', `tab-${name}`);
    tabs.forEach((tab) => {
      const active = tab.dataset.preview === name;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && focus) tab.focus();
    });
    image.classList.remove('is-changing');
  }, 140);
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectPreview(tab.dataset.preview));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    selectPreview(tabs[nextIndex].dataset.preview, true);
  });
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px 30px 0px' });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}
