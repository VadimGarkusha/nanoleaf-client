import NanoleafClient from '../src/nanoleaf-client.js';
import NanoleafHttpClient from '../src/nanoleaf-http-client.js';

jest.mock('../src/nanoleaf-http-client.js');
const mockedMethodImpl = jest.fn();

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

// const mockHttpClientGetReturnSuccessfulResponse = (returnValue) => {
//     NanoleafHttpClient.getRequest().mockResolvedValue();
//     NanoleafHttpClient.mockImplementation(() => {
//         // Replace the class-creation method with this mock version.
//         return {
//             getRequest: () => {
//                 return new Promise((resolve, reject) ));
//             } // Populate the method with a reference to a mock created with jest.fn().
//         };
//     });
// };

// describe('NanoleafClient getPowerStatus', () => {
//     it('', () => {
//         const client = new NanoleafClient(host);
//         const brightness = {
//             value: 10,
//             max: 100,
//             min: 0
//         };
//         mockHttpClientGetReturnSuccessfulResponse(brightness);

//         return client.getBrightness().then(data => expect(data).toEqual(brightness));
//     });
// });