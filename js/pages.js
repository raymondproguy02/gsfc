// ============================================
// PAGE RENDERERS
// ============================================

import { VERSES } from './verses.js';
import { LESSONS } from './lessons.js';
import { Storage } from './utils/storage.js';
import * as BibleAPI from './bible-api.js';

console.log('✅ pages.js loaded!');

// ============================================
// HELPER - Get Daily Verse
// ============================================
function getDailyVerse(verses) {
    if (!verses || verses.length === 0) {
        return { verse: 'He that spared not his own Son...', reference: 'Romans 8:32' };
    }
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return verses[dayOfYear % verses.length];
}

// ============================================
// HOME PAGE
// ============================================
export function renderHome(container, props) {
    console.log('🏠 renderHome called!');

    const { lessons, completedLessons, userProfile, showToast, updateStreak } = props;

    const total = lessons.length;
    const done = completedLessons.size;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const streak = updateStreak ? updateStreak() : 0;
    const verse = getDailyVerse(VERSES);

    container.innerHTML = `
        <div class="page active" id="homePage">
            <div class="container">
                <div class="stats-bar">
                    <div class="stats-item">
                        <span class="stats-number">${streak}</span>
                        <span class="stats-label">🔥 Day Streak</span>
                    </div>
                    <div class="stats-divider"></div>
                    <div class="stats-item">
                        <span class="stats-number">${done}/${total}</span>
                        <span class="stats-label">📚 Lessons</span>
                    </div>
                    <div class="stats-divider"></div>
                    <div class="stats-item">
                        <span class="stats-number">${pct}%</span>
                        <span class="stats-label">📊 Progress</span>
                    </div>
                </div>

                <div class="progress-bar-container">
                    <div class="progress-bar-track">
                        <div class="progress-bar-fill" style="width:${pct}%;"></div>
                    </div>
                </div>

                <div class="welcome-hero">
                    <div class="welcome-icon">🌅</div>
                    <h1 class="welcome-title">Welcome to <span>The Consciousness of the Son</span></h1>
                    <p class="welcome-text">
                        This is a journey into the depths of what Christ has already accomplished
                        on your behalf. Over the coming lessons, we will explore what it truly
                        means to live from the finished work of the Cross — not striving to earn
                        what has already been freely given, but growing into the reality of our
                        inheritance in Christ.
                    </p>
                    <p class="welcome-text">
                        My prayer is that as you walk through these pages, the eyes of your
                        understanding will be opened, your heart will be settled in God's love,
                        and you will discover the freedom that comes from knowing — truly knowing —
                        that He has already blessed us with every spiritual blessing in Christ.
                    </p>
                    <div class="welcome-scripture">
                        <i class="fas fa-quote-left"></i>
                        <span>"He that spared not his own Son, but delivered him up for us all,
                        how shall he not with him also freely give us all things?"</span>
                        <span class="welcome-ref">— Romans 8:32</span>
                    </div>
                    <div class="welcome-signoff">
                        <i class="fas fa-heart"></i>
                        With love and reflection,<br />
                        <strong>Grace Spring Family Church</strong>
                    </div>
                </div>

                <div class="verse-card" onclick="window._navigateToBible()">
                    <div class="verse-label">📖 Verse of the Day</div>
                    <div class="verse-text">"${verse.verse}"</div>
                    <div class="verse-ref">— ${verse.reference}</div>
                </div>

                <div class="action-row">
                    <button class="action-btn-primary" onclick="window._navigateToLessons()">
                        <i class="fas fa-book-open"></i> Continue Learning
                    </button>
                    <button class="action-btn-secondary" onclick="window._navigateToBible()">
                        <i class="fas fa-bible"></i> Read Bible
                    </button>
                </div>

                <div class="greeting">
                    Welcome back, <strong>${userProfile?.name || 'Guest'}</strong>!
                    ${done === 0 ? 'Start your journey today.' : `Keep going! You're doing great. 🎉`}
                </div>
            </div>
        </div>
    `;

    window._navigateToLessons = () => {
        document.querySelector('[data-page="lessons"]')?.click();
    };
    window._navigateToBible = () => {
        document.querySelector('[data-page="bible"]')?.click();
    };
}

// ============================================
// LESSONS PAGE
// ============================================
export function renderLessons(container, props) {
    console.log('📚 renderLessons called!');

    const { lessons, completedLessons, onSelectLesson, showToast, updateStreak } = props;

    let html = `
        <div class="page active" id="lessonsPage">
            <div class="container">
                <h2 class="card-title" style="margin-bottom:16px;">📚 All Lessons</h2>
                <div style="margin-bottom:16px;">
                    <input type="text" id="lessonSearch" placeholder="🔍 Search lessons..." style="width:100%; padding:10px 16px; border:1px solid rgba(0,0,0,0.08); border-radius:var(--radius-sm); background:var(--bg-primary); color:var(--text-primary); font-size:15px; outline:none;">
                </div>
                <div id="lessonList">
    `;

    lessons.forEach((lesson, idx) => {
        if (lesson.isWelcome) return;
        const isCompleted = completedLessons.has(idx);

        html += `
            <div class="lesson-list-item" data-lesson="${idx}" onclick="window._selectLesson(${idx})">
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

    const searchInput = document.getElementById('lessonSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            const items = document.querySelectorAll('.lesson-list-item');
            items.forEach(item => {
                const title = item.querySelector('.lesson-title')?.textContent?.toLowerCase() || '';
                const sub = item.querySelector('.lesson-sub')?.textContent?.toLowerCase() || '';
                const match = title.includes(query) || sub.includes(query);
                item.style.display = match || !query ? 'flex' : 'none';
            });
        });
    }

    window._selectLesson = (idx) => {
        if (onSelectLesson) onSelectLesson(idx);
        const lesson = lessons[idx];
        const content = document.getElementById('lessonList');
        if (content) {
            content.innerHTML = `
                <button onclick="window._backToLessons()" style="padding:8px 16px; border-radius:var(--radius-full); background:var(--bg-primary); margin-bottom:16px; font-size:14px; border:1px solid rgba(0,0,0,0.06);">
                    <i class="fas fa-arrow-left"></i> Back to Lessons
                </button>
                <div class="card" style="padding:24px;">
                    <div class="lesson-badge" style="display:inline-block; background:var(--accent-gold-light); padding:4px 14px; border-radius:var(--radius-full); font-size:12px; font-weight:600; text-transform:uppercase; margin-bottom:12px;">
                        Lesson ${idx}
                    </div>
                    <h2 style="font-family:var(--font-heading); font-size:24px; font-weight:700;">${lesson.title}</h2>
                    ${lesson.subtitle ? `<p style="color:var(--text-light); font-size:15px; margin-bottom:16px;">${lesson.subtitle}</p>` : ''}
                    <div style="color:var(--text-secondary); line-height:1.8; font-size:15px;">
                        ${lesson.content}
                    </div>
                    ${lesson.meditation ? `
                        <div style="margin-top:20px; padding:16px 20px; background:var(--accent-blue-light); border-radius:var(--radius-sm);">
                            <strong style="color:var(--accent-blue);">💭 Meditation</strong>
                            <p style="margin-top:4px; font-style:italic;">"${lesson.meditation.text}"</p>
                            <p style="font-size:14px; color:var(--text-light);">${lesson.meditation.instruction}</p>
                        </div>
                    ` : ''}
                    ${lesson.exercise ? `
                        <div style="margin-top:16px; padding:16px 20px; background:var(--accent-orange-light); border-radius:var(--radius-sm);">
                            <strong style="color:var(--accent-orange);">✍️ Exercise</strong>
                            <p style="margin-top:4px;">${lesson.exercise.text}</p>
                            ${lesson.exercise.declaration ? `
                                <p style="margin-top:8px; font-style:italic; font-weight:500; padding:12px 16px; background:rgba(255,255,255,0.4); border-radius:8px;">
                                    "${lesson.exercise.declaration}"
                                </p>
                            ` : ''}
                            <button onclick="window._markComplete(${idx})" style="margin-top:12px; padding:8px 24px; border-radius:var(--radius-full); background:${completedLessons.has(idx) ? 'var(--accent-green)' : 'var(--accent-gold)'}; color:#fff; font-weight:600; font-size:14px; border:none; cursor:pointer;">
                                ${completedLessons.has(idx) ? '✅ Completed' : 'Mark Complete'}
                            </button>
                        </div>
                    ` : ''}
                </div>
            `;
        }
    };

    window._backToLessons = () => {
        renderLessons(container, props);
    };

    window._markComplete = (idx) => {
        if (completedLessons.has(idx)) {
            completedLessons.delete(idx);
        } else {
            completedLessons.add(idx);
            if (updateStreak) updateStreak();
        }
        Storage.set('gsc-progress', {
            completedLessons: Array.from(completedLessons),
            currentLesson: idx
        });
        if (showToast) showToast(completedLessons.has(idx) ? '✅ Completed!' : 'Unmarked');
        renderLessons(container, props);
    };
}

// ============================================
// BIBLE PAGE — Clean & Simple (KJV Only)
// ============================================
export async function renderBible(container, props) {
    console.log('📖 renderBible called!');

    const { showToast } = props;
    const bibleData = Storage.get('gsc-bible-state', {
        book: 'John',
        chapter: 1,
        tab: 'all'
    });

    // OT Books (39)
    const OT_BOOKS = [
        'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
        'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
        '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles',
        'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
        'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah',
        'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel',
        'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
        'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'
    ];

    // NT Books (27)
    const NT_BOOKS = [
        'Matthew', 'Mark', 'Luke', 'John', 'Acts',
        'Romans', '1 Corinthians', '2 Corinthians', 'Galatians',
        'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians',
        '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus',
        'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter',
        '1 John', '2 John', '3 John', 'Jude', 'Revelation'
    ];

    const ALL_BOOKS = [...OT_BOOKS, ...NT_BOOKS];

    function getFilteredBooks(tab) {
        if (tab === 'ot') return OT_BOOKS;
        if (tab === 'nt') return NT_BOOKS;
        return ALL_BOOKS;
    }

    const hasSelection = bibleData.book && bibleData.chapter;

    container.innerHTML = `
        <div class="page active" id="biblePage">
            <div class="container">
                <!-- Tabs: All | OT | NT -->
                <div class="bible-tabs">
                    <button class="tab-btn ${bibleData.tab === 'all' ? 'active' : ''}" data-tab="all">All</button>
                    <button class="tab-btn ${bibleData.tab === 'ot' ? 'active' : ''}" data-tab="ot">OT</button>
                    <button class="tab-btn ${bibleData.tab === 'nt' ? 'active' : ''}" data-tab="nt">NT</button>
                </div>

                <!-- Book Grid -->
                <div id="bibleBooks" class="bible-book-grid" style="${hasSelection ? 'display:none;' : ''}"></div>

                <!-- Chapter selector -->
                <div id="bibleChapters" class="bible-chapter-container" style="display:none;"></div>

                <!-- Verses Display -->
                <div id="bibleContent">
                    <div class="bible-welcome">
                        <i class="fas fa-bible"></i>
                        <p>Select a book to read</p>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div id="bibleActions" class="bible-actions" style="${hasSelection ? 'display:flex;' : 'display:none;'}">
                    <button class="action-btn" id="bibleReadAloud">
                        <i class="fas fa-volume-up"></i> Read Aloud
                    </button>
                    <button class="action-btn" id="bibleFavorite">
                        <i class="fas fa-star"></i> Favorite
                    </button>
                    <button class="action-btn" id="bibleShare">
                        <i class="fas fa-share-alt"></i> Share
                    </button>
                </div>

                <!-- Back button -->
                <div id="bibleBackBtn" style="${hasSelection ? 'display:block;' : 'display:none;'} margin-top:12px;">
                    <button class="back-to-books-btn" id="backToBooks">
                        <i class="fas fa-arrow-left"></i> Back to Books
                    </button>
                </div>
            </div>
        </div>
    `;

    // ============================================
    // BACK TO BOOKS
    // ============================================
    document.getElementById('backToBooks')?.addEventListener('click', function() {
        bibleData.book = null;
        bibleData.chapter = null;
        Storage.set('gsc-bible-state', bibleData);
        renderBible(container, props);
    });

    // ============================================
    // RENDER BOOK GRID
    // ============================================
    function renderBooks(tab) {
        const bookContainer = document.getElementById('bibleBooks');
        const filtered = getFilteredBooks(tab);

        bookContainer.innerHTML = filtered.map(book => `
            <div class="book-item ${book === bibleData.book ? 'active' : ''}" data-book="${book}">
                <span class="book-name">${book}</span>
                <span class="book-chapters">${BibleAPI.getTotalChapters(book)}</span>
            </div>
        `).join('');

        bookContainer.querySelectorAll('.book-item').forEach(el => {
            el.addEventListener('click', async function() {
                const book = this.dataset.book;
                bibleData.book = book;
                bibleData.chapter = 1;
                Storage.set('gsc-bible-state', bibleData);

                document.getElementById('bibleBooks').style.display = 'none';
                document.getElementById('bibleActions').style.display = 'flex';
                document.getElementById('bibleBackBtn').style.display = 'block';

                document.querySelectorAll('.book-item').forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                await loadChapters(book);
                await loadVerses(book, 1);
            });
        });
    }

    // ============================================
    // LOAD CHAPTERS
    // ============================================
    async function loadChapters(book) {
        const container = document.getElementById('bibleChapters');
        const total = BibleAPI.getTotalChapters(book);

        container.style.display = 'block';
        container.innerHTML = `
            <div class="chapter-list-horizontal">
                ${Array.from({length: Math.min(total, 50)}, (_, i) => i + 1).map(c => `
                    <button class="chapter-btn ${c === bibleData.chapter ? 'active' : ''}" data-chapter="${c}">${c}</button>
                `).join('')}
            </div>
        `;

        container.querySelectorAll('.chapter-btn').forEach(btn => {
            btn.addEventListener('click', async function() {
                const chapter = parseInt(this.dataset.chapter);
                bibleData.chapter = chapter;
                Storage.set('gsc-bible-state', bibleData);

                container.querySelectorAll('.chapter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                await loadVerses(book, chapter);
            });
        });
    }

    // ============================================
    // LOAD VERSES
    // ============================================
    async function loadVerses(book, chapter) {
        const display = document.getElementById('bibleContent');

        display.innerHTML = `
            <div style="text-align:center; padding:20px;">
                <i class="fas fa-spinner fa-spin"></i> Loading...
            </div>
        `;

        try {
            const verses = await BibleAPI.fetchChapterVerses(book, chapter, 'KJV');

            if (verses && verses.length > 0) {
                display.innerHTML = `
                    <div class="verses-container">
                        <h3 class="verses-title">${book} ${chapter}</h3>
                        <div class="verses-list">
                            ${verses.map(v => `
                                <div class="verse-item">
                                    <span class="verse-number">${v.verse}</span>
                                    <span class="verse-text">${v.text}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;

                document.getElementById('bibleActions').style.display = 'flex';
                document.getElementById('bibleBackBtn').style.display = 'block';

                // Set up action buttons
                setupActionButtons(book, chapter, verses);

            } else {
                display.innerHTML = `<div class="bible-welcome"><p>No verses found</p></div>`;
            }
        } catch (error) {
            display.innerHTML = `<div class="bible-welcome"><p>⚠️ Error loading verses</p></div>`;
        }
    }

    // ============================================
    // ACTION BUTTONS
    // ============================================
    function setupActionButtons(book, chapter, verses) {
        const text = verses.map(v => `${v.verse}. ${v.text}`).join('\n');
        const reference = `${book} ${chapter}`;

        // Read Aloud
        document.getElementById('bibleReadAloud')?.addEventListener('click', function() {
            if (!window.speechSynthesis) {
                if (showToast) showToast('🔊 Text-to-speech not supported');
                return;
            }

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1;
            utterance.pitch = 1;
            window.speechSynthesis.speak(utterance);
            if (showToast) showToast('🔊 Reading aloud...');
        });

        // Favorite
        document.getElementById('bibleFavorite')?.addEventListener('click', function() {
            const favorites = JSON.parse(localStorage.getItem('bible-favorites') || '[]');
            const exists = favorites.some(f => f.reference === reference);

            if (exists) {
                const index = favorites.findIndex(f => f.reference === reference);
                favorites.splice(index, 1);
                localStorage.setItem('bible-favorites', JSON.stringify(favorites));
                if (showToast) showToast('⭐ Removed from favorites');
            } else {
                favorites.push({ reference, text: text.slice(0, 200) + '...' });
                localStorage.setItem('bible-favorites', JSON.stringify(favorites));
                if (showToast) showToast('⭐ Added to favorites!');
            }
        });

        // Share
        document.getElementById('bibleShare')?.addEventListener('click', function() {
            const shareText = `${reference}\n\n${text}`;

            if (navigator.share) {
                navigator.share({
                    title: reference,
                    text: shareText
                }).catch(() => {});
            } else {
                navigator.clipboard.writeText(shareText).then(() => {
                    if (showToast) showToast('📋 Copied to clipboard!');
                });
            }
        });
    }

    // ============================================
    // TAB CLICKS
    // ============================================
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.dataset.tab;
            bibleData.tab = tab;
            Storage.set('gsc-bible-state', bibleData);

            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            bibleData.book = null;
            bibleData.chapter = null;
            document.getElementById('bibleBooks').style.display = 'grid';
            document.getElementById('bibleActions').style.display = 'none';
            document.getElementById('bibleBackBtn').style.display = 'none';
            document.getElementById('bibleChapters').style.display = 'none';
            document.getElementById('bibleContent').innerHTML = `
                <div class="bible-welcome">
                    <i class="fas fa-bible"></i>
                    <p>Select a book to read</p>
                </div>
            `;

            renderBooks(tab);
        });
    });

    // ============================================
    // INIT — Load initial data
    // ============================================
    renderBooks(bibleData.tab || 'all');

    if (bibleData.book && bibleData.chapter) {
        document.getElementById('bibleBooks').style.display = 'none';
        document.getElementById('bibleActions').style.display = 'flex';
        document.getElementById('bibleBackBtn').style.display = 'block';

        setTimeout(async () => {
            await loadChapters(bibleData.book);
            await loadVerses(bibleData.book, bibleData.chapter);
        }, 100);
    }
}

// ============================================
// PROFILE PAGE
// ============================================
export function renderProfile(container, props) {
    console.log('👤 renderProfile called!');

    const { user, lessons, completedLessons, onEdit } = props;
    const total = lessons.length;
    const done = completedLessons.size;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const streak = Storage.get('gsc-streak', { count: 0 }).count || 0;
    const notes = Storage.get('gsc-notes', {});
    const noteCount = Object.keys(notes).filter(k => notes[k] && notes[k].trim()).length;
    const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'GU';

    container.innerHTML = `
        <div class="page active" id="profilePage">
            <div class="container">
                <div class="card profile-header-card">
                    <div class="profile-avatar">${initials}</div>
                    <div class="profile-name">${user?.name || 'Guest'}</div>
                    <div class="profile-email">${user?.email || 'guest@example.com'}</div>
                    <div class="profile-joined">${user?.joined || 'Guest'}</div>
                    <button onclick="window._editProfile()" style="margin-top:12px; padding:6px 20px; border-radius:var(--radius-full); background:var(--accent-gold); color:#1a1210; font-weight:600; font-size:13px; border:none; cursor:pointer;">
                        <i class="fas fa-pen"></i> Edit Profile
                    </button>
                </div>

                <div class="card">
                    <h3 style="font-family:var(--font-heading); font-size:18px; margin-bottom:12px;">📊 Stats</h3>
                    <div class="profile-stats-grid">
                        <div class="stat-item">
                            <span class="stat-number">${done}/${total}</span>
                            <span class="stat-label">Lessons</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${streak}</span>
                            <span class="stat-label">🔥 Streak</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${noteCount}</span>
                            <span class="stat-label">📝 Notes</span>
                        </div>
                    </div>
                    <div style="margin-top:12px; background:var(--bg-primary); border-radius:var(--radius-sm); padding:8px 12px;">
                        <div style="background:rgba(0,0,0,0.05); border-radius:10px; height:6px; overflow:hidden;">
                            <div style="width:${pct}%; height:100%; background:linear-gradient(90deg, var(--accent-gold), var(--accent-purple)); border-radius:10px;"></div>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--text-light); margin-top:4px;">
                            <span>${pct}% Complete</span>
                            <span>${done} of ${total}</span>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <h3 style="font-family:var(--font-heading); font-size:18px; margin-bottom:8px;">📋 Recent Activity</h3>
                    ${done === 0 ? '<p style="color:var(--text-light); font-size:14px;">No lessons completed yet. Start your journey!</p>' : ''}
                    ${Array.from(completedLessons).slice(-5).reverse().map(idx => `
                        <div style="display:flex; align-items:center; gap:10px; padding:6px 0; border-bottom:1px solid rgba(0,0,0,0.03);">
                            <i class="fas fa-check-circle" style="color:var(--accent-green);"></i>
                            <span style="font-size:14px;">${lessons[idx]?.title || `Lesson ${idx}`}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    window._editProfile = onEdit;
}

// ============================================
// SETTINGS PAGE
// ============================================
export function renderSettings(container, props) {
    console.log('⚙️ renderSettings called!');

    const {
        darkMode,
        onToggleDarkMode,
        onExportNotes,
        onShare,
        onSignOut,
        showToast
    } = props;

    const fontSizes = ['Small', 'Medium', 'Large'];
    const currentSize = Storage.get('gsc-font-size', 'Medium');

    container.innerHTML = `
        <div class="page active" id="settingsPage">
            <div class="container">
                <h2 class="card-title">⚙️ Settings</h2>

                <div class="card">
                    <div class="settings-item">
                        <div class="settings-left">
                            <i class="fas fa-moon"></i>
                            <div>
                                <div class="settings-label">Dark Mode</div>
                                <div class="settings-desc">Toggle dark/light theme</div>
                            </div>
                        </div>
                        <div class="toggle ${darkMode ? 'active' : ''}" id="darkModeToggle">
                            <div class="toggle-knob"></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="settings-item">
                        <div class="settings-left">
                            <i class="fas fa-font"></i>
                            <div>
                                <div class="settings-label">Font Size</div>
                                <div class="settings-desc">Adjust reading size</div>
                            </div>
                        </div>
                        <div class="font-size-group">
                            ${fontSizes.map(size => `
                                <button class="${currentSize === size ? 'active' : ''}" data-size="${size}">${size}</button>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div style="display:flex; flex-direction:column; gap:8px;">
                        <button class="settings-btn" id="exportNotesBtn">
                            <i class="fas fa-file-export"></i> Export All Notes
                        </button>
                        <button class="settings-btn" id="shareBtn">
                            <i class="fas fa-share-alt"></i> Share Progress
                        </button>
                    </div>
                </div>

                <div class="card">
                    <button class="settings-btn danger" id="signOutBtn">
                        <i class="fas fa-sign-out-alt"></i> Sign Out
                    </button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('darkModeToggle')?.addEventListener('click', onToggleDarkMode);

    document.querySelectorAll('.font-size-group button').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.font-size-group button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const size = this.dataset.size;
            Storage.set('gsc-font-size', size);
            const sizes = { Small: '14px', Medium: '16px', Large: '18px' };
            document.body.style.fontSize = sizes[size] || '16px';
            if (showToast) showToast(`📖 Font size: ${size}`);
        });
    });

    const sizes = { Small: '14px', Medium: '16px', Large: '18px' };
    document.body.style.fontSize = sizes[currentSize] || '16px';

    document.getElementById('exportNotesBtn')?.addEventListener('click', onExportNotes);
    document.getElementById('shareBtn')?.addEventListener('click', onShare);
    document.getElementById('signOutBtn')?.addEventListener('click', onSignOut);
}
