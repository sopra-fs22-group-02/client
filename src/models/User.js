import { api } from "helpers/api";
import _ from "lodash";
import object from "sockjs-client/lib/utils/object";
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
    // this.events = null;
    this.place = null;
    this.password = null;
    this.myNotifications = null;
    this.myCalendarAsApplicant = null;
    this.myCalendarAsProvider = null;
    this.pictureUrl = null;
    this.eventEntities = null;

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

    this.embed_picture_url = async function() {
        getDownloadURL(ref(storage, `user/${this.userId}`))
        .then((url) => {
          console.log("Retrievel URL:")
          console.log(url)
          this.pictureUrl = url;
        })
    }
    
    this.embed_events = async function() {
      let events = [...new Set([...this.myCalendarAsApplicant, ...this.myCalendarAsProvider])];
      if(events.length > 0) {
          console.log("Procedure called")
          // embedder
          try {
            console.log("Events:" + JSON.stringify(events))
            // debug
            // console.log(this.userId)
            let eA = []
            for(let eId = 0; eId < events.length; eId++) {
              console.log("Calling " + `/places/events/${events[eId]}`)
              const res = await api.get(`/places/events/${events[eId]}`)
              eA.push(res.data)
            }
            //debug
            console.log("Event entities:")
            console.log(eA.data)

            eA = _.map(eA, (e) => {
              return Object.assign(e, {
              starttime: moment(`${e.startDate} ${e.startTime}`, "YYYY-MM-DD HH:mm").toISOString(),
              endtime: moment(`${e.endDate} ${e.endTime}`, "YYYY-MM-DD HH:mm").toISOString()
              })
            })
            console.log("eA:" + JSON.stringify(eA))

            // assign first place to the user
            // events = eA.length > 0 ? eA : null
            this.eventEntities = eA.length > 0 ? eA : []
            // debug
            // console.log("Triggered")
          } catch {
            console.log("Something went wrong while embedding applicants.")
          }
        }
      }

    Object.assign(this, data);
  }

  get events() {
    return this.eventEntities
    // console.log(`Events: ${events}`)
    // return events;
  }
}
export default User;
