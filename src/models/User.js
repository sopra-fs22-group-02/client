import { api } from "helpers/api";

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
    this.events = null;
    this.place = null;
    this.password = null;

    // declare fun to embed place
    this.embed_place = async function() {
      if(!this.place && this.userId) {
        // embedder
        try {
          // console.log(this.userId)
          const res = await api.get(`/places/${this.userId}`)
          console.log(res.data)
          // assign first place to the user
          this.place = res.data.length > 0 ? res.data[0] : null
          console.log("Triggered")
        } catch {
          console.log("Something went wrong while fetching the users places.")
        }
      }
    }

    Object.assign(this, data);
  }
}
export default User;
