// Bible API - KJV Only
const BOOK_IDS = {
    'Genesis': 'gen', 'Exodus': 'exo', 'Leviticus': 'lev', 'Numbers': 'num',
    'Deuteronomy': 'deu', 'Joshua': 'jos', 'Judges': 'jdg', 'Ruth': 'rut',
    '1 Samuel': '1sa', '2 Samuel': '2sa', '1 Kings': '1ki', '2 Kings': '2ki',
    '1 Chronicles': '1ch', '2 Chronicles': '2ch', 'Ezra': 'ezr', 'Nehemiah': 'neh',
    'Esther': 'est', 'Job': 'job', 'Psalms': 'psa', 'Proverbs': 'pro',
    'Ecclesiastes': 'ecc', 'Song of Solomon': 'sng', 'Isaiah': 'isa', 'Jeremiah': 'jer',
    'Lamentations': 'lam', 'Ezekiel': 'ezk', 'Daniel': 'dan', 'Hosea': 'hos',
    'Joel': 'jol', 'Amos': 'amo', 'Obadiah': 'oba', 'Jonah': 'jon',
    'Micah': 'mic', 'Nahum': 'nam', 'Habakkuk': 'hab', 'Zephaniah': 'zep',
    'Haggai': 'hag', 'Zechariah': 'zec', 'Malachi': 'mal',
    'Matthew': 'mat', 'Mark': 'mrk', 'Luke': 'luk', 'John': 'jhn',
    'Acts': 'act', 'Romans': 'rom', '1 Corinthians': '1co', '2 Corinthians': '2co',
    'Galatians': 'gal', 'Ephesians': 'eph', 'Philippians': 'php', 'Colossians': 'col',
    '1 Thessalonians': '1th', '2 Thessalonians': '2th', '1 Timothy': '1ti', '2 Timothy': '2ti',
    'Titus': 'tit', 'Philemon': 'phm', 'Hebrews': 'heb', 'James': 'jas',
    '1 Peter': '1pe', '2 Peter': '2pe', '1 John': '1jn', '2 John': '2jn',
    '3 John': '3jn', 'Jude': 'jud', 'Revelation': 'rev'
};

const CHAPTER_COUNTS = {
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

export function getTotalChapters(book) {
    return CHAPTER_COUNTS[book] || 30;
}

export async function fetchChapterVerses(book, chapter) {
    const bookId = BOOK_IDS[book];
    if (!bookId) {
        console.error('Book not found:', book);
        return [];
    }

    try {
        const url = `https://bible-api.com/${bookId}+${chapter}?translation=kjv`;
        const response = await fetch(url);

        if (!response.ok) {
            console.error('API Error:', response.status);
            return [];
        }

        const data = await response.json();

        if (data && data.verses && data.verses.length > 0) {
            return data.verses.map(v => ({
                verse: v.verse,
                text: v.text.trim()
            }));
        }
        return [];
    } catch (error) {
        console.error('Error fetching verses:', error);
        return [];
    }
}

export async function searchBible(query) {
    if (!query || query.trim().length < 2) return [];

    try {
        const url = `https://bible-api.com/search?query=${encodeURIComponent(query)}&translation=kjv`;
        const response = await fetch(url);

        if (!response.ok) return [];

        const data = await response.json();

        if (data && data.results) {
            return data.results.slice(0, 20).map(r => ({
                reference: `${r.book} ${r.chapter}:${r.verse}`,
                text: r.text
            }));
        }
        return [];
    } catch (error) {
        console.warn('Search error:', error);
        return [];
    }
}