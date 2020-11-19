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

      source.close();
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