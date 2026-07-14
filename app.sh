#!/bin/bash

# ============================================
# CREATE DIRECTORY STRUCTURE
# ============================================
mkdir -p css js/utils

echo "📁 Creating files..."

# ============================================
# index.html
# ============================================
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>The Consciousness of the Son</title>

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />

    <link rel="stylesheet" href="css/style.css" />
</head>
<body>

    <!-- ============================================
    TOAST
    ============================================ -->
    <div class="toast" id="toast">
        <i class="fas fa-info-circle"></i>
        <span id="toastMessage">Done!</span>
    </div>

    <!-- ============================================
    APP CONTAINER
    ============================================ -->
    <div id="app">

        <!-- ============================================
        HEADER
        ============================================ -->
        <header class="site-header">
            <div class="container header-inner">
                <div class="header-brand" id="brandHome">
                    <i class="fas fa-cross brand-icon"></i>
                    <div>
                        <h1>The Consciousness of the Son</h1>
                        <span class="brand-sub">Grace Spring Family Church</span>
                    </div>
                </div>
                <div class="header-actions">
                    <button id="themeToggle" aria-label="Toggle dark mode">
                        <i class="fas fa-moon"></i>
                    </button>
                </div>
            </div>
        </header>

        <!-- ============================================
        MAIN CONTENT AREA (Pages render here)
        ============================================ -->
        <main class="main-content" id="mainContent">
            <!-- Pages are rendered here by JavaScript -->
        </main>

        <!-- ============================================
        BOTTOM NAVIGATION
        ============================================ -->
        <nav class="bottom-nav" id="bottomNav">
            <button class="nav-item active" data-page="home">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </button>
            <button class="nav-item" data-page="lessons">
                <i class="fas fa-book-open"></i>
                <span>Lessons</span>
            </button>
            <button class="nav-item" data-page="bible">
                <i class="fas fa-bible"></i>
                <span>Bible</span>
            </button>
            <button class="nav-item" data-page="profile">
                <i class="fas fa-user"></i>
                <span>Profile</span>
            </button>
            <button class="nav-item" data-page="settings">
                <i class="fas fa-cog"></i>
                <span>Settings</span>
            </button>
        </nav>

    </div>

    <!-- ============================================
    JAVASCRIPT
    ============================================ -->
    <script type="module" src="js/app.js"></script>

</body>
</html>
EOF
echo "✅ index.html created"

# ============================================
# css/style.css
# ============================================
cat > css/style.css << 'EOF'
/* ============================================
   ROOT VARIABLES
   ============================================ */
:root {
    --bg-primary: #faf8f0;
    --bg-secondary: #ffffff;
    --bg-card: #ffffff;
    --bg-header: #2c1a0e;
    --text-primary: #2c1a0e;
    --text-secondary: #5a4a3a;
    --text-light: #8a7a6a;
    --accent-gold: #c8a45c;
    --accent-gold-light: #e8d5a8;
    --accent-purple: #6b3fa0;
    --accent-purple-light: #e8dce8;
    --accent-blue: #2c3e6b;
    --accent-blue-light: #d4dce8;
    --accent-green: #7baf7a;
    --accent-green-light: #e0f0df;
    --accent-orange: #e8a87c;
    --accent-orange-light: #f5e4d8;
    --accent-red: #e74c3c;
    --accent-lavender: #d4c5e8;
    --shadow-sm: 0 2px 8px rgba(44, 26, 14, 0.06);
    --shadow-md: 0 8px 32px rgba(44, 26, 14, 0.10);
    --shadow-lg: 0 16px 64px rgba(44, 26, 14, 0.14);
    --radius: 16px;
    --radius-sm: 10px;
    --radius-full: 50px;
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-heading: 'Playfair Display', serif;
    --max-width: 860px;
    --bottom-nav-height: 70px;
}

[data-theme="dark"] {
    --bg-primary: #1a1210;
    --bg-secondary: #261e1a;
    --bg-card: #2c2420;
    --bg-header: #0d0806;
    --text-primary: #f0e8e0;
    --text-secondary: #c8bdb5;
    --text-light: #a09080;
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 8px 32px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 16px 64px rgba(0, 0, 0, 0.5);
}

/* ============================================
   RESET & BASE
   ============================================ */
*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html {
    scroll-behavior: smooth;
}
body {
    font-family: var(--font-body);
    background: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.7;
    transition: var(--transition);
    -webkit-font-smoothing: antialiased;
    padding-bottom: var(--bottom-nav-height);
    min-height: 100vh;
}
a {
    text-decoration: none;
    color: inherit;
}
button {
    cursor: pointer;
    border: none;
    font-family: inherit;
    background: none;
    color: inherit;
}
input,
textarea,
select {
    font-family: inherit;
}
.container {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 20px;
}

/* ============================================
   SCROLLBAR
   ============================================ */
::-webkit-scrollbar {
    width: 6px;
}
::-webkit-scrollbar-track {
    background: var(--bg-primary);
}
::-webkit-scrollbar-thumb {
    background: var(--accent-gold);
    border-radius: 10px;
}

/* ============================================
   HEADER
   ============================================ */
.site-header {
    background: var(--bg-header);
    padding: 14px 0;
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 2px solid var(--accent-gold);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
}
.header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
}
.header-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #f0e8e0;
    cursor: pointer;
}
.header-brand .brand-icon {
    font-size: 24px;
    color: var(--accent-gold);
}
.header-brand h1 {
    font-family: var(--font-heading);
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.5px;
    line-height: 1.2;
}
.header-brand .brand-sub {
    font-size: 10px;
    opacity: 0.7;
    font-weight: 400;
    letter-spacing: 1px;
    display: block;
}
.header-actions button {
    width: 38px;
    height: 38px;
    border-radius: var(--radius-full);
    background: rgba(255, 255, 255, 0.08);
    color: #e0d8d0;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
    border: 1px solid rgba(255, 255, 255, 0.06);
}
.header-actions button:hover {
    background: rgba(255, 255, 255, 0.16);
}

/* ============================================
   BOTTOM NAVIGATION
   ============================================ */
.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: var(--bottom-nav-height);
    background: var(--bg-card);
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 4px 8px;
    z-index: 200;
    box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.06);
}
[data-theme="dark"] .bottom-nav {
    border-top-color: rgba(255, 255, 255, 0.06);
}
.nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 6px 12px;
    border-radius: var(--radius-sm);
    transition: var(--transition);
    font-size: 11px;
    font-weight: 500;
    color: var(--text-light);
    min-width: 56px;
    position: relative;
}
.nav-item i {
    font-size: 20px;
    transition: var(--transition);
}
.nav-item span {
    font-size: 10px;
    letter-spacing: 0.3px;
}
.nav-item:hover {
    color: var(--text-primary);
}
.nav-item.active {
    color: var(--accent-gold);
}
.nav-item.active i {
    transform: translateY(-2px);
}
.nav-item .badge {
    position: absolute;
    top: 0;
    right: 4px;
    background: var(--accent-red);
    color: #fff;
    font-size: 9px;
    font-weight: 700;
    padding: 1px 6px;
    border-radius: var(--radius-full);
    min-width: 18px;
    text-align: center;
}

/* ============================================
   PAGES
   ============================================ */
.page {
    display: none;
    animation: fadeIn 0.25s ease;
    padding: 16px 0 24px;
}
.page.active {
    display: block;
}
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ============================================
   CARDS
   ============================================ */
.card {
    background: var(--bg-card);
    border-radius: var(--radius);
    padding: 24px;
    box-shadow: var(--shadow-sm);
    border: 1px solid rgba(0, 0, 0, 0.04);
    margin-bottom: 16px;
    transition: var(--transition);
}
.card:hover {
    box-shadow: var(--shadow-md);
}
.card-title {
    font-family: var(--font-heading);
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 12px;
}

/* ============================================
   HOME PAGE
   ============================================ */
.streak-card {
    background: var(--bg-card);
    border-radius: var(--radius);
    padding: 20px 24px;
    margin-bottom: 16px;
    border-left: 4px solid var(--accent-gold);
    box-shadow: var(--shadow-sm);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
}
.streak-card .streak-left {
    display: flex;
    align-items: center;
    gap: 12px;
}
.streak-card .streak-left .fire {
    font-size: 28px;
}
.streak-card .streak-left .streak-info {
    display: flex;
    flex-direction: column;
}
.streak-card .streak-left .streak-info .streak-number {
    font-size: 22px;
    font-weight: 700;
    color: var(--accent-gold);
}
.streak-card .streak-left .streak-info .streak-label {
    font-size: 13px;
    color: var(--text-light);
}
.streak-card .streak-right {
    font-size: 13px;
    color: var(--text-light);
}

.progress-ring {
    display: flex;
    align-items: center;
    gap: 16px;
}
.progress-ring .ring {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: conic-gradient(var(--accent-gold) 0%, var(--bg-primary) 0%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.progress-ring .ring .inner {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--bg-card);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
    color: var(--text-primary);
}
.progress-ring .ring-info .ring-label {
    font-size: 13px;
    color: var(--text-light);
}
.progress-ring .ring-info .ring-number {
    font-size: 18px;
    font-weight: 700;
}

/* Daily Verse on Home */
.home-verse {
    background: var(--bg-card);
    border-radius: var(--radius);
    padding: 20px 24px;
    margin-bottom: 16px;
    border-left: 4px solid var(--accent-purple);
    box-shadow: var(--shadow-sm);
}
.home-verse .verse-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--text-light);
    margin-bottom: 4px;
}
.home-verse .verse-text {
    font-style: italic;
    font-size: 16px;
    color: var(--text-primary);
    line-height: 1.6;
}
.home-verse .verse-ref {
    font-size: 14px;
    font-weight: 600;
    color: var(--accent-gold);
    margin-top: 4px;
}

/* Quick Actions */
.quick-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 4px;
}
.quick-actions .action-btn {
    padding: 14px;
    border-radius: var(--radius-sm);
    background: var(--bg-primary);
    text-align: center;
    font-weight: 500;
    font-size: 14px;
    transition: var(--transition);
    border: 1px solid rgba(0, 0, 0, 0.04);
}
.quick-actions .action-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
}
.quick-actions .action-btn i {
    display: block;
    font-size: 22px;
    color: var(--accent-gold);
    margin-bottom: 4px;
}

/* ============================================
   LESSONS PAGE
   ============================================ */
.lesson-list-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 14px 18px;
    background: var(--bg-card);
    border-radius: var(--radius-sm);
    margin-bottom: 8px;
    border: 1px solid rgba(0, 0, 0, 0.04);
    transition: var(--transition);
    cursor: pointer;
}
.lesson-list-item:hover {
    transform: translateX(4px);
    box-shadow: var(--shadow-sm);
}
.lesson-list-item .lesson-status-icon {
    width: 32px;
    text-align: center;
    font-size: 18px;
    flex-shrink: 0;
}
.lesson-list-item .lesson-status-icon.completed {
    color: var(--accent-green);
}
.lesson-list-item .lesson-status-icon.locked {
    color: var(--text-light);
}
.lesson-list-item .lesson-info {
    flex: 1;
}
.lesson-list-item .lesson-info .lesson-title {
    font-weight: 600;
    font-size: 15px;
}
.lesson-list-item .lesson-info .lesson-sub {
    font-size: 13px;
    color: var(--text-light);
}
.lesson-list-item .lesson-arrow {
    color: var(--text-light);
    font-size: 14px;
}

/* ============================================
   BIBLE PAGE
   ============================================ */
.bible-search {
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
}
.bible-search input {
    flex: 1;
    padding: 10px 16px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: var(--radius-sm);
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 15px;
    outline: none;
    transition: var(--transition);
}
.bible-search input:focus {
    border-color: var(--accent-gold);
    box-shadow: 0 0 0 4px rgba(200, 164, 92, 0.12);
}
.bible-search select {
    padding: 10px 14px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: var(--radius-sm);
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 14px;
    outline: none;
    cursor: pointer;
}

.bible-book-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 8px;
}
.bible-book-list .book-item {
    padding: 10px 14px;
    background: var(--bg-card);
    border-radius: var(--radius-sm);
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.04);
    transition: var(--transition);
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
}
.bible-book-list .book-item:hover {
    background: var(--accent-gold-light);
    transform: translateY(-2px);
}
[data-theme="dark"] .bible-book-list .book-item:hover {
    background: rgba(200, 164, 92, 0.15);
}

.bible-chapter-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}
.bible-chapter-list .chapter-item {
    padding: 8px 16px;
    background: var(--bg-card);
    border-radius: var(--radius-sm);
    border: 1px solid rgba(0, 0, 0, 0.04);
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    transition: var(--transition);
}
.bible-chapter-list .chapter-item:hover {
    background: var(--accent-gold-light);
}

.bible-verse-display {
    padding: 16px 0;
}
.bible-verse-display .verse-text {
    font-size: 18px;
    line-height: 1.8;
    margin-bottom: 4px;
}
.bible-verse-display .verse-ref {
    font-weight: 600;
    color: var(--accent-gold);
    font-size: 15px;
}
.bible-verse-actions {
    display: flex;
    gap: 10px;
    margin-top: 12px;
}
.bible-verse-actions button {
    padding: 6px 16px;
    border-radius: var(--radius-full);
    font-size: 13px;
    font-weight: 500;
    background: var(--bg-primary);
    border: 1px solid rgba(0, 0, 0, 0.06);
    transition: var(--transition);
}
.bible-verse-actions button:hover {
    background: var(--accent-gold-light);
}

.bible-search-results .result-item {
    padding: 12px 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    cursor: pointer;
    transition: var(--transition);
}
.bible-search-results .result-item:hover {
    background: var(--bg-primary);
}
.bible-search-results .result-item .result-ref {
    font-weight: 600;
    color: var(--accent-gold);
}
.bible-search-results .result-item .result-text {
    font-size: 14px;
    color: var(--text-secondary);
}

/* ============================================
   PROFILE PAGE
   ============================================ */
.profile-header-card {
    text-align: center;
    padding: 32px 24px;
}
.profile-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: var(--accent-gold);
    color: #1a1210;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: 700;
    margin: 0 auto 12px;
}
.profile-name {
    font-family: var(--font-heading);
    font-size: 24px;
    font-weight: 700;
}
.profile-email {
    color: var(--text-light);
    font-size: 15px;
}
.profile-joined {
    color: var(--text-light);
    font-size: 13px;
    margin-top: 2px;
}

.profile-stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
}
.profile-stats-grid .stat-item {
    background: var(--bg-primary);
    padding: 14px;
    border-radius: var(--radius-sm);
    text-align: center;
}
.profile-stats-grid .stat-item .stat-number {
    font-size: 24px;
    font-weight: 700;
    color: var(--accent-gold);
    display: block;
}
.profile-stats-grid .stat-item .stat-label {
    font-size: 12px;
    color: var(--text-light);
}

/* ============================================
   SETTINGS PAGE
   ============================================ */
.settings-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}
.settings-item:last-child {
    border-bottom: none;
}
.settings-item .settings-left {
    display: flex;
    align-items: center;
    gap: 12px;
}
.settings-item .settings-left i {
    width: 24px;
    color: var(--accent-gold);
    font-size: 18px;
}
.settings-item .settings-left .settings-label {
    font-weight: 500;
}
.settings-item .settings-left .settings-desc {
    font-size: 12px;
    color: var(--text-light);
}

/* Toggle Switch */
.toggle {
    width: 48px;
    height: 28px;
    background: rgba(0, 0, 0, 0.15);
    border-radius: var(--radius-full);
    position: relative;
    cursor: pointer;
    transition: var(--transition);
    flex-shrink: 0;
}
.toggle.active {
    background: var(--accent-gold);
}
.toggle .toggle-knob {
    width: 22px;
    height: 22px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    top: 3px;
    left: 3px;
    transition: var(--transition);
}
.toggle.active .toggle-knob {
    left: 23px;
}

/* Font Size Buttons */
.font-size-group {
    display: flex;
    gap: 6px;
}
.font-size-group button {
    padding: 6px 16px;
    border-radius: var(--radius-full);
    font-size: 13px;
    font-weight: 500;
    background: var(--bg-primary);
    border: 1px solid rgba(0, 0, 0, 0.06);
    transition: var(--transition);
}
.font-size-group button.active {
    background: var(--accent-gold);
    color: #1a1210;
    border-color: var(--accent-gold);
}
.font-size-group button:hover {
    transform: translateY(-1px);
}

/* Settings Button */
.settings-btn {
    padding: 10px 20px;
    border-radius: var(--radius-sm);
    font-weight: 500;
    font-size: 14px;
    background: var(--bg-primary);
    border: 1px solid rgba(0, 0, 0, 0.06);
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    justify-content: center;
}
.settings-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
}
.settings-btn.danger {
    color: var(--accent-red);
    border-color: var(--accent-red);
}
.settings-btn.danger:hover {
    background: var(--accent-red);
    color: #fff;
}

/* ============================================
   TOAST
   ============================================ */
.toast {
    position: fixed;
    bottom: 90px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: var(--bg-header);
    color: #f0e8e0;
    padding: 12px 24px;
    border-radius: var(--radius-full);
    font-size: 14px;
    font-weight: 500;
    box-shadow: var(--shadow-lg);
    z-index: 400;
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    gap: 12px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    max-width: 90vw;
}
.toast.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
}
.toast i {
    color: var(--accent-gold);
    font-size: 18px;
}

/* ============================================
   UTILITY
   ============================================ */
.hidden {
    display: none !important;
}
.text-center {
    text-align: center;
}
.text-muted {
    color: var(--text-light);
    font-size: 14px;
}
.mt-8 {
    margin-top: 8px;
}
.mt-16 {
    margin-top: 16px;
}
.gap-8 {
    gap: 8px;
}
.flex {
    display: flex;
}
.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
.flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 768px) {
    .header-brand h1 {
        font-size: 15px;
    }
    .header-brand .brand-sub {
        font-size: 9px;
    }
    .profile-stats-grid {
        grid-template-columns: 1fr 1fr;
    }
    .bible-book-list {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }
    .quick-actions {
        grid-template-columns: 1fr 1fr;
    }
}
@media (max-width: 480px) {
    .container {
        padding: 0 14px;
    }
    .header-brand h1 {
        font-size: 13px;
    }
    .header-brand .brand-icon {
        font-size: 18px;
    }
    .header-actions button {
        width: 34px;
        height: 34px;
        font-size: 15px;
    }
    .nav-item {
        min-width: 44px;
        font-size: 10px;
    }
    .nav-item i {
        font-size: 17px;
    }
    .profile-stats-grid {
        grid-template-columns: 1fr 1fr;
    }
    .bible-book-list {
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    }
    .bible-search {
        flex-direction: column;
    }
    .quick-actions {
        grid-template-columns: 1fr 1fr;
    }
}
EOF
echo "✅ css/style.css created"

# ============================================
# js/config.js
# ============================================
cat > js/config.js << 'EOF'
// ============================================
// APP CONFIGURATION
// ============================================

export const APP_CONFIG = {
    name: "The Consciousness of the Son",
    church: "Grace Spring Family Church",
    version: "1.0.0",
    year: 2026,

    // Bible API
    bibleApi: {
        baseUrl: 'https://api.bible.org/v1',
        // Free tier - no key needed for public access
        // bibles: {
        //     NKJV: 'de4e12af7f28f599-02',  // Example ID
        //     NIV: '0529b3b3d5d4c9b7-01'     // Example ID
        // }
    },

    storageKeys: {
        theme: 'gsc-theme',
        progress: 'gsc-progress',
        notes: 'gsc-notes',
        profile: 'gsc-profile',
        settings: 'gsc-settings'
    },

    features: {
        darkMode: true,
        readAloud: true,
        notes: true,
        share: true,
        dailyVerse: true,
        bible: true
    }
};

export default APP_CONFIG;
EOF
echo "✅ js/config.js created"

# ============================================
# js/app.js
# ============================================
cat > js/app.js << 'EOF'
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
// NAVIGATION
// ============================================
function navigateTo(page) {
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
                onContinue: () => navigateTo('lessons'),
                onVerseClick: () => navigateTo('bible')
            });
            break;
        case 'lessons':
            renderLessons(mainContent, {
                lessons: LESSONS,
                completedLessons,
                onSelectLesson: (idx) => {
                    currentLesson = idx;
                    // For now, just show the lesson (could navigate to lesson detail)
                    showToast(`Opening: ${LESSONS[idx].title}`);
                }
            });
            break;
        case 'bible':
            renderBible(mainContent, {
                onVerseSelect: (verse) => {
                    showToast(`📖 ${verse.reference}: "${verse.text}"`);
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
            renderHome(mainContent, { lessons: LESSONS, completedLessons, userProfile });
    }

    // Scroll to top
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
document.getElementById('brandHome').addEventListener('click', () => {
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
// INIT
// ============================================
function init() {
    applyTheme();
    loadProgress();
    navigateTo('home');

    console.log(`📖 ${APP_CONFIG.name}`);
    console.log(`📚 ${LESSONS.length} lessons loaded`);
    console.log(`📖 ${VERSES.length} verses loaded`);
    console.log(`⌨️  Navigation ready`);
}

// Start
init();
EOF
echo "✅ js/app.js created"

# ============================================
# js/pages.js
# ============================================
cat > js/pages.js << 'EOF'
// ============================================
// PAGE RENDERERS
// ============================================

import { VERSES } from './verses.js';
import { LESSONS } from './lessons.js';
import { Storage } from './utils/storage.js';
import { showToast, updateStreak } from './app.js';
import { getDailyVerse, searchBible, getBookChapters } from './bible-api.js';

// ============================================
// HOME PAGE
// ============================================
export function renderHome(container, props) {
    const { lessons, completedLessons, userProfile, onContinue, onVerseClick } = props;
    const total = lessons.length;
    const done = completedLessons.size;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const streak = updateStreak();
    const verse = getDailyVerse(VERSES);

    container.innerHTML = `
        <div class="page active">
            <div class="container">

                <!-- Streak Card -->
                <div class="streak-card">
                    <div class="streak-left">
                        <span class="fire">🔥</span>
                        <div class="streak-info">
                            <span class="streak-number">${streak}</span>
                            <span class="streak-label">Day Streak</span>
                        </div>
                    </div>
                    <div class="streak-right">
                        <i class="fas fa-check-circle" style="color:var(--accent-green);"></i>
                        ${done}/${total} lessons
                    </div>
                </div>

                <!-- Progress Ring -->
                <div class="card">
                    <div class="progress-ring">
                        <div class="ring" style="background: conic-gradient(var(--accent-gold) ${pct}%, var(--bg-primary) ${pct}%);">
                            <div class="inner">${pct}%</div>
                        </div>
                        <div class="ring-info">
                            <div class="ring-number">${done} / ${total}</div>
                            <div class="ring-label">Lessons Completed</div>
                        </div>
                    </div>
                </div>

                <!-- Daily Verse -->
                <div class="home-verse" style="cursor:pointer;" onclick="${onVerseClick ? 'onVerseClick()' : ''}">
                    <div class="verse-label">📖 Verse of the Day</div>
                    <div class="verse-text">"${verse.verse}"</div>
                    <div class="verse-ref">— ${verse.reference}</div>
                </div>

                <!-- Quick Actions -->
                <div class="quick-actions">
                    <button class="action-btn" onclick="document.querySelector('[data-page=\\'lessons\\']')?.click();">
                        <i class="fas fa-book-open"></i>
                        Continue Learning
                    </button>
                    <button class="action-btn" onclick="document.querySelector('[data-page=\\'bible\\']')?.click();">
                        <i class="fas fa-bible"></i>
                        Read Bible
                    </button>
                </div>

                <!-- Welcome -->
                <div class="card" style="margin-top:8px;">
                    <p style="color:var(--text-secondary); font-size:15px;">
                        Welcome back, <strong>${userProfile.name}</strong>! 
                        ${done === 0 ? 'Start your journey today.' : `Keep going! You're doing great. 🎉`}
                    </p>
                    ${done < total ? `<p style="color:var(--text-light); font-size:14px; margin-top:4px;">Next: ${lessons[done + 1]?.title || 'Complete the series!'}</p>` : ''}
                </div>
            </div>
        </div>
    `;
}

// ============================================
// LESSONS PAGE
// ============================================
export function renderLessons(container, props) {
    const { lessons, completedLessons, onSelectLesson } = props;

    let html = `
        <div class="page active">
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
        const isLocked = false; // Could add locking logic

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

    // Search filter
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

    // Select lesson handler
    window._selectLesson = (idx) => {
        if (onSelectLesson) onSelectLesson(idx);
        // Show lesson content in a card
        const lesson = lessons[idx];
        const content = document.getElementById('lessonList');
        if (content) {
            content.innerHTML = `
                <button onclick="window._backToLessons()" style="padding:8px 16px; border-radius:var(--radius-full); background:var(--bg-primary); margin-bottom:16px; font-size:14px;">
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
                            <button onclick="window._markComplete(${idx})" style="margin-top:12px; padding:8px 24px; border-radius:var(--radius-full); background:${completedLessons.has(idx) ? 'var(--accent-green)' : 'var(--accent-gold)'}; color:#fff; font-weight:600; font-size:14px;">
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
            updateStreak();
        }
        Storage.set('gsc-progress', { 
            completedLessons: Array.from(completedLessons), 
            currentLesson: idx 
        });
        showToast(completedLessons.has(idx) ? '✅ Completed!' : 'Unmarked');
        renderLessons(container, props);
    };
}

// ============================================
// BIBLE PAGE
// ============================================
export function renderBible(container, props) {
    const { onVerseSelect } = props;
    let bibleData = Storage.get('gsc-bible-state', { version: 'NKJV', book: 'John', chapter: 1 });

    container.innerHTML = `
        <div class="page active">
            <div class="container">
                <h2 class="card-title">📖 Bible</h2>
                
                <div class="bible-search">
                    <input type="text" id="bibleSearchInput" placeholder="🔍 Search scriptures (e.g. 'love', 'John 3:16')" />
                    <select id="bibleVersion">
                        <option value="NKJV" ${bibleData.version === 'NKJV' ? 'selected' : ''}>NKJV</option>
                        <option value="NIV" ${bibleData.version === 'NIV' ? 'selected' : ''}>NIV</option>
                    </select>
                </div>

                <div id="bibleContent">
                    <div style="text-align:center; padding:40px 0; color:var(--text-light);">
                        <i class="fas fa-bible" style="font-size:48px; opacity:0.3; display:block; margin-bottom:12px;"></i>
                        <p>Select a book to read</p>
                    </div>
                </div>

                <div id="bibleBooks" class="bible-book-list"></div>
                <div id="bibleChapters" style="margin-top:16px;"></div>
                <div id="bibleVerses" style="margin-top:16px;"></div>
            </div>
        </div>
    `;

    // Load books
    const books = getBibleBooks();
    const bookContainer = document.getElementById('bibleBooks');
    if (bookContainer) {
        bookContainer.innerHTML = books.map(book => `
            <div class="book-item" data-book="${book.name}">${book.name}</div>
        `).join('');

        bookContainer.querySelectorAll('.book-item').forEach(el => {
            el.addEventListener('click', () => {
                const book = el.dataset.book;
                bibleData.book = book;
                bibleData.chapter = 1;
                Storage.set('gsc-bible-state', bibleData);
                loadChapter(book, 1, bibleData.version);
            });
        });
    }

    // Version change
    document.getElementById('bibleVersion')?.addEventListener('change', function() {
        bibleData.version = this.value;
        Storage.set('gsc-bible-state', bibleData);
        if (bibleData.book) {
            loadChapter(bibleData.book, bibleData.chapter, bibleData.version);
        }
    });

    // Search
    document.getElementById('bibleSearchInput')?.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                searchBible(query, bibleData.version).then(results => {
                    const content = document.getElementById('bibleContent');
                    if (content && results.length > 0) {
                        content.innerHTML = `
                            <h4 style="margin-bottom:12px;">🔍 Results for "${query}"</h4>
                            <div class="bible-search-results">
                                ${results.map(r => `
                                    <div class="result-item" data-ref="${r.reference}">
                                        <div class="result-ref">${r.reference}</div>
                                        <div class="result-text">${r.text}</div>
                                    </div>
                                `).join('')}
                            </div>
                        `;
                        content.querySelectorAll('.result-item').forEach(el => {
                            el.addEventListener('click', () => {
                                if (onVerseSelect) {
                                    onVerseSelect({ reference: el.dataset.ref, text: el.querySelector('.result-text').textContent });
                                }
                            });
                        });
                    } else if (content) {
                        content.innerHTML = `<p style="color:var(--text-light); text-align:center; padding:20px;">No results found for "${query}"</p>`;
                    }
                });
            }
        }
    });

    // Load initial chapter if book exists
    if (bibleData.book) {
        loadChapter(bibleData.book, bibleData.chapter, bibleData.version);
    }

    function loadChapter(book, chapter, version) {
        const verses = getBookChapter(book, chapter, version);
        const content = document.getElementById('bibleContent');
        const chapterContainer = document.getElementById('bibleChapters');
        
        // Update chapters list
        if (chapterContainer) {
            const totalChapters = getTotalChapters(book);
            chapterContainer.innerHTML = `
                <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom:8px;">
                    <strong style="color:var(--text-secondary);">${book}</strong>
                    <div class="bible-chapter-list">
                        ${Array.from({length: totalChapters}, (_, i) => i + 1).map(c => `
                            <span class="chapter-item ${c === chapter ? 'active' : ''}" style="${c === chapter ? 'background:var(--accent-gold); color:#fff;' : ''}">${c}</span>
                        `).join('')}
                    </div>
                </div>
            `;
            chapterContainer.querySelectorAll('.chapter-item').forEach(el => {
                el.addEventListener('click', () => {
                    const ch = parseInt(el.textContent);
                    bibleData.chapter = ch;
                    Storage.set('gsc-bible-state', bibleData);
                    loadChapter(book, ch, version);
                });
            });
        }

        // Display verses
        if (content) {
            content.innerHTML = `
                <div style="margin-top:16px;">
                    <h3 style="font-family:var(--font-heading); font-size:22px; font-weight:700;">${book} ${chapter}</h3>
                    <div class="bible-verse-display">
                        ${verses.map(v => `
                            <div style="padding:6px 0; border-bottom:1px solid rgba(0,0,0,0.03);">
                                <span style="color:var(--accent-gold); font-weight:600; font-size:12px; min-width:32px; display:inline-block;">${v.verse}</span>
                                <span style="font-size:15px; line-height:1.7;">${v.text}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="bible-verse-actions">
                        <button onclick="navigator.clipboard.writeText('${book} ${chapter}')">📋 Copy Chapter</button>
                    </div>
                </div>
            `;
        }
    }

    function getBibleBooks() {
        // Mock books - in production, fetch from API
        return [
            { name: 'Genesis' }, { name: 'Exodus' }, { name: 'Leviticus' }, { name: 'Numbers' },
            { name: 'Deuteronomy' }, { name: 'Joshua' }, { name: 'Judges' }, { name: 'Ruth' },
            { name: '1 Samuel' }, { name: '2 Samuel' }, { name: '1 Kings' }, { name: '2 Kings' },
            { name: '1 Chronicles' }, { name: '2 Chronicles' }, { name: 'Ezra' }, { name: 'Nehemiah' },
            { name: 'Esther' }, { name: 'Job' }, { name: 'Psalms' }, { name: 'Proverbs' },
            { name: 'Ecclesiastes' }, { name: 'Song of Solomon' }, { name: 'Isaiah' }, { name: 'Jeremiah' },
            { name: 'Lamentations' }, { name: 'Ezekiel' }, { name: 'Daniel' }, { name: 'Hosea' },
            { name: 'Joel' }, { name: 'Amos' }, { name: 'Obadiah' }, { name: 'Jonah' },
            { name: 'Micah' }, { name: 'Nahum' }, { name: 'Habakkuk' }, { name: 'Zephaniah' },
            { name: 'Haggai' }, { name: 'Zechariah' }, { name: 'Malachi' },
            { name: 'Matthew' }, { name: 'Mark' }, { name: 'Luke' }, { name: 'John' },
            { name: 'Acts' }, { name: 'Romans' }, { name: '1 Corinthians' }, { name: '2 Corinthians' },
            { name: 'Galatians' }, { name: 'Ephesians' }, { name: 'Philippians' }, { name: 'Colossians' },
            { name: '1 Thessalonians' }, { name: '2 Thessalonians' }, { name: '1 Timothy' }, { name: '2 Timothy' },
            { name: 'Titus' }, { name: 'Philemon' }, { name: 'Hebrews' }, { name: 'James' },
            { name: '1 Peter' }, { name: '2 Peter' }, { name: '1 John' }, { name: '2 John' },
            { name: '3 John' }, { name: 'Jude' }, { name: 'Revelation' }
        ];
    }

    function getTotalChapters(book) {
        const chapters = {
            'Genesis': 50, 'Exodus': 40, 'Leviticus': 27, 'Numbers': 36, 'Deuteronomy': 34,
            'Joshua': 24, 'Judges': 21, 'Ruth': 4, '1 Samuel': 31, '2 Samuel': 24,
            '1 Kings': 22, '2 Kings': 25, '1 Chronicles': 29, '2 Chronicles': 36,
            'Ezra': 10, 'Nehemiah': 13, 'Esther': 10, 'Job': 42, 'Psalms': 150,
            'Proverbs': 31, 'Ecclesiastes': 12, 'Song of Solomon': 8, 'Isaiah': 66,
            'Jeremiah': 52, 'Lamentations': 5, 'Ezekiel': 48, 'Daniel': 12,
            'Hosea': 14, 'Joel': 3, 'Amos': 9, 'Obadiah': 1, 'Jonah': 4,
            'Micah': 7, 'Nahum': 3, 'Habakkuk': 3, 'Zephaniah': 3, 'Haggai': 2,
            'Zechariah': 14, 'Malachi': 4,
            'Matthew': 28, 'Mark': 16, 'Luke': 24, 'John': 21,
            'Acts': 28, 'Romans': 16, '1 Corinthians': 16, '2 Corinthians': 13,
            'Galatians': 6, 'Ephesians': 6, 'Philippians': 4, 'Colossians': 4,
            '1 Thessalonians': 5, '2 Thessalonians': 3, '1 Timothy': 6, '2 Timothy': 4,
            'Titus': 3, 'Philemon': 1, 'Hebrews
EOF
echo "✅ js/pages.js created"

# ============================================
# js/lessons.js
# ============================================
cat > js/lessons.js << 'EOF'
// ============================================
// LESSONS DATA — Add all your lessons here!
// ============================================

export const LESSONS = [
    // === WELCOME (id: 0) ===
    {
        id: 0,
        title: "Welcome",
        isWelcome: true,
        content: `
            <div style="text-align:center; margin-bottom:16px;">
                <i class="fas fa-dove" style="font-size:64px; color:var(--accent-gold);"></i>
            </div>
            <p style="font-size:18px; font-weight:500; text-align:center; color:var(--text-primary);">
                Welcome to <strong>The Consciousness of the Son</strong>
            </p>
            <p>
                This is a journey into the depths of what Christ has already accomplished
                on your behalf. Over the coming lessons, we will explore what it truly
                means to live from the finished work of the Cross — not striving to earn
                what has already been freely given, but growing into the reality of our
                inheritance in Christ.
            </p>
            <div class="welcome-scripture">
                <i class="fas fa-quote-left" style="color:var(--accent-gold); margin-right:8px;"></i>
                <strong>"He that spared not his own Son, but delivered him up for us all,
                how shall he not with him also freely give us all things?"</strong>
                <br />— Romans 8:32
            </div>
            <p style="margin-top:16px; font-weight:500; text-align:center;">
                <i class="fas fa-heart" style="color:var(--accent-gold);"></i>
                With love and reflection,
                <br /><em>Grace Spring Family Church</em>
            </p>
        `
    },
    
    // === LESSON 1 ===
    {
        id: 1,
        title: "The Foundation: God Is Not Withholding",
        subtitle: "Learning to trust what He has already revealed",
        image: {
            icon: "🌅",
            caption: "The Cross settled that question forever"
        },
        content: `
            <p>The beginning of spiritual maturity is not learning how to persuade God.</p>
            <p>It is learning how to trust what He has already revealed.</p>
            <p>Many believers live as though Heaven is still making up its mind — whether to answer, whether to bless, whether to show mercy.</p>
            <p>Yet the New Covenant begins with a different announcement. <strong>God has already spoken.</strong> He has already revealed His heart.</p>
            <div class="scripture-block">
                <i class="fas fa-quote-left" style="color:var(--accent-gold); margin-right:8px;"></i>
                <strong>"He that spared not his own Son, but delivered him up for us all, how shall he not with him also freely give us all things?"</strong>
                <br />— Romans 8:32
            </div>
            <p>The Cross is not evidence that God <em>might</em> be generous. The Cross is evidence that He <strong>already is</strong>.</p>
            <div class="highlight-box">
                <i class="fas fa-check-circle"></i>
                <strong>"It is finished."</strong> — John 19:30
                <br />
                <span style="font-size:14px; color:var(--text-light);">The work of reconciliation was completed. The debt of sin was paid.</span>
            </div>
            <p>Scripture declares: <em>"Blessed be the God and Father of our Lord Jesus Christ, who hath blessed us with all spiritual blessings in heavenly places in Christ."</em> (Ephesians 1:3)</p>
            <p>The Christian life does not begin from scarcity. It begins from inheritance.</p>
        `,
        meditation: {
            text: `"If God did not withhold His Son from me, what does that reveal about His heart toward me?"`,
            instruction: `Sit quietly before the Lord. Do not rush to answer. Allow the Holy Spirit to move this truth from your mind into your heart. Let the Cross speak.`
        },
        exercise: {
            text: `Read Romans 8 slowly and prayerfully. Each time you encounter a statement revealing God's generosity, pause and thank Him aloud.`,
            declaration: `"I do not approach God as one trying to earn His favour. I approach Him as one who has already been welcomed through Christ."`
        },
        prayer: `Pray in the Spirit.`
    },
    
    // ════════════════════════════════════════════════
    // 📝 ADD YOUR LESSONS BELOW
    // ════════════════════════════════════════════════
    
];

export default LESSONS;
EOF
echo "✅ js/lessons.js created"

# ============================================
# js/verses.js
# ============================================
cat > js/verses.js << 'EOF'
// ============================================
// DAILY VERSE — Add your 200+ verses here!
// ============================================

export const VERSES = [
    // Romans
    { verse: "He that spared not his own Son, but delivered him up for us all, how shall he not with him also freely give us all things?", reference: "Romans 8:32", theme: "God's Generosity" },
    { verse: "For I am not ashamed of the gospel of Christ: for it is the power of God unto salvation to every one that believeth.", reference: "Romans 1:16", theme: "Gospel" },
    { verse: "For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.", reference: "Romans 6:23", theme: "Salvation" },
    { verse: "There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit.", reference: "Romans 8:1", theme: "Freedom" },
    { verse: "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.", reference: "Romans 8:38-39", theme: "God's Love" },
    { verse: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.", reference: "Romans 8:28", theme: "Trust" },
    { verse: "If God be for us, who can be against us?", reference: "Romans 8:31", theme: "God's Protection" },
    { verse: "Be not conformed to this world: but be ye transformed by the renewing of your mind.", reference: "Romans 12:2", theme: "Transformation" },
    // ════════════════════════════════════════════════
    // 📝 ADD YOUR 200+ VERSES BELOW
    // ════════════════════════════════════════════════
];

export default VERSES;
EOF
echo "✅ js/verses.js created"

# ============================================
# js/bible-api.js
# ============================================
cat > js/bible-api.js << 'EOF'
// ============================================
// BIBLE API - Mock for now (replace with real API)
// ============================================

import { APP_CONFIG } from './config.js';

// Bible book names and chapter counts
const BIBLE_BOOKS = {
    'Genesis': 50, 'Exodus': 40, 'Leviticus': 27, 'Numbers': 36, 'Deuteronomy': 34,
    'Joshua': 24, 'Judges': 21, 'Ruth': 4, '1 Samuel': 31, '2 Samuel': 24,
    '1 Kings': 22, '2 Kings': 25, '1 Chronicles': 29, '2 Chronicles': 36,
    'Ezra': 10, 'Nehemiah': 13, 'Esther': 10, 'Job': 42, 'Psalms': 150,
    'Proverbs': 31, 'Ecclesiastes': 12, 'Song of Solomon': 8, 'Isaiah': 66,
    'Jeremiah': 52, 'Lamentations': 5, 'Ezekiel': 48, 'Daniel': 12,
    'Hosea': 14, 'Joel': 3, 'Amos': 9, 'Obadiah': 1, 'Jonah': 4,
    'Micah': 7, 'Nahum': 3, 'Habakkuk': 3, 'Zephaniah': 3, 'Haggai': 2,
    'Zechariah': 14, 'Malachi': 4,
    'Matthew': 28, 'Mark': 16, 'Luke': 24, 'John': 21,
    'Acts': 28, 'Romans': 16, '1 Corinthians': 16, '2 Corinthians': 13,
    'Galatians': 6, 'Ephesians': 6, 'Philippians': 4, 'Colossians': 4,
    '1 Thessalonians': 5, '2 Thessalonians': 3, '1 Timothy': 6, '2 Timothy': 4,
    'Titus': 3, 'Philemon': 1, 'Hebrews': 13, 'James': 5,
    '1 Peter': 5, '2 Peter': 3, '1 John': 5, '2 John': 1, '3 John': 1,
    'Jude': 1, 'Revelation': 22
};

/**
 * Get all Bible books with chapter counts
 */
export function getBibleBooks() {
    return Object.keys(BIBLE_BOOKS).map(name => ({
        name,
        chapters: BIBLE_BOOKS[name]
    }));
}

/**
 * Get total chapters for a book
 */
export function getTotalChapters(book) {
    return BIBLE_BOOKS[book] || 30;
}

/**
 * Get verses for a chapter (mock data)
 * In production, this would call a real Bible API
 */
export function getChapterVerses(book, chapter, version = 'NKJV') {
    // Mock data - replace with actual API call
    const verses = [];
    const totalVerses = Math.min(20 + Math.floor(Math.random() * 10), 50);
    
    for (let i = 1; i <= totalVerses; i++) {
        verses.push({
            verse: i,
            text: `${book} ${chapter}:${i} (${version}) — This is a placeholder verse. Connect to a real Bible API for actual scripture.`
        });
    }
    return verses;
}

/**
 * Search Bible (mock)
 */
export function searchBible(query, version = 'NKJV') {
    return new Promise((resolve) => {
        // Mock search results
        const results = [];
        if (query.length > 0) {
            for (let i = 0; i < 5; i++) {
                results.push({
                    reference: `${['John', 'Romans', 'Matthew', 'Psalm', 'Proverbs'][i]} ${Math.floor(Math.random() * 20) + 1}:${Math.floor(Math.random() * 30) + 1}`,
                    text: `Search result for "${query}" — This is a placeholder. Connect to a real Bible API.`
                });
            }
        }
        setTimeout(() => resolve(results), 300);
    });
}

/**
 * Get daily verse from verses array
 */
export function getDailyVerse(verses) {
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

export default {
    getBibleBooks,
    getTotalChapters,
    getChapterVerses,
    searchBible,
    getDailyVerse
};
EOF
echo "✅ js/bible-api.js created"

# ============================================
# js/utils/storage.js
# ============================================
cat > js/utils/storage.js << 'EOF'
export const Storage = {
    get(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch {
            return defaultValue;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch {
            return false;
        }
    },
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch {
            return false;
        }
    }
};
EOF
echo "✅ js/utils/storage.js created"

echo ""
echo "🎉 All files created successfully!"
echo ""
echo "📁 Project structure:"
echo "├── index.html"
echo "├── css/"
echo "│   └── style.css"
echo "└── js/"
echo "    ├── app.js"
echo "    ├── config.js"
echo "    ├── pages.js"
echo "    ├── lessons.js"
echo "    ├── verses.js"
echo "    ├── bible-api.js"
echo "    └── utils/"
echo "        └── storage.js"
echo ""
echo "▶️ Run: python3 -m http.server 3000"
echo "🌐 Open: http://localhost:3000"
