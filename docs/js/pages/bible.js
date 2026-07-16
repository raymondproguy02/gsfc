import { Storage } from '../utils/storage.js';
import { getTotalChapters, fetchChapterVerses } from '../api/bible.js';

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

const NT_BOOKS = [
    'Matthew', 'Mark', 'Luke', 'John', 'Acts',
    'Romans', '1 Corinthians', '2 Corinthians', 'Galatians',
    'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians',
    '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus',
    'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter',
    '1 John', '2 John', '3 John', 'Jude', 'Revelation'
];

const ALL_BOOKS = [...OT_BOOKS, ...NT_BOOKS];

export function renderBible(container, props) {
    const { showToast } = props;
    const bibleState = Storage.get('gsc-bible-state', {
        book: null,
        chapter: 1,
        tab: 'all'
    });

    container.innerHTML = `
        <div class="page active" id="biblePage">
            <div class="container">
                <!-- Tabs -->
                <div class="bible-tabs">
                    <button class="tab-btn ${bibleState.tab === 'all' ? 'active' : ''}" data-tab="all">All</button>
                    <button class="tab-btn ${bibleState.tab === 'ot' ? 'active' : ''}" data-tab="ot">OT</button>
                    <button class="tab-btn ${bibleState.tab === 'nt' ? 'active' : ''}" data-tab="nt">NT</button>
                </div>

                <!-- Book Grid -->
                <div id="bibleBooks" class="bible-book-grid"></div>

                <!-- Chapters -->
                <div id="bibleChapters" class="bible-chapter-container" style="display:none;"></div>

                <!-- Content -->
                <div id="bibleContent">
                    <div class="bible-welcome">
                        <i class="fas fa-bible"></i>
                        <p>Select a book to read</p>
                    </div>
                </div>

                <!-- Actions -->
                <div id="bibleActions" class="bible-actions" style="display:none;">
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

                <!-- Back -->
                <div id="bibleBackBtn" style="display:none; margin-top:12px;">
                    <button class="back-to-books-btn" id="backToBooks">
                        <i class="fas fa-arrow-left"></i> Back to Books
                    </button>
                </div>
            </div>
        </div>
    `;

    // Back to Books
    document.getElementById('backToBooks')?.addEventListener('click', function() {
        const state = Storage.get('gsc-bible-state', {});
        state.book = null;
        state.chapter = 1;
        Storage.set('gsc-bible-state', state);
        renderBible(container, props);
    });

    // Render Books
    function renderBooks(tab) {
        const bookContainer = document.getElementById('bibleBooks');
        const state = Storage.get('gsc-bible-state', { book: null, chapter: 1, tab: 'all' });
        
        let books = ALL_BOOKS;
        if (tab === 'ot') books = OT_BOOKS;
        if (tab === 'nt') books = NT_BOOKS;

        bookContainer.innerHTML = books.map(book => `
            <div class="book-item ${book === state.book ? 'active' : ''}" data-book="${book}">
                <span class="book-name">${book}</span>
                <span class="book-chapters">${getTotalChapters(book)}</span>
            </div>
        `).join('');

        bookContainer.querySelectorAll('.book-item').forEach(el => {
            el.addEventListener('click', async function() {
                const book = this.dataset.book;
                const state = Storage.get('gsc-bible-state', { book: null, chapter: 1, tab: 'all' });
                state.book = book;
                state.chapter = 1;
                Storage.set('gsc-bible-state', state);

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

    // Load Chapters
    async function loadChapters(book) {
        const container = document.getElementById('bibleChapters');
        const state = Storage.get('gsc-bible-state', { book: null, chapter: 1, tab: 'all' });
        const total = getTotalChapters(book);

        container.style.display = 'block';
        container.innerHTML = `
            <div class="chapter-list-horizontal">
                ${Array.from({length: Math.min(total, 50)}, (_, i) => i + 1).map(c => `
                    <button class="chapter-btn ${c === state.chapter ? 'active' : ''}" data-chapter="${c}">${c}</button>
                `).join('')}
            </div>
        `;

        container.querySelectorAll('.chapter-btn').forEach(btn => {
            btn.addEventListener('click', async function() {
                const chapter = parseInt(this.dataset.chapter);
                const state = Storage.get('gsc-bible-state', { book: null, chapter: 1, tab: 'all' });
                state.chapter = chapter;
                Storage.set('gsc-bible-state', state);

                container.querySelectorAll('.chapter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                await loadVerses(book, chapter);
            });
        });
    }

    // Load Verses
    async function loadVerses(book, chapter) {
        const display = document.getElementById('bibleContent');

        display.innerHTML = `
            <div style="text-align:center; padding:20px;">
                <i class="fas fa-spinner fa-spin"></i> Loading...
            </div>
        `;

        try {
            const verses = await fetchChapterVerses(book, chapter);

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

                setupActionButtons(book, chapter, verses);

            } else {
                display.innerHTML = `<div class="bible-welcome"><p>No verses found</p></div>`;
            }
        } catch (error) {
            display.innerHTML = `<div class="bible-welcome"><p>⚠️ Error loading verses</p></div>`;
        }
    }

    // Action Buttons
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
                navigator.share({ title: reference, text: shareText }).catch(() => {});
            } else {
                navigator.clipboard.writeText(shareText).then(() => {
                    if (showToast) showToast('📋 Copied to clipboard!');
                });
            }
        });
    }

    // Tab clicks
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.dataset.tab;
            const state = Storage.get('gsc-bible-state', { book: null, chapter: 1, tab: 'all' });
            state.tab = tab;
            state.book = null;
            state.chapter = 1;
            Storage.set('gsc-bible-state', state);

            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

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

    // Init
    const state = Storage.get('gsc-bible-state', { book: null, chapter: 1, tab: 'all' });
    renderBooks(state.tab || 'all');

    if (state.book && state.chapter) {
        document.getElementById('bibleBooks').style.display = 'none';
        document.getElementById('bibleActions').style.display = 'flex';
        document.getElementById('bibleBackBtn').style.display = 'block';

        setTimeout(async () => {
            await loadChapters(state.book);
            await loadVerses(state.book, state.chapter);
        }, 100);
    }
}