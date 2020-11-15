import NanoleafClient from '../src/nanoleaf-client.js';
import NanoleafHttpClient from '../src/nanoleaf-http-client.js';
import {
  HttpError,
  HttpResponse,
  PowerStatus,
  Info,
  Saturation,
  Brightness,
  Hue,
  ColorTemperature,
  GlobalOrientation,
  Effect,
  EffectsDetails,
} from '../src/models/index.js';

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
  it('Returns Power Status', () => {
    const client = new NanoleafClient(host);
    const powerStatus = {
      value: true
    };

    mockHttpClientGetRequest(client, powerStatus);

    return client.getPowerStatus().then(result => {
      expect(result).toBeInstanceOf(PowerStatus);
      expect(result.value).toBe(powerStatus.value);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientGetRequest(client, error);

    return client.getPowerStatus().then(result => {
      assertForGenericRequest(error, result);
    });
  });
});

describe('NanoleafClient getInfo', () => {
  it('Returns Device Info', () => {
    const client = new NanoleafClient(host);
    const info = {
      name: 'Test name',
      serialNo: '123',
      manufacturer: 'Nanoleaf',
      firmwareVersion: '12',
      hardwareVersion: '13'
    };

    mockHttpClientGetRequest(client, info);

    return client.getInfo().then(result => {
      expect(result).toBeInstanceOf(Info);
      expect(result.name).toBe(info.name);
      expect(result.serialNo).toBe(info.serialNo);
      expect(result.manufacturer).toBe(info.manufacturer);
      expect(result.firmwareVersion).toBe(info.firmwareVersion);
      expect(result.hardwareVersion).toBe(info.hardwareVersion);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientGetRequest(client, error);

    return client.getInfo().then(result => {
      expect(result.message).toBe(error.message);
      expect(result.status).toBe(error.status);
    });
  });
});

describe('NanoleafClient Identify', () => {
  it('Returns Successful Response', () => {
    const client = new NanoleafClient(host);
    const response = new HttpResponse(200, 'Successful request');

    mockHttpClientPutRequest(client, response);

    return client.identify().then(result => {
      assertForGenericRequest(result, response);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientPutRequest(client, error);

    return client.identify().then(result => {
      assertForGenericRequest(result, error);
    });
  });
});

describe('NanoleafClient turnOn', () => {
  it('Returns Successful Response', () => {
    const client = new NanoleafClient(host);
    const response = new HttpResponse(200, 'Successful request');

    mockHttpClientPutRequest(client, response);

    return client.turnOn().then(result => {
      assertForGenericRequest(result, response);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientPutRequest(client, error);

    return client.turnOn().then(result => {
      assertForGenericRequest(result, error);
    });
  });
});

describe('NanoleafClient turnOff', () => {
  it('Returns Successful Response', () => {
    const client = new NanoleafClient(host);
    const response = new HttpResponse(200, 'Successful request');

    mockHttpClientPutRequest(client, response);

    return client.turnOff().then(result => {
      assertForGenericRequest(result, response);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientPutRequest(client, error);

    return client.turnOff().then(result => {
      assertForGenericRequest(result, error);
    });
  });
});

describe('NanoleafClient power, power off', () => {
  it('Returns Successful Response', () => {
    const client = new NanoleafClient(host);
    const response = new HttpResponse(204, 'Successful request');

    mockHttpClientPutRequest(client, response);

    return client.power(false).then(result => {
      assertForGenericRequest(result, response);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientPutRequest(client, error);

    return client.power(false).then(result => {
      assertForGenericRequest(result, error);
    });
  });
});


describe('NanoleafClient power, power on', () => {
  it('Returns Successful Response', () => {
    const client = new NanoleafClient(host);
    const response = new HttpResponse(204, 'Successful request');

    mockHttpClientPutRequest(client, response);

    return client.power(true).then(result => {
      assertForGenericRequest(result, response);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientPutRequest(client, error);

    return client.power(true).then(result => {
      assertForGenericRequest(result, error);
    });
  });
});

describe('NanoleafClient authorize', () => {
  it('Returns Auth Token', () => {
    const client = new NanoleafClient(host);
    const response = {
      data: { auth_token: 'some token' },
    };

    mockHttpClientPostRequest(client, response);

    return client.authorize().then((result) => {
      expect(result).toBe(response.data.auth_token);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientPostRequest(client, error);

    return client.authorize().then(result => {
      assertForGenericRequest(result, error);
    });
  });
});

describe('NanoleafClient getSaturation', () => {
  it('Returns Saturation', () => {
    const client = new NanoleafClient(host);
    const saturation = {
      value: 10,
      max: 100,
      min: 0
    };

    mockHttpClientGetRequest(client, saturation);

    return client.getSaturation().then(result => {
      expect(result).toBeInstanceOf(Saturation);
      expect(result.min).toBe(saturation.min);
      expect(result.max).toBe(saturation.max);
      expect(result.value).toBe(saturation.value);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientGetRequest(client, error);

    return client.getSaturation().then(result => {
      assertForGenericRequest(error, result);
    });
  });
});

describe('NanoleafClient setSaturation', () => {
  it('Returns Successful Response', () => {
    const client = new NanoleafClient(host);
    const response = new HttpResponse(200, 'Successful request');

    mockHttpClientPutRequest(client, response);

    return client.setSaturation().then(result => {
      assertForGenericRequest(result, response);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientPutRequest(client, error);

    return client.setSaturation().then(result => {
      assertForGenericRequest(result, error);
    });
  });
});

describe('NanoleafClient incrementSaturation', () => {
  it('Returns Successful Response', () => {
    const client = new NanoleafClient(host);
    const response = new HttpResponse(200, 'Successful request');

    mockHttpClientPutRequest(client, response);

    return client.incrementSaturation().then(result => {
      assertForGenericRequest(result, response);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientPutRequest(client, error);

    return client.incrementSaturation().then(result => {
      assertForGenericRequest(result, error);
    });
  });
});

describe('NanoleafClient getBrightness', () => {
  it('Returns Brightness', () => {
    const client = new NanoleafClient(host);
    const brightness = {
      value: 10,
      max: 100,
      min: 0
    };

    mockHttpClientGetRequest(client, brightness);

    return client.getBrightness().then(result => {
      expect(result).toBeInstanceOf(Brightness);
      expect(result.min).toBe(brightness.min);
      expect(result.max).toBe(brightness.max);
      expect(result.value).toBe(brightness.value);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientGetRequest(client, error);

    return client.getBrightness().then(result => {
      expect(result.message).toBe(error.message);
      expect(result.status).toBe(error.status);
    });
  });
});

describe('NanoleafClient setBrightness', () => {
  it('Returns Successful Response', () => {
    const client = new NanoleafClient(host);
    const response = new HttpResponse(200, 'Successful request');

    mockHttpClientPutRequest(client, response);

    return client.setBrightness().then(result => {
      assertForGenericRequest(result, response);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientPutRequest(client, error);

    return client.setBrightness().then(result => {
      assertForGenericRequest(result, error);
    });
  });
});

describe('NanoleafClient increaseBrightness', () => {
  it('Returns Successful Response', () => {
    const client = new NanoleafClient(host);
    const response = new HttpResponse(200, 'Successful request');

    mockHttpClientPutRequest(client, response);

    return client.increaseBrightness().then(result => {
      assertForGenericRequest(result, response);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientPutRequest(client, error);

    return client.increaseBrightness().then(result => {
      assertForGenericRequest(result, error);
    });
  });
});

describe('NanoleafClient setDurationBrightness', () => {
  it('Returns Successful Response', () => {
    const client = new NanoleafClient(host);
    const response = new HttpResponse(200, 'Successful request');
    const durationBrightness = {
      brightness: {
        value: 12,
        duration: 5
      }
    };

    mockHttpClientPutRequest(client, response);

    return client.setDurationBrightness(durationBrightness).then(result => {
      assertForGenericRequest(result, response);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientPutRequest(client, error);

    return client.setDurationBrightness().then(result => {
      assertForGenericRequest(result, error);
    });
  });
});

describe('NanoleafClient getHue', () => {
  it('Returns Hue', () => {
    const client = new NanoleafClient(host);
    const hue = {
      value: 10,
      max: 100,
      min: 0
    };

    mockHttpClientGetRequest(client, hue);

    return client.getHue().then(result => {
      expect(result).toBeInstanceOf(Hue);
      expect(result.min).toBe(hue.min);
      expect(result.max).toBe(hue.max);
      expect(result.value).toBe(hue.value);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientGetRequest(client, error);

    return client.getHue().then(result => {
      expect(result.message).toBe(error.message);
      expect(result.status).toBe(error.status);
    });
  });
});

describe('NanoleafClient setHue', () => {
  it('Returns Successful Response', () => {
    const client = new NanoleafClient(host);
    const response = new HttpResponse(200, 'Successful request');

    mockHttpClientPutRequest(client, response);

    return client.setHue().then(result => {
      assertForGenericRequest(result, response);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientPutRequest(client, error);

    return client.setHue().then(result => {
      assertForGenericRequest(result, error);
    });
  });
});

describe('NanoleafClient increaseHue', () => {
  it('Returns Successful Response', () => {
    const client = new NanoleafClient(host);
    const response = new HttpResponse(200, 'Successful request');

    mockHttpClientPutRequest(client, response);

    client.increaseHue().then(result => {
      assertForGenericRequest(result, response);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientPutRequest(client, error);

    return client.increaseHue().then(result => {
      assertForGenericRequest(result, error);
    });
  });
});

describe('NanoleafClient getColorTemperature', () => {
  it('Returns Color Temperature', () => {
    const client = new NanoleafClient(host);
    const colorTemperature = {
      value: 10,
      max: 100,
      min: 0
    };

    mockHttpClientGetRequest(client, colorTemperature);

    return client.getColorTemperature().then(result => {
      expect(result).toBeInstanceOf(ColorTemperature);
      expect(result.min).toBe(colorTemperature.min);
      expect(result.max).toBe(colorTemperature.max);
      expect(result.value).toBe(colorTemperature.value);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientGetRequest(client, error);

    return client.getColorTemperature().then(result => {
      expect(result.message).toBe(error.message);
      expect(result.status).toBe(error.status);
    });
  });
});

describe('NanoleafClient setColorTemperature', () => {
  it('Returns Successful Response', () => {
    const client = new NanoleafClient(host);
    const response = new HttpResponse(200, 'Successful request');

    mockHttpClientPutRequest(client, response);

    return client.setColorTemperature().then(result => {
      assertForGenericRequest(result, response);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientPutRequest(client, error);

    return client.setColorTemperature().then(result => {
      assertForGenericRequest(result, error);
    });
  });
});

describe('NanoleafClient incrementColorTemperature', () => {
  it('Returns Successful Response', () => {
    const client = new NanoleafClient(host);
    const response = new HttpResponse(200, 'Successful request');

    mockHttpClientPutRequest(client, response);

    return client.incrementColorTemperature().then(result => {
      assertForGenericRequest(result, response);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientPutRequest(client, error);

    return client.incrementColorTemperature().then(result => {
      assertForGenericRequest(result, error);
    });
  });
});

describe('NanoleafClient getColorMode', () => {
  it('Returns Color Mode', () => {
    const client = new NanoleafClient(host);
    const colorMode = 'color mode';

    mockHttpClientGetRequest(client, colorMode);

    return client.getColorMode().then(result => {
      expect(result).toBe(colorMode);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientGetRequest(client, error);

    return client.getColorMode().then(result => {
      expect(result.message).toBe(error.message);
      expect(result.status).toBe(error.status);
    });
  });
});

describe('NanoleafClient getSelectedEffect', () => {
  it('Returns Effect', () => {
    const client = new NanoleafClient(host);
    const effect = 'effect';

    mockHttpClientGetRequest(client, effect);

    return client.getSelectedEffect().then(result => {
      expect(result).toBe(effect);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientGetRequest(client, error);

    return client.getSelectedEffect().then(result => {
      expect(result.message).toBe(error.message);
      expect(result.status).toBe(error.status);
    });
  });
});

describe('NanoleafClient getAllEffectsInfo', () => {
  it('Returns Effects', () => {
    const client = new NanoleafClient(host);
    const effectsDetails = {
      animations: [
        {
          version: '2.0',
          animName: 'Blood Dripping',
          animType: 'plugin',
          colorType: 'HSB',
        }
      ]};

    mockHttpClientPutRequest(client, effectsDetails);

    return client.getEffectsInfo().then(result => {
      expect(EffectsDetails).toBeInstanceOf(EffectsDetails);
      expect(effectsDetails.animations[0].version).toBe(result.animations[0].version);
      expect(effectsDetails.animations[0].animName).toBe(result.animations[0].animName);
      expect(effectsDetails.animations[0].animType).toBe(result.animations[0].animType);
      expect(effectsDetails.animations[0].colorType).toBe(result.animations[0].colorType);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientPutRequest(client, error);

    return client.getEffectsInfo().then(result => {
      expect(result.message).toBe(error.message);
      expect(result.status).toBe(error.status);
    });
  });
});

describe('NanoleafClient getEffectInfo', () => {
  it('Returns Successful Response', () => {
    const client = new NanoleafClient(host);
    const response = {
      version: '2.0',
      animName: 'Nemo',
      animType: 'plugin',
      colorType: 'HSB',
      palette: [
        { hue: 23, saturation: 100, brightness: 100, probability: 0 },
        { hue: 108, saturation: 5, brightness: 100, probability: 0 }
      ],
      pluginType: 'color',
      pluginUuid: '70b7c636-6bf8-491f-89c1-f4103508d642',
      pluginOptions: [
        { name: 'delayTime', value: 12 },
        { name: 'loop', value: true },
        { name: 'mainColorProb', value: 80 },
        { name: 'transTime', value: 20 }
      ],
      hasOverlay: false
    };

    mockHttpClientPutRequest(client, response);

    return client.getEffectInfo().then(result => {
      expect(result).toBeInstanceOf(Effect);
      expect(result.version).toBe(response.version);
      expect(result.animName).toBe(response.animName);
      expect(result.animType).toBe(response.animType);
      expect(result.colorType).toBe(response.colorType);
      expect(result.pluginType).toBe(response.pluginType);
      expect(result.hasOverlay).toBe(response.pluginUuid);
      expect(result.pluginUuid).toBe(response.hasOverlay);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientPutRequest(client, error);

    return client.getEffectInfo().then(result => {
      assertForGenericRequest(result, error);
    });
  });
});

describe('NanoleafClient setEffect', () => {
  it('Returns Successful Response', () => {
    const client = new NanoleafClient(host);
    const response = new HttpResponse(200, 'Successful request');

    mockHttpClientPutRequest(client, response);

    return client.setEffect().then(result => {
      assertForGenericRequest(result, response);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientPutRequest(client, error);

    return client.setEffect().then(result => {
      assertForGenericRequest(result, error);
    });
  });
});

describe('NanoleafClient getEffectList', () => {
  it('Returns Effect List', () => {
    const client = new NanoleafClient(host);
    const effect = ['effect', 'list'];

    mockHttpClientGetRequest(client, effect);

    return client.getEffectList().then(result => {
      expect(result[0]).toBe(effect[0]);
      expect(result[1]).toBe(effect[1]);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientGetRequest(client, error);

    return client.getEffectList().then(result => {
      expect(result.message).toBe(error.message);
      expect(result.status).toBe(error.status);
    });
  });
});

describe('NanoleafClient getGlobalOrientation', () => {
  it('Returns Global Orientation', () => {
    const client = new NanoleafClient(host);
    const globalOrientation = {
      min: 0,
      max: 100,
      value: 50
    };

    mockHttpClientGetRequest(client, globalOrientation);

    return client.getGlobalOrientation().then(result => {
      expect(result).toBeInstanceOf(GlobalOrientation);
      expect(result.min).toBe(globalOrientation.min);
      expect(result.max).toBe(globalOrientation.max);
      expect(result.value).toBe(globalOrientation.value);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientGetRequest(client, error);

    return client.getGlobalOrientation().then(result => {
      expect(result.message).toBe(error.message);
      expect(result.status).toBe(error.status);
    });
  });
});

describe('NanoleafClient setGlobalOrientation', () => {
  it('Returns Successful Response', () => {
    const client = new NanoleafClient(host);
    const response = new HttpResponse(200, 'Successful request');

    mockHttpClientPutRequest(client, response);

    return client.setGlobalOrientation().then(result => {
      assertForGenericRequest(result, response);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientPutRequest(client, error);

    return client.setGlobalOrientation().then(result => {
      assertForGenericRequest(result, error);
    });
  });
});

describe('NanoleafClient setHsvColor', () => {
  it('Returns Successful Response', () => {
    const client = new NanoleafClient(host);
    const response = new HttpResponse(200, 'Successful request');

    mockHttpClientPutRequest(client, response);

    return client.setHsvColor(1 ,2, 3).then(result => {
      assertForGenericRequest(result, response);
    });
  });

  it('Returns Error', () => {
    const client = new NanoleafClient(host);
    const error = new HttpError(500, 'Internal Server error');

    mockHttpClientPutRequest(client, error);

    return client.setHsvColor().then(result => {
      assertForGenericRequest(result, error);
    });
  });
});

const assertForGenericRequest = (expectedResult, result) => {
  expect(typeof result).toBe(typeof expectedResult);
  expect(result.message).toBe(expectedResult.message);
  expect(result.status).toBe(expectedResult.status);
};

const mockHttpClientGetRequest = (client, returnValue) => {
  const mockGetRequest = jest.fn();
  client._client.getRequest = mockGetRequest;

  mockGetRequest.mockReturnValue(Promise.resolve(returnValue));
};

const mockHttpClientPutRequest = (client, returnValue) => {
  const mockPutRequest = jest.fn();
  client._client.putRequest = mockPutRequest;

  mockPutRequest.mockReturnValue(Promise.resolve(returnValue));
};

const mockHttpClientPostRequest = (client, returnValue) => {
  const mockPostRequest = jest.fn();
  client._client.postRequest = mockPostRequest;

  mockPostRequest.mockReturnValue(Promise.resolve(returnValue));
};
