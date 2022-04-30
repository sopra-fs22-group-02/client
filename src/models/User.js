import { api } from "helpers/api";
import _ from "lodash";
import object from "sockjs-client/lib/utils/object";
import moment from "moment";

/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.userId = null;
    this.name = null;
    this.username = null;
    this.email = null;
    this.bio = null;
    this.token = null;
    this.status = null;
    // this.events = null;
    this.place = null;
    this.password = null;
    this.myNotifications = null;
    this.myCalendarAsApplicant = null;
    this.myCalendarAsProvider = null;

    // declare fun to embed place
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
  }

  get events() {
    let events = [...new Set([...this.myCalendarAsApplicant, ...this.myCalendarAsProvider])];
    events = _.map(events, (e) => {
      return Object.assign(e, {
      starttime: moment(`${e.startDate} ${e.startTime}`, "YYYY-MM-DD HH:mm").toISOString(),
      endtime: moment(`${e.endDate} ${e.endTime}`, "YYYY-MM-DD HH:mm").toISOString()
      })
    }) 
    console.log(`Events: ${events}`)
    return events;
  }
}
export default User;
