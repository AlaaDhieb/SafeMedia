const express = require('express');
const { fetchMultipleTweetData } = require('../services/twitterService');
const { filterTweets } = require('../services/contentFilterService');
const rateLimit = require("express-rate-limit");
const { validationResult, query } = require('express-validator');

const router = express.Router();

// Configuration du rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

/**
 * @route GET /api/tweets
 * @desc Récupère et filtre les tweets spécifiés par leurs IDs
 * @access Public
 */
router.get('/tweets', 
    limiter, 
    [
        query('ids').isString().notEmpty().withMessage('Tweet IDs are required'),
        query('ids').custom(value => {
            const ids = value.split(',');
            return ids.every(id => /^\d+$/.test(id));
        }).withMessage('Invalid tweet ID format')
    ],
    async (req, res) => {
        // Validation des entrées
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const tweetIds = req.query.ids.split(',');
        console.log('Tweet IDs:', tweetIds);

        try {
            console.log('Fetching tweets...');
            const tweets = await fetchMultipleTweetData(tweetIds);
            console.log(`Fetched ${tweets.length} tweets`);

            if (tweets.length > 0) {
                console.log('Filtering tweets...');
                const filteredTweets = await filterTweets(tweets);
                console.log(`Filtered ${filteredTweets.length} tweets`);
                
                // Sanitize output
                const sanitizedTweets = filteredTweets.map(tweet => ({
                    id: tweet.id,
                    text: tweet.text.replace(/[<>&'"]/g, char => {
                        switch (char) {
                            case '<': return '&lt;';
                            case '>': return '&gt;';
                            case '&': return '&amp;';
                            case "'": return '&#39;';
                            case '"': return '&quot;';
                        }
                    })
                }));
                
                res.json({ tweets: sanitizedTweets });
            } else {
                console.log('No tweets fetched');
                res.status(404).json({ error: 'No tweets fetched' });
            }
        } catch (error) {
            console.error('Error in /tweets route:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);

module.exports = router;
