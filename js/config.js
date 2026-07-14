// ============================================
// APP CONFIGURATION
// ============================================

export const APP_CONFIG = {
    name: "The Consciousness of the Son",
    church: "Grace Spring Family Church",
    version: "1.0.0",
    year: 2026,

    // Bible API
    bible: {
        versions: ['NKJV', 'NIV', 'KJV', 'ESV'],
        defaultVersion: 'NKJV',
        apiBase: 'https://api.bible.org/v1',
        // Bible IDs for reference
        bibleIds: {
            'NKJV': 'de4e12af7f28f599-02',
            'NIV': '0529b3b3d5d4c9b7-01',
            'KJV': '06125adad2d5898a-01',
            'ESV': 'f061b6d2e7d8b6e5-01'
        }
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
