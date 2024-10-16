const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

// Configuration de l'API OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

/**
 * Filtre une liste de tweets en utilisant l'API de modération d'OpenAI.
 * @param {Array} tweets - Liste des tweets à filtrer.
 * @returns {Promise<Array>} Liste des tweets appropriés.
 */
async function filterTweets(tweets) {
    const filteredTweets = [];
    // Nombre de tweets à traiter en parallèle
    const batchSize = 10; 

    for (let i = 0; i < tweets.length; i += batchSize) {
        const batch = tweets.slice(i, i + batchSize);
        const results = await Promise.all(batch.map(tweet => isContentAppropriate(tweet.text)));
        
        for (let j = 0; j < batch.length; j++) {
            if (results[j]) {
                filteredTweets.push(batch[j]);
            }
        }
    }

    return filteredTweets;
}

/**
 * Vérifie si le contenu d'un tweet est approprié.
 * @param {string} text - Texte du tweet à vérifier.
 * @returns {Promise<boolean>} True si le contenu est approprié, false sinon.
 */
async function isContentAppropriate(text) {
    try {
        const response = await openai.createModeration({
            input: text,
        });
        const result = response.data.results[0];
        return !result.flagged;
    } catch (error) {
        handleModerationError(error);
        // Par défaut, considérer le contenu comme inapproprié en cas d'erreur
        return false;
    }
}

/**
 * Gère les erreurs lors de la modération du contenu.
 * @param {Error} error - L'erreur survenue.
 */
function handleModerationError(error) {
    if (error.response && error.response.status === 403) {
        console.error("Accès refusé à l'API OpenAI. Vérifiez votre clé API et les limites de votre compte.");
    } else if (error.response && error.response.status === 429) {
        console.error("Limite de taux atteinte pour l'API OpenAI. Réessayez plus tard.");
    } else {
        console.error('Erreur lors de la modération du contenu:', error.message);
    }
}

module.exports = { filterTweets };
