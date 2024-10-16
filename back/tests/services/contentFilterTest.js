const { filterTweets } = require('./your-module-file');
const { Configuration, OpenAIApi } = require("openai");

jest.mock("openai");

describe('Tweet Filtering Service', () => {
  let mockCreateModeration;

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateModeration = jest.fn();
    OpenAIApi.mockImplementation(() => ({
      createModeration: mockCreateModeration
    }));
  });

  describe('filterTweets', () => {
    it('should filter out inappropriate tweets', async () => {
      const tweets = [
        { id: '1', text: 'Good tweet' },
        { id: '2', text: 'Bad tweet' },
        { id: '3', text: 'Another good tweet' }
      ];

      mockCreateModeration
        .mockResolvedValueOnce({ data: { results: [{ flagged: false }] } })
        .mockResolvedValueOnce({ data: { results: [{ flagged: true }] } })
        .mockResolvedValueOnce({ data: { results: [{ flagged: false }] } });

      const filteredTweets = await filterTweets(tweets);

      expect(filteredTweets).toHaveLength(2);
      expect(filteredTweets[0].id).toBe('1');
      expect(filteredTweets[1].id).toBe('3');
    });

    it('should handle empty input', async () => {
      const filteredTweets = await filterTweets([]);
      expect(filteredTweets).toHaveLength(0);
    });

    it('should process tweets in batches', async () => {
      const tweets = Array(25).fill().map((_, i) => ({ id: `${i}`, text: `Tweet ${i}` }));

      mockCreateModeration.mockResolvedValue({ data: { results: [{ flagged: false }] } });

      await filterTweets(tweets);

      expect(mockCreateModeration).toHaveBeenCalledTimes(25);
    });

    it('should handle API errors gracefully', async () => {
      const tweets = [{ id: '1', text: 'Test tweet' }];

      mockCreateModeration.mockRejectedValue(new Error('API Error'));

      const filteredTweets = await filterTweets(tweets);

      expect(filteredTweets).toHaveLength(0);
    });

    it('should handle rate limiting errors', async () => {
      const tweets = [{ id: '1', text: 'Test tweet' }];

      mockCreateModeration.mockRejectedValue({ response: { status: 429 } });

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const filteredTweets = await filterTweets(tweets);

      expect(filteredTweets).toHaveLength(0);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Limite de taux atteinte"));

      consoleSpy.mockRestore();
    });
  });
});
