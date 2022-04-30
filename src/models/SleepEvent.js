import { api } from "helpers/api";
import moment from "moment";

/**
 * Sleep event model
 */
 class SleepEvent {
    constructor(data = {}) {
      this.eventId = null;
      this.starttime = null;
      this.endtime = null;
      this.providerId = null;
      this.startDate = null;
      this.endDate = null;
      this.startTime = null;
      this.endTime = null;
      this.applicants = null;
      this.confirmedApplicant = null;

      this.constructDateTime = () => {
        this.starttime =  moment(`${this.startDate} ${this.startTime}`, "YYYY-MM-DD HH:mm").toISOString(),
        this.endtime =  moment(`${this.endDate} ${this.endTime}`, "YYYY-MM-DD HH:mm").toISOString()
      }

      this.embed_place = async function() {
        if(!this.place && this.userId) {
          // embedder
          try {
            // debug
            // console.log(this.userId)
            const res = await api.get(`/places/${this.userId}`)
            //debug
            // console.log(res.data)
            // assign first place to the user
            this.place = res.data.length > 0 ? res.data[0] : null
            // debug
            // console.log("Triggered")
          } catch {
            console.log("Something went wrong while fetching the users places.")
          }
        }
      }

      Object.assign(this, data);

      // this.constructDateTime();

    }
  }
  export default SleepEvent;