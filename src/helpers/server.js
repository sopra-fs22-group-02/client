// src/server.js
import { createServer, Model } from "miragejs"
import { getDomain } from "./getDomain"

// in-Browser server for frontend development
export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    // add mock instances to various resources that will be handled server-side
    seeds(server) {
        server.db.loadData({
            users: [
                {   username: "peterpan" , 
                    name: "Peter", id: 1, 
                    token: 123, 
                    status: "OFFLINE",
                    calendar: [] // association USER -> EVENT
                },
                {
                    username: "aliceinwonderland", 
                    name: "Alice", 
                    id: 2, 
                    token: 345, 
                    status: "ONLINE",
                    calendar: [] // association USER -> EVENT
                }
            ],
            events: [
                {
                    applicants: [1], // association EVENT -> USER
                    confirmedApplicant: null, // association: EVENT -> USER
                    date: "2022-04-10",
                    starttime: "22:00",
                    endtime: "06:00",
                    state: "AVAILABLE",
                }
            ],
            place: [
                {
                    provider: [2], // association PLACE -> USER
                    location: null, // association PLACE -> LOCATION
                    description: "A lovely place",
                    picture: null,
                    events: [1] // association PLACE -> EVENT
                }
            ],
            location: [
                {
                    location: "Margrit-Rainer-Strasse 10B",
                    postcode: 8050,
                    coordinates: [47.4160277,8.5371293],
                    closestCampus: "OERLIKON",
                    distanceToClosestCampus: 100
                }
            ]
        })
    },

    // defined appropriate routes (as per REST spec.)
    routes() {
      this.urlPrefix = getDomain()
      this.namespace = ""

      // ---- USER resource ----

      // create new user
      this.post("/users", (schema) => {
          console.log(schema.users.find(1))
          return schema.db.users.find(1)
      })

      // get all users
      this.get("/users", (schema) => {
        console.log(schema.users.all())
        return schema.db.users
      })

      // login a user
      this.post("/users/:username/login", (schema) => {
          // TODO: Implement
      })

      // logout a user
      this.post("/users/:userid/logout", (schema) => {
          // TODO: Implement
      })

      // ---- USERS PROFILE ----

      // get the profile details of a user
      this.get("/users/:userid/profile", (schema) => {
          // TODO: Implement
          console.log(schema.users.find(1))
          return schema.db.users.find(1)
      })

      // update the profile information of a user
      this.put("/users/:userid/profile", (schema) => {
          // TODO: Implement
      })

      // ---- USERS EVENTS ----

      this.get("users/:userid/events", (schema) => {
          // TODO: Implement
      })

      // ---- USERS NOTIFICATION ----

      this.get("/users/:userid/notification", (schema) => {
          // TODO: Implement
      })

      this.put("/users/:userid/notification", (schema) => {
          // TODO: Implement
      })

      // ---- PLACES resource ---

      // get the places of the user
      this.get("/places/:userid", (schema) => {
          // TODO: Implement
      })

      // get the place associated with a user
      this.get("/places/:userid/:placeid", (schema) => {
          // TODO: Implement
      })

      // update the place associated with a user
      this.put("places/:userid/:placeid", (schema) => {
          // TODO: Implement
      })

      // ---- QUESTIONS resource ----

      // get the available questions
      this.get("/questions", (schema) => {
          // TODO: Implement
      })

      // get a specific question
      this.get("/questions/:questionid", (schema) => {
          // TODO: Implement
      })


    },
  })

  return server
}