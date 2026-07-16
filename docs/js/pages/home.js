import { Storage } from '../utils/storage.js';
import { LESSONS } from '../data/lessons.js';

export function renderHome(container, props) {
    const { showToast, updateStreak, userProfile, isLoggedIn, navigateTo } = props;

    const total = LESSONS.filter(l => !l.isWelcome).length;
    const completed = Storage.get('gsc-progress', { completedLessons: [] });
    const done = completed.completedLessons?.length || 0;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const streak = updateStreak ? updateStreak() : 0;

    container.innerHTML = `
        <div class="page active" id="homePage">
            <div class="container">
            <!-- Welcome Hero -->
                <div class="welcome-hero">
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

                <!-- Action Row -->
                <div class="action-row">
                    <button class="action-btn-primary" id="continueLearning">
                        <i class="fas fa-book-open"></i> Continue Learning
                    </button>
                    <button class="action-btn-secondary" id="readBible">
                        <i class="fas fa-bible"></i> Read Bible
                    </button>
                </div>

                <!-- Greeting -->
                <div class="greeting">
                    Welcome back, <strong>${userProfile?.name || 'Guest'}</strong>!
                    ${done === 0 ? 'Start your journey today.' : `Keep going! You're doing great. 🎉`}
                </div>

                <!-- Auth Prompt -->
                ${!isLoggedIn ? `
                    <div class="auth-prompt">
                        <div class="prompt-icon">✨</div>
                        <div class="prompt-title">Create an Account</div>
                        <div class="prompt-desc">Save your progress, notes, and favorites across all devices.</div>
                        <div class="prompt-buttons">
                            <button class="prompt-btn primary" id="signupPrompt">
                                <i class="fas fa-user-plus"></i> Get Started
                            </button>
                            <button class="prompt-btn secondary" id="signinPrompt">
                                <i class="fas fa-sign-in-alt"></i> Sign In
                            </button>
                        </div>
                    </div>
                ` : `
                    <div class="auth-prompt" style="border-color:var(--accent-green);">
                        <div class="prompt-icon">✅</div>
                        <div class="prompt-title">You're Signed In!</div>
                        <div class="prompt-desc">Your progress is being saved to the cloud.</div>
                    </div>
                `}
            </div>
        </div>
    `;

    // Event Listeners
    document.getElementById('continueLearning')?.addEventListener('click', () => {
        if (navigateTo) navigateTo('lessons');
    });

    document.getElementById('readBible')?.addEventListener('click', () => {
        if (navigateTo) navigateTo('bible');
    });

    document.getElementById('signupPrompt')?.addEventListener('click', () => {
        window.openAuthModal?.('signup');
    });

    document.getElementById('signinPrompt')?.addEventListener('click', () => {
        window.openAuthModal?.('signin');
    });
}