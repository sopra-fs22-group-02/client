/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.name = null;
    this.username = null;
    this.email = null;
    this.bio = null;
    this.token = null;
    this.status = null;
    this.events = null;
    this.place = null;
    Object.assign(this, data);
  }
}
export default User;
