import { api } from "helpers/api";
import moment from "moment";
import Place from "./Place";

/**
 * Sleep event model
 */
 class SleepEvent {
    constructor(data = {}) {
      this.eventId = null;
      this.starttime = null;
      this.endtime = null;
      this.providerId = null;
      this.placeId = null;
      this.startDate = null;
      this.endDate = null;
      this.startTime = null;
      this.endTime = null;
      this.applicants = null;
      this.applicantsEntities = null;
      this.confirmedApplicant = null;
      this.confirmedApplicantEntity = null;
      // this.place = new Place();

      this.constructDateTime = () => {
        this.starttime =  moment(`${this.startDate} ${this.startTime}`, "YYYY-MM-DD HH:mm").toISOString(),
        this.endtime =  moment(`${this.endDate} ${this.endTime}`, "YYYY-MM-DD HH:mm").toISOString()
      }

      this.embed_place = async function() {
        if(!this.place) {
          // embedder
          try {
            // debug
            // console.log(this.userId)
            const res = await api.get(`/places/${this.providerId}`)
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

      this.embed_provider = async function() {
        if(!this.provider) {
          // embedder
          try {
            // debug
            // console.log(this.userId)
            const res = await api.get(`/users/${this.providerId}/profile`)
            //debug
            // console.log(res.data)
            // assign first place to the user
            this.provider = res.data ? res.data : null
            // debug
            // console.log("Triggered")
          } catch {
            console.log("Something went wrong while fetching the users places.")
          }
        }
      }

      this.embed_confirmed_applicant = async function() {
        if(this.confirmedApplicant != 0) {
          // embedder
          try {
            // debug
            // console.log(this.userId)
            const res = await api.get(`/users/${this.confirmedApplicant}/profile`)
            //debug
            // console.log(res.data)
            // assign first place to the user
            this.confirmedApplicantEntity = res.data ? res.data : null
            // debug
            // console.log("Triggered")
          } catch {
            console.log("Something went wrong while fetching the users places.")
          }
        }
      }

      this.embed_applicants = async function() {
        if(!this.applicants.length > 0) {
          // embedder
          try {
            // debug
            // console.log(this.userId)
            let aA = []
            for(let aId = 0; aId < this.applicants.length; aId++) {
              const res = await api.get(`/users/${this.aId}/profile`)
              aA.push(res.data)
            }
            //debug
            // console.log(res.data)
            // assign first place to the user
            this.applicantsEntities = aA.length > 0 ? aA : null
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