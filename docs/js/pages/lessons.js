import { Storage } from '../utils/storage.js';
import { LESSONS } from '../data/lessons.js';

let currentProps = null;

export function renderLessons(container, props) {
    currentProps = props;
    const { showToast, updateStreak, navigateTo } = props;

    const completed = Storage.get('gsc-progress', { completedLessons: [] });
    const completedSet = new Set(completed.completedLessons || []);

    // Filter out welcome lesson
    const lessons = LESSONS.filter(l => !l.isWelcome);

    let html = `
        <div class="page active" id="lessonsPage">
            <div class="container">
                <h2 class="card-title">📚 All Lessons</h2>
                <div style="margin-bottom:16px;">
                    <input type="text" id="lessonSearch" placeholder="🔍 Search lessons..." 
                           style="width:100%; padding:10px 16px; border:1px solid rgba(0,0,0,0.08); 
                                  border-radius:var(--radius-sm); background:var(--bg-primary); 
                                  color:var(--text-primary); font-size:15px; outline:none;">
                </div>
                <div id="lessonList">
    `;

    lessons.forEach((lesson, idx) => {
        const isCompleted = completedSet.has(lesson.id);

        html += `
            <div class="lesson-list-item" data-lesson="${lesson.id}" data-index="${idx}">
                <div class="lesson-status-icon ${isCompleted ? 'completed' : ''}">
                    ${isCompleted ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-circle-o"></i>'}
                </div>
                <div class="lesson-info">
                    <div class="lesson-title">${lesson.title}</div>
                    ${lesson.subtitle ? `<div class="lesson-sub">${lesson.subtitle}</div>` : ''}
                </div>
                <div class="lesson-arrow"><i class="fas fa-chevron-right"></i></div>
            </div>
        `;
    });

    html += `
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Search
    const searchInput = document.getElementById('lessonSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            document.querySelectorAll('.lesson-list-item').forEach(item => {
                const title = item.querySelector('.lesson-title')?.textContent?.toLowerCase() || '';
                const sub = item.querySelector('.lesson-sub')?.textContent?.toLowerCase() || '';
                item.style.display = title.includes(query) || sub.includes(query) || !query ? 'flex' : 'none';
            });
        });
    }

    // Click handlers
    document.querySelectorAll('.lesson-list-item').forEach(item => {
        item.addEventListener('click', function() {
            const lessonId = parseInt(this.dataset.lesson);
            const lesson = LESSONS.find(l => l.id === lessonId);
            if (lesson) {
                showLessonDetail(container, lessonId, showToast, updateStreak, navigateTo);
            }
        });
    });
}

function showLessonDetail(container, lessonId, showToast, updateStreak, navigateTo) {
    const lesson = LESSONS.find(l => l.id === lessonId);
    if (!lesson) return;

    const completed = Storage.get('gsc-progress', { completedLessons: [] });
    const completedSet = new Set(completed.completedLessons || []);
    const isCompleted = completedSet.has(lessonId);

    // Get saved notes
    const notes = Storage.get('gsc-notes', {});
    const savedNote = notes[lessonId] || '';

    container.innerHTML = `
        <div class="page active" id="lessonDetail">
            <div class="container">
                <button class="back-to-books-btn" id="backToLessons">
                    <i class="fas fa-arrow-left"></i> Back to Lessons
                </button>

                <div class="card" style="padding:24px;">
                    <div class="lesson-badge">Lesson ${lessonId}</div>
                    <h2 class="lesson-detail-title">${lesson.title}</h2>
                    ${lesson.subtitle ? `<p class="lesson-detail-sub">${lesson.subtitle}</p>` : ''}
                    <div class="lesson-detail-content">
                        ${lesson.content}
                    </div>

                    <!-- Meditation -->
                    ${lesson.meditation ? `
                        <div class="meditation-block">
                            <strong>💭 Meditation</strong>
                            <p style="margin-top:4px; font-style:italic;">"${lesson.meditation.text}"</p>
                            <p style="font-size:14px; color:var(--text-light);">${lesson.meditation.instruction}</p>
                        </div>
                    ` : ''}

                    <!-- Exercise -->
                    ${lesson.exercise ? `
                        <div class="exercise-block">
                            <strong>✍️ Exercise</strong>
                            <p style="margin-top:4px;">${lesson.exercise.text}</p>
                            ${lesson.exercise.declaration ? `
                                <div class="declaration">"${lesson.exercise.declaration}"</div>
                            ` : ''}
                            <button class="mark-complete-btn" data-lesson="${lessonId}" 
                                    style="margin-top:12px; padding:8px 24px; border-radius:var(--radius-full); 
                                           background:${isCompleted ? 'var(--accent-green)' : 'var(--accent-gold)'}; 
                                           color:#fff; font-weight:600; font-size:14px; border:none; cursor:pointer;">
                                ${isCompleted ? '✅ Completed' : 'Mark Complete'}
                            </button>
                        </div>
                    ` : ''}

                    <!-- Read Aloud, Notes, Share -->
                    <div class="read-aloud-block">
                        <button class="read-aloud-btn" data-lesson="${lessonId}">
                            <i class="fas fa-volume-up"></i>
                            <span>Read Aloud</span>
                        </button>
                        <button class="notes-toggle-btn ${savedNote ? 'active' : ''}" data-lesson="${lessonId}">
                            <i class="fas fa-sticky-note"></i>
                            <span>Notes</span>
                            ${savedNote ? '<span class="notes-badge">📝</span>' : ''}
                        </button>
                        <button class="share-btn" data-lesson="${lessonId}">
                            <i class="fas fa-share-alt"></i>
                            <span>Share</span>
                        </button>
                    </div>

                    <!-- Notes Block -->
                    <div class="notes-block" id="notes-${lessonId}" style="${savedNote ? 'display:block;' : 'display:none;'}">
                        <div class="notes-header">
                            <div class="notes-title">
                                <i class="fas fa-sticky-note"></i>
                                <span>My Notes</span>
                            </div>
                            <div class="notes-actions">
                                <button class="save-btn" data-lesson="${lessonId}">
                                    <i class="fas fa-save"></i> Save
                                </button>
                                <button class="clear-btn" data-lesson="${lessonId}">
                                    <i class="fas fa-trash-alt"></i> Clear
                                </button>
                            </div>
                        </div>
                        <textarea class="notes-textarea" data-lesson="${lessonId}" 
                                  placeholder="Write your thoughts, revelations, or key takeaways..."
                                  maxlength="2000">${savedNote}</textarea>
                        <div class="notes-footer">
                            <span class="char-count">${savedNote.length} / 2000</span>
                            <span class="saved-indicator ${savedNote ? 'saved' : 'unsaved'}" id="savedIndicator-${lessonId}">
                                <i class="fas ${savedNote ? 'fa-check-circle' : 'fa-circle'}"></i>
                                ${savedNote ? 'Saved' : 'Unsaved'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Back button
    document.getElementById('backToLessons')?.addEventListener('click', () => {
        renderLessons(container, currentProps);
    });

    // Mark Complete
    document.querySelector('.mark-complete-btn')?.addEventListener('click', function() {
        const id = parseInt(this.dataset.lesson);
        const progress = Storage.get('gsc-progress', { completedLessons: [] });
        const set = new Set(progress.completedLessons || []);

        if (set.has(id)) {
            set.delete(id);
        } else {
            set.add(id);
            if (updateStreak) updateStreak();
        }

        progress.completedLessons = Array.from(set);
        Storage.set('gsc-progress', progress);

        if (showToast) showToast(set.has(id) ? '✅ Completed!' : 'Unmarked');
        showLessonDetail(container, id, showToast, updateStreak, navigateTo);
    });

    // Read Aloud
    const readBtn = document.querySelector('.read-aloud-btn');
    if (readBtn) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = lesson.content;
        const cleanText = (tempDiv.textContent || tempDiv.innerText || '').replace(/\s+/g, ' ').trim();
        let isSpeaking = false;
        const speechSynth = window.speechSynthesis;

        readBtn.addEventListener('click', function() {
            if (isSpeaking) {
                speechSynth.cancel();
                isSpeaking = false;
                this.classList.remove('playing');
                this.querySelector('i').className = 'fas fa-volume-up';
                this.querySelector('span').textContent = 'Read Aloud';
                return;
            }

            if (!window.speechSynthesis) {
                if (showToast) showToast('🔊 Text-to-speech not supported');
                return;
            }

            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.rate = 1;
            utterance.pitch = 1;

            this.classList.add('playing');
            this.querySelector('i').className = 'fas fa-stop';
            this.querySelector('span').textContent = 'Stop';

            speechSynth.speak(utterance);
            isSpeaking = true;

            utterance.onend = () => {
                isSpeaking = false;
                this.classList.remove('playing');
                this.querySelector('i').className = 'fas fa-volume-up';
                this.querySelector('span').textContent = 'Read Aloud';
            };
        });
    }

    // Notes Toggle
    const notesToggle = document.querySelector('.notes-toggle-btn');
    const notesBlock = document.getElementById(`notes-${lessonId}`);
    if (notesToggle && notesBlock) {
        notesToggle.addEventListener('click', function() {
            const isVisible = notesBlock.style.display !== 'none';
            notesBlock.style.display = isVisible ? 'none' : 'block';
            this.classList.toggle('active');
            if (!isVisible) {
                notesBlock.querySelector('textarea')?.focus();
            }
        });
    }

    // Notes Textarea
    const textarea = document.querySelector('.notes-textarea');
    const charCount = document.querySelector('.char-count');
    const savedIndicator = document.getElementById(`savedIndicator-${lessonId}`);

    if (textarea) {
        textarea.addEventListener('input', function() {
            const count = this.value.length;
            if (charCount) charCount.textContent = `${count} / 2000`;
            if (savedIndicator) {
                savedIndicator.className = 'saved-indicator unsaved';
                savedIndicator.innerHTML = '<i class="fas fa-circle"></i> Unsaved';
            }
        });

        textarea.addEventListener('blur', function() {
            saveNote(lessonId, this.value, savedIndicator, showToast);
        });
    }

    // Save Note
    document.querySelector('.save-btn')?.addEventListener('click', function() {
        const id = parseInt(this.dataset.lesson);
        const textarea = document.querySelector(`.notes-textarea[data-lesson="${id}"]`);
        if (textarea) {
            saveNote(id, textarea.value, savedIndicator, showToast);
        }
    });

    // Clear Note
    document.querySelector('.clear-btn')?.addEventListener('click', function() {
        const id = parseInt(this.dataset.lesson);
        const textarea = document.querySelector(`.notes-textarea[data-lesson="${id}"]`);
        if (textarea && textarea.value && !confirm('Clear all notes for this lesson?')) return;
        if (textarea) {
            textarea.value = '';
            const count = textarea.value.length;
            if (charCount) charCount.textContent = `${count} / 2000`;
            saveNote(id, '', savedIndicator, showToast);
            document.querySelector('.notes-toggle-btn')?.classList.remove('active');
            document.querySelector('.notes-badge')?.remove();
        }
    });

    // Share
    document.querySelector('.share-btn')?.addEventListener('click', function() {
        const message = `📖 ${lesson.title}\n\n${lesson.subtitle || ''}\n\nRead more at The Consciousness of the Son 🕊️`;
        if (navigator.share) {
            navigator.share({ title: lesson.title, text: message });
        } else {
            navigator.clipboard.writeText(message).then(() => {
                if (showToast) showToast('📋 Lesson shared!');
            });
        }
    });
}

function saveNote(lessonId, value, indicator, showToast) {
    const allNotes = Storage.get('gsc-notes', {});
    if (value && value.trim()) {
        allNotes[lessonId] = value.trim();
    } else {
        delete allNotes[lessonId];
    }
    Storage.set('gsc-notes', allNotes);

    if (indicator) {
        const hasNote = !!(value && value.trim());
        indicator.className = `saved-indicator ${hasNote ? 'saved' : 'unsaved'}`;
        indicator.innerHTML = `<i class="fas ${hasNote ? 'fa-check-circle' : 'fa-circle'}"></i> ${hasNote ? 'Saved' : 'Unsaved'}`;
    }

    // Update badge
    const toggleBtn = document.querySelector(`.notes-toggle-btn[data-lesson="${lessonId}"]`);
    if (toggleBtn) {
        const badge = toggleBtn.querySelector('.notes-badge');
        if (value && value.trim()) {
            if (!badge) {
                const newBadge = document.createElement('span');
                newBadge.className = 'notes-badge';
                newBadge.textContent = '📝';
                toggleBtn.appendChild(newBadge);
            }
            toggleBtn.classList.add('active');
        } else {
            badge?.remove();
            toggleBtn.classList.remove('active');
        }
    }

    if (showToast) showToast(value && value.trim() ? '📝 Notes saved!' : '🗑️ Notes cleared');
}