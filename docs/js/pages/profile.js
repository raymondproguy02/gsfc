import { Storage } from '../utils/storage.js';
import { LESSONS } from '../data/lessons.js';

export function renderProfile(container, props) {
    const { user, showToast, navigateTo } = props;

    const progress = Storage.get('gsc-progress', { completedLessons: [] });
    const completedSet = new Set(progress.completedLessons || []);
    const lessons = LESSONS.filter(l => !l.isWelcome);
    const total = lessons.length;
    const done = completedSet.size;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const streak = Storage.get('gsc-streak', { count: 0 }).count || 0;
    const notes = Storage.get('gsc-notes', {});
    const noteCount = Object.keys(notes).filter(k => notes[k] && notes[k].trim()).length;
    const favorites = JSON.parse(localStorage.getItem('bible-favorites') || '[]');
    const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'GU';

    // Get recent lessons
    const recentLessons = Array.from(completedSet).slice(-5).reverse();

    container.innerHTML = `
        <div class="page active" id="profilePage">
            <div class="container">
                <!-- Profile Header -->
                <div class="card profile-header-card">
                    <div class="profile-avatar">${initials}</div>
                    <div class="profile-name">${user?.name || 'Guest'}</div>
                    <div class="profile-email">${user?.email || 'guest@example.com'}</div>
                    <div class="profile-joined">${user?.joined || 'Guest'}</div>
                    <button class="edit-profile-btn" style="margin-top:12px; padding:6px 20px; border-radius:var(--radius-full); background:var(--accent-gold); color:#1a1210; font-weight:600; font-size:13px; border:none; cursor:pointer;">
                        <i class="fas fa-pen"></i> Edit Profile
                    </button>
                </div>

                <!-- Stats -->
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
                    <div class="profile-progress-bar">
                        <div class="profile-progress-track">
                            <div class="profile-progress-fill" style="width:${pct}%;"></div>
                        </div>
                        <div class="profile-progress-info">
                            <span>${pct}% Complete</span>
                            <span>${done} of ${total}</span>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="card">
                    <h3 style="font-family:var(--font-heading); font-size:18px; margin-bottom:8px;">📋 Recent Activity</h3>
                    ${recentLessons.length === 0 ? 
                        '<p style="color:var(--text-light); font-size:14px;">No lessons completed yet. Start your journey!</p>' : 
                        recentLessons.map(id => {
                            const lesson = lessons.find(l => l.id === id);
                            return lesson ? `
                                <div style="display:flex; align-items:center; gap:10px; padding:6px 0; border-bottom:1px solid rgba(0,0,0,0.03);">
                                    <i class="fas fa-check-circle" style="color:var(--accent-green);"></i>
                                    <span style="font-size:14px;">${lesson.title}</span>
                                </div>
                            ` : '';
                        }).join('')
                    }
                </div>

                <!-- Actions -->
                <div class="card">
                    <h3 style="font-family:var(--font-heading); font-size:18px; margin-bottom:8px;">⚙️ Account</h3>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <button class="profile-action-btn" id="exportNotesBtn">
                            <i class="fas fa-file-export"></i> Export All Notes
                        </button>
                        <button class="profile-action-btn" id="shareProgressBtn">
                            <i class="fas fa-share-alt"></i> Share Progress
                        </button>
                        <button class="profile-action-btn" id="viewFavoritesBtn">
                            <i class="fas fa-star"></i> Bible Favorites (${favorites.length})
                        </button>
                        <button class="profile-action-btn danger" id="signOutBtn">
                            <i class="fas fa-sign-out-alt"></i> Sign Out
                        </button>
                    </div>
                </div>

                <div style="text-align:center; padding:8px 0; color:var(--text-light); font-size:12px;">
                    Version 2.0
                </div>
            </div>
        </div>
    `;

    // Edit Profile
    document.querySelector('.edit-profile-btn')?.addEventListener('click', function() {
        const currentName = user?.name || 'Guest';
        const name = prompt('Enter your name:', currentName);
        if (name && name.trim()) {
            const profile = Storage.get('gsc-profile', { name: 'Guest User', email: 'guest@example.com', joined: 'Guest' });
            profile.name = name.trim();
            Storage.set('gsc-profile', profile);
            if (showToast) showToast('✅ Profile updated!');
            if (navigateTo) navigateTo('profile');
        }
    });

    // Export Notes
    document.getElementById('exportNotesBtn')?.addEventListener('click', function() {
        const allNotes = Storage.get('gsc-notes', {});
        const entries = Object.entries(allNotes);
        if (entries.length === 0) {
            if (showToast) showToast('📝 No notes to export');
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
        if (showToast) showToast('📥 Notes exported!');
    });

    // Share Progress
    document.getElementById('shareProgressBtn')?.addEventListener('click', function() {
        const total = LESSONS.filter(l => !l.isWelcome).length;
        const progress = Storage.get('gsc-progress', { completedLessons: [] });
        const done = progress.completedLessons?.length || 0;
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;
        const msg = `📖 I've completed ${done}/${total} lessons (${pct}%) in "The Consciousness of the Son"! 🕊️\n\nJoin me at Grace Spring Family Church.`;
        if (navigator.share) {
            navigator.share({ title: 'My Progress', text: msg });
        } else {
            navigator.clipboard.writeText(msg).then(() => {
                if (showToast) showToast('📋 Copied to clipboard!');
            });
        }
    });

    // View Favorites
    document.getElementById('viewFavoritesBtn')?.addEventListener('click', function() {
        const favorites = JSON.parse(localStorage.getItem('bible-favorites') || '[]');
        if (favorites.length === 0) {
            if (showToast) showToast('⭐ No favorites yet');
            return;
        }
        let text = '⭐ Bible Favorites\n\n';
        favorites.forEach(f => {
            text += `${f.reference}\n${f.text}\n\n`;
        });
        if (navigator.share) {
            navigator.share({ title: 'My Bible Favorites', text: text });
        } else {
            navigator.clipboard.writeText(text).then(() => {
                if (showToast) showToast('📋 Favorites copied!');
            });
        }
    });

    // Sign Out
    document.getElementById('signOutBtn')?.addEventListener('click', function() {
        if (confirm('Are you sure you want to sign out?')) {
            const defaultUser = { name: 'Guest User', email: 'guest@example.com', joined: 'Guest' };
            Storage.set('gsc-profile', defaultUser);
            if (showToast) showToast('👋 Signed out');
            if (navigateTo) navigateTo('home');
        }
    });
}