// src/server.js
import { belongsTo, createServer, Factory, hasMany, Model, RestSerializer, association, afterCreate } from "miragejs"
import { getDomain } from "./getDomain"
import faker from "@faker-js/faker"
import moment from "moment"

const persistLocally = (dump) => {
    localStorage.setItem('mirage', dump)
} 

const randItem = (items) => { 
    return items[Math.floor(Math.random()*items.length)];   
}

let AppSerializer = RestSerializer.extend({
    root: false,
    embed: true
})



// in-Browser server for frontend development
export function makeServer({ environment = "test" } = {}) {
    
  let server = createServer({

    environment,


    // Declaration of our models
    models: {
      user: Model.extend({
          events: hasMany('event'),
          notifications: hasMany('notification')
      }),
      event: Model.extend({
          place: belongsTo('place')
      }),
      notification: Model,
      place: Model.extend({
          user: belongsTo('user'),
          events: hasMany('event')
      }),
      location: Model.extend({
          place: belongsTo('place')
      })
    },
    
    // Good starting point for REST API
    serializers: {
        application: AppSerializer,
        user: AppSerializer.extend({
            // root: false,
            // embed: true,
            include: ['events']
        })
    },

    // Declaration of model factories
    factories: {
        user: Factory.extend({
            username() { return faker.internet.userName() },
            name() {return faker.name.firstName() },
            token() { return faker.datatype.uuid() },
            status() { return "OFFLINE" },
            // Only use this if no applicants autocreated
            // afterCreate(user, server) {
            //     if(!user.events) {
            //         user.update({
            //             events: server.createList("event", 3)
            //         })
            //     }
            // }
            // TODO: Factory for associations notifications and events
        }),
        event: Factory.extend({
            starttime() { return faker.date.soon(6) },
            state() { return randItem(["AVAILABLE", "UNAVAILABLE"]) },
            confirmedApplicant() { return null },
            afterCreate(event, server) {
                // generate some applicants (Only if no events autocreated)
                // if(!event.applicants) {
                //     event.update({
                //         applicants: server.createList("user", 3)
                //     })
                // }
                // add event endtime here (dependent on starttime)
                if(!event.endtime) {
                    event.update({
                        endtime: moment(event.starttime).add(
                            Math.floor(Math.random() * 12),
                            'hours')
                    })
                }
            }
            // TODO: Link the place
        }),
        // TODO: Implement notification factory
        // TODO: Implement place factory
        // TODO: Implement location factory (weak entity)
    },

    // add mock instances to various resources that will be handled server-side
    seeds(server) {
        if(localStorage.getItem('mirage')) {
            server.db.loadData(JSON.parse(localStorage.getItem('mirage')))
        }
        // server.db.loadData({
        //     users: [
        //         {   username: "peterpan" , 
        //             name: "Peter", id: 1, 
        //             token: 123, 
        //             status: "OFFLINE",
        //             calendar: [] // association USER -> EVENT
        //         },
        //         {
        //             username: "aliceinwonderland", 
        //             name: "Alice", 
        //             id: 2, 
        //             token: 345, 
        //             status: "ONLINE",
        //             calendar: [] // association USER -> EVENT
        //         }
        //     ],
        //     events: [
        //         {
        //             applicants: [1], // association EVENT -> USER
        //             confirmedApplicant: null, // association: EVENT -> USER
        //             date: "2022-04-10",
        //             starttime: "22:00",
        //             endtime: "06:00",
        //             state: "AVAILABLE",
        //             place: "SomePlace"
        //         }
        //     ],
        //     place: [
        //         {
        //             provider: [2], // association PLACE -> USER
        //             location: null, // association PLACE -> LOCATION
        //             description: "A lovely place",
        //             picture: null,
        //             events: [1] // association PLACE -> EVENT
        //         }
        //     ],
        //     location: [
        //         {
        //             location: "Margrit-Rainer-Strasse 10B",
        //             postcode: 8050,
        //             coordinates: [47.4160277,8.5371293],
        //             closestCampus: "OERLIKON",
        //             distanceToClosestCampus: 100
        //         }
        //     ]
        // })
    },

    // defined appropriate routes (as per REST spec.)
    routes() {
      this.urlPrefix = getDomain()
      this.namespace = ""

      this.pretender.handledRequest = () => {
          console.log(this.db.dump())
          persistLocally(JSON.stringify(this.db.dump()))
      }

      // gradually include more endpoints in passthrough => real backend
      this.passthrough()

      // ---- USER resource ----

      // create new user
      this.post("/users", (schema, request) => {
        const requestBody = JSON.parse(request.requestBody)
        let userDetails = requestBody
        userDetails = Object.assign({}, userDetails, { events: this.createList("event", 3) })
        server.create("user", userDetails)
        return schema.db.users.findBy({ username: userDetails.username })
      })

      // get all users
      this.get("/users", (schema) => {
        console.log(schema.users.all())
        return schema.db.users
      })

      // login a user
      this.post("/users/:username/login", (schema, request) => {
        const username_param = request.params.username
        return schema.db.users.findBy({ username: username_param })
      })

      // logout a user
      this.post("/users/:userid/logout", (schema) => {
          // TODO: Implement
      })

      // ---- USERS PERSONAL PAGE? ----
      this.get("/users/:userid", (schema) => {
        // TODO: Implement
    })

      // ---- USERS PROFILE ----

      // get the profile details of a user
      this.get("/users/:userid/profile", (schema, request) => {
          let userid_param = request.params.userid
          console.log("USERID")
        //   console.log(userid_param)
        //   console.log(schema.db.dump())
          // TODO: Implement
          return schema.users.find(userid_param)
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