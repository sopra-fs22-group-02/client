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
                { username: "peterpan" , name: "Peter", id: 1, token: 123, status: "OFFLINE"},
                { username: "aliceinwonderland", name: "Alice", id: 2, token: 345, status: "ONLINE"}
            ]
        })
    },

    // defined appropriate routes (as per REST spec.)
    routes() {
      this.urlPrefix = getDomain()
      this.namespace = ""

      // for users resource
      this.post("/users", (schema) => {
          console.log(schema.users.find(1))
          return schema.db.users.find(1)
      })

      this.get("/users", (schema) => {
        console.log(schema.users.all())
        return schema.db.users
      })
    },
  })

  return server
}