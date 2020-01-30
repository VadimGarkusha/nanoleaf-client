import NanoleafClient from '../src/nanoleaf-client.js';
import NanoleafHttpClient from '../src/nanoleaf-http-client.js';
import { HttpError } from '../src/models/index.js';

jest.mock('../src/nanoleaf-http-client.js');

const host = '';
const token = '';

beforeEach(() => {
  NanoleafHttpClient.mockClear();
});

describe('NanoleafClient constructor', () => {
  it('Constructor accepts 2 arguments: host, token', () => {
    expect(NanoleafHttpClient).not.toHaveBeenCalled();
    const client = new NanoleafClient(host, token);
    expect(NanoleafHttpClient).toHaveBeenCalledTimes(1);
    expect(client._client).not.toBeNull();
  });

  it('Constructor accepts 1 argument: host', () => {
    expect(NanoleafHttpClient).not.toHaveBeenCalled();
    const client = new NanoleafClient(host);
    expect(NanoleafHttpClient).toHaveBeenCalledTimes(1);
    expect(client._client).not.toBeNull();
  });
});

describe('NanoleafClient getPowerStatus', () => {
  it('Returns Successful result', () => {
    const client = new NanoleafClient(host);
    const brightness = {
      value: 10,
      max: 100,
      min: 0
    };

    mockHttpClientGetRequest(client, brightness);

    client.getBrightness('').then(result => {
      expect(result.min).toBe(brightness.min);
      expect(result.max).toBe(brightness.max);
      expect(result.value).toBe(brightness.value);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientGetRequest(client, error);

    client.getBrightness('').then(result => {
      expect(result.message).toBe(error.message);
      expect(result.status).toBe(error.status);
    });
  });
});

const mockHttpClientGetRequest = (client, returnValue) => {
  const mockGetRequest = jest.fn();
  client._client.getRequest = mockGetRequest;

  mockGetRequest.mockReturnValue(Promise.resolve(returnValue));
};
