import { slides } from './slides.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const stage = $('#stage');
const viewport = $('#viewport');
const outline = $('#outline-dialog');
const notes = $('#notes-dialog');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const motionRequestedOff = new URLSearchParams(location.search).get('motion') === 'off';
let motionDisabled = reducedMotion.matches || motionRequestedOff;
document.documentElement.classList.toggle('reduce-motion', motionDisabled);
let current = -1;
let noticeTimeout;
let pointerStart;
let elapsed = 0;
let timerStarted = null;
const TALK_MINUTES = 30;

function notify(message) {
  clearTimeout(noticeTimeout);
  $('#notice').textContent = message;
  $('#notice').hidden = false;
  noticeTimeout = setTimeout(() => { $('#notice').hidden = true; }, 5500);
}

function scaleStage() {
  const scale = Math.min(viewport.clientWidth / 1600, viewport.clientHeight / 900);
  document.documentElement.style.setProperty('--scale', String(scale));
}
new ResizeObserver(scaleStage).observe(viewport);
window.addEventListener('resize', scaleStage);
scaleStage();

slides.forEach((slide, index) => {
  const section = document.createElement('section');
  section.className = `slide ${slide.dark ? 'dark' : ''} ${slide.className || ''} ${slide.kind === 'video' ? 'video-slide' : ''}`;
  section.setAttribute('aria-label', `スライド ${index + 1}: ${slide.title}`);
  section.setAttribute('aria-hidden', 'true');
  section.dataset.slide = index + 1;
  const frameLabel = slide.section || slide.title;
  const usePanel = !slide.dark && !['cover', 'chapter-divider', 'thanks'].includes(slide.className || '');
  section.innerHTML = `<div class="slide-blobs" aria-hidden="true"><span class="blob-tl"></span><span class="blob-r"></span><span class="blob-br"></span></div><header class="slide-header"><span class="frame-title"><span class="frame-dots" aria-hidden="true">····</span><span class="frame-bracket">[</span> ${frameLabel} <span class="frame-bracket">]</span><span class="frame-dots" aria-hidden="true">····</span></span></header><div class="slide-content" tabindex="-1">${usePanel ? `<div class="slide-panel">${slide.html}</div>` : slide.html}</div><footer class="slide-footer"><span>渡邉 洸 · DFKI · 筑波大学 Career Talk</span><span class="page">${String(index + 1).padStart(2, '0')} / ${slides.length}</span></footer>`;
  $$('.reveal', section).forEach((element, i) => element.style.setProperty('--i', String(Math.min(i, 9))));
  stage.append(section);

  const button = document.createElement('button');
  button.innerHTML = `<span>${String(index + 1).padStart(2, '0')}</span><span>${slide.title}</span>`;
  button.addEventListener('click', () => { outline.close(); goTo(index); });
  $('#outline-list').append(button);
});
const sections = $$('.slide', stage);

function updateNavigation() {
  $('#previous-button').disabled = current === 0;
  $('#next-button').disabled = current === slides.length - 1;
}

function stopMedia(section) {
  $$('video', section).forEach((video) => video.pause());
  $$('.media-element, .video-fallback', section).forEach((element) => element.remove());
  $$('.video-cover', section).forEach((cover) => { cover.hidden = false; });
}

function replay() {
  const section = sections[current];
  if (motionDisabled) return;
  section.classList.add('replaying');
  void section.offsetWidth;
  section.classList.remove('replaying');
}

function readHash() {
  const value = Number(location.hash.slice(1));
  return Number.isInteger(value) && value >= 1 && value <= slides.length ? value - 1 : 0;
}

function goTo(index, updateHash = true) {
  const next = Math.max(0, Math.min(slides.length - 1, index));
  if (next === current) return;
  if (current >= 0) {
    const previous = sections[current];
    stopMedia(previous);
    previous.classList.remove('active');
    previous.setAttribute('aria-hidden', 'true');
    $('.slide-content', previous).removeAttribute('id');
  }
  current = next;
  const section = sections[current];
  section.classList.add('active');
  section.setAttribute('aria-hidden', 'false');
  $('.slide-content', section).id = 'slide-content';
  $('#page-number').textContent = `${String(current + 1).padStart(2, '0')} / ${slides.length}`;
  $('#section-name').textContent = slides[current].section;
  updateNavigation();
  $('#progress').style.width = `${(current + 1) / slides.length * 100}%`;
  $('#announcement').textContent = `スライド ${current + 1} / ${slides.length}。${slides[current].title}`;
  document.title = `${current + 1}. ${slides[current].title} · 渡邉 洸`;
  $$('#outline-list button').forEach((button, i) => button.setAttribute('aria-current', String(i === current)));
  if (updateHash) history.pushState(null, '', `#${current + 1}`);
  updateNotes();
}

window.addEventListener('hashchange', () => goTo(readHash(), false));
window.addEventListener('popstate', () => goTo(readHash(), false));
$('#previous-button').addEventListener('click', () => goTo(current - 1));
$('#next-button').addEventListener('click', () => goTo(current + 1));
$('.skip-link').addEventListener('click', (event) => {
  event.preventDefault();
  $('#slide-content').focus();
});

function toggleDialog(dialog) {
  if (dialog.open) dialog.close();
  else {
    [outline, notes].forEach((other) => { if (other.open) other.close(); });
    dialog.showModal();
  }
}
$('#outline-button').addEventListener('click', () => toggleDialog(outline));
$('#notes-button').addEventListener('click', () => toggleDialog(notes));
$$('.close-dialog').forEach((button) => button.addEventListener('click', () => button.closest('dialog').close()));
$$('dialog').forEach((dialog) => dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const r = dialog.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
}));

function updateNotes() {
  const slide = slides[current];
  const start = slides.slice(0, current).reduce((sum, item) => sum + item.minutes, 0);
  $('#notes-timing').textContent = `スライド ${current + 1} · ${slide.minutes} 分 · 予定 ${start}:00–${start + slide.minutes}:00`;
  $('#notes-title').textContent = slide.title;
  const content = $('#notes-content');
  content.replaceChildren();
  slide.notes.forEach((paragraph) => {
    const p = document.createElement('p');
    p.textContent = paragraph;
    content.append(p);
  });
  if (slide.cue) {
    const p = document.createElement('p');
    p.className = 'cue';
    p.textContent = slide.cue;
    content.append(p);
  }
  const list = $('#notes-sources');
  list.replaceChildren();
  slide.sources.forEach(({label, url}) => {
    const li = document.createElement('li');
    if (url) {
      const a = document.createElement('a');
      a.href = url;
      a.textContent = label;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      li.append(a);
    } else li.textContent = label;
    list.append(li);
  });
  if (!slide.sources.length) {
    const li = document.createElement('li');
    li.textContent = '登壇者の経験に基づく内容です。';
    list.append(li);
  }
}

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
    else if (document.documentElement.webkitRequestFullscreen) document.documentElement.webkitRequestFullscreen();
    else notify('お使いのブラウザのフルスクリーン機能をご利用ください。');
  } catch {
    notify('フルスクリーンを開始できませんでした。ブラウザの機能をお試しください。');
  }
}
$('#fullscreen-button').addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', () => {
  $('#fullscreen-button').textContent = document.fullscreenElement ? '全画面を終了' : '全画面';
  scaleStage();
});

stage.addEventListener('click', (event) => {
  const play = event.target.closest('[data-play]');
  if (!play) return;
  const frame = play.closest('.video-frame');
  if (frame?.dataset.youtube) {
    const iframe = document.createElement('iframe');
    iframe.className = 'media-element';
    iframe.title = slides[current].title;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.src = `https://www.youtube-nocookie.com/embed/${frame.dataset.youtube}?autoplay=1&rel=0&playsinline=1`;
    frame.prepend(iframe);
    play.hidden = true;
  }
});

function printDeck() {
  [outline, notes].forEach((dialog) => { if (dialog.open) dialog.close(); });
  sections.forEach(stopMedia);
  window.print();
}
$('#print-button').addEventListener('click', printDeck);
window.addEventListener('beforeprint', () => sections.forEach(stopMedia));

function timerSeconds() { return elapsed + (timerStarted === null ? 0 : (performance.now() - timerStarted) / 1000); }
function updateClock() {
  const seconds = Math.floor(timerSeconds());
  const limit = `${String(TALK_MINUTES).padStart(2, '0')}:00`;
  $('#talk-clock').textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')} / ${limit}`;
  $('#timer-button').textContent = timerStarted === null ? (elapsed ? 'タイマー再開' : 'タイマー開始') : 'タイマー一時停止';
}
function toggleTimer() {
  if (timerStarted === null) timerStarted = performance.now();
  else { elapsed = timerSeconds(); timerStarted = null; }
  updateClock();
}
$('#timer-button').addEventListener('click', toggleTimer);
$('#reset-timer').addEventListener('click', () => { elapsed = 0; timerStarted = null; updateClock(); });
setInterval(updateClock, 1000);

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey || event.metaKey || event.altKey || /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName)) return;
  const key = event.key.toLowerCase();
  if (key === 'n' && !outline.open) { event.preventDefault(); toggleDialog(notes); return; }
  if (key === 'o' && !notes.open) { event.preventDefault(); toggleDialog(outline); return; }
  if ($('dialog[open]')) return;
  if (event.target.closest('video,iframe')) return;
  if (key === ' ' && event.target.closest('button,a,[role="button"]')) return;
  if (['arrowright', 'arrowdown', 'pagedown', ' '].includes(key)) { event.preventDefault(); goTo(current + 1); }
  else if (['arrowleft', 'arrowup', 'pageup'].includes(key)) { event.preventDefault(); goTo(current - 1); }
  else if (key === 'home') { event.preventDefault(); goTo(0); }
  else if (key === 'end') { event.preventDefault(); goTo(slides.length - 1); }
  else if (key === 'f') { event.preventDefault(); toggleFullscreen(); }
  else if (key === 'r') replay();
  else if (key === 'p') { event.preventDefault(); printDeck(); }
  else if (key === 't') toggleTimer();
});
viewport.addEventListener('pointerdown', (event) => {
  if (!event.isPrimary || event.target.closest('button,a,video,iframe')) return;
  pointerStart = { x: event.clientX, y: event.clientY };
});
viewport.addEventListener('pointerup', (event) => {
  if (!pointerStart) return;
  const dx = event.clientX - pointerStart.x;
  const dy = event.clientY - pointerStart.y;
  pointerStart = null;
  if (Math.abs(dx) > 70 && Math.abs(dy) < 65) goTo(current + (dx < 0 ? 1 : -1));
});
viewport.addEventListener('pointercancel', () => { pointerStart = null; });
document.addEventListener('visibilitychange', () => {
  if (document.hidden) $$('video').forEach((video) => video.pause());
});
reducedMotion.addEventListener('change', () => {
  motionDisabled = reducedMotion.matches || motionRequestedOff;
  document.documentElement.classList.toggle('reduce-motion', motionDisabled);
});

goTo(readHash(), false);
updateClock();
