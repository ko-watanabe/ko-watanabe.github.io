import { slides, dimensions } from './slides.js';

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
let labsDialog;

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
  section.setAttribute('aria-label', `Slide ${index + 1}: ${slide.title}`);
  section.setAttribute('aria-hidden', 'true');
  section.dataset.slide = index + 1;
  // All markup is authored locally in slides.js; no remote content is interpolated.
  section.innerHTML = `<header class="slide-header"><span>Korea University / 28 October 2026</span><span>${slide.section}</span></header><div class="slide-content" tabindex="-1">${slide.html}</div><footer class="slide-footer"><span>Ko Watanabe · DFKI</span><span class="page">${String(index + 1).padStart(2, '0')} / ${slides.length}</span></footer>`;
  $$('.reveal', section).forEach((element, i) => element.style.setProperty('--i', String(Math.min(i, 9))));
  stage.append(section);

  const button = document.createElement('button');
  button.innerHTML = `<span>${String(index + 1).padStart(2, '0')}</span><span>${slide.title}</span>`;
  button.addEventListener('click', () => { outline.close(); goTo(index); });
  $('#outline-list').append(button);
});
const sections = $$('.slide', stage);
const researchIndex = sections.findIndex((section) => section.classList.contains('research-overview'));
const researchSection = sections[researchIndex];
const researchAreas = researchSection ? $$('.research-area', researchSection) : [];
const researchLastStep = researchAreas.length - 1;
let researchStep = -1;
const evidenceSection = sections.find((section) => section.classList.contains('trust-evidence'));
const evidenceSteps = evidenceSection ? $$('.flow-step', evidenceSection) : [];
const evidenceDuration = 1900;
let evidenceTimer = null;
let evidenceAnimation = null;
let evidenceStep = -1;
let evidencePaused = false;
let evidencePrinting = false;
let evidenceToggle;

if (evidenceSteps.length) {
  evidenceSteps.forEach((step) => {
    const progress = document.createElement('span');
    progress.className = 'flow-loop-progress';
    progress.setAttribute('aria-hidden', 'true');
    step.append(progress);
  });
  evidenceToggle = document.createElement('button');
  evidenceToggle.type = 'button';
  evidenceToggle.className = 'flow-loop-toggle text-button';
  evidenceToggle.hidden = motionDisabled;
  evidenceToggle.textContent = 'Pause animation';
  evidenceToggle.addEventListener('click', () => {
    evidencePaused = !evidencePaused;
    syncEvidenceLoop();
  });
  $('.flow', evidenceSection).append(evidenceToggle);
}

function stopEvidenceLoop(reset = false) {
  clearTimeout(evidenceTimer);
  evidenceTimer = null;
  evidenceAnimation?.cancel();
  evidenceAnimation = null;
  if (reset) {
    evidenceStep = -1;
    evidenceSteps.forEach((step) => step.classList.remove('is-flow-active', 'is-flow-complete'));
  }
}

function canPlayEvidenceLoop() {
  return evidenceSteps.length > 0 && sections[current] === evidenceSection
    && !motionDisabled && !evidencePaused && !evidencePrinting
    && !document.hidden && !$('dialog[open]');
}

function playEvidenceStep(index) {
  evidenceTimer = null;
  if (!canPlayEvidenceLoop()) { stopEvidenceLoop(); return; }
  evidenceStep = index;
  evidenceAnimation?.cancel();
  evidenceSteps.forEach((step, i) => {
    step.classList.toggle('is-flow-active', i === index);
    step.classList.toggle('is-flow-complete', i < index);
  });
  evidenceAnimation = $('.flow-loop-progress', evidenceSteps[index]).animate(
    [{transform:'scaleX(0)'}, {transform:'scaleX(1)'}],
    {duration:evidenceDuration, easing:'linear', fill:'forwards'}
  );
  evidenceTimer = setTimeout(() => playEvidenceStep((index + 1) % evidenceSteps.length), evidenceDuration);
}

function syncEvidenceLoop() {
  if (evidenceToggle) {
    evidenceToggle.hidden = motionDisabled;
    evidenceToggle.textContent = evidencePaused ? 'Resume animation' : 'Pause animation';
  }
  if (!canPlayEvidenceLoop()) { stopEvidenceLoop(motionDisabled); return; }
  if (evidenceTimer !== null) return;
  if (evidenceStep < 0) {
    // Let the slide's entrance animation finish before the first cycle.
    evidenceTimer = setTimeout(() => playEvidenceStep(0), 1400);
  } else playEvidenceStep(evidenceStep);
}
const dimensionIndex = sections.findIndex((section) => $('.dimension-list', section));
const dimensionSection = sections[dimensionIndex];
const dimensionButtons = dimensionSection ? $$('[data-dimension]', dimensionSection) : [];
let dimensionStep = -1;
let dimensionAnimation;

function updateNavigation() {
  const onResearch = current === researchIndex && researchAreas.length > 0;
  const onDimensions = current === dimensionIndex && dimensionButtons.length > 0;
  const previous = $('#previous-button');
  const next = $('#next-button');
  previous.disabled = current === 0;
  next.disabled = current === slides.length - 1;
  const previousLabel = onDimensions && dimensionStep >= 0
    ? (dimensionStep === 0 ? 'Return to all dimensions' : 'Previous dimension')
    : onResearch && researchStep >= 0
    ? (researchStep === 0 ? 'Return to research overview' : 'Previous research area')
    : 'Previous slide';
  const nextLabel = onDimensions && dimensionStep < dimensionButtons.length - 1
    ? (dimensionStep < 0 ? 'First dimension' : 'Next dimension')
    : onResearch && researchStep < researchAreas.length - 1
    ? 'Next research area'
    : 'Next slide';
  previous.setAttribute('aria-label', previousLabel);
  previous.title = `${previousLabel} (←)`;
  next.setAttribute('aria-label', nextLabel);
  next.title = `${nextLabel} (→ or Space)`;
}

function setResearchStep(step, announce = true) {
  if (!researchSection || !researchAreas.length) return;
  researchStep = Math.max(-1, Math.min(researchLastStep, step));
  const focused = researchStep >= 0;
  researchSection.classList.toggle('research-focused', focused);
  researchAreas.forEach((area, index) => {
    area.classList.toggle('is-spotlight', focused && index === researchStep);
    if (focused && index !== researchStep) area.setAttribute('aria-hidden', 'true');
    else area.removeAttribute('aria-hidden');
  });
  $('.research-step-controls', researchSection).hidden = !focused;
  $('.research-step-counter', researchSection).textContent = focused ? `Area ${researchStep + 1} of ${researchAreas.length}` : '';
  if (announce && current === researchIndex) {
    const title = focused
      ? $('h3', researchAreas[researchStep]).textContent.replace(/\s+/g, ' ').replace(/&/g, ' & ').trim()
      : 'All research areas';
    $('#announcement').textContent = `Slide ${current + 1} of ${slides.length}. ${focused ? `Area ${researchStep + 1} of ${researchAreas.length}. ` : ''}${title}`;
  }
  updateNavigation();
}

function setDimensionStep(step, announce = true) {
  if (!dimensionSection || !dimensionButtons.length) return;
  dimensionStep = Math.max(-1, Math.min(dimensionButtons.length - 1, step));
  const selected = dimensionButtons[dimensionStep];
  const [title, description] = selected ? dimensions[dimensionStep] : [
    'What evidence do we need?',
    'Seven connected dimensions guide evaluation of the system, its use and its effects on people and society.',
  ];
  const keyTerm = selected ? selected.dataset.keyTerm : 'Trustworthy AI';
  dimensionButtons.forEach((button, index) => button.setAttribute('aria-pressed', String(index === dimensionStep)));
  $('#dimension-key-term', dimensionSection).textContent = keyTerm;
  $('#dimension-title', dimensionSection).textContent = title;
  $('#dimension-description', dimensionSection).textContent = description;
  $('.dimension-step-controls', dimensionSection).hidden = !selected;
  $('.dimension-step-counter', dimensionSection).textContent = selected
    ? `Dimension ${String(dimensionStep + 1).padStart(2, '0')} / ${dimensionButtons.length}` : '';
  dimensionAnimation?.cancel();
  if (announce && current === dimensionIndex) {
    $('#announcement').textContent = `Slide ${current + 1} of ${slides.length}. ${selected
      ? `Dimension ${dimensionStep + 1} of ${dimensionButtons.length}. ${keyTerm}` : 'All seven dimensions of trustworthiness'}`;
    if (!motionDisabled) dimensionAnimation = $('.dimension-detail', dimensionSection).animate(
      [{ opacity: .3, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 300 },
    );
  }
  updateNavigation();
}

function advance(direction) {
  if (current === dimensionIndex && dimensionButtons.length) {
    if (direction > 0 && dimensionStep < dimensionButtons.length - 1) {
      setDimensionStep(dimensionStep + 1);
      return;
    }
    if (direction < 0 && dimensionStep >= 0) {
      setDimensionStep(dimensionStep - 1);
      return;
    }
  }
  if (current === researchIndex && researchAreas.length) {
    if (direction > 0 && researchStep < researchLastStep) {
      setResearchStep(researchStep + 1);
      return;
    }
    if (direction < 0 && researchStep >= 0) {
      setResearchStep(researchStep - 1);
      return;
    }
  }
  goTo(current + direction);
}

function stopMedia(section) {
  $$('video', section).forEach((video) => video.pause());
  $$('.media-element, .video-fallback', section).forEach((element) => element.remove());
  $$('.video-cover', section).forEach((cover) => { cover.hidden = false; });
}

function replay() {
  const section = sections[current];
  if (motionDisabled) return;
  if (section === evidenceSection) {
    evidencePaused = false;
    stopEvidenceLoop(true);
    syncEvidenceLoop();
  }
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
  // Absolute navigation (contents, hashes, Home/End) always opens the overview.
  if (next === current) {
    if (researchStep >= 0) setResearchStep(-1);
    syncEvidenceLoop();
    if (dimensionStep >= 0) setDimensionStep(-1);
    return;
  }
  if (researchStep >= 0) setResearchStep(-1, false);
  if (dimensionStep >= 0) setDimensionStep(-1, false);
  if (current >= 0) {
    const previous = sections[current];
    if (previous === evidenceSection) stopEvidenceLoop(true);
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
  $('#announcement').textContent = `Slide ${current + 1} of ${slides.length}. ${slides[current].title}`;
  document.title = `${current + 1}. ${slides[current].title} · Ko Watanabe`;
  $$('#outline-list button').forEach((button, i) => button.setAttribute('aria-current', String(i === current)));
  if (updateHash) history.pushState(null, '', `#${current + 1}`);
  updateNotes();
  syncEvidenceLoop();
}

window.addEventListener('hashchange', () => goTo(readHash(), false));
window.addEventListener('popstate', () => goTo(readHash(), false));
$('#previous-button').addEventListener('click', () => advance(-1));
$('#next-button').addEventListener('click', () => advance(1));
if (researchSection) $('[data-research-overview]', researchSection).addEventListener('click', () => {
  setResearchStep(-1);
  $('#next-button').focus();
});
if (dimensionSection) $('[data-dimension-overview]', dimensionSection).addEventListener('click', () => {
  setDimensionStep(-1);
  $('#next-button').focus();
});
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
  syncEvidenceLoop();
}
document.addEventListener('close', () => syncEvidenceLoop(), true);
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
  $('#notes-timing').textContent = `Slide ${current + 1} · ${slide.minutes} min · planned ${start}:00–${start + slide.minutes}:00`;
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
    li.textContent = 'Talk framing by the speaker.';
    list.append(li);
  }
}

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
    else if (document.documentElement.webkitRequestFullscreen) document.documentElement.webkitRequestFullscreen();
    else notify('Use your browser’s full-screen command. This browser does not offer the Fullscreen API.');
  } catch {
    notify('Full screen was unavailable. Try the browser’s full-screen command.');
  }
}
$('#fullscreen-button').addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', () => {
  $('#fullscreen-button').textContent = document.fullscreenElement ? 'Exit full screen' : 'Full screen';
  scaleStage();
});

function makeLocalVideo(frame, src, captions) {
  $('.media-element', frame)?.remove();
  $('.video-fallback', frame)?.remove();
  const video = document.createElement('video');
  video.className = 'media-element';
  video.controls = true;
  video.playsInline = true;
  video.preload = 'metadata';
  video.src = src;
  video.setAttribute('aria-label', slides[current].title);
  if (frame.dataset.poster) video.poster = frame.dataset.poster;
  if (captions) {
    const track = document.createElement('track');
    track.kind = 'captions';
    track.srclang = 'en';
    track.label = 'English';
    track.src = captions;
    video.append(track);
  }
  video.addEventListener('error', () => notify('The video could not be played. Use the direct video or YouTube link below the frame.'));
  frame.prepend(video);
  $('.video-cover', frame).hidden = true;
  video.play().catch(() => { /* Native controls remain available if autoplay is blocked. */ });
}

stage.addEventListener('click', (event) => {
  const play = event.target.closest('[data-play]');
  if (play) {
    const frame = play.closest('.video-frame');
    if (frame.dataset.video) makeLocalVideo(frame, frame.dataset.video, frame.dataset.captions);
    else if (frame.dataset.youtube) {
      const iframe = document.createElement('iframe');
      iframe.className = 'media-element';
      iframe.title = slides[current].title;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.src = `https://www.youtube-nocookie.com/embed/${frame.dataset.youtube}?autoplay=1&rel=0&playsinline=1&cc_lang_pref=en&cc_load_policy=1`;
      frame.prepend(iframe);
      play.hidden = true;
      const fallback = document.createElement('a');
      fallback.className = 'video-fallback';
      fallback.href = `https://www.youtube.com/watch?v=${frame.dataset.youtube}`;
      fallback.target = '_blank';
      fallback.rel = 'noopener';
      fallback.textContent = 'Playback unavailable? Open YouTube ↗';
      frame.append(fallback);
    }
  }
  if (event.target.closest('[data-local-backup]')) {
    const frame = $('.video-frame', sections[current]);
    makeLocalVideo(frame, frame.dataset.backup, frame.dataset.backup.replace('.mp4', '.vtt'));
  }
  const dimension = event.target.closest('[data-dimension]');
  if (dimension) {
    setDimensionStep(Number(dimension.dataset.dimension));
  }
  if (event.target.closest('[data-open-labs]')) openLabs();
});

function openLabs() {
  if (!labsDialog) {
    labsDialog = document.createElement('dialog');
    labsDialog.setAttribute('aria-label', 'DFKI Living Labs film');
    labsDialog.innerHTML = '<div class="dialog-top"><h2>DFKI Living Labs</h2><button class="close-dialog" aria-label="Close video">✕</button></div><video src="assets/dfki-living-labs.mp4" controls playsinline preload="none" style="width:100%;max-height:65vh;background:#10281e"></video>';
    document.body.append(labsDialog);
    $('.close-dialog', labsDialog).addEventListener('click', () => labsDialog.close());
    labsDialog.addEventListener('close', () => $('video', labsDialog).pause());
  }
  labsDialog.showModal();
  $('video', labsDialog).play().catch(() => {});
}

function printDeck() {
  evidencePrinting = true;
  stopEvidenceLoop(true);
  [outline, notes, labsDialog].filter(Boolean).forEach((dialog) => { if (dialog.open) dialog.close(); });
  sections.forEach(stopMedia);
  window.print();
}
$('#print-button').addEventListener('click', printDeck);
window.addEventListener('beforeprint', () => {
  evidencePrinting = true;
  stopEvidenceLoop(true);
  sections.forEach(stopMedia);
});
window.addEventListener('afterprint', () => {
  evidencePrinting = false;
  syncEvidenceLoop();
});

function timerSeconds() { return elapsed + (timerStarted === null ? 0 : (performance.now() - timerStarted) / 1000); }
function updateClock() {
  const seconds = Math.floor(timerSeconds());
  $('#talk-clock').textContent = `${String(Math.floor(seconds / 60)).padStart(2,'0')}:${String(seconds % 60).padStart(2,'0')} / 60:00`;
  $('#timer-button').textContent = timerStarted === null ? (elapsed ? 'Resume timer' : 'Start timer') : 'Pause timer';
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
  if (key === 'n' && !outline.open && !labsDialog?.open) { event.preventDefault(); toggleDialog(notes); return; }
  if (key === 'o' && !notes.open && !labsDialog?.open) { event.preventDefault(); toggleDialog(outline); return; }
  if ($('dialog[open]')) return;
  if (event.target.closest('video,iframe')) return;
  // Preserve native keyboard activation for focused controls.
  if (key === ' ' && event.target.closest('button,a,[role="button"]')) return;
  if (['arrowright','arrowdown','pagedown',' '].includes(key)) { event.preventDefault(); advance(1); }
  else if (['arrowleft','arrowup','pageup'].includes(key)) { event.preventDefault(); advance(-1); }
  else if (key === 'home') { event.preventDefault(); goTo(0); }
  else if (key === 'end') { event.preventDefault(); goTo(slides.length - 1); }
  else if (key === 'f') { event.preventDefault(); toggleFullscreen(); }
  else if (key === 'r') replay();
  else if (key === 'p') { event.preventDefault(); printDeck(); }
  else if (key === 't') toggleTimer();
});
viewport.addEventListener('pointerdown', (event) => {
  if (!event.isPrimary || event.target.closest('button,a,video,iframe')) return;
  pointerStart = {x:event.clientX, y:event.clientY};
});
viewport.addEventListener('pointerup', (event) => {
  if (!pointerStart) return;
  const dx = event.clientX - pointerStart.x;
  const dy = event.clientY - pointerStart.y;
  pointerStart = null;
  if (Math.abs(dx) > 70 && Math.abs(dy) < 65) advance(dx < 0 ? 1 : -1);
});
viewport.addEventListener('pointercancel', () => { pointerStart = null; });
document.addEventListener('visibilitychange', () => {
  if (document.hidden) $$('video').forEach((video) => video.pause());
  syncEvidenceLoop();
});
reducedMotion.addEventListener('change', () => {
  motionDisabled = reducedMotion.matches || motionRequestedOff;
  document.documentElement.classList.toggle('reduce-motion', motionDisabled);
  syncEvidenceLoop();
});

goTo(readHash(), false);
updateClock();
