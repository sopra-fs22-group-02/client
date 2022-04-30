/**
 * Message model
 */
 class Message {
    constructor(data = {}) {
        this.messageContent = null;
        this.link = null;
        Object.assign(this, data);
    }
}
export default Message;