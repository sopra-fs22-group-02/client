import { api } from "helpers/api";
import _ from "lodash";
import moment from "moment";
import { storage } from 'helpers/firebase';
import { ref, getDownloadURL } from "firebase/storage";

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
    this.place = null;
    this.password = null;
    this.myNotifications = null;
    this.myCalendarAsApplicant = null;
    this.myCalendarAsProvider = null;
    this.pictureUrl = null;

    // declare fun to embed place
    this.embed_place = async function() {
      if(!this.place && this.userId) {
        // embedder
        try {
          const res = await api.get(`/places/${this.userId}`)
          this.place = res.data.length > 0 ? res.data[0] : null
        } catch {
          console.log("Something went wrong while fetching the users places.")
        }
      }
    }

    this.embed_picture_url = async function() {
        getDownloadURL(ref(storage, `user/${this.userId}`))
        .then((url) => {
          console.log("Retrieved URL:")
          console.log(url)
          this.pictureUrl = url;
        })
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
