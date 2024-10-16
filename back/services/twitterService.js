const https = require('https');
const nodeFetch = require('node-fetch');
const { performance } = require('perf_hooks');

// Configuration
const MAX_RETRIES = 10;
const INITIAL_DELAY = 1000;
const MAX_CONCURRENT_REQUESTS = 5;

// Agent HTTPS avec vérification SSL désactivée (à utiliser avec précaution)
const agent = new https.Agent({
    rejectUnauthorized: false
});

/**
 * Récupère les données de plusieurs tweets.
 * @param {string[]} tweetIds - Liste des IDs de tweets à récupérer.
 * @returns {Promise<Object[]>} Liste des tweets récupérés.
 */
async function fetchMultipleTweetData(tweetIds) {
    console.log(`Fetching data for ${tweetIds.length} tweets`);
    const start = performance.now();

    const chunks = chunkArray(tweetIds, MAX_CONCURRENT_REQUESTS);
    let allTweets = [];

    for (const chunk of chunks) {
        const tweetPromises = chunk.map(tweetId => fetchSingleTweetWithRetry(tweetId));
        const chunkTweets = await Promise.all(tweetPromises);
        allTweets = allTweets.concat(chunkTweets.filter(tweet => tweet !== null));
    }

    const end = performance.now();
    console.log(`Fetched ${allTweets.length} tweets in ${(end - start).toFixed(2)}ms`);

    return allTweets;
}

/**
 * Récupère les données d'un seul tweet avec mécanisme de retry.
 * @param {string} tweetId - ID du tweet à récupérer.
 * @param {number} [maxRetries=MAX_RETRIES] - Nombre maximal de tentatives.
 * @param {number} [initialDelay=INITIAL_DELAY] - Délai initial entre les tentatives.
 * @returns {Promise<Object|null>} Données du tweet ou null en cas d'échec.
 */
async function fetchSingleTweetWithRetry(tweetId, maxRetries = MAX_RETRIES, initialDelay = INITIAL_DELAY) {
    const token = getToken(tweetId);
    const url = `https://cdn.syndication.twimg.com/tweet-result?id=${tweetId}&token=${token}`;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            console.log(`Fetching tweet ID: ${tweetId} (Attempt ${attempt + 1})`);
            const response = await nodeFetch(url, {
                agent,
                headers: {
                    'User-Agent': 'Safe/1.0'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                return { id: tweetId, text: data.text || 'Tweet content not available' };
            } else if (response.status === 503) {
                console.error(`Service Unavailable for tweet ID ${tweetId}. Retrying...`);
                await exponentialBackoff(attempt, initialDelay);
            } else {
                console.error(`Error fetching tweet data for ID ${tweetId}. Status: ${response.status}`);
                if (attempt === maxRetries - 1) return null;
                await exponentialBackoff(attempt, initialDelay);
            }
        } catch (error) {
            console.error(`Error fetching tweet data for ID ${tweetId}:`, error.message);
            if (attempt === maxRetries - 1) return null;
            await exponentialBackoff(attempt, initialDelay);
        }
    }

    return null;
}

/**
 * Implémente un délai exponentiel entre les tentatives.
 * @param {number} attempt - Numéro de la tentative actuelle.
 * @param {number} initialDelay - Délai initial en millisecondes.
 * @returns {Promise<void>}
 */
async function exponentialBackoff(attempt, initialDelay) {
    const delay = initialDelay * Math.pow(2, attempt);
    const jitter = Math.random() * 1000;
    await new Promise(resolve => setTimeout(resolve, delay + jitter));
}

/**
 * Génère un token pour un ID de tweet donné.
 * @param {string} id - ID du tweet.
 * @returns {string} Token généré.
 */
function getToken(id) {
    const token = ((Number(id) / 1e15) * Math.PI)
        .toString(36)
        .replace(/(0+|\.)/g, '');
    return token;
}

/**
 * Divise un tableau en sous-tableaux de taille spécifiée.
 * @param {Array} array - Tableau à diviser.
 * @param {number} size - Taille de chaque sous-tableau.
 * @returns {Array[]} Tableau de sous-tableaux.
 */
function chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

module.exports = {
    fetchMultipleTweetData,
    fetchSingleTweetWithRetry,
    getToken
};
