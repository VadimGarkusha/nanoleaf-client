import NanoleafHttpClient from '../src/nanoleaf-http-client.js';
import axios from 'axios';
import HttpError from '../src/models/error.js';
import { HttpResponse } from '../src/models/index.js';
jest.mock('axios');

const host = 'host';
const token = 'token';

describe('NanoleafHttpClient constructor', () => {
  it('Constructor accepts 2 arguments: host, token', () => {
    const httpClient = new NanoleafHttpClient(host, token);

    expect(httpClient._token).toBe(token);
    expect(httpClient._host.href).toBe('http://host:16021/api/v1/token/');
  });

  it('Constructor accepts 1 argument: host', () => {
    const httpClient = new NanoleafHttpClient(host);

    expect(httpClient._token).toBeUndefined();
    expect(httpClient._host.href).toBe('http://host:16021/api/v1/');
  });
});

describe('NanoleafHttpClient authorize', () => {
  it('Authorize sets token', () => {
    const httpClient = new NanoleafHttpClient(host);

    httpClient.authorize(token);
    expect(httpClient._token).toBe(token);
  });

  test.each(['', null, undefined])(
    'Authorize doesnt set null, empty string, or undefined',
    _token => {
      const httpClient = new NanoleafHttpClient(host);

      httpClient.authorize(_token);
      expect(httpClient._token).toBeUndefined();
    }
  );
});

describe('NanoleafHttpClient getRequest', () => {
  it('Returns data when request succeeded', () => {
    const httpClient = new NanoleafHttpClient(host);
    const resp = { data: { message: 'successful response' } };

    axios.get.mockImplementation(() => Promise.resolve(resp));

    return httpClient.getRequest().then(data => {
      expect(data).toBe(resp.data);
    });
  });

  it('Returns HttpError when request failed', () => {
    const httpClient = new NanoleafHttpClient(host);
    const resp = { response: { status: 400 } };

    axios.get.mockImplementation(() => Promise.reject(resp));

    return httpClient.getRequest().then(error => {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(resp.response.status);
      expect(error.message).toBe('Bad request');
    });
  });
});

describe('NanoleafHttpClient getRequest', () => {
  it('Returns data when request succeeded', () => {
    const httpClient = new NanoleafHttpClient(host);
    const resp = { data: { message: 'successful response' } };

    axios.get.mockImplementation(() => Promise.resolve(resp));

    return httpClient.getRequest().then(data => {
      expect(data).toBe(resp.data);
    });
  });

  it('Returns HttpError when request failed', () => {
    const httpClient = new NanoleafHttpClient(host);
    const resp = { response: { status: 400 } };

    axios.get.mockImplementation(() => Promise.reject(resp));

    return httpClient.getRequest().then(error => {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(resp.response.status);
      expect(error.message).toBe('Bad request');
    });
  });
});

describe('NanoleafHttpClient putRequest', () => {
  it('Returns HttpResponse when request succeeded', () => {
    const httpClient = new NanoleafHttpClient(host);
    const resp = { status: 200, statusText: 'Request succeeded' };

    axios.put.mockImplementation(() => Promise.resolve(resp));

    return httpClient.putRequest().then(data => {
      expect(data).toBeInstanceOf(HttpResponse);
      expect(data.status).toBe(resp.status);
      expect(data.message).toBe(resp.statusText);
    });
  });

  it('Returns HttpError when request failed', () => {
    const httpClient = new NanoleafHttpClient(host);
    const resp = { response: { status: 400 } };

    axios.put.mockImplementation(() => Promise.reject(resp));

    return httpClient.putRequest().then(error => {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(resp.response.status);
      expect(error.message).toBe('Bad request');
    });
  });
});

describe('NanoleafHttpClient postRequest', () => {
  it('Returns HttpResponse when request succeeded', () => {
    const httpClient = new NanoleafHttpClient(host);
    const resp = { status: 200, statusText: 'Request succeeded' };

    axios.post.mockImplementation(() => Promise.resolve(resp));

    return httpClient.postRequest().then(data => {
      expect(data).toBeInstanceOf(HttpResponse);
      expect(data.status).toBe(resp.status);
      expect(data.message).toBe(resp.statusText);
    });
  });

  it('Returns HttpError when request failed', () => {
    const httpClient = new NanoleafHttpClient(host);
    const resp = { response: { status: 400 } };

    axios.post.mockImplementation(() => Promise.reject(resp));

    return httpClient.postRequest().then(error => {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(resp.response.status);
      expect(error.message).toBe('Bad request');
    });
  });
});

describe('NanoleafHttpClient _handleErrorResponse', () => {
  test.each([
    [400, 'Bad request'],
    [401, 'Request was not authorized'],
    [403, 'Request is forbidden'],
    [404, 'Resource not found'],
    [422, 'Unprocessable entity'],
    [500, 'Internal server error']
  ])(
    '_handleErrorResponse returns HttpError with error message mapped to http status',
    (statusCode, message) => {
      const httpClient = new NanoleafHttpClient(host);

      const httpError = httpClient._handleErrorResponse({response: {status: statusCode} });
      expect(httpError).toBeInstanceOf(HttpError);
      expect(httpError.status).toBe(statusCode);
      expect(httpError.message).toBe(message);
    }
  );
});
