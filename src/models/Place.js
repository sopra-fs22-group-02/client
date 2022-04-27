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

    static getClosestCampi() {
      return [
        { id: 1, campus: "IRCHEL"},
        { id: 2, campus: "OERLIKON"},
        { id: 3, campus: "HOENGGERBERG"},
        { id: 4, campus: "CENTER"}
      ]
    }
  }
  export default Place;