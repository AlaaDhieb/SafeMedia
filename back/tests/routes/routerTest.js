const request = require('supertest');
const express = require('express');
const router = require('../../routes/api');
const { fetchMultipleTweetData } = require('../../services/twitterService');
const { filterTweets } = require('../../services/contentFilterService');

jest.mock('../services/twitterService');
jest.mock('../services/contentFilterService');

const app = express();
app.use(express.json());
app.use('/api', router);

describe('GET /api/tweets', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if no tweet IDs are provided', async () => {
    const response = await request(app).get('/api/tweets');
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should return 400 if invalid tweet ID format is provided', async () => {
    const response = await request(app).get('/api/tweets?ids=123,abc');
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should return 404 if no tweets are fetched', async () => {
    fetchMultipleTweetData.mockResolvedValue([]);
    const response = await request(app).get('/api/tweets?ids=123,456');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('No tweets fetched');
  });

  it('should return sanitized tweets', async () => {
    const mockTweets = [
      { id: '123', text: 'Hello <script>alert("XSS")</script>' },
      { id: '456', text: 'Normal tweet' }
    ];
    const mockFilteredTweets = [
      { id: '123', text: 'Hello <script>alert("XSS")</script>' },
      { id: '456', text: 'Normal tweet' }
    ];
    fetchMultipleTweetData.mockResolvedValue(mockTweets);
    filterTweets.mockResolvedValue(mockFilteredTweets);

    const response = await request(app).get('/api/tweets?ids=123,456');
    expect(response.status).toBe(200);
    expect(response.body.tweets).toBeDefined();
    expect(response.body.tweets[0].text).not.toContain('<script>');
    expect(response.body.tweets[1].text).toBe('Normal tweet');
  });

  it('should handle internal server error', async () => {
    fetchMultipleTweetData.mockRejectedValue(new Error('Internal error'));
    const response = await request(app).get('/api/tweets?ids=123,456');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Internal server error');
  });

  it('should respect rate limiting', async () => {
    const requests = Array(101).fill().map(() => request(app).get('/api/tweets?ids=123'));
    const responses = await Promise.all(requests);
    const tooManyRequests = responses.filter(r => r.status === 429);
    expect(tooManyRequests.length).toBeGreaterThan(0);
  });
});
