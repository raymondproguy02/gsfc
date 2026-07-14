
// IMPORTS
import { APP_CONFIG } from './config.js';
import { Storage } from './utils/storage.js';
import { DOM } from './utils/dom.js';
import { LESSONS } from './lessons.js';
import { VERSES } from './verses.js';

// APP STATE
let currentLesson = 0;
let completedLessons = new Set();
let darkMode = Storage.get(APP_CONFIG.storageKeys.theme, false);

// DOM REFS
const app = document.getElementById('app');
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerLessonList = document.getElementById('drawerLessonList');
const drawerProgressText = document.getElementById('drawerProgressText');
const drawerProgressFill = document.getElementById('drawerProgressFill');
const headerProgress = document.getElementById('headerProgress');
const themeToggle = document.getElementById('themeToggle');
const drawerToggle = document.getElementById('drawerToggle');
const drawerClose = document.getElementById('drawerClose');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const dailyVerseText = document.getElementById('dailyVerseText');
const dailyVerseRef = document.getElementById('dailyVerseRef');

// THEME
function applyTheme() {
    if (darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    Storage.set(APP_CONFIG.storageKeys.theme, darkMode);
}

themeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    applyTheme();
});

// TOAST
let toastTimeout;

function showToast(msg) {
    toastMessage.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// DAILY VERSE
function displayDailyVerse() {
    if (VERSES.length === 0) {
        dailyVerseText.textContent = '"He that spared not his own Son..."';
        dailyVerseRef.textContent = '— Romans 8:32';
        return;
    }
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const index = dayOfYear % VERSES.length;
    const verse = VERSES[index];
    if (verse) {
        dailyVerseText.textContent = `"${verse.verse}"`;
        dailyVerseRef.textContent = `— ${verse.reference}`;
    }
}

// DRAWER
function openDrawer() {
    drawer.classList.add('open');
    drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderDrawer();
}

function closeDrawer() {
    drawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

drawerToggle.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
});

// RENDER DRAWER
function renderDrawer() {
    const total = LESSONS.length;
    const done = completedLessons.size;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    drawerProgressText.textContent = `${done} / ${total}`;
    drawerProgressFill.style.width = `${pct}%`;
    headerProgress.textContent = `${pct}%`;

    let html = '';
    LESSONS.forEach((lesson, idx) => {
        const isActive = idx === currentLesson;
        const isWelcome = lesson.isWelcome || false;
        const isDone = completedLessons.has(idx);
        const label = isWelcome ? 'Welcome' : `Lesson ${idx}`;
        const icon = isDone ? 'fa-check-circle' : (isActive ? 'fa-circle' : 'fa-circle-o');

        html += `
            <div class="drawer-lesson-item ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}"
                 data-index="${idx}">
                <span class="lesson-num">${isWelcome ? '✦' : idx}</span>
                <span>${label}: ${lesson.title}</span>
                <span class="lesson-status"><i class="fas ${icon}"></i></span>
            </div>
        `;
    });

    drawerLessonList.innerHTML = html;

    drawerLessonList.querySelectorAll('.drawer-lesson-item').forEach(el => {
        el.addEventListener('click', () => {
            const idx = parseInt(el.dataset.index);
            if (idx !== currentLesson) {
                goToLesson(idx);
                closeDrawer();
            } else {
                closeDrawer();
            }
        });
    });
}

// RENDER LESSON
function renderLesson(index) {
    const lesson = LESSONS[index];
    if (!lesson) return;

    currentLesson = index;

    let html = '';

    if (lesson.isWelcome) {
        html = `
            <div class="welcome-section">
                <div class="welcome-icon"><i class="fas fa-dove"></i></div>
                <h2>${lesson.title}</h2>
                ${lesson.content}
            </div>
        `;
    } else {
        const hasImage = lesson.image;
        const hasMeditation = lesson.meditation;
        const hasExercise = lesson.exercise;
        const hasPrayer = lesson.prayer;

        html = `
            <div class="lesson-card" data-lesson="${index}">
                <div class="lesson-badge">
                    <i class="fas fa-book-open"></i>
                    Lesson ${index}
                </div>
                <h2 class="lesson-title">${lesson.title}</h2>
                ${lesson.subtitle ? `<p class="lesson-subtitle">${lesson.subtitle}</p>` : ''}

                ${hasImage ? `
                    <div class="lesson-image">
                        ${hasImage.src ? 
                            `<img src="${hasImage.src}" alt="${hasImage.alt || lesson.title}" />` : 
                            `<span style="font-size:80px;">${hasImage.icon || '📖'}</span>`
                        }
                        ${hasImage.caption ? `<div class="image-caption">${hasImage.caption}</div>` : ''}
                    </div>
                ` : ''}

                <div class="lesson-content">
                    ${lesson.content}

                    ${hasMeditation ? `
                        <div class="meditation-block">
                            <div class="meditation-header">
                                <i class="fas fa-praying-hands"></i>
                                Meditation
                            </div>
                            <p><strong>“${hasMeditation.text}”</strong></p>
                            <p>${hasMeditation.instruction}</p>
                            <button class="meditation-timer" data-minutes="2">
                                <i class="fas fa-clock"></i>
                                <span>2 min</span>
                            </button>
                        </div>
                    ` : ''}

                    ${hasExercise ? `
                        <div class="exercise-block">
                            <div class="exercise-header">
                                <i class="fas fa-pen-fancy"></i>
                                Exercise
                            </div>
                            <p>${hasExercise.text}</p>
                            ${hasExercise.declaration ? `
                                <p style="font-style:italic; color:var(--text-primary); font-weight:500; padding:12px 16px; background:rgba(255,255,255,0.3); border-radius:8px;">
                                    “${hasExercise.declaration}”
                                </p>
                            ` : ''}
                            <button class="exercise-check" data-lesson="${index}">
                                <i class="fas fa-check-circle"></i>
                                <span>${completedLessons.has(index) ? 'Completed ✓' : 'Mark Complete'}</span>
                            </button>
                        </div>
                    ` : ''}

                    ${hasPrayer ? `
                        <div class="prayer-block">
                            <div class="prayer-icon"><i class="fas fa-dove"></i></div>
                            <p>${hasPrayer}</p>
                            <p style="margin-top:8px; font-size:13px; color:var(--text-light);">
                                <i class="fas fa-arrow-right"></i> Close your eyes and pray
                            </p>
                        </div>
                    ` : ''}

                    ${index === LESSONS.length - 1 ? `
                        <div class="beloved-closing">
                            <i class="fas fa-heart" style="color:var(--accent-gold);"></i>
                            Beloved. 🥰
                            <span style="font-size:14px; font-weight:400; color:var(--text-light); font-family:var(--font-body);">
                                The journey continues. Walk in the truth.
                            </span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // Read Aloud, Notes, Share (only for regular lessons)
    if (!lesson.isWelcome) {
        html += `
            <div class="read-aloud-block">
                <button class="read-aloud-btn" data-lesson="${index}">
                    <i class="fas fa-volume-up"></i>
                    <span>Read Aloud</span>
                    <span class="speed-control">
                        <i class="fas fa-tachometer-alt"></i>
                        <select class="speed-select">
                            <option value="0.7">0.7x</option>
                            <option value="0.9">0.9x</option>
                            <option value="1" selected>1x</option>
                            <option value="1.2">1.2x</option>
                            <option value="1.5">1.5x</option>
                            <option value="2">2x</option>
                        </select>
                    </span>
                </button>
                <button class="notes-toggle-btn" data-lesson="${index}">
                    <i class="fas fa-sticky-note"></i>
                    <span>Notes</span>
                    <span class="notes-badge" style="display:none; background:var(--accent-gold); color:#1a1210; border-radius:50%; padding:0 8px; font-size:11px; font-weight:700;"></span>
                </button>
                <button class="share-btn" id="shareProgressBtn">
                    <i class="fas fa-share-alt"></i>
                    <span>Share</span>
                </button>
            </div>

            <div class="notes-block" id="notes-${index}" style="display:none;">
                <div class="notes-header">
                    <div class="notes-title">
                        <i class="fas fa-sticky-note"></i>
                        <span>My Notes</span>
                    </div>
                    <div class="notes-actions">
                        <button class="save-btn" data-lesson="${index}">
                            <i class="fas fa-save"></i> Save
                        </button>
                        <button class="clear-btn" data-lesson="${index}">
                            <i class="fas fa-trash-alt"></i> Clear
                        </button>
                    </div>
                </div>
                <textarea 
                    class="notes-textarea" 
                    data-lesson="${index}" 
                    placeholder="Write your thoughts, revelations, or key takeaways from this lesson..."
                    maxlength="2000"
                ></textarea>
                <div class="notes-footer">
                    <span class="char-count">0 / 2000</span>
                    <span class="saved-indicator unsaved" id="savedIndicator-${index}">
                        <i class="fas fa-circle"></i> Unsaved
                    </span>
                </div>
            </div>
        `;
    }

    // Navigation
    const prevDisabled = index === 0 ? 'disabled' : '';
    const nextDisabled = index === LESSONS.length - 1 ? 'disabled' : '';
    const total = LESSONS.length;
    const displayNum = lesson.isWelcome ? 'Welcome' : `${index} of ${total - 1}`;

    html += `
        <div class="lesson-nav">
            <button class="${prevDisabled}" ${prevDisabled ? 'disabled' : ''} id="prevLesson">
                <i class="fas fa-chevron-left"></i> Previous
            </button>
            <div class="nav-center">
                <span>${displayNum}</span>
            </div>
            <button class="${nextDisabled} primary" ${nextDisabled ? 'disabled' : ''} id="nextLesson">
                Next <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `;

    app.innerHTML = html;
    attachEventListeners(index);
    renderDrawer();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ATTACH EVENT LISTENERS
function attachEventListeners(index) {
    const lesson = LESSONS[index];
    
    // Navigation
    document.getElementById('prevLesson')?.addEventListener('click', () => {
        if (index > 0) goToLesson(index - 1);
    });
    document.getElementById('nextLesson')?.addEventListener('click', () => {
        if (index < LESSONS.length - 1) goToLesson(index + 1);
    });

    // Exercise Check
    document.querySelectorAll('.exercise-check').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = parseInt(this.dataset.lesson);
            if (completedLessons.has(idx)) {
                completedLessons.delete(idx);
                this.querySelector('span').textContent = 'Mark Complete';
                this.classList.remove('checked');
                showToast('Unmarked');
            } else {
                completedLessons.add(idx);
                this.querySelector('span').textContent = 'Completed ✓';
                this.classList.add('checked');
                showToast('✅ Lesson completed!');
            }
            saveProgress();
            renderDrawer();
        });
    });

    // Meditation Timer
    document.querySelectorAll('.meditation-timer').forEach(btn => {
        btn.addEventListener('click', function() {
            const minutes = parseInt(this.dataset.minutes) || 2;
            const seconds = minutes * 60;
            const span = this.querySelector('span');
            let remaining = seconds;

            this.disabled = true;
            this.style.opacity = '0.6';
            const origText = span.textContent;
            span.textContent = `${minutes}:00`;

            const timer = setInterval(() => {
                remaining--;
                const mins = Math.floor(remaining / 60);
                const secs = remaining % 60;
                span.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

                if (remaining <= 0) {
                    clearInterval(timer);
                    span.textContent = '🕊️ Done';
                    this.disabled = false;
                    this.style.opacity = '1';
                    showToast('🕊️ Meditation complete!');
                    setTimeout(() => { span.textContent = origText; }, 2000);
                }
            }, 1000);
        });
    });

    // Read Aloud
    const readBtn = document.querySelector('.read-aloud-btn');
    if (readBtn) {
        setupReadAloud(readBtn, lesson);
    }

    // Notes
    setupNotes(index);

    // Share
    const shareBtn = document.getElementById('shareProgressBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareProgress);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && index > 0 && !e.target.closest('textarea')) {
            e.preventDefault();
            goToLesson(index - 1);
        } else if (e.key === 'ArrowRight' && index < LESSONS.length - 1 && !e.target.closest('textarea')) {
            e.preventDefault();
            goToLesson(index + 1);
        }
    });
}

// READ ALOUD
function setupReadAloud(btn, lesson) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = lesson.content;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    const cleanText = textContent.replace(/\s+/g, ' ').trim();
    let isSpeaking = false;
    const speechSynth = window.speechSynthesis;
    const speedSelect = btn.querySelector('.speed-select');

    btn.addEventListener('click', function(e) {
        if (e.target.closest('.speed-control')) return;

        if (isSpeaking) {
            speechSynth.cancel();
            isSpeaking = false;
            this.classList.remove('playing');
            const icon = this.querySelector('i');
            const label = this.querySelector('span:not(.speed-control)');
            if (icon) icon.className = 'fas fa-volume-up';
            if (label) label.textContent = 'Read Aloud';
            return;
        }

        if (!window.speechSynthesis) {
            showToast('🔊 Text-to-speech not supported');
            return;
        }

        const utterance = new SpeechSynthesisUtterance(cleanText);
        const speed = parseFloat(speedSelect?.value) || 1;
        utterance.rate = speed;
        utterance.pitch = 1;
        utterance.volume = 1;

        const voices = speechSynth.getVoices();
        const preferred = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) ||
            voices.find(v => v.lang.startsWith('en')) || null;
        if (preferred) utterance.voice = preferred;

        this.classList.add('playing');
        const icon = this.querySelector('i');
        const label = this.querySelector('span:not(.speed-control)');
        if (icon) icon.className = 'fas fa-stop';
        if (label) label.textContent = 'Stop';

        speechSynth.speak(utterance);
        isSpeaking = true;

        utterance.onend = () => {
            isSpeaking = false;
            this.classList.remove('playing');
            if (icon) icon.className = 'fas fa-volume-up';
            if (label) label.textContent = 'Read Aloud';
        };
        utterance.onerror = () => {
            isSpeaking = false;
            this.classList.remove('playing');
            if (icon) icon.className = 'fas fa-volume-up';
            if (label) label.textContent = 'Read Aloud';
            showToast('🔊 Speech error');
        };
    });

    // Pre-load voices
    if (window.speechSynthesis) {
        speechSynth.getVoices();
        speechSynth.onvoiceschanged = () => { speechSynth.getVoices(); };
    }
}

// NOTES
const NOTES_STORAGE_KEY = 'gsc-notes';

function getNotes() {
    try {
        const data = localStorage.getItem(NOTES_STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch { return {}; }
}

function saveNotesToStorage(notes) {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
}

function setupNotes(index) {
    const notesBlock = document.querySelector('.notes-block');
    const notesToggle = document.querySelector('.notes-toggle-btn');
    const notesTextarea = document.querySelector('.notes-textarea');
    const notesSaveBtn = document.querySelector('.save-btn');
    const notesClearBtn = document.querySelector('.clear-btn');
    const charCount = document.querySelector('.char-count');
    const savedIndicator = document.querySelector('.saved-indicator');

    if (!notesToggle || !notesBlock) return;

    // Load saved notes
    const savedNotes = getNotes();
    if (savedNotes[index]) {
        notesTextarea.value = savedNotes[index];
        updateCharCount(notesTextarea, charCount);
        updateIndicator(savedIndicator, true);
        updateNotesBadge(index);
    }

    notesToggle.addEventListener('click', function() {
        const isVisible = notesBlock.style.display !== 'none';
        notesBlock.style.display = isVisible ? 'none' : 'block';
        this.classList.toggle('active');
        if (!isVisible) notesTextarea.focus();
    });

    notesTextarea.addEventListener('input', function() {
        updateCharCount(this, charCount);
        updateIndicator(savedIndicator, false);
    });

    notesTextarea.addEventListener('blur', function() {
        saveNote(index, this.value, savedIndicator);
    });

    notesSaveBtn.addEventListener('click', function() {
        saveNote(index, notesTextarea.value, savedIndicator);
        showToast('📝 Notes saved!');
        updateNotesBadge(index);
    });

    notesClearBtn.addEventListener('click', function() {
        if (notesTextarea.value && !confirm('Clear all notes for this lesson?')) return;
        notesTextarea.value = '';
        updateCharCount(notesTextarea, charCount);
        saveNote(index, '', savedIndicator);
        updateNotesBadge(index);
        showToast('🗑️ Notes cleared');
    });

    notesTextarea.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            notesSaveBtn.click();
        }
    });
}

function saveNote(lessonId, value, indicator) {
    const allNotes = getNotes();
    if (value && value.trim()) {
        allNotes[lessonId] = value.trim();
    } else {
        delete allNotes[lessonId];
    }
    saveNotesToStorage(allNotes);
    updateIndicator(indicator, !!(value && value.trim()));
}

function updateCharCount(textarea, charCountEl) {
    const count = textarea.value.length;
    const max = parseInt(textarea.maxLength) || 2000;
    charCountEl.textContent = `${count} / ${max}`;
    charCountEl.classList.toggle('limit', count > max * 0.9);
}

function updateIndicator(indicator, isSaved) {
    if (!indicator) return;
    if (isSaved) {
        indicator.className = 'saved-indicator saved';
        indicator.innerHTML = '<i class="fas fa-check-circle"></i> Saved';
    } else {
        indicator.className = 'saved-indicator unsaved';
        indicator.innerHTML = '<i class="fas fa-circle"></i> Unsaved';
    }
}

function updateNotesBadge(lessonId) {
    const toggleBtn = document.querySelector(`.notes-toggle-btn[data-lesson="${lessonId}"]`);
    if (!toggleBtn) return;
    const badge = toggleBtn.querySelector('.notes-badge');
    const allNotes = getNotes();
    const hasNote = allNotes[lessonId] && allNotes[lessonId].trim();

    if (hasNote) {
        badge.style.display = 'inline';
        badge.textContent = '📝';
        toggleBtn.classList.add('active');
    } else {
        badge.style.display = 'none';
        toggleBtn.classList.remove('active');
    }
}

// SHARE PROGRESS
function shareProgress() {
    const total = LESSONS.length;
    const done = completedLessons.size;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const message = `📖 I've completed ${done}/${total} lessons (${pct}%) in "The Consciousness of the Son"! 🕊️\n\nJoin me at Grace Spring Family Church and grow in Christ.\n\n#ConsciousnessOfTheSon #GraceSpringFamilyChurch`;

    if (navigator.share) {
        navigator.share({
            title: 'My Progress - The Consciousness of the Son',
            text: message,
            url: window.location.href
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(message).then(() => {
            showToast('📋 Progress copied to clipboard!');
        }).catch(() => {
            prompt('Copy this message to share:', message);
        });
    }
}

// SAVE PROGRESS
function saveProgress() {
    const data = {
        completedLessons: Array.from(completedLessons),
        currentLesson: currentLesson
    };
    Storage.set(APP_CONFIG.storageKeys.progress, data);
}

// NAVIGATION
function goToLesson(index) {
    if (index < 0 || index >= LESSONS.length) return;
    renderLesson(index);
    renderDrawer();
}

// INIT
function init() {
    applyTheme();
    displayDailyVerse();

    // Load saved progress
    const saved = Storage.get(APP_CONFIG.storageKeys.progress);
    if (saved) {
        completedLessons = new Set(saved.completedLessons || []);
        currentLesson = saved.currentLesson || 0;
    }

    renderLesson(currentLesson);
    renderDrawer();

    console.log(`📖 ${APP_CONFIG.name}`);
    console.log(`📚 ${LESSONS.length} lessons loaded`);
    console.log(`📖 ${VERSES.length} verses loaded`);
    console.log(`⌨️  Arrow keys to navigate | 'm' for menu`);
}

// 'm' shortcut for menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'm' && !e.ctrlKey && !e.metaKey && !e.target.closest('textarea')) {
        e.preventDefault();
        if (drawer.classList.contains('open')) {
            closeDrawer();
        } else {
            openDrawer();
        }
    }
});

// Start the app
init();