// ============================================
// IMPORTS
// ============================================
import { APP_CONFIG } from './config.js';
import { Storage } from './utils/storage.js';
import { LESSONS } from './lessons.js';
import { VERSES } from './verses.js';
import { 
    renderHome, 
    renderLessons, 
    renderBible, 
    renderProfile, 
    renderSettings 
} from './pages.js';

console.log('✅ app.js loaded!');

// ============================================
// APP STATE
// ============================================
let currentPage = 'home';
let currentLesson = 0;
let completedLessons = new Set();
let darkMode = Storage.get(APP_CONFIG.storageKeys.theme, false);
let userProfile = Storage.get(APP_CONFIG.storageKeys.profile, {
    name: 'Guest User',
    email: 'guest@example.com',
    joined: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
});

// ============================================
// DOM REFS
// ============================================
const mainContent = document.getElementById('mainContent');
const themeToggle = document.getElementById('themeToggle');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// ============================================
// THEME
// ============================================
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

// ============================================
// TOAST
// ============================================
let toastTimeout;

export function showToast(msg) {
    toastMessage.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// UPDATE STREAK
// ============================================
export function updateStreak() {
    const today = new Date().toDateString();
    const streakData = Storage.get('gsc-streak', { count: 0, lastActive: null });

    if (streakData.lastActive === today) return streakData.count;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (streakData.lastActive === yesterdayStr) {
        streakData.count += 1;
    } else if (streakData.lastActive !== today) {
        streakData.count = 1;
    }

    streakData.lastActive = today;
    Storage.set('gsc-streak', streakData);
    return streakData.count;
}

// ============================================
// NAVIGATION
// ============================================
function navigateTo(page) {
    console.log('🔀 Navigating to:', page);
    currentPage = page;

    // Update nav
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.toggle('active', el.dataset.page === page);
    });

    // Render page
    switch (page) {
        case 'home':
            renderHome(mainContent, { 
                lessons: LESSONS, 
                completedLessons, 
                userProfile,
                showToast: showToast,
                updateStreak: updateStreak,
                onContinue: () => navigateTo('lessons'),
                onVerseClick: () => navigateTo('bible')
            });
            break;
        case 'lessons':
            renderLessons(mainContent, {
                lessons: LESSONS,
                completedLessons,
                showToast: showToast,
                updateStreak: updateStreak,
                onSelectLesson: (idx) => {
                    currentLesson = idx;
                    showToast(`Opening: ${LESSONS[idx].title}`);
                }
            });
            break;
        case 'bible':
    renderBible(mainContent, {
        showToast: showToast,
        onVerseSelect: (verse) => {
            showToast(`📖 ${verse.reference}`);
        }
    });
    break;
        case 'profile':
            renderProfile(mainContent, {
                user: userProfile,
                lessons: LESSONS,
                completedLessons,
                onEdit: () => {
                    const name = prompt('Enter your name:', userProfile.name);
                    if (name && name.trim()) {
                        userProfile.name = name.trim();
                        Storage.set(APP_CONFIG.storageKeys.profile, userProfile);
                        showToast('✅ Profile updated!');
                        navigateTo('profile');
                    }
                }
            });
            break;
        case 'settings':
            renderSettings(mainContent, {
                darkMode,
                showToast: showToast,
                onToggleDarkMode: () => {
                    darkMode = !darkMode;
                    applyTheme();
                    navigateTo('settings');
                },
                onExportNotes: () => {
                    const notes = Storage.get(APP_CONFIG.storageKeys.notes, {});
                    const entries = Object.entries(notes);
                    if (entries.length === 0) {
                        showToast('📝 No notes to export');
                        return;
                    }
                    let text = '📖 The Consciousness of the Son - Notes\n\n';
                    entries.forEach(([id, note]) => {
                        const lesson = LESSONS.find(l => l.id === parseInt(id));
                        const title = lesson ? lesson.title : `Lesson ${id}`;
                        text += `📘 ${title}\n${'-'.repeat(title.length + 4)}\n${note}\n\n`;
                    });
                    const blob = new Blob([text], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `notes-${new Date().toISOString().slice(0,10)}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                    showToast('📥 Notes exported!');
                },
                onShare: () => {
                    const total = LESSONS.length;
                    const done = completedLessons.size;
                    const msg = `📖 I've completed ${done}/${total} lessons in "The Consciousness of the Son"! 🕊️\n\nJoin me at Grace Spring Family Church.`;
                    if (navigator.share) {
                        navigator.share({ title: 'My Progress', text: msg });
                    } else {
                        navigator.clipboard.writeText(msg).then(() => {
                            showToast('📋 Copied to clipboard!');
                        });
                    }
                },
                onSignOut: () => {
                    if (confirm('Are you sure you want to sign out?')) {
                        userProfile = { name: 'Guest User', email: 'guest@example.com', joined: 'Guest' };
                        Storage.remove(APP_CONFIG.storageKeys.profile);
                        showToast('👋 Signed out');
                        navigateTo('home');
                    }
                }
            });
            break;
        default:
            renderHome(mainContent, { 
                lessons: LESSONS, 
                completedLessons, 
                userProfile,
                showToast: showToast,
                updateStreak: updateStreak
            });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// NAVIGATION EVENT LISTENERS
// ============================================
document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => {
        const page = el.dataset.page;
        if (page) navigateTo(page);
    });
});

// Brand click -> home
document.getElementById('brandHome')?.addEventListener('click', () => {
    navigateTo('home');
});

// ============================================
// LOAD SAVED PROGRESS
// ============================================
function loadProgress() {
    const saved = Storage.get(APP_CONFIG.storageKeys.progress);
    if (saved) {
        completedLessons = new Set(saved.completedLessons || []);
        currentLesson = saved.currentLesson || 0;
    }
}

// ============================================
// INIT
// ============================================
function init() {
    console.log('🚀 Initializing app...');
    applyTheme();
    loadProgress();
    navigateTo('home');

    console.log(`📖 ${APP_CONFIG.name}`);
    console.log(`📚 ${LESSONS.length} lessons loaded`);
    console.log(`📖 ${VERSES.length} verses loaded`);
    console.log('✅ App initialized successfully!');
}

// Start
init();
