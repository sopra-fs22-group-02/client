/**
 * Sleep event model
 */
 class SleepEvent {
    constructor(data = {}) {
      this.id = null;
      this.name = null;
      this.nearestTo = null;
      this.address = null;
      this.description = null;
      this.sleepEvents = null;
      Object.assign(this, data);
    }
  }
  export default SleepEvent;