const { fetchMultipleTweetData, fetchSingleTweetWithRetry, getToken } = require('./your-module-file');
const nodeFetch = require('node-fetch');

jest.mock('node-fetch');

describe('Twitter Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchMultipleTweetData', () => {
    it('should fetch multiple tweets', async () => {
      const mockTweets = [
        { id: '1', text: 'Tweet 1' },
        { id: '2', text: 'Tweet 2' },
        { id: '3', text: 'Tweet 3' },
      ];
      nodeFetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ text: 'Mock tweet' }),
      });

      const result = await fetchMultipleTweetData(['1', '2', '3']);
      expect(result).toHaveLength(3);
      expect(nodeFetch).toHaveBeenCalledTimes(3);
    });

    it('should handle empty input', async () => {
      const result = await fetchMultipleTweetData([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('fetchSingleTweetWithRetry', () => {
    it('should fetch a single tweet successfully', async () => {
      nodeFetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ text: 'Mock tweet' }),
      });

      const result = await fetchSingleTweetWithRetry('123');
      expect(result).toEqual({ id: '123', text: 'Mock tweet' });
    });

    it('should retry on 503 error', async () => {
      nodeFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 503,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValue({ text: 'Mock tweet' }),
        });

      const result = await fetchSingleTweetWithRetry('123');
      expect(result).toEqual({ id: '123', text: 'Mock tweet' });
      expect(nodeFetch).toHaveBeenCalledTimes(2);
    });

    it('should return null after max retries', async () => {
      nodeFetch.mockResolvedValue({
        ok: false,
        status: 503,
      });

      const result = await fetchSingleTweetWithRetry('123', 3);
      expect(result).toBeNull();
      expect(nodeFetch).toHaveBeenCalledTimes(3);
    });
  });

  describe('getToken', () => {
    it('should generate a token for a given ID', () => {
      const token = getToken('123456789');
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });

    it('should generate different tokens for different IDs', () => {
      const token1 = getToken('123456789');
      const token2 = getToken('987654321');
      expect(token1).not.toBe(token2);
    });
  });

  describe('chunkArray', () => {
    it('should divide an array into chunks', () => {
      const array = [1, 2, 3, 4, 5, 6, 7];
      const result = chunkArray(array, 3);
      expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    });

    it('should handle empty arrays', () => {
      const result = chunkArray([], 3);
      expect(result).toEqual([]);
    });
  });
});
