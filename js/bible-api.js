// ============================================
// BIBLE API - Free Bible API (no key required)
// ============================================

// Bible API endpoints
const API_BASE = 'https://api.bible.org/v1';

// Bible IDs for different versions
// From https://api.bible.org/v1/bibles
const BIBLE_IDS = {
    'NKJV': 'de4e12af7f28f599-02',   // New King James Version
    'NIV': '0529b3b3d5d4c9b7-01',     // New International Version
    'KJV': '06125adad2d5898a-01',     // King James Version
    'ESV': 'f061b6d2e7d8b6e5-01'      // English Standard Version
};

// Bible book names and chapter counts (for navigation)
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

// Book name abbreviations for API
const BOOK_ABBREVIATIONS = {
    'Genesis': 'GEN', 'Exodus': 'EXO', 'Leviticus': 'LEV', 'Numbers': 'NUM',
    'Deuteronomy': 'DEU', 'Joshua': 'JOS', 'Judges': 'JDG', 'Ruth': 'RUT',
    '1 Samuel': '1SA', '2 Samuel': '2SA', '1 Kings': '1KI', '2 Kings': '2KI',
    '1 Chronicles': '1CH', '2 Chronicles': '2CH', 'Ezra': 'EZR', 'Nehemiah': 'NEH',
    'Esther': 'EST', 'Job': 'JOB', 'Psalms': 'PSA', 'Proverbs': 'PRO',
    'Ecclesiastes': 'ECC', 'Song of Solomon': 'SNG', 'Isaiah': 'ISA', 'Jeremiah': 'JER',
    'Lamentations': 'LAM', 'Ezekiel': 'EZK', 'Daniel': 'DAN', 'Hosea': 'HOS',
    'Joel': 'JOL', 'Amos': 'AMO', 'Obadiah': 'OBA', 'Jonah': 'JON',
    'Micah': 'MIC', 'Nahum': 'NAM', 'Habakkuk': 'HAB', 'Zephaniah': 'ZEP',
    'Haggai': 'HAG', 'Zechariah': 'ZEC', 'Malachi': 'MAL',
    'Matthew': 'MAT', 'Mark': 'MRK', 'Luke': 'LUK', 'John': 'JHN',
    'Acts': 'ACT', 'Romans': 'ROM', '1 Corinthians': '1CO', '2 Corinthians': '2CO',
    'Galatians': 'GAL', 'Ephesians': 'EPH', 'Philippians': 'PHP', 'Colossians': 'COL',
    '1 Thessalonians': '1TH', '2 Thessalonians': '2TH', '1 Timothy': '1TI', '2 Timothy': '2TI',
    'Titus': 'TIT', 'Philemon': 'PHM', 'Hebrews': 'HEB', 'James': 'JAS',
    '1 Peter': '1PE', '2 Peter': '2PE', '1 John': '1JN', '2 John': '2JN',
    '3 John': '3JN', 'Jude': 'JUD', 'Revelation': 'REV'
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
 * Get the Bible ID for a version
 */
function getBibleId(version) {
    return BIBLE_IDS[version] || BIBLE_IDS['NKJV'];
}

/**
 * Get book abbreviation
 */
function getBookAbbreviation(book) {
    return BOOK_ABBREVIATIONS[book] || book.toUpperCase();
}

/**
 * Fetch chapters for a book (returns list of chapter numbers)
 */
export async function fetchBookChapters(book, version = 'NKJV') {
    const bibleId = getBibleId(version);
    const bookId = getBookAbbreviation(book);
    
    try {
        const response = await fetch(
            `${API_BASE}/bibles/${bibleId}/books/${bookId}/chapters`
        );
        const data = await response.json();
        if (data.data) {
            return data.data.map(ch => ch.number);
        }
        return Array.from({length: BIBLE_BOOKS[book] || 30}, (_, i) => i + 1);
    } catch (error) {
        console.warn('Error fetching chapters, using fallback:', error);
        return Array.from({length: BIBLE_BOOKS[book] || 30}, (_, i) => i + 1);
    }
}

/**
 * Fetch verses for a chapter
 */
export async function fetchChapterVerses(book, chapter, version = 'NKJV') {
    const bibleId = getBibleId(version);
    const bookId = getBookAbbreviation(book);
    
    try {
        // Format: GEN.1
        const chapterId = `${bookId}.${chapter}`;
        const response = await fetch(
            `${API_BASE}/bibles/${bibleId}/chapters/${chapterId}/verses`
        );
        const data = await response.json();
        
        if (data.data) {
            return data.data.map(v => ({
                verse: v.reference.split(':')[1] || v.number,
                text: v.text
            }));
        }
        return getFallbackVerses(book, chapter, version);
    } catch (error) {
        console.warn('Error fetching verses, using fallback:', error);
        return getFallbackVerses(book, chapter, version);
    }
}

/**
 * Fallback verses if API fails
 */
function getFallbackVerses(book, chapter, version) {
    const count = Math.min(BIBLE_BOOKS[book] || 30, 20);
    return Array.from({length: count}, (_, i) => ({
        verse: i + 1,
        text: `${book} ${chapter}:${i + 1} (${version}) — Please check your internet connection and try again.`
    }));
}

/**
 * Search Bible
 */
export async function searchBible(query, version = 'NKJV') {
    if (!query || query.trim().length < 2) {
        return [];
    }
    
    const bibleId = getBibleId(version);
    
    try {
        const response = await fetch(
            `${API_BASE}/bibles/${bibleId}/search?query=${encodeURIComponent(query)}&limit=20`
        );
        const data = await response.json();
        
        if (data.data) {
            return data.data.map(result => ({
                reference: result.reference,
                text: result.text,
                verseId: result.id
            }));
        }
        return [];
    } catch (error) {
        console.warn('Search error:', error);
        return [];
    }
}

/**
 * Get a single verse by reference (e.g., "John 3:16")
 */
export async function fetchVerse(reference, version = 'NKJV') {
    const bibleId = getBibleId(version);
    
    try {
        const response = await fetch(
            `${API_BASE}/bibles/${bibleId}/verses/${encodeURIComponent(reference)}`
        );
        const data = await response.json();
        if (data.data) {
            return {
                reference: data.data.reference,
                text: data.data.text
            };
        }
        return null;
    } catch (error) {
        console.warn('Error fetching verse:', error);
        return null;
    }
}

/**
 * Get a random verse
 */
export async function fetchRandomVerse(version = 'NKJV') {
    const bibleId = getBibleId(version);
    
    try {
        const response = await fetch(
            `${API_BASE}/bibles/${bibleId}/verses/random`
        );
        const data = await response.json();
        if (data.data) {
            return {
                reference: data.data.reference,
                text: data.data.text
            };
        }
        return null;
    } catch (error) {
        console.warn('Error fetching random verse:', error);
        return null;
    }
}

/**
 * Get available Bible versions
 */
export function getAvailableVersions() {
    return Object.keys(BIBLE_IDS);
}

export default {
    getBibleBooks,
    getTotalChapters,
    fetchBookChapters,
    fetchChapterVerses,
    searchBible,
    fetchVerse,
    fetchRandomVerse,
    getAvailableVersions
};
