import EventSource from 'eventsource';
import c from './const.js';

/**
 * Class for register and listen to events from Nanoleaf devices using SSE (Server-Sent-Events)
 */
class EventListener {
  /**
   * @param {string} host Device local IP
   * @param {string} token Authorization token
   */
  constructor(host, token) {
    this._host = new String(`http://${host}:${c.NANOLEAF_PORT}/api/v1/${token}/events?`);
  }

  /**
   * callback method to be executed after message is received, pass callback function to process the callback message
   * 
   * @param {Array.[number]} events Array of event ids to subscrive. Available ids are 1-4. 1 - State, 2 - Layout, 3 - Effects, 4 - Touch
   * @param {function({ type: string, data: { events: Array.<{attr: number, value: any}>}, lastEventId: number, origin: string})} callback method to be executed after message is received. 
   */
  subscribe(events, callback) {
    const source = new EventSource(this._host + this._getEventsQueryStr(events));

    source.onmessage = (message) => {
      callback(message);
    };

    source.onopen = () => {
      console.log('Connection established...');
      console.log(`Listening on ${source.url} ...`);
    };

    source.onerror = (error) => {
      console.log('ERROR... ', error);
    };

    setTimeout(() => {
      if(source.readyState === 0) {
        console.log(`Connection could not be established... URL: ${source.url}`);
      }
    }, 3000);
  }

  _getEventsQueryStr(events) {
    let query = 'id=';

    Array.from(events).forEach(eventId => {
      if([1,2,3,4].includes(Number(eventId))) {
        query += `${eventId},`;
      }
    });

    return query;
  }
}

export default EventListener;