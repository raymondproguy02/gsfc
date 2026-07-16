// Import all CSS files
import '../css/main.css';
import '../css/components.css';
import '../css/lessons.css';
import '../css/bible.css';
import '../css/profile.css';

import { Storage } from './utils/storage.js';
import { renderHome } from './pages/home.js';
import { renderLessons } from './pages/lessons.js';
import { renderBible } from './pages/bible.js';
import { renderProfile } from './pages/profile.js';
import './components/Auth.js';

console.log('🚀 App initialized');

// STATE
const APP_CONFIG = {
    name: "The Consciousness of the Son",
    church: "Grace Spring Family Church",
    version: "2.0.0",
    storageKeys: {
        theme: 'gsc-theme',
        progress: 'gsc-progress',
        notes: 'gsc-notes',
        profile: 'gsc-profile',
        streak: 'gsc-streak'
    }
};

let currentPage = 'home';
let darkMode = Storage.get(APP_CONFIG.storageKeys.theme, false);
let userProfile = Storage.get(APP_CONFIG.storageKeys.profile, {
    name: 'Guest User',
    email: 'guest@example.com',
    joined: 'Guest'
});

// DOM REFS
const mainContent = document.getElementById('mainContent');
const themeToggle = document.getElementById('themeToggle');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

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

export function showToast(msg) {
    toastMessage.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// STREAK
export function updateStreak() {
    const today = new Date().toDateString();
    const streakData = Storage.get(APP_CONFIG.storageKeys.streak, { count: 0, lastActive: null });

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
    Storage.set(APP_CONFIG.storageKeys.streak, streakData);
    return streakData.count;
}

// NAVIGATION
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
                showToast,
                updateStreak,
                userProfile,
                isLoggedIn: userProfile?.name !== 'Guest User',
                navigateTo
            });
            break;
        case 'lessons':
            renderLessons(mainContent, {
                showToast,
                updateStreak,
                navigateTo
            });
            break;
        case 'bible':
            renderBible(mainContent, {
                showToast
            });
            break;
        case 'profile':
            renderProfile(mainContent, {
                user: userProfile,
                showToast,
                navigateTo
            });
            break;
        default:
            renderHome(mainContent, {
                showToast,
                updateStreak,
                userProfile,
                isLoggedIn: userProfile?.name !== 'Guest User',
                navigateTo
            });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// NAVIGATION EVENTS
document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => {
        const page = el.dataset.page;
        if (page) navigateTo(page);
    });
});

document.getElementById('brandHome')?.addEventListener('click', () => {
    navigateTo('home');
});

// INIT
function init() {
    console.log('🚀 Starting app...');
    applyTheme();
    navigateTo('home');
    console.log(`📖 ${APP_CONFIG.name} v${APP_CONFIG.version}`);
    console.log('✅ App ready!');
}

// Start
init();
