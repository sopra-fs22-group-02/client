/**
 * Sleep event model
 */
 class SleepEvent {
    constructor(data = {}) {
      this.id = null;
      this.starttime = null;
      this.endtime = null;
      this.provider = null;
      this.applicants = null;
      this.confirmedApplicant = null;
      Object.assign(this, data);
    }
  }
  export default SleepEvent;