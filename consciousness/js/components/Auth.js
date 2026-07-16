import { Storage } from '../utils/storage.js';

const modal = document.getElementById('authModal');
const closeBtn = document.getElementById('authClose');
const tabs = document.querySelectorAll('.auth-tab');
const panels = {
    signin: document.getElementById('authSignIn'),
    signup: document.getElementById('authSignUp'),
    forgot: document.getElementById('authForgot')
};
const forgotLink = document.getElementById('authForgotLink');
const backToSignIn = document.getElementById('authBackToSignIn');
const toggleBtns = document.querySelectorAll('.auth-toggle-password');

let currentTab = 'signin';

// Open / Close
export function openAuthModal(tab = 'signin') {
    modal.classList.add('active');
    switchTab(tab);
    document.body.style.overflow = 'hidden';
}

export function closeAuthModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeAuthModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeAuthModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAuthModal();
});

// Tabs
function switchTab(tab) {
    currentTab = tab;
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    Object.keys(panels).forEach(key => {
        panels[key].classList.toggle('active', key === tab);
    });
    if (tab !== 'forgot') {
        panels.forgot.style.display = 'none';
    }
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        switchTab(tab.dataset.tab);
    });
});

document.querySelectorAll('[data-tab]').forEach(el => {
    el.addEventListener('click', () => {
        switchTab(el.dataset.tab);
    });
});

forgotLink.addEventListener('click', () => {
    panels.signin.classList.remove('active');
    panels.signup.classList.remove('active');
    panels.forgot.style.display = 'block';
    tabs.forEach(t => t.classList.remove('active'));
});

backToSignIn.addEventListener('click', () => {
    panels.forgot.style.display = 'none';
    switchTab('signin');
});

// Toggle Password
toggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const targetId = this.dataset.target;
        const input = document.getElementById(targetId);
        if (input) {
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            this.querySelector('i').className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
        }
    });
});

// Password Strength
const strengthInput = document.getElementById('signupPassword');
const strengthBars = document.querySelectorAll('#authStrength .auth-strength-bar span');
const strengthText = document.querySelector('#authStrength .auth-strength-text');

if (strengthInput) {
    strengthInput.addEventListener('input', function() {
        const val = this.value;
        const score = getPasswordScore(val);

        strengthBars.forEach((bar, i) => {
            bar.className = '';
            if (i < score.level) {
                bar.classList.add('active', score.class);
            }
        });

        strengthText.textContent = score.label;
        strengthText.className = 'auth-strength-text ' + score.class;
    });
}

function getPasswordScore(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 1) return { level: 1, class: 'weak', label: 'Weak — add more characters' };
    if (score <= 3) return { level: 2, class: 'medium', label: 'Medium — add symbols' };
    if (score <= 4) return { level: 3, class: 'strong', label: 'Strong! 💪' };
    return { level: 4, class: 'strong', label: 'Very Strong! 🎉' };
}

// Form Handlers (Mock)
document.getElementById('signinForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;
    console.log('🔐 Sign In:', { email, password });
    alert('✅ Sign In - Connect to Supabase');
});

document.getElementById('signupForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;
    const terms = document.getElementById('authTerms').checked;

    if (password !== confirm) {
        alert('❌ Passwords do not match');
        return;
    }
    if (!terms) {
        alert('❌ Please agree to Terms & Conditions');
        return;
    }

    console.log('📝 Sign Up:', { name, email, password });
    alert('✅ Sign Up - Connect to Supabase');
});

document.getElementById('forgotForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value;
    console.log('🔑 Forgot Password:', { email });
    alert('📧 Password reset link sent to ' + email);
});

// Social Login
document.getElementById('authGoogle')?.addEventListener('click', () => {
    alert('🔐 Google Sign In - Connect to Supabase');
});
document.getElementById('authGoogleUp')?.addEventListener('click', () => {
    alert('📝 Google Sign Up - Connect to Supabase');
});
document.getElementById('authGitHub')?.addEventListener('click', () => {
    alert('🔐 GitHub Sign In - Connect to Supabase');
});
document.getElementById('authGitHubUp')?.addEventListener('click', () => {
    alert('📝 GitHub Sign Up - Connect to Supabase');
});

// Expose
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;