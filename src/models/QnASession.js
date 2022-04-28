/**
 * User model
 */
class QnASession {
  constructor(data = {}) {
    this.starter = null;
    // whose turn it is (identified) to ANSWER & subsequently ASK
    this.turn = null;
    // this is not null and concerns whose turn it is
    this.currQ = null;
    // the list of Qs A answered
    this.answeredQsA = [];
    // the list of Qs B answered
    this.answeredQsB = [];
    Object.assign(this, data);
  }
}
export default QnASession;
