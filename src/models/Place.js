/**
 * Place model
 */
 class Place {
    constructor(data = {}) {
      this.id = null;
      this.name = null;
      this.closestCampus = null;
      this.address = null;
      this.description = null;
      this.sleepEvents = null;
      Object.assign(this, data);
    }
  }
  export default Place;