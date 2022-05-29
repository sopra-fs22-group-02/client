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
      this.placeId = null;
      this.startDate = null;
      this.endDate = null;
      this.startTime = null;
      this.endTime = null;
      this.applicants = null;
      this.applicantsEntities = null;
      this.confirmedApplicant = null;
      this.confirmedApplicantEntity = null;

      this.constructDateTime = () => {
        this.starttime =  moment(`${this.startDate} ${this.startTime}`, "YYYY-MM-DD HH:mm").toISOString()
        this.endtime =  moment(`${this.endDate} ${this.endTime}`, "YYYY-MM-DD HH:mm").toISOString()
      }

      this.embed_place = async function() {
        if(!this.place) {
          // embedder
          try {
            const res = await api.get(`/places/${this.providerId}`)
            this.place = res.data.length > 0 ? res.data[0] : null
          } catch {
            console.log("Something went wrong while fetching the users places.")
          }
        }
      }

      this.embed_provider = async function() {
        if(!this.provider) {
          // embedder
          try {
            const res = await api.get(`/users/${this.providerId}/profile`)
            this.provider = res.data ? res.data : null
          } catch {
            console.log("Something went wrong while fetching the users places.")
          }
        }
      }

      this.embed_confirmed_applicant = async function() {
        if(this.confirmedApplicant != 0) {
          // embedder
          try {
            const res = await api.get(`/users/${this.confirmedApplicant}/profile`)
            this.confirmedApplicantEntity = res.data ? res.data : null
          } catch {
            console.log("Something went wrong while fetching the users places.")
          }
        }
      }

      this.embed_applicants = async function() {
        if(this.applicants.length > 0) {
          // embedder
          try {
            console.log("Apps" + JSON.stringify(this.applicants))
            let aA = []
            for(let aId = 0; aId < this.applicants.length; aId++) {
              console.log("Calling " + `/users/${this.applicants[aId]}/profile`)
              const res = await api.get(`/users/${this.applicants[aId]}/profile`)
              aA.push(res.data)
            }
            //debug
            console.log("Applicant entities:")
            console.log(aA.data)
            // assign first place to the user
            this.applicantsEntities = aA.length > 0 ? aA : null
          } catch {
            console.log("Something went wrong while embedding applicants.")
          }
        }
      }

      Object.assign(this, data);

      // this.constructDateTime();

    }
  }
  export default SleepEvent;